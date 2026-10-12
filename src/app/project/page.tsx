import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Gemma — Senior AI Model Specialist",
  description:
    "Role details for the Senior AI Model Specialist: prompt engineering, comparative scoring, and expert rewriting at $100.00 an hour.",
};

const topics = [
  {
    category: "Workplace & Career",
    items: [
      "Corporate Remote Work Policies",
      "Automation & Employee Upskilling",
      "Executive Compensation Transparency",
    ],
  },
  {
    category: "Education & School",
    items: [
      "AI Integration in K-12 Classrooms",
      "Standardized Testing Reform",
      "University Tuition & Student Debt",
    ],
  },
  {
    category: "Cities & Infrastructure",
    items: [
      "Public Transit Funding vs. Highway Expansion",
      "Urban Zoning & Affordable Housing",
      "Green Energy Grid Transition",
    ],
  },
  {
    category: "Culture & Media",
    items: [
      "Digital Privacy vs. Public Safety",
      "Social Media Content Moderation",
      "Preservation of Local Arts Funding",
    ],
  },
  {
    category: "Technology & AI",
    items: [
      "Open-Source AI vs. Proprietary Guardrails",
      "Autonomous Vehicle Liability",
      "Data Ownership in Algorithmic Models",
    ],
  },
  {
    category: "Public Life & Governance",
    items: ["Civic Engagement & Local Governance"],
  },
];

const rubric = [
  {
    name: "Clarity",
    body: "Is the thesis statement easy to identify? Is the argument free of unnecessary jargon and circular logic?",
  },
  {
    name: "Balance",
    body: "Does the model acknowledge opposing viewpoints fairly while still delivering a decisive opinion?",
  },
  {
    name: "Evidence Grounding",
    body: "Are claims supported by factual reasoning, plausible data points, or logical trade-offs?",
  },
  {
    name: "Practical Usefulness",
    body: "Does the response directly address the audience and scope defined in the prompt?",
  },
  {
    name: "Tone & Style",
    body: "Is the tone professional, objective, and authoritative without sounding robotic?",
  },
];

const checks = [
  "Topic Alignment: The prompt directly reflects one of the 16 approved topics.",
  "Prompt Depth: The prompt clearly defines the audience, required coverage, and opinion request.",
  "Complete Scoring: All 5 rubric dimensions contain justified ratings.",
  "High-Quality Rewrite: The rewritten response serves as a production-grade benchmark for AI fine-tuning.",
];

