"use client";

import { useState } from "react";
import Link from "next/link";
import { passages, Passage } from "@/lib/passages";
import { scoreAssessment, wordCountOf, AssessmentResult } from "@/lib/scoring";

type Stage = "select" | "reading" | "questions" | "results";

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>("select");
  const [passage, setPassage] = useState<Passage | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  function choosePassage(p: Passage) {
    setPassage(p);
    setAnswers(new Array(p.questions.length).fill(-1));
    setStage("reading");
    setStartTime(Date.now());
  }

  function finishReading() {
    if (startTime) {
      setReadingSeconds((Date.now() - startTime) / 1000);
    }
    setStage("questions");
  }

  function selectAnswer(qIndex: number, optIndex: number) {
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  }

  function submitAnswers() {
    if (!passage) return;
    const correct = answers.filter(
      (a, i) => a === passage.questions[i].correctIndex
    ).length;
    const wc = wordCountOf(passage.text);
    const r = scoreAssessment(
      passage.gradeBand,
      wc,
      readingSeconds,
      correct,
      passage.questions.length
    );
    setResult(r);
    setStage("results");
  }

  function reset() {
    setStage("select");
    setPassage(null);
    setStartTime(null);
    setReadingSeconds(0);
    setAnswers([]);
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-emerald-700 hover:underline">
          ← Back home
        </Link>

        <h1 className="text-3xl font-bold text-slate-800 mt-4 mb-2">
          Student Reading Assessment
        </h1>
        <p className="text-slate-600 mb-8">
          Pick a starting passage, read it at a normal pace, then answer a
          few questions about what you read.
        </p>

        {stage === "select" && (
          <div className="grid gap-4">
            {passages.map((p) => (
              <button
                key={p.id}
                onClick={() => choosePassage(p)}
                className="text-left bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-800">{p.title}</p>
                    <p className="text-sm text-slate-500">
                      Approx. grade {p.gradeBand} level
                    </p>
                  </div>
                  <span className="text-emerald-700 text-sm font-medium">
                    Start →
                  </span>
                </div>
              </button>
            ))}
            <p className="text-xs text-slate-400 mt-2">
              Not sure where to start? Pick the passage closest to your
              current grade — you can always try another level afterward.
            </p>
          </div>
        )}

        {stage === "reading" && passage && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {passage.title}
            </h2>
            <div className="prose prose-slate whitespace-pre-line text-slate-700 leading-relaxed mb-6">
              {passage.text}
            </div>
            <button
              onClick={finishReading}
              className="bg-emerald-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              I'm Done Reading
            </button>
            <p className="text-xs text-slate-400 mt-3">
              Read at your normal pace — the timer is running in the
              background to help estimate reading speed.
            </p>
          </div>
        )}

        {stage === "questions" && passage && (
          <div className="space-y-6">
            {passage.questions.map((q, qi) => (
              <div
                key={qi}
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                <p className="font-medium text-slate-800 mb-3">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label
                      key={oi}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        answers[qi] === oi
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => selectAnswer(qi, oi)}
                        className="accent-emerald-600"
                      />
                      <span className="text-sm text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={submitAnswers}
              disabled={answers.some((a) => a === -1)}
              className="bg-emerald-600 disabled:bg-slate-300 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              See My Results
            </button>
          </div>
        )}

        {stage === "results" && result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
              <p className="text-sm text-slate-500 mb-1">
                Estimated Reading Level
              </p>
              <p className="text-4xl font-bold text-emerald-700">
                Grade {result.estimatedGradeLevel}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Reading Speed</p>
                <p className="text-xl font-semibold text-slate-800">
                  {result.wpm} wpm
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {result.fluencyRating} grade-level pace
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Comprehension</p>
                <p className="text-xl font-semibold text-slate-800">
                  {result.accuracyPercent}%
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {result.comprehensionRating}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-700">{result.recommendation}</p>
            </div>

            <button
              onClick={reset}
              className="bg-white border border-slate-300 text-slate-700 font-medium px-5 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Try Another Passage
            </button>

            <p className="text-xs text-slate-400">
              This is an informal estimate based on a single short passage.
              For a thorough evaluation of reading ability, consult a
              teacher or reading specialist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
