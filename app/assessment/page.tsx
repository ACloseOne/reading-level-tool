"use client";

import { useState } from "react";
import Link from "next/link";
import { passages, Passage } from "@/lib/passages";
import {
  scoreAssessment,
  wordCountOf,
  analyzePassageWords,
  getBookSuggestions,
  AssessmentResult,
  WordInfo,
  BookSuggestion,
} from "@/lib/scoring";

type Stage = "select" | "reading" | "questions" | "results";

const stageLabels: Record<Stage, string> = {
  select: "Choose passage",
  reading: "Read passage",
  questions: "Answer questions",
  results: "Review results",
};

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>("select");
  const [passage, setPassage] = useState<Passage | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [wordInfo, setWordInfo] = useState<WordInfo[]>([]);
  const [markedIncorrect, setMarkedIncorrect] = useState<Set<number>>(new Set());
  const [bookSuggestions, setBookSuggestions] = useState<BookSuggestion[]>([]);

  function choosePassage(p: Passage) {
    setPassage(p);
    setAnswers(new Array(p.questions.length).fill(-1));
    setWordInfo(analyzePassageWords(p.text));
    setMarkedIncorrect(new Set());
    setStage("reading");
    setStartTime(Date.now());
  }

  function toggleWordIncorrect(index: number) {
    setMarkedIncorrect((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
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
    const correct = answers.filter((a, i) => a === passage.questions[i].correctIndex).length;
    const wc = wordCountOf(passage.text);
    const totalWordTokens = wordInfo.filter((w) => w.type === "word").length;
    const missedWords = Array.from(markedIncorrect)
      .map((i) => wordInfo[i]?.text)
      .filter((t): t is string => !!t);
    const r = scoreAssessment(
      passage.gradeBand,
      wc,
      readingSeconds,
      correct,
      passage.questions.length,
      missedWords,
      totalWordTokens || wc
    );
    setResult(r);
    setBookSuggestions(getBookSuggestions(passage.gradeBand, r));
    setStage("results");
  }

  function reset() {
    setStage("select");
    setPassage(null);
    setStartTime(null);
    setReadingSeconds(0);
    setAnswers([]);
    setResult(null);
    setWordInfo([]);
    setMarkedIncorrect(new Set());
    setBookSuggestions([]);
  }

  const skillSuggestions = bookSuggestions.filter((s) => s.category === "skill");
  const enjoymentSuggestions = bookSuggestions.filter((s) => s.category === "enjoyment");

  return (
    <main className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.22)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-700 transition hover:text-emerald-800">
              ← Back home
            </Link>
            <div className="mt-3 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Reading assessment</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Practice reading with a guided, calm flow.
              </h1>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Follow the steps below to move from reading to insight.
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(stageLabels) as Stage[]).map((key) => (
                <div
                  key={key}
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    stage === key ? "bg-emerald-600 text-white" : "bg-white text-slate-600"
                  }`}
                >
                  {stageLabels[key]}
                </div>
              ))}
            </div>

            {stage === "select" && (
              <div className="mt-6 grid gap-4">
                {passages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => choosePassage(p)}
                    className="text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{p.title}</p>
                        <p className="mt-1 text-sm text-slate-500">Approx. grade {p.gradeBand} level</p>
                      </div>
                      <span className="text-sm font-semibold text-emerald-700">Start →</span>
                    </div>
                  </button>
                ))}
                <p className="text-xs leading-5 text-slate-500">
                  Pick the passage closest to your current reading level. You can always try another one afterward.
                </p>
              </div>
            )}

            {stage === "reading" && passage && (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{passage.title}</h2>

                <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                  Listening to the child read aloud? Click any word they read incorrectly, skipped, or needed
                  help with. Marked words feed into the accuracy score and the skill-focused suggestions below.
                </div>

                <div className="mt-4 text-base leading-8 text-slate-700">
                  <p className="whitespace-pre-wrap">
                    {wordInfo.map((token, index) =>
                      token.type === "word" ? (
                        <button
                          type="button"
                          key={index}
                          onClick={() => toggleWordIncorrect(index)}
                          className={`rounded px-0.5 transition ${
                            markedIncorrect.has(index)
                              ? "bg-rose-200 text-rose-900 underline decoration-rose-600 decoration-2 underline-offset-2"
                              : token.difficulty === "challenge"
                              ? "bg-slate-100 text-slate-900 hover:bg-rose-100"
                              : "text-slate-900 hover:bg-rose-100"
                          }`}
                        >
                          {token.text}
                        </button>
                      ) : (
                        <span key={index}>{token.text}</span>
                      )
                    )}
                  </p>
                </div>

                {markedIncorrect.size > 0 && (
                  <p className="mt-3 text-xs font-medium text-rose-700">
                    {markedIncorrect.size} word{markedIncorrect.size === 1 ? "" : "s"} marked incorrect.
                  </p>
                )}

                <button
                  onClick={finishReading}
                  className="mt-6 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  I’m done reading
                </button>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Read at your normal pace. The timer is running in the background to help estimate reading speed.
                </p>
              </div>
            )}

            {stage === "questions" && passage && (
              <div className="mt-6 space-y-4">
                {passage.questions.map((q, qi) => (
                  <div key={qi} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="font-medium text-slate-900">
                      {qi + 1}. {q.question}
                    </p>
                    <div className="mt-3 space-y-2">
                      {q.options.map((opt, oi) => (
                        <label
                          key={oi}
                          className={`flex items-center gap-3 rounded-xl border p-3 transition ${
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
                  className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  See my results
                </button>
              </div>
            )}

            {stage === "results" && result && (
              <div className="mt-6 space-y-5">
                <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center text-white shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Estimated reading level</p>
                  <p className="mt-2 text-4xl font-semibold">Grade {result.estimatedGradeLevel}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Guided reading (A–Z)</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">Level {result.guidedReadingLevel}</p>
                    <p className="mt-1 text-xs text-slate-500">Approximate Fountas &amp; Pinnell-style equivalent</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Approx. Lexile</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{result.lexileDisplay}</p>
                    <p className="mt-1 text-xs text-slate-500">Estimate only — not an official Lexile measure</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Word reading accuracy</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{result.wordReadingAccuracyPercent}%</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {result.missedWordCount} of {result.totalWordCount} words marked incorrect · {result.decodingRating}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Reading speed</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{result.wpm} wpm</p>
                    <p className="mt-1 text-xs text-slate-500">{result.fluencyRating} grade-level pace</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Comprehension</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{result.accuracyPercent}%</p>
                    <p className="mt-1 text-xs text-slate-500">{result.comprehensionRating}</p>
                  </div>
                </div>

                {result.missedWords.length > 0 && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-700">Words marked incorrect</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.missedWords.map((w) => (
                        <span key={w} className="rounded-full border border-rose-300 bg-white px-3 py-1 text-sm text-rose-800">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm leading-7 text-slate-700">{result.recommendation}</p>
                </div>

                {skillSuggestions.length > 0 && (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">To build the missing skill</p>
                    <div className="mt-4 space-y-4">
                      {skillSuggestions.map((suggestion) => (
                        <div key={suggestion.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                          <p className="font-semibold text-slate-900">{suggestion.title}</p>
                          <p className="mt-1 text-sm text-slate-600">{suggestion.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {enjoymentSuggestions.length > 0 && (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">For enjoyment at this level</p>
                    <div className="mt-4 space-y-4">
                      {enjoymentSuggestions.map((suggestion) => (
                        <div key={suggestion.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                          <p className="font-semibold text-slate-900">{suggestion.title}</p>
                          <p className="mt-1 text-sm text-slate-600">{suggestion.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={reset}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Try another passage
                </button>

                <p className="text-xs leading-5 text-slate-500">
                  This is an informal estimate based on a single short passage. The grade level, guided
                  reading (A–Z) level, and Lexile figure are all approximations derived from the same
                  reading and comprehension data — they do not substitute for a real, standardized reading
                  assessment. For a thorough reading evaluation, consult a teacher or reading specialist.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Progress</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">Choose a passage to begin the assessment flow.</div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">Read at a normal pace, clicking any word read incorrectly.</div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">Answer the questions, then review the full score report.</div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-5 text-emerald-900">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Tip</p>
              <p className="mt-3 text-sm leading-6 text-emerald-800">
                A single short passage gives a quick estimate, so use it as a starting point rather than a final judgment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
