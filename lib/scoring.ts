// Approximate silent-reading WPM benchmarks by grade band.
// Based on commonly cited oral/silent reading fluency norm ranges (e.g. Hasbrouck & Tindal),
// simplified here for a self-check estimate — not a clinical diagnostic tool.
const WPM_NORMS: Record<number, { low: number; high: number }> = {
  0: { low: 15, high: 40 },
  1: { low: 30, high: 65 },
  2: { low: 60, high: 100 },
  3: { low: 75, high: 115 },
  4: { low: 100, high: 140 },
  5: { low: 110, high: 150 },
  6: { low: 140, high: 170 },
  7: { low: 150, high: 180 },
  8: { low: 150, high: 180 },
  9: { low: 155, high: 190 },
  10: { low: 160, high: 195 },
};

// Approximate mapping from estimated grade level to a Fountas & Pinnell /
// "A-Z" style guided reading level. These correlations are commonly
// published (e.g. Scholastic's grade-to-guided-reading-level charts) but
// vary by publisher — treat this as a rough equivalent, not an official score.
const AZ_TABLE: { maxGrade: number; level: string }[] = [
  { maxGrade: 0.4, level: "A" },
  { maxGrade: 0.6, level: "B" },
  { maxGrade: 0.8, level: "C" },
  { maxGrade: 1.0, level: "D" },
  { maxGrade: 1.2, level: "E" },
  { maxGrade: 1.4, level: "F" },
  { maxGrade: 1.6, level: "G" },
  { maxGrade: 1.8, level: "H" },
  { maxGrade: 2.0, level: "I" },
  { maxGrade: 2.3, level: "J" },
  { maxGrade: 2.6, level: "K" },
  { maxGrade: 2.9, level: "L" },
  { maxGrade: 3.2, level: "M" },
  { maxGrade: 3.5, level: "N" },
  { maxGrade: 3.8, level: "O" },
  { maxGrade: 4.0, level: "P" },
  { maxGrade: 4.3, level: "Q" },
  { maxGrade: 4.6, level: "R" },
  { maxGrade: 4.9, level: "S" },
  { maxGrade: 5.2, level: "T" },
  { maxGrade: 5.5, level: "U" },
  { maxGrade: 5.9, level: "V" },
  { maxGrade: 6.3, level: "W" },
  { maxGrade: 6.9, level: "X" },
  { maxGrade: 7.9, level: "Y" },
  { maxGrade: 8.9, level: "Z" },
  { maxGrade: 9.9, level: "Z1" },
  { maxGrade: 10.9, level: "Z2" },
  { maxGrade: Infinity, level: "Z3+" },
];

// Approximate midpoint Lexile measures by whole grade level, drawn from
// commonly published MetaMetrics grade-band charts. Real Lexile measures
// come from a proprietary text/reader analysis — this is a coarse,
// grade-based approximation only.
const LEXILE_BY_GRADE: Record<number, number> = {
  1: 360,
  2: 535,
  3: 670,
  4: 840,
  5: 920,
  6: 1000,
  7: 1045,
  8: 1100,
  9: 1150,
  10: 1195,
  11: 1230,
  12: 1260,
};

export interface AssessmentResult {
  gradeBand: number;
  wpm: number;
  accuracyPercent: number;
  fluencyRating: "Below" | "At" | "Above";
  comprehensionRating: "Needs Practice" | "Developing" | "Proficient" | "Advanced";
  wordReadingAccuracyPercent: number;
  decodingRating: "Needs Practice" | "Developing" | "Proficient" | "Advanced";
  missedWordCount: number;
  totalWordCount: number;
  missedWords: string[];
  estimatedGradeLevel: number;
  guidedReadingLevel: string;
  lexileDisplay: string;
  recommendation: string;
}

export interface WordInfo {
  text: string;
  type: "word" | "separator";
  difficulty: "common" | "challenge";
}

export type BookSuggestion = {
  title: string;
  reason: string;
  category: "skill" | "enjoyment";
};

export interface GradeLevelBook {
  title: string;
  author: string;
  description: string;
  gradeBand: number;
}

export type SkillTag =
  | "sightWords"
  | "multisyllabic"
  | "silentE"
  | "vowelTeams"
  | "blendsDigraphs"
  | "other";

