import { Passage } from "./passages";
import rawData from "./reading_comprehension_tests_v2.json";

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

const raw = rawData as RawDataset;

export const importedPassages: Passage[] = raw.reading_comprehension_tests.map((entry, index) => {
  return {
    id: `imported-${entry.grade.toLowerCase()}-${index}`,
    gradeBand: gradeToBand(entry.grade),
    title: entry.metadata?.book_title ?? `Grade ${entry.grade} passage`,
    text: entry.excerpt,
    questions: entry.questions.map((question) => {
      const letters = Object.keys(question.options)
        .filter((key) => LETTER_ORDER.includes(key))
        .sort((a, b) => LETTER_ORDER.indexOf(a) - LETTER_ORDER.indexOf(b));
      const options = letters.map((letter) => question.options[letter]);
      const correctIndex = Math.max(0, letters.indexOf(question.correct_answer));
      return {
        question: question.question_text,
        options,
        correctIndex,
      };
    }),
  };
});
