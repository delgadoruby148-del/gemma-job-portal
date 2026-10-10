"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  FIELD_ORDER,
  getCvError,
  MAX_CV_MB,
  MAX_DESCRIPTION_LENGTH,
  submitApplication,
  validateApplication,
  type ApplicationFields,
  type FieldErrors,
} from "@/lib/application";
import { isSupabaseConfigured } from "@/lib/supabase";

const EMPTY_FIELDS: ApplicationFields = {
  fullName: "",
  country: "",
  discordUsername: "",
  email: "",
  phoneNumber: "",
  briefDescription: "",
};

type Phase = "idle" | "uploading" | "saving" | "success";

const controlClass =
  "w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-[#a3988c] focus:border-forest focus:ring-4 focus:ring-forest/10 aria-invalid:border-clay aria-invalid:ring-4 aria-invalid:ring-clay/10";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-30"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ApplicationForm() {
  const [fields, setFields] = useState<ApplicationFields>(EMPTY_FIELDS);
  const [cv, setCv] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const configured = isSupabaseConfigured();
  const isBusy = phase === "uploading" || phase === "saving";

  useEffect(() => {
    if (phase === "success") {
      successHeadingRef.current?.focus();
    }
  }, [phase]);

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError(null);
  }

  function updateField<K extends keyof ApplicationFields>(key: K, value: ApplicationFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    clearFieldError(key);
  }

  function acceptFile(file: File | null) {
    setFormError(null);

    if (!file) {
      setCv(null);
      clearFieldError("cv");
      return;
    }

    const cvError = getCvError(file);
    if (cvError) {
      setCv(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFieldErrors((current) => ({ ...current, cv: cvError }));
      return;
    }

    setCv(file);
    clearFieldError("cv");
  }

  function clearCv() {
    setCv(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    clearFieldError("cv");
  }

  function resetForm() {
    setFields(EMPTY_FIELDS);
    setCv(null);
    setFieldErrors({});
    setFormError(null);
    setPhase("idle");
    setSubmittedName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    const errors = validateApplication(fields, cv);
    setFieldErrors(errors);

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid || !cv) {
      setFormError(null);
      document.getElementById(firstInvalid ?? "cv")?.focus();
      return;
    }

    setFormError(null);
    setSubmittedName(fields.fullName.trim());
    setPhase("uploading");

    try {
      await submitApplication(
        {
          ...fields,
          cv,
        },
        setPhase,
      );
      setPhase("success");
    } catch (caught) {
      setPhase("idle");
      setFormError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong while sending your application.",
      );
    }
  }

  if (phase === "success") {
    return (
      <section className="rounded-3xl border border-line bg-paper px-6 py-10 shadow-[0_24px_60px_-36px_rgba(20,53,40,0.55)] sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-brass">
          Application received
        </p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-3 font-serif text-4xl tracking-tight text-ink outline-none"
        >
          Thank you, {submittedName}.
        </h2>
        <p className="mt-4 max-w-md text-base leading-7 text-muted">
          Your CV is filed, and your details are saved with the Gemma hiring
          team.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-medium text-white transition hover:bg-forest-deep"
        >
          Submit another application
        </button>
      </section>
    );
  }

  const buttonLabel =
    phase === "uploading"
      ? "Uploading CV…"
      : phase === "saving"
        ? "Saving application…"
        : "Submit application";

  const descriptionLength = fields.briefDescription.trim().length;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-paper px-5 py-6 shadow-[0_24px_60px_-36px_rgba(20,53,40,0.55)] sm:px-8 sm:py-8"
    >
      <div className="mb-8">
        <h2 className="font-serif text-3xl tracking-tight text-ink">Your application</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Every field is required.</p>
      </div>

      {!configured ? (
        <p className="mb-6 rounded-xl border border-brass/30 bg-[#f8f1df] px-4 py-3 text-sm leading-6 text-ink">
          Add your Supabase URL and anon key to <span className="font-medium">.env.local</span>{" "}
          before submitting. The form will upload the CV, then save the rest.
        </p>
      ) : null}

      <div className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="text-xs font-medium uppercase tracking-[0.16em] text-brass">
            Contact
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="fullName"
              label="Full Name"
              autoComplete="name"
              autoCapitalize="words"
              placeholder="Jordan Lee"
              value={fields.fullName}
              error={fieldErrors.fullName}
              onChange={(value) => updateField("fullName", value)}
            />
            <TextField
              id="country"
              label="Country"
              autoComplete="country-name"
              autoCapitalize="words"
              placeholder="Canada"
              value={fields.country}
              error={fieldErrors.country}
              onChange={(value) => updateField("country", value)}
            />
          </div>
          <TextField
            id="discordUsername"
            label="Discord Username"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            prefix="@"
            placeholder="jordan.lee"
            value={fields.discordUsername}
            error={fieldErrors.discordUsername}
            onChange={(value) => updateField("discordUsername", value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              placeholder="jordan@example.com"
              value={fields.email}
              error={fieldErrors.email}
              onChange={(value) => updateField("email", value)}
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+1 555 010 0199"
              value={fields.phoneNumber}
              error={fieldErrors.phoneNumber}
              onChange={(value) => updateField("phoneNumber", value)}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-xs font-medium uppercase tracking-[0.16em] text-brass">
            Work
          </legend>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink" id="cv-label">
              CV Upload
            </span>
            {cv ? (
              <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/10 font-serif text-sm text-forest">
                  CV
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{cv.name}</span>
                  <span className="block text-xs text-muted">{formatFileSize(cv.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={clearCv}
                  className="text-sm font-medium text-forest underline-offset-4 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : null}
            <label
              htmlFor="cv"
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                acceptFile(event.dataTransfer.files[0] ?? null);
              }}
              className={`${
                cv
                  ? "sr-only"
                  : `flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center transition focus-within:ring-4 focus-within:ring-forest/10 ${
                      isDragging
                        ? "border-forest bg-forest/5"
                        : fieldErrors.cv
                          ? "border-clay bg-clay/5"
                          : "border-line bg-white hover:border-forest/40"
                    }`
              }`}
            >
              <input
                ref={fileInputRef}
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                aria-labelledby="cv-label"
                aria-invalid={Boolean(fieldErrors.cv)}
                aria-describedby={fieldErrors.cv ? "cv-error" : "cv-hint"}
                className="sr-only"
                onChange={(event) => acceptFile(event.target.files?.[0] ?? null)}
              />
              <span className="text-sm font-medium text-ink">Choose a file or drop it here</span>
              <span id="cv-hint" className="mt-1 text-xs text-muted">
                PDF, DOC, or DOCX, up to {MAX_CV_MB} MB
              </span>
            </label>
            {fieldErrors.cv ? (
              <p id="cv-error" className="text-sm text-clay">
                {fieldErrors.cv}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="briefDescription" className="text-sm font-medium text-ink">
              Brief Description
            </label>
            <textarea
              id="briefDescription"
              name="briefDescription"
              value={fields.briefDescription}
              maxLength={MAX_DESCRIPTION_LENGTH}
              rows={6}
              placeholder="The kind of role you want, and a little about the work you have done."
              aria-invalid={Boolean(fieldErrors.briefDescription)}
              aria-describedby="briefDescription-hint"
              onChange={(event) => updateField("briefDescription", event.target.value)}
              className={`${controlClass} min-h-36 resize-y py-3`}
            />
            <div className="flex items-start justify-between gap-4">
              <p
                id="briefDescription-hint"
                className={`text-sm ${fieldErrors.briefDescription ? "text-clay" : "text-muted"}`}
              >
                {fieldErrors.briefDescription ?? "At least 20 characters."}
              </p>
              <p className="shrink-0 text-xs text-muted">
                {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
              </p>
            </div>
          </div>
        </fieldset>
      </div>

      {formError ? (
        <p role="alert" className="mt-6 rounded-xl border border-clay/30 bg-clay/5 px-4 py-3 text-sm text-clay">
          {formError}
        </p>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {phase === "uploading"
          ? "Uploading CV"
          : phase === "saving"
            ? "Saving application"
            : ""}
      </p>

      <button
        type="submit"
        disabled={isBusy}
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest text-sm font-medium text-white transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isBusy ? <Spinner /> : null}
        {buttonLabel}
      </button>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  autoCapitalize,
  placeholder,
  inputMode,
  prefix,
  spellCheck,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  autoCapitalize?: "none" | "words";
  placeholder?: string;
  inputMode?: "tel";
  prefix?: string;
  spellCheck?: boolean;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-muted">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          inputMode={inputMode}
          spellCheck={spellCheck}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClass} h-12 ${prefix ? "pl-8" : ""}`}
        />
      </div>
      {error ? (
        <p id={errorId} className="text-sm text-clay">
          {error}
        </p>
      ) : null}
    </div>
  );
}