export function scoreAssessment(
  gradeBand: number,
  wordCount: number,
  timeSeconds: number,
  correctAnswers: number,
  totalQuestions: number,
  missedWords: string[] = [],
  totalWordsRead: number = wordCount
): AssessmentResult {
  const minutes = Math.max(timeSeconds / 60, 0.1);
  const wpm = Math.round(wordCount / minutes);
  const accuracyPercent = Math.round((correctAnswers / totalQuestions) * 100);

  const missedWordCount = missedWords.length;
  const totalWordCount = Math.max(totalWordsRead, 1);
  const wordReadingAccuracyPercent = Math.max(
    0,
    Math.round(((totalWordCount - missedWordCount) / totalWordCount) * 1000) / 10
  );

  const norms = WPM_NORMS[gradeBand] ?? { low: 100, high: 150 };
  let fluencyRating: AssessmentResult["fluencyRating"];
  if (wpm < norms.low) fluencyRating = "Below";
  else if (wpm > norms.high) fluencyRating = "Above";
  else fluencyRating = "At";

  let comprehensionRating: AssessmentResult["comprehensionRating"];
  if (accuracyPercent < 50) comprehensionRating = "Needs Practice";
  else if (accuracyPercent < 75) comprehensionRating = "Developing";
  else if (accuracyPercent < 100) comprehensionRating = "Proficient";
  else comprehensionRating = "Advanced";

  let decodingRating: AssessmentResult["decodingRating"];
  if (wordReadingAccuracyPercent < 90) decodingRating = "Needs Practice";
  else if (wordReadingAccuracyPercent < 95) decodingRating = "Developing";
  else if (wordReadingAccuracyPercent < 99) decodingRating = "Proficient";
  else decodingRating = "Advanced";

  // Adjust the estimated grade level based on how performance compares to
  // the benchmark passage's own grade band.
  let adjustment = 0;
  if (accuracyPercent >= 85 && fluencyRating !== "Below") adjustment += 1;
  if (accuracyPercent < 50) adjustment -= 1;
  if (fluencyRating === "Below" && accuracyPercent < 75) adjustment -= 0.5;
  if (fluencyRating === "Above" && accuracyPercent >= 75) adjustment += 0.5;

  // Factor word-level reading accuracy (words marked incorrect during
  // the read-aloud) into the estimate as well.
  if (wordReadingAccuracyPercent < 90) adjustment -= 1;
  else if (wordReadingAccuracyPercent < 95) adjustment -= 0.5;
  else if (wordReadingAccuracyPercent >= 99) adjustment += 0.25;

  const estimatedGradeLevel = Math.max(1, gradeBand + adjustment);
  const roundedGrade = Math.round(estimatedGradeLevel * 10) / 10;

  let recommendation = "";
  if (wordReadingAccuracyPercent < 90) {
    recommendation = `A number of words were marked as misread during this passage, which suggests decoding practice at an easier level would help before moving up. Consider a passage at a lower grade band.`;
  } else if (accuracyPercent >= 85 && fluencyRating !== "Below") {
    recommendation = `Strong performance at this level. Consider trying a passage at a higher grade band to find the top of the comfortable range.`;
  } else if (accuracyPercent < 50 || fluencyRating === "Below") {
    recommendation = `This passage may have been more challenging than ideal. Consider trying a passage at a lower grade band for a better fit.`;
  } else {
    recommendation = `This passage appears to be a solid fit — comprehension and reading speed are both in a typical range for this grade band.`;
  }

  return {
    gradeBand,
    wpm,
    accuracyPercent,
    fluencyRating,
    comprehensionRating,
    wordReadingAccuracyPercent,
    decodingRating,
    missedWordCount,
    totalWordCount,
    missedWords: dedupeWords(missedWords),
    estimatedGradeLevel: roundedGrade,
    guidedReadingLevel: estimateGuidedReadingLevel(roundedGrade),
    lexileDisplay: estimateLexile(roundedGrade),
    recommendation,
  };
}

function dedupeWords(words: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const w of words) {
    const key = w.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(w);
    }
  }
  return out;
}

export function estimateGuidedReadingLevel(grade: number): string {
  for (const row of AZ_TABLE) {
    if (grade <= row.maxGrade) return row.level;
  }
  return "Z3+";
}

export function estimateLexile(grade: number): string {
  if (grade < 1) return "BR (Beginning Reader)";
  const clamped = Math.min(Math.max(grade, 1), 12);
  const lower = Math.floor(clamped);
  const upper = Math.ceil(clamped);
  if (lower === upper) {
    return `${LEXILE_BY_GRADE[lower]}L`;
  }
  const frac = clamped - lower;
  const val = Math.round(
    LEXILE_BY_GRADE[lower] + (LEXILE_BY_GRADE[upper] - LEXILE_BY_GRADE[lower]) * frac
  );
  return `${val}L`;
}

