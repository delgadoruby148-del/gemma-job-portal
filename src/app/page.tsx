import { ApplicationForm } from "@/components/application-form";

const steps = [
  {
    title: "Contact",
    body: "Your name, country, Discord username, email, and phone number.",
  },
  {
    title: "CV",
    body: "A PDF or Word file. It is uploaded before anything else is saved.",
  },
  {
    title: "A short note",
    body: "What you want to work on, in a few sentences.",
  },
];

function GemMark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className="h-10 w-10">
      <path fill="#f3e6c4" d="M18 3 31 13 18 33 5 13Z" />
      <path fill="#fffaf1" d="M18 3 24 13 18 17 12 13Z" />
      <path fill="#d7b56a" d="M12 13 18 17 5 13Z" />
      <path fill="#f7f1e4" d="M24 13 31 13 18 17Z" />
      <path fill="#c4a15a" d="M12 13 18 17 18 33 5 13Z" />
      <path fill="#e7d7a8" d="M24 13 31 13 18 33 18 17Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[minmax(20rem,0.92fr)_minmax(0,1.08fr)]">
      <aside className="relative flex flex-col justify-between overflow-hidden bg-forest-deep px-6 py-10 text-[#f6f1e6] sm:px-10 sm:py-14 lg:sticky lg:top-0 lg:h-dvh lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#e7d3a1]/15 blur-3xl"
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <GemMark />
            <div>
              <p className="font-serif text-2xl leading-none tracking-tight">Gemma</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#e7d3a1]">
                Job application
              </p>
            </div>
          </div>

          <h1 className="mt-12 max-w-md font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            Apply to join Gemma.
          </h1>
          <p className="mt-5 max-w-sm text-base leading-7 text-[#f6f1e6]/75">
            Send your details, a CV, and a short note. The form asks only for
            what the hiring team needs to read.
          </p>

          <ol className="mt-10 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-serif text-lg text-[#e7d3a1]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 max-w-xs text-sm leading-6 text-[#f6f1e6]/70">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="relative mt-12 text-sm leading-6 text-[#f6f1e6]/70">
          Your CV is filed first. Your details are saved after that upload
          finishes.
        </p>
      </aside>

      <main className="px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="mx-auto w-full max-w-xl">
          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}
