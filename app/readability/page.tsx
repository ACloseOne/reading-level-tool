"use client";

import { useState } from "react";
import Link from "next/link";
import { analyzeText, fleschEaseLabel, ReadabilityResult } from "@/lib/readability";

const SAMPLE_TEXT = `The old lighthouse stood at the edge of the cliff, its white paint peeling from decades of salt spray. Every evening, the keeper climbed the spiral staircase to light the lamp, guiding ships safely past the rocky shore. Though modern boats now relied on satellite navigation, the town still cherished the lighthouse as a symbol of home.`;

export default function ReadabilityPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReadabilityResult | null>(null);
  const [touched, setTouched] = useState(false);

  function handleAnalyze() {
    setTouched(true);
    setResult(analyzeText(text));
  }

  function loadSample() {
    setText(SAMPLE_TEXT);
    setResult(analyzeText(SAMPLE_TEXT));
    setTouched(true);
  }

  return (
    <main className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-sky-700 transition hover:text-sky-800">
              ← Back home
            </Link>
            <div className="mt-3 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Text analyzer</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Estimate how complex a passage feels.
              </h1>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Use this panel to review readability in a structured, dashboard-style view.
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type text here (at least a few sentences for an accurate estimate)..."
                className="min-h-64 w-full resize-y rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-inner outline-none ring-0 transition focus:border-sky-400"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={text.trim().length === 0}
                  className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Analyze text
                </button>
                <button
                  onClick={loadSample}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Try a sample
                </button>
              </div>
            </div>

            {touched && !result && (
              <p className="text-sm text-slate-500">Please enter some text to analyze.</p>
            )}

            {result && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-100">Estimated reading level</p>
                  <p className="mt-2 text-3xl font-semibold sm:text-4xl">{result.readingLevelLabel}</p>
                  <p className="mt-2 text-sm text-sky-100">Average grade estimate: {result.averageGradeLevel}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <StatCard label="Words" value={result.words} />
                  <StatCard label="Sentences" value={result.sentences} />
                  <StatCard
                    label="Flesch Reading Ease"
                    value={`${result.fleschReadingEase} (${fleschEaseLabel(result.fleschReadingEase)})`}
                  />
                  <StatCard label="Complex words (3+ syllables)" value={result.complexWords} />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Grade level by formula</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <MetricRow label="Flesch-Kincaid Grade Level" value={result.fleschKincaidGrade} />
                    <MetricRow label="Gunning Fog Index" value={result.gunningFog} />
                    <MetricRow label="SMOG Index" value={result.smog} />
                    <MetricRow label="Automated Readability Index" value={result.automatedReadabilityIndex} />
                    <MetricRow label="Coleman-Liau Index" value={result.colemanLiauIndex} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Quick tips</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">Try a longer passage for a steadier estimate.</div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">Short, simple sentences usually score easier.</div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">Very technical words can raise the complexity score.</div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-5 text-slate-100">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Note</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                These formulas are useful guides, not exact measures. They work best when combined with context and real-world reading experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-2 last:border-b-0">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