const GRADE_LEVEL_BOOKS: GradeLevelBook[] = [
  {
    gradeBand: 0,
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    description: "A gentle bedtime story with simple, repetitive language perfect for beginning readers.",
  },
  {
    gradeBand: 1,
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    description: "A playful counting and reading experience with bright, engaging illustrations.",
  },
  {
    gradeBand: 2,
    title: "Frog and Toad Are Friends",
    author: "Arnold Lobel",
    description: "Short stories about friendship and everyday adventures with simple vocabulary.",
  },
  {
    gradeBand: 3,
    title: "Junie B. Jones and the Stupid Smelly Bus",
    author: "Barbara Park",
    description: "A humorous early chapter book that keeps young readers engaged with lively narration.",
  },
  {
    gradeBand: 4,
    title: "The Lemonade War",
    author: "Jacqueline Davies",
    description: "A gripping story about sibling rivalry, money, and strategy for upper elementary readers.",
  },
  {
    gradeBand: 5,
    title: "Because of Winn-Dixie",
    author: "Kate DiCamillo",
    description: "A warm story about family, friendship, and community with accessible yet rich language.",
  },
  {
    gradeBand: 6,
    title: "Holes",
    author: "Louis Sachar",
    description: "A clever mystery with layered plot and relatable characters for middle-grade readers.",
  },
  {
    gradeBand: 7,
    title: "The Giver",
    author: "Lois Lowry",
    description: "A thoughtful dystopian novel that introduces more complex themes and vocabulary.",
  },
  {
    gradeBand: 8,
    title: "The Outsiders",
    author: "S.E. Hinton",
    description: "A coming-of-age story with strong characters and real-world emotional themes.",
  },
  {
    gradeBand: 9,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description: "A fast-paced young adult novel that blends action, character growth, and moral conflict.",
  },
  {
    gradeBand: 10,
    title: "The Book Thief",
    author: "Markus Zusak",
    description: "A literary historical novel with evocative language and mature themes suitable for advanced readers.",
  },
];

export function getBooksForGradeBand(gradeBand: number): GradeLevelBook[] {
  return GRADE_LEVEL_BOOKS.filter((book) => book.gradeBand === gradeBand);
}

