import Link from "next/link";

export default function Home() {
  return (
    <main className="py-8">
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-8 text-white shadow-2xl sm:p-12 fluid-animate-bg">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:flex-1 md:pr-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              <img src="/mountain.svg" alt="logo" className="h-6 w-6" />
              TrailHead
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
              Building Confident Readers
            </h1>
            <p className="mt-4 max-w-2xl text-lg opacity-90">
              TrailHead gives you fast readability analysis and guided assessments
              so you can support learning with clear, actionable feedback.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/assessment" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-purple-700 shadow-md">
                Try an assessment
              </Link>
              <Link href="/readability" className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white/90">
                Analyze text
              </Link>
            </div>
          </div>

          {/* right-side quick sample removed per request */}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl space-y-6 px-2 sm:px-0">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Quick checks</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Estimate readability</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Clear results</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Grade estimates & metrics</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Guidance</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Instructional next steps</p>
          </div>
        </div>
      </section>
    </main>
  );
}
