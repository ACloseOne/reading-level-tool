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
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back home
        </Link>

        <h1 className="text-3xl font-bold text-slate-800 mt-4 mb-2">
          Text Readability Analyzer
        </h1>
        <p className="text-slate-600 mb-6">
          Paste in a passage below to estimate its reading grade level using
          several standard readability formulas.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text here (at least a few sentences for an accurate estimate)..."
          className="w-full h-56 rounded-xl border border-slate-300 p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAnalyze}
            disabled={text.trim().length === 0}
            className="bg-blue-600 disabled:bg-slate-300 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Analyze Text
          </button>
          <button
            onClick={loadSample}
            className="bg-white border border-slate-300 text-slate-700 font-medium px-5 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Try a Sample
          </button>
        </div>

        {touched && !result && (
          <p className="mt-6 text-slate-500 text-sm">
            Please enter some text to analyze.
          </p>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">
                Estimated Reading Level
              </p>
              <p className="text-3xl font-bold text-blue-700">
                {result.readingLevelLabel}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Average grade estimate: {result.averageGradeLevel}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard label="Words" value={result.words} />
              <StatCard label="Sentences" value={result.sentences} />
              <StatCard
                label="Flesch Reading Ease"
                value={`${result.fleschReadingEase} (${fleschEaseLabel(
                  result.fleschReadingEase
                )})`}
              />
              <StatCard
                label="Complex Words (3+ syllables)"
                value={result.complexWords}
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-3">
                Grade Level by Formula
              </h3>
              <div className="space-y-2 text-sm">
                <MetricRow label="Flesch-Kincaid Grade Level" value={result.fleschKincaidGrade} />
                <MetricRow label="Gunning Fog Index" value={result.gunningFog} />
                <MetricRow label="SMOG Index" value={result.smog} />
                <MetricRow label="Automated Readability Index" value={result.automatedReadabilityIndex} />
                <MetricRow label="Coleman-Liau Index" value={result.colemanLiauIndex} />
              </div>
            </div>

            <p className="text-xs text-slate-400">
              These formulas estimate difficulty using sentence length and
              syllable/word complexity. They're a useful guide, not an exact
              measurement — the same text can score differently depending on
              topic familiarity and formatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