export function wordCountOf(text: string): number {
  return (text.match(/[A-Za-z']+/g) || []).length;
}

const COMMON_WORDS = new Set([
  "the", "and", "a", "to", "in", "is", "it", "you", "of", "for", "that", "on", "with", "as", "are", "was", "at", "by", "an", "be", "this", "or", "have", "from", "one", "had", "not", "but", "his", "her", "they", "which", "we", "can", "all", "their", "been", "were", "there", "when", "who", "what", "so", "if", "will", "about", "then", "more", "would", "them"
]);

export function analyzePassageWords(text: string): WordInfo[] {
  const tokens = text.split(/(\s+|[.,!?;:"“”‘’\-()]+)/);
  return tokens.filter(Boolean).map((token) => {
    const normalized = token.toLowerCase().replace(/[^a-z']/g, "");
    const isWord = !!normalized;
    const difficulty = isWord && !COMMON_WORDS.has(normalized) && normalized.length >= 6 ? "challenge" : "common";
    return {
      text: token,
      type: isWord ? "word" : "separator",
      difficulty,
    };
  });
}

// Simple heuristic tagging of a missed word into a likely skill area.
// This is NOT a real phonics/linguistics engine — it's a lightweight
// pattern match meant to point a parent/teacher toward a general focus
// area, not to diagnose a specific decoding issue.
const VOWEL_TEAM_PATTERN = /(ea|ee|ai|ay|oa|oe|oo|ue|ui|ow|ou|augh|ough|eigh|igh)/i;
const SILENT_E_PATTERN = /[a-z][aeiou][b-df-hj-np-tv-z]e$/i;
const BLEND_DIGRAPH_PATTERN = /^(th|ch|sh|wh|ph|bl|cl|fl|gl|pl|sl|br|cr|dr|fr|gr|pr|tr|sc|sk|sm|sn|sp|st|sw|tw|scr|spl|spr|str|squ)/i;

export function tagWordSkill(word: string): SkillTag {
  const normalized = word.toLowerCase().replace(/[^a-z']/g, "");
  if (!normalized) return "other";
  if (COMMON_WORDS.has(normalized)) return "sightWords";
  if (normalized.length >= 8) return "multisyllabic";
  if (SILENT_E_PATTERN.test(normalized)) return "silentE";
  if (VOWEL_TEAM_PATTERN.test(normalized)) return "vowelTeams";
  if (BLEND_DIGRAPH_PATTERN.test(normalized)) return "blendsDigraphs";
  return "other";
}

export function analyzeMissedWordSkills(missedWords: string[]): { tag: SkillTag; count: number }[] {
  const counts: Record<SkillTag, number> = {
    sightWords: 0,
    multisyllabic: 0,
    silentE: 0,
    vowelTeams: 0,
    blendsDigraphs: 0,
    other: 0,
  };
  for (const w of missedWords) {
    counts[tagWordSkill(w)] += 1;
  }
  return (Object.keys(counts) as SkillTag[])
    .map((tag) => ({ tag, count: counts[tag] }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count);
}

const SKILL_LABELS: Record<SkillTag, string> = {
  sightWords: "high-frequency sight words",
  multisyllabic: "longer, multisyllabic words",
  silentE: "silent-e / long vowel patterns",
  vowelTeams: "vowel team patterns (like ea, oa, igh)",
  blendsDigraphs: "consonant blends and digraphs (like bl, ch, str)",
  other: "general decoding",
};

const SKILL_BOOK_MAP: Record<SkillTag, BookSuggestion> = {
  sightWords: {
    title: "Elephant & Piggie series (Mo Willems)",
    reason: "Heavy repetition of common high-frequency words in short, funny dialogue builds sight-word automaticity.",
    category: "skill",
  },
  multisyllabic: {
    title: "Nate the Great series",
    reason: "Simple sentence structure with a gradual step up in longer words helps build confidence with multisyllabic words.",
    category: "skill",
  },
  silentE: {
    title: "Bob Books, Set 3 (Word Families)",
    reason: "Targeted short readers that isolate long-vowel/silent-e patterns for focused practice.",
    category: "skill",
  },
  vowelTeams: {
    title: "Fly Guy series (Tedd Arnold)",
    reason: "Playful, high-interest stories with lots of repeated vowel-team words in context.",
    category: "skill",
  },
  blendsDigraphs: {
    title: "Frog and Toad Are Friends",
    reason: "Clear, uncluttered sentences with frequent blends and digraphs make a good low-pressure practice text.",
    category: "skill",
  },
  other: {
    title: "Magic Tree House series",
    reason: "Approachable vocabulary and short chapters give steady, low-frustration reading practice.",
    category: "skill",
  },
};

export function getBookSuggestions(
  gradeBand: number,
  result: AssessmentResult
): BookSuggestion[] {
  const suggestions: BookSuggestion[] = [];
  const level = Math.round(result.estimatedGradeLevel);

  // Skill-building suggestion(s) based on the words marked incorrect.
  const skillBreakdown = analyzeMissedWordSkills(result.missedWords);
  const topSkills = skillBreakdown.slice(0, 2);
  for (const { tag } of topSkills) {
    const suggestion = SKILL_BOOK_MAP[tag];
    if (suggestion && !suggestions.some((s) => s.title === suggestion.title)) {
      suggestions.push(suggestion);
    }
  }

  // Fluency-focused fallback if decoding/fluency was the main issue and no
  // specific skill pattern stood out.
  if (result.fluencyRating === "Below" && topSkills.length === 0) {
    suggestions.push({
      title: "Magic Tree House: Dinosaurs Before Dark",
      reason: "Short sentences and familiar words can help improve reading speed without extra frustration.",
      category: "skill",
    });
  }

  // Enjoyment suggestions at the child's estimated comfort level.
  if (result.comprehensionRating === "Needs Practice") {
    suggestions.push({
      title: "Charlotte's Web",
      reason: "Short chapters and clear story structure are great for building confidence.",
      category: "enjoyment",
    });
  } else if (result.comprehensionRating === "Developing") {
    suggestions.push({
      title: "The One and Only Ivan",
      reason: "A compelling story with accessible vocabulary that supports stronger reading habits.",
      category: "enjoyment",
    });
  } else {
    suggestions.push({
      title: "Wonder",
      reason: "Rich characterization with thoughtful pacing, ideal for readers ready to deepen comprehension.",
      category: "enjoyment",
    });
  }

  if (level >= 8) {
    suggestions.push({
      title: "The Giver",
      reason: "A step up in complexity with strong themes and vocabulary development.",
      category: "enjoyment",
    });
  }

  return suggestions;
}
