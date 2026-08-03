import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrailHead",
  description: "TrailHead — reading-level insights and guided practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-transparent font-sans text-slate-900">
        <div className="relative isolate min-h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f9f5ff] via-[#fdf2f8] to-[#fff7ed]" />

          <header className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <img src="/mountain.svg" alt="TrailHead" className="h-10 w-10" />
                <div>
                  <p className="text-lg font-semibold tracking-tight">TrailHead</p>
                  <p className="text-xs text-slate-500">Reading-level insight</p>
                </div>
              </Link>

              <nav className="hidden items-center gap-3 md:flex">
                <Link
                  href="/readability"
                  className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                >
                  Analyze
                </Link>
                <Link
                  href="/assessment"
                  className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-amber-400"
                >
                  Assess
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