export default function ProjectPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Back to application
          </Link>
          <p className="font-serif text-lg tracking-tight">Gemma</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <p className="text-sm font-medium tracking-wide text-blue-400 uppercase">
          Project Gemma
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          Senior AI Model Specialist / Prompt Evaluator
        </h1>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
            <dt className="text-sm text-slate-400">Compensation</dt>
            <dd className="mt-1 text-lg font-medium text-slate-100">
              $100.00 / hour
            </dd>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
            <dt className="text-sm text-slate-400">Task type</dt>
            <dd className="mt-1 text-lg font-medium text-slate-100">
              Prompt Engineering, Comparative Scoring & Expert Rewriting
            </dd>
          </div>
        </dl>

        <section className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">Project overview</h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-slate-300">
            <p>
              Project Gemma focuses on training next-generation large language
              models to form balanced, well-supported, and highly clear opinions
              on complex topics. As a Senior AI Model Specialist, your goal is
              to challenge the model with nuanced real-world prompts, evaluate
              its output across five core dimensions, and write a benchmark
              gold-standard response that the model will use for fine-tuning.
            </p>
            <p>
              This role requires strong critical thinking, precise editorial
              skills, and the ability to articulate structured arguments across
              various domains of work, school, and public life.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">
            3-step evaluation workflow
          </h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Select topic", "Draft target prompt", "Rate & rewrite"].map(
              (step, index) => (
                <li
                  key={step}
                  className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4"
                >
                  <p className="font-serif text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-medium text-slate-100">{step}</p>
                </li>
              ),
            )}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">
            Step 01: Topic selection
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Choose one domain from the 16 core topic areas below. Select a topic
            where you can formulate a realistic scenario involving multiple
            viewpoints or conflicting priorities.
          </p>
          <div className="mt-6 space-y-6">
            {topics.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-medium tracking-wide text-blue-400 uppercase">
                  {group.category}
                </h3>
                <ul className="mt-2 space-y-1 text-slate-200">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-7 text-slate-300">
            Selection rule: pick a topic you can contextualize with a clear
            audience and explicit constraints in Step 02.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">
            Step 02: Write the prompt
          </h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-slate-300">
            <p>
              Your prompt must ask for an opinion in your own words. Do not ask
              simple factual questions (for example, “What is zoning?”).
              Instead, structure a prompt that forces the model to take a
              reasoned stance on a complex issue.
            </p>
            <p>Required prompt components:</p>
          </div>
          <ul className="mt-4 space-y-3 text-base leading-7 text-slate-300">
            <li>
              <span className="font-medium text-slate-100">Target audience.</span>{" "}
              Explicitly state who the answer is for, such as a city council
              transportation committee, a high school principal, or a tech
              company HR board.
            </li>
            <li>
              <span className="font-medium text-slate-100">Scope and coverage.</span>{" "}
              Define at least 2–3 specific elements or trade-offs the answer
              must cover.
            </li>
            <li>
              <span className="font-medium text-slate-100">Tone and stance.</span>{" "}
              Prompt the model to deliver a definitive opinion without resorting
              to generic, fence-sitting language.
            </li>
          </ul>
          <blockquote className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-base leading-7 text-slate-300">
            I am presenting to a municipal planning board regarding our
            city&apos;s 5-year transportation budget. Give me a clear opinion on
            whether we should prioritize expanding light rail lines or upgrading
            our existing electric bus fleet. The response must cover immediate
            capital costs, long-term environmental impact, and accessibility for
            low-income neighborhoods.
          </blockquote>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">
            Step 03: Rate and rewrite
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Once you submit your prompt, you will evaluate the AI model’s
            generated response against 5 core evaluation criteria using a 1–5
            scale.
          </p>
          <ol className="mt-6 space-y-4">
            {rubric.map((item, index) => (
              <li key={item.name} className="flex gap-4">
                <span className="font-serif text-lg text-blue-400">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-slate-100">
                    {item.name} (1–5)
                  </p>
                  <p className="mt-1 text-base leading-7 text-slate-300">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-8 font-serif text-xl tracking-tight">
            Expert model rewrite
          </h3>
          <p className="mt-3 text-base leading-7 text-slate-300">
            After scoring the baseline response, provide a complete rewrite of
            the response. Your rewrite must:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
            <li>Fix every flaw identified during your rating phase.</li>
            <li>Strengthen the supporting evidence and logical flow.</li>
            <li>
              Ensure the stance is definitive, well-balanced, and tailored
              precisely to the designated target audience.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">
            Submission and review criteria
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Before clicking Submit Task, confirm that your work meets the
            following quality controls:
          </p>
          <ul className="mt-4 space-y-3">
            {checks.map((check) => (
              <li
                key={check}
                className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-base leading-7 text-slate-200"
              >
                {check}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">
            Task summary metrics
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            When you click Submit Task, your submission summary will calculate:
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
              <dt className="font-medium text-slate-100">Total elapsed time</dt>
              <dd className="mt-1 text-sm leading-6 text-slate-400">
                Tracked in real time (MM:SS).
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
              <dt className="font-medium text-slate-100">Total earnings</dt>
              <dd className="mt-1 text-sm leading-6 text-slate-400">
                Calculated automatically at the $100.00/hr base rate.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
              <dt className="font-medium text-slate-100">Quality score</dt>
              <dd className="mt-1 text-sm leading-6 text-slate-400">
                Summary of rubric points assigned during Step 03.
              </dd>
            </div>
          </dl>
        </section>

        <Link
          href="/"
          className="mt-12 inline-flex h-11 items-center rounded-full bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
        >
          Back to application
        </Link>
      </main>
    </div>
  );
}
