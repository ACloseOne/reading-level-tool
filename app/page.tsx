import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Reading Level Check
        </h1>
        <p className="text-slate-600 mb-12">
          A friendly self-check tool to explore reading levels — analyze any
          text, or take a short reading assessment.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/readability"
            className="group block rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left"
          >
            <div className="text-3xl mb-3">📄</div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-700">
              Text Readability Analyzer
            </h2>
            <p className="text-sm text-slate-500">
              Paste in any text — a book excerpt, article, or homework
              assignment — and get an estimated grade level.
            </p>
          </Link>

          <Link
            href="/assessment"
            className="group block rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-left"
          >
            <div className="text-3xl mb-3">📖</div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-emerald-700">
              Student Reading Assessment
            </h2>
            <p className="text-sm text-slate-500">
              Read a short passage, answer a few questions, and get an
              estimated reading level based on speed and comprehension.
            </p>
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-12">
          This tool provides an informal estimate for self-checking purposes
          only. It is not a substitute for a professional reading evaluation.
        </p>
      </div>
    </div>
  );
}
