"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

export function ProjectDetailsModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center rounded-full bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
      >
        Read more
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 sm:items-center sm:p-6"
              onClick={() => setOpen(false)}
            >
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="flex max-h-[100dvh] w-full flex-col overflow-hidden bg-white text-slate-900 scheme-light sm:max-h-[min(90dvh,52rem)] sm:max-w-3xl sm:rounded-3xl sm:shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-8">
                  <div>
                    <p className="text-sm font-medium tracking-wide text-blue-700 uppercase">
                      Project Gemma
                    </p>
                    <h2
                      id={titleId}
                      className="mt-1 font-serif text-2xl leading-tight tracking-tight text-slate-950 sm:text-3xl"
                    >
                      Senior AI Model Specialist / Prompt Evaluator
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 shrink-0 items-center rounded-full border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                  >
                    Close
                  </button>
                </div>

                <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
                  <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 px-6 py-5">
                    <p className="text-sm font-semibold tracking-wide text-blue-800 uppercase">
                      Pay rate
                    </p>
                    <p className="mt-1 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                      $100.00 / hour
                    </p>
                  </div>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <p className="text-sm text-slate-600">Task type</p>
                    <p className="mt-1 text-lg font-medium text-slate-950">
                      Prompt Engineering, Comparative Scoring & Expert Rewriting
                    </p>
                  </div>

                  <section className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">
                      Project overview
                    </h3>
                    <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
                      <p>
                        Project Gemma focuses on training next-generation large
                        language models to form balanced, well-supported, and
                        highly clear opinions on complex topics. As a Senior AI
                        Model Specialist, your goal is to challenge the model
                        with nuanced real-world prompts, evaluate its output
                        across five core dimensions, and write a benchmark
                        gold-standard response that the model will use for
                        fine-tuning.
                      </p>
                      <p>
                        This role requires strong critical thinking, precise
                        editorial skills, and the ability to articulate
                        structured arguments across various domains of work,
                        school, and public life.
                      </p>
                    </div>
                  </section>

                  <section className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">
                      3-step evaluation workflow
                    </h3>
                    <ol className="mt-5 grid gap-3 sm:grid-cols-3">
                      {["Select topic", "Draft target prompt", "Rate & rewrite"].map(
                        (step, index) => (
                          <li
                            key={step}
                            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                          >
                            <p className="font-serif text-blue-700">
                              {String(index + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-2 font-medium text-slate-950">{step}</p>
                          </li>
                        ),
                      )}
                    </ol>
                  </section>

                  <section className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">
                      Step 01: Topic selection
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-700">
                      Choose one domain from the 16 core topic areas below.
                      Select a topic where you can formulate a realistic
                      scenario involving multiple viewpoints or conflicting
                      priorities.
                    </p>
                    <div className="mt-6 space-y-6">
                      {topics.map((group) => (
                        <div key={group.category}>
                          <h4 className="text-sm font-medium tracking-wide text-blue-700 uppercase">
                            {group.category}
                          </h4>
                          <ul className="mt-2 space-y-1 text-slate-800">
                            {group.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-base leading-7 text-slate-700">
                      Selection rule: pick a topic you can contextualize with a
                      clear audience and explicit constraints in Step 02.
                    </p>
                  </section>

                  <section className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">
                      Step 02: Write the prompt
                    </h3>
                    <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
                      <p>
                        Your prompt must ask for an opinion in your own words.
                        Do not ask simple factual questions (for example, “What
                        is zoning?”). Instead, structure a prompt that forces
                        the model to take a reasoned stance on a complex issue.
                      </p>
                      <p>Required prompt components:</p>
                    </div>
                    <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
                      <li>
                        <span className="font-medium text-slate-950">
                          Target audience.
                        </span>{" "}
                        Explicitly state who the answer is for, such as a city
                        council transportation committee, a high school
                        principal, or a tech company HR board.
                      </li>
                      <li>
                        <span className="font-medium text-slate-950">
                          Scope and coverage.
                        </span>{" "}
                        Define at least 2–3 specific elements or trade-offs the
                        answer must cover.
                      </li>
                      <li>
                        <span className="font-medium text-slate-950">
                          Tone and stance.
                        </span>{" "}
                        Prompt the model to deliver a definitive opinion without
                        resorting to generic, fence-sitting language.
                      </li>
                    </ul>
                    <blockquote className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-7 text-slate-700">
                      I am presenting to a municipal planning board regarding our
                      city&apos;s 5-year transportation budget. Give me a clear
                      opinion on whether we should prioritize expanding light
                      rail lines or upgrading our existing electric bus fleet.
                      The response must cover immediate capital costs, long-term
                      environmental impact, and accessibility for low-income
                      neighborhoods.
                    </blockquote>
                  </section>

                  <section className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">
                      Step 03: Rate and rewrite
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-700">
                      Once you submit your prompt, you will evaluate the AI
                      model’s generated response against 5 core evaluation
                      criteria using a 1–5 scale.
                    </p>
                    <ol className="mt-6 space-y-4">
                      {rubric.map((item, index) => (
                        <li key={item.name} className="flex gap-4">
                          <span className="font-serif text-lg text-blue-700">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-slate-950">
                              {item.name} (1–5)
                            </p>
                            <p className="mt-1 text-base leading-7 text-slate-700">
                              {item.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <h4 className="mt-8 font-serif text-xl tracking-tight">
                      Expert model rewrite
                    </h4>
                    <p className="mt-3 text-base leading-7 text-slate-700">
                      After scoring the baseline response, provide a complete
                      rewrite of the response. Your rewrite must:
                    </p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-slate-700">
                      <li>Fix every flaw identified during your rating phase.</li>
                      <li>Strengthen the supporting evidence and logical flow.</li>
                      <li>
                        Ensure the stance is definitive, well-balanced, and
                        tailored precisely to the designated target audience.
                      </li>
                    </ul>
                  </section>

                  <section className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">
                      Submission and review criteria
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-700">
                      Before clicking Submit Task, confirm that your work meets
                      the following quality controls:
                    </p>
                    <ul className="mt-4 space-y-3">
                      {checks.map((check) => (
                        <li
                          key={check}
                          className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-7 text-slate-800"
                        >
                          {check}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">
                      Task summary metrics
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-700">
                      When you click Submit Task, your submission summary will
                      calculate:
                    </p>
                    <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                        <dt className="font-medium text-slate-950">
                          Total elapsed time
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-slate-600">
                          Tracked in real time (MM:SS).
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                        <dt className="font-medium text-slate-950">
                          Total earnings
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-slate-600">
                          Calculated automatically at the{" "}
                          <span className="font-bold text-slate-950">
                            $100.00/hr
                          </span>{" "}
                          base rate.
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                        <dt className="font-medium text-slate-950">
                          Quality score
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-slate-600">
                          Summary of rubric points assigned during Step 03.
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
