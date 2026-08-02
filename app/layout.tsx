import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

const navigation = [
  { href: "/", label: "Overview", badge: "Home" },
  { href: "/readability", label: "Text Analyzer", badge: "Analyze" },
  { href: "/assessment", label: "Assessment", badge: "Practice" },
];

export const metadata: Metadata = {
  title: "Reading Level Check",
  description: "A polished self-check tool for reading level analysis and assessment.",
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
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_30%)]" />
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
            <aside className="w-full border-b border-slate-200/80 bg-white/80 p-5 backdrop-blur lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg text-white">
                  📘
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Reading Level Check</p>
                  <p className="text-sm text-slate-500">Dashboard workspace</p>
                </div>
              </div>

              <nav className="mt-8 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      {item.badge}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Quick insight</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Switch between text analysis and guided reading practice from one streamlined dashboard.
                </p>
              </div>
            </aside>

            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
