import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reading Level Check",
  description: "A self-check tool for text readability and reading levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
