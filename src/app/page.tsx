import Link from "next/link";
import { ApplicationForm } from "@/components/application-form";
import { GemmaMark } from "@/components/gemma-mark";

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

export default function Home() {
  return (
    <div className="bg-slate-950 lg:grid lg:min-h-dvh lg:grid-cols-[minmax(20rem,0.92fr)_minmax(0,1.08fr)]">
      <aside className="relative flex flex-col justify-between overflow-x-hidden overflow-y-auto border-slate-800 bg-slate-900 px-6 py-10 text-slate-100 sm:px-10 sm:py-14 lg:sticky lg:top-0 lg:h-dvh lg:border-r lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div className="relative">
          <GemmaMark />

          <h1 className="mt-3 max-w-md font-serif text-4xl leading-[1.1] tracking-tight text-slate-100 sm:text-5xl">
            Apply to join Gemma.
          </h1>
          <p className="mt-5 max-w-sm text-base leading-7 text-slate-300">
            Senior AI Model Specialist. Write prompts, score model answers, and
            draft the benchmark response. $100.00 an hour.
          </p>
          <Link
            href="/project"
            className="mt-5 inline-flex h-10 items-center rounded-full bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
          >
            Read more
          </Link>

          <ol className="mt-10 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-serif text-lg text-blue-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium text-slate-100">{step.title}</p>
                  <p className="mt-1 max-w-xs text-sm leading-6 text-slate-400">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="relative mt-12 text-sm leading-6 text-slate-400">
          Your CV is filed first. Your details are saved after that upload
          finishes.
        </p>
      </aside>

      <main className="bg-white px-4 py-8 scheme-light sm:px-8 sm:py-12 lg:min-h-dvh lg:px-12 lg:py-16">
        <div className="mx-auto w-full max-w-xl">
          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}
