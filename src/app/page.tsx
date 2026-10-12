import { ApplicationForm } from "@/components/application-form";
import { DiscordCommunityLink } from "@/components/discord-community-link";
import { GemmaMark } from "@/components/gemma-mark";
import { ProjectDetailsModal } from "@/components/project-details-modal";

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
      <aside className="relative flex flex-col overflow-x-hidden overflow-y-auto border-slate-800 bg-slate-900 px-6 py-10 text-slate-100 sm:px-10 sm:py-12 md:px-12 lg:sticky lg:top-0 lg:h-dvh lg:border-r lg:px-10 lg:py-12 xl:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col justify-between lg:max-w-2xl">
          <div>
            <GemmaMark />

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Project Gemma trains models to give clear, balanced opinions. As a
              Senior AI Model Specialist, you write real-world prompts, score each
              answer on five criteria, and rewrite a gold-standard response.
            </p>
            <p className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              $100.00 / hour
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              Choose one of 16 topics, draft a prompt that asks for a definite
              opinion, then rate the model and rewrite the answer.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <ProjectDetailsModal />
              <DiscordCommunityLink className="focus-visible:ring-offset-slate-900" />
            </div>

            <ol className="mt-10 space-y-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-serif text-lg text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium text-slate-100">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
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
        </div>
      </aside>

      <main className="bg-white px-4 py-8 scheme-light sm:px-8 sm:py-12 lg:min-h-dvh lg:px-12 lg:py-16">
        <div className="mx-auto w-full max-w-xl">
          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}
