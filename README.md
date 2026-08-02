# Reading Level Check

A self-check web tool with two features:

1. **Text Readability Analyzer** (`/readability`) — paste any text and get an
   estimated grade level, using five standard readability formulas
   (Flesch-Kincaid, Flesch Reading Ease, Gunning Fog, SMOG, Automated
   Readability Index, Coleman-Liau Index).
2. **Student Reading Assessment** (`/assessment`) — pick a short passage
   (grades 2, 4, 6, 8, 10), read it, answer 4 comprehension questions, and
   get an estimated reading level based on reading speed (WPM) + accuracy.

Everything runs client-side — no database, no accounts, no API keys needed.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

**Option A — CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts (link/create a project, accept defaults — Vercel
auto-detects Next.js).

**Option B — GitHub**
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Vercel auto-detects Next.js — click Deploy.

No environment variables are required.

## Project structure

```
app/
  page.tsx              Home page
  readability/page.tsx  Readability analyzer UI
  assessment/page.tsx   Reading assessment UI (passage -> quiz -> results)
lib/
  readability.ts        Readability formula calculations
  passages.ts            Passage bank + comprehension questions
  scoring.ts               WPM + accuracy -> estimated grade level
```

## Extending it

- **Add passages**: add entries to `lib/passages.ts` (any grade band, any
  number of questions).
- **Adjust WPM norms**: edit `WPM_NORMS` in `lib/scoring.ts`.
- **Persist results**: currently nothing is saved between sessions. To track
  progress over time you'd add `localStorage` (client-only) or a small
  database + API route.

## Disclaimer

This tool provides an informal, self-check estimate. It is not a validated
diagnostic instrument and isn't a substitute for assessment by a teacher or
reading specialist.
