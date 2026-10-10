import { getSupabaseClient } from "@/lib/supabase";

export const APPLICANTS_TABLE = "applicants";
export const RESUMES_BUCKET = "resumes";
export const MAX_CV_MB = 8;
export const MAX_CV_BYTES = MAX_CV_MB * 1024 * 1024;
export const MAX_DESCRIPTION_LENGTH = 2000;

const CV_MIME_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

const DISCORD_PATTERN = /^[a-zA-Z0-9._]{2,32}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+().\-\s]+$/;

export type ApplicationFields = {
  fullName: string;
  country: string;
  discordUsername: string;
  email: string;
  phoneNumber: string;
  briefDescription: string;
};

export type ApplicationField = keyof ApplicationFields | "cv";

export type FieldErrors = Partial<Record<ApplicationField, string>>;

export type ApplicationDetails = ApplicationFields & {
  cv: File;
};

export const FIELD_ORDER: ApplicationField[] = [
  "fullName",
  "country",
  "discordUsername",
  "email",
  "phoneNumber",
  "cv",
  "briefDescription",
];

type CvExtension = keyof typeof CV_MIME_TYPES;

function extensionOf(fileName: string): string {
  const base = fileName.split(/[/\\]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  return dot === -1 ? "" : base.slice(dot + 1).toLowerCase();
}

function isCvExtension(value: string): value is CvExtension {
  return value in CV_MIME_TYPES;
}

export function getCvError(file: File): string | null {
  const extension = extensionOf(file.name);

  if (!isCvExtension(extension)) {
    return "Upload a PDF, DOC, or DOCX file.";
  }

  if (
    file.type &&
    file.type !== "application/octet-stream" &&
    file.type !== CV_MIME_TYPES[extension]
  ) {
    return "Upload a PDF, DOC, or DOCX file.";
  }

  if (file.size === 0) {
    return "That CV file is empty.";
  }

  if (file.size > MAX_CV_BYTES) {
    return `CV must be ${MAX_CV_MB} MB or smaller.`;
  }

  return null;
}

export function normalizeDiscordUsername(value: string): string {
  return value.trim().replace(/^@+/, "");
}

export function validateApplication(
  fields: ApplicationFields,
  cv: File | null,
): FieldErrors {
  const errors: FieldErrors = {};
  const fullName = fields.fullName.trim();
  const country = fields.country.trim();
  const discordUsername = normalizeDiscordUsername(fields.discordUsername);
  const email = fields.email.trim();
  const phoneNumber = fields.phoneNumber.trim();
  const briefDescription = fields.briefDescription.trim();
  const digits = phoneNumber.replace(/\D/g, "");

  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (country.length < 2) {
    errors.country = "Enter your country.";
  }

  if (!DISCORD_PATTERN.test(discordUsername)) {
    errors.discordUsername =
      "Use 2–32 letters, numbers, underscores, or periods.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!PHONE_PATTERN.test(phoneNumber) || digits.length < 7 || digits.length > 15) {
    errors.phoneNumber = "Enter a phone number with 7 to 15 digits.";
  }

  if (!cv) {
    errors.cv = "Upload your CV.";
  } else {
    const cvError = getCvError(cv);
    if (cvError) {
      errors.cv = cvError;
    }
  }

  if (briefDescription.length < 20) {
    errors.briefDescription = "Write at least 20 characters.";
  } else if (briefDescription.length > MAX_DESCRIPTION_LENGTH) {
    errors.briefDescription = "Keep the description under 2,000 characters.";
  }

  return errors;
}

function safeFileName(fileName: string): string {
  const base = fileName.split(/[/\\]/).pop() ?? "cv";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/^\.+/, "");
  return cleaned || "cv";
}

export async function submitApplication(
  details: ApplicationDetails,
  onProgress?: (phase: "uploading" | "saving") => void,
): Promise<{ id: string }> {
  const errors = validateApplication(details, details.cv);
  const firstError = FIELD_ORDER.map((field) => errors[field]).find(Boolean);

  if (firstError) {
    throw new Error(firstError);
  }

  const supabase = getSupabaseClient();
  const id = crypto.randomUUID();
  const extension = extensionOf(details.cv.name);

  if (!isCvExtension(extension)) {
    throw new Error("Upload a PDF, DOC, or DOCX file.");
  }

  const cvPath = `${id}/${safeFileName(details.cv.name)}`;

  onProgress?.("uploading");

  const { error: uploadError } = await supabase.storage
    .from(RESUMES_BUCKET)
    .upload(cvPath, details.cv, {
      contentType: CV_MIME_TYPES[extension],
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`CV upload failed: ${uploadError.message}`);
  }

  onProgress?.("saving");

  const { error: insertError } = await supabase.from(APPLICANTS_TABLE).insert({
    id,
    full_name: details.fullName.trim(),
    country: details.country.trim(),
    discord_username: normalizeDiscordUsername(details.discordUsername),
    email: details.email.trim().toLowerCase(),
    phone_number: details.phoneNumber.trim(),
    cv_path: cvPath,
    brief_description: details.briefDescription.trim(),
  });

  if (insertError) {
    const { error: removeError } = await supabase.storage
      .from(RESUMES_BUCKET)
      .remove([cvPath]);

    if (removeError) {
      throw new Error(
        `Application was not saved (${insertError.message}). The uploaded CV could not be removed (${removeError.message}).`,
      );
    }

    throw new Error(`Application was not saved: ${insertError.message}`);
  }

  return { id };
}
