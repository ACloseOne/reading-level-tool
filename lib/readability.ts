// Core readability metrics — all computed client-side, no API calls needed.

export interface ReadabilityResult {
  words: number;
  sentences: number;
  syllables: number;
  complexWords: number; // 3+ syllables
  characters: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gunningFog: number;
  smog: number;
  automatedReadabilityIndex: number;
  colemanLiauIndex: number;
  averageGradeLevel: number;
  readingLevelLabel: string;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length === 0) return 0;
  if (word.length <= 3) return 1;

  // Remove trailing silent e
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");

  const matches = word.match(/[aeiouy]{1,2}/g);
  const count = matches ? matches.length : 1;
  return Math.max(1, count);
}

function splitSentences(text: string): string[] {
  const cleaned = text.trim();
  if (!cleaned) return [];
  const parts = cleaned
    .replace(/([.?!])\s*(?=[A-Z]|$)/g, "$1|")
    .split("|")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [cleaned];
}

function splitWords(text: string): string[] {
  return (text.match(/[A-Za-z']+/g) || []).filter((w) => w.length > 0);
}

function gradeLevelLabel(grade: number): string {
  if (grade <= 0) return "Pre-K / Early Reader";
  if (grade < 1) return "Kindergarten";
  const rounded = Math.round(grade);
  if (rounded >= 13) return "College graduate level";
  if (rounded >= 12) return "12th grade (High school senior)";
  return `${rounded}${ordinalSuffix(rounded)} grade`;
}

function ordinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

export function analyzeText(text: string): ReadabilityResult | null {
  const words = splitWords(text);
  const sentences = splitSentences(text);
  const wordCount = words.length;
  const sentenceCount = Math.max(sentences.length, 1);

  if (wordCount === 0) return null;

  let syllableTotal = 0;
  let complexWords = 0;
  let characters = 0;

  for (const w of words) {
    const syl = countSyllables(w);
    syllableTotal += syl;
    characters += w.length;
    if (syl >= 3) complexWords++;
  }

  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = syllableTotal / wordCount;
  const lettersPer100Words = (characters / wordCount) * 100;
  const sentencesPer100Words = (sentenceCount / wordCount) * 100;

  // Flesch Reading Ease (0-100, higher = easier)
  const fleschReadingEase =
    206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;

  // Flesch-Kincaid Grade Level
  const fleschKincaidGrade =
    0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;

  // Gunning Fog Index
  const gunningFog =
    0.4 * (wordsPerSentence + 100 * (complexWords / wordCount));

  // SMOG Index (approximation valid for 30+ sentences; scaled here)
  const smog =
    1.0430 * Math.sqrt(complexWords * (30 / sentenceCount)) + 3.1291;

  // Automated Readability Index
  const automatedReadabilityIndex =
    4.71 * (characters / wordCount) + 0.5 * wordsPerSentence - 21.43;

  // Coleman-Liau Index
  const colemanLiauIndex =
    0.0588 * lettersPer100Words - 0.296 * sentencesPer100Words - 15.8;

  const gradeEstimates = [
    fleschKincaidGrade,
    gunningFog,
    smog,
    automatedReadabilityIndex,
    colemanLiauIndex,
  ].map((g) => Math.max(0, g));

  const averageGradeLevel =
    gradeEstimates.reduce((a, b) => a + b, 0) / gradeEstimates.length;

  return {
    words: wordCount,
    sentences: sentenceCount,
    syllables: syllableTotal,
    complexWords,
    characters,
    fleschReadingEase: round(fleschReadingEase),
    fleschKincaidGrade: round(Math.max(0, fleschKincaidGrade)),
    gunningFog: round(Math.max(0, gunningFog)),
    smog: round(Math.max(0, smog)),
    automatedReadabilityIndex: round(Math.max(0, automatedReadabilityIndex)),
    colemanLiauIndex: round(Math.max(0, colemanLiauIndex)),
    averageGradeLevel: round(averageGradeLevel),
    readingLevelLabel: gradeLevelLabel(averageGradeLevel),
  };
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

export function fleschEaseLabel(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Confusing";
}
