import Link from "next/link";

const featureCards = [
  {
    title: "Text analyzer",
    description: "Paste a passage and review grade-level, readability, and complexity insights.",
    href: "/readability",
    accent: "from-sky-500 to-blue-600",
    emoji: "📄",
  },
  {
    title: "Reading assessment",
    description: "Walk through a short passage, answer questions, and review a reading profile.",
    href: "/assessment",
    accent: "from-emerald-500 to-teal-600",
    emoji: "📖",
  },
];

const metrics = [
  { label: "Quick checks", value: "3 tools" },
  { label: "Result focus", value: "Clear feedback" },
  { label: "Best use", value: "Classroom support" },
];

export default function Home() {
  return (
    <main className="space-y-6">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
              Dashboard overview
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A calm, focused workspace for reading-level insights.
            </h1>
            <p className="text-base leading-7 text-slate-600">
              Review readability, measure comprehension, and move from analysis to practice without leaving the same experience.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            Ready to explore
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{metric.label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/70 bg-slate-950 p-6 text-slate-100 shadow-[0_20px_55px_-20px_rgba(2,6,23,0.6)] sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Start a task</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Choose your next step</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featureCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/25 hover:bg-white/10"
              >
                <div className={`inline-flex rounded-full bg-gradient-to-r ${card.accent} px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white`}>
                  {card.title}
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <span className="text-2xl">{card.emoji}</span>
                  <p className="text-sm leading-6 text-slate-300">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.18)] backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">How it works</p>
          <div className="mt-5 space-y-4">
            {[
              { title: "Pick your tool", text: "Use the analyzer for quick readability checks or the assessment for guided practice." },
              { title: "Review the results", text: "See grade estimates, complexity measures, and reading-speed feedback in one place." },
              { title: "Move forward", text: "Use the feedback to guide instruction, support, or independent reading goals." },
            ].map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
