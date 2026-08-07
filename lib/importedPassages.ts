import { Passage } from "./passages";
import rawDataV1Json from "./reading_comprehension_tests.json";
import rawDataV2Json from "./reading_comprehension_tests_v2.json";
import rawDataV3Json from "./reading_comprehension_tests_v3.json";

type RawQuestion = {
  id: string;
  question_text: string;
  options: Record<string, string>;
  correct_answer: string;
  explanation?: string;
};

type RawTestEntry = {
  grade: string;
  target_age?: string;
  metadata?: {
    book_title?: string;
    author?: string;
    lexile_estimated?: string;
    focus_standard?: string;
  };
  excerpt: string;
  questions: RawQuestion[];
};

type RawDataset = {
  reading_comprehension_tests: RawTestEntry[];
};

const LETTER_ORDER = ["A", "B", "C", "D", "E", "F", "G", "H"];

function gradeToBand(grade: string): number {
  if (grade.trim().toUpperCase() === "K") return 0;
  const numeric = Number(grade);
  return Number.isNaN(numeric) ? 0 : numeric;
}

function normalizeOptions(options: Record<string, string>): string[] {
  return LETTER_ORDER.filter((letter) => letter in options).map((letter) => options[letter]);
}

const rawDataV1 = rawDataV1Json as RawDataset;
const rawDataV2 = rawDataV2Json as RawDataset;
const rawDataV3 = rawDataV3Json as RawDataset;

function countWords(text: string) {
  return (text.match(/[A-Za-z']+/g) || []).length;
}

const combinedTests = [
  ...(rawDataV1.reading_comprehension_tests ?? []),
  ...(rawDataV2.reading_comprehension_tests ?? []),
  ...(rawDataV3.reading_comprehension_tests ?? []),
];

export const importedPassages: Passage[] = combinedTests.map((entry, index) => {
  const wordCount = countWords(entry.excerpt);
  const questionCount = entry.questions.length;
  const isLonger = wordCount >= 200 || questionCount >= 10;

  return {
    id: `imported-${entry.grade.toLowerCase()}-${index}`,
    gradeBand: gradeToBand(entry.grade),
    title: entry.metadata?.book_title ?? `Grade ${entry.grade} passage`,
    text: entry.excerpt,
    wordCount,
    questionCount,
    isLonger,
    questions: entry.questions.map((question) => {
      const letters = Object.keys(question.options)
        .filter((key): key is keyof typeof question.options => LETTER_ORDER.includes(key))
        .sort((a, b) => LETTER_ORDER.indexOf(a) - LETTER_ORDER.indexOf(b));
      const options = letters.map((letter) => question.options[letter]);
      const correctIndex = Math.max(0, letters.indexOf(question.correct_answer as keyof typeof question.options));
      return {
        question: question.question_text,
        options,
        correctIndex,
      };
    }),
  };
});
