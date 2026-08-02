// Approximate silent-reading WPM benchmarks by grade band.
// Based on commonly cited oral/silent reading fluency norm ranges (e.g. Hasbrouck & Tindal),
// simplified here for a self-check estimate — not a clinical diagnostic tool.
const WPM_NORMS: Record<number, { low: number; high: number }> = {
  2: { low: 60, high: 100 },
  4: { low: 100, high: 140 },
  6: { low: 140, high: 170 },
  8: { low: 150, high: 180 },
  10: { low: 160, high: 195 },
};

export interface AssessmentResult {
  gradeBand: number;
  wpm: number;
  accuracyPercent: number;
  fluencyRating: "Below" | "At" | "Above";
  comprehensionRating: "Needs Practice" | "Developing" | "Proficient" | "Advanced";
  estimatedGradeLevel: number;
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
};

export function scoreAssessment(
  gradeBand: number,
  wordCount: number,
  timeSeconds: number,
  correctAnswers: number,
  totalQuestions: number
): AssessmentResult {
  const minutes = Math.max(timeSeconds / 60, 0.1);
  const wpm = Math.round(wordCount / minutes);
  const accuracyPercent = Math.round((correctAnswers / totalQuestions) * 100);

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

  // Adjust the estimated grade level based on how performance compares to
  // the benchmark passage's own grade band.
  let adjustment = 0;
  if (accuracyPercent >= 85 && fluencyRating !== "Below") adjustment += 1;
  if (accuracyPercent < 50) adjustment -= 1;
  if (fluencyRating === "Below" && accuracyPercent < 75) adjustment -= 0.5;
  if (fluencyRating === "Above" && accuracyPercent >= 75) adjustment += 0.5;

  const estimatedGradeLevel = Math.max(1, gradeBand + adjustment);

  let recommendation = "";
  if (accuracyPercent >= 85 && fluencyRating !== "Below") {
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
    estimatedGradeLevel: Math.round(estimatedGradeLevel * 10) / 10,
    recommendation,
  };
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

export function getBookSuggestions(
  gradeBand: number,
  result: AssessmentResult
): BookSuggestion[] {
  const recommendations: BookSuggestion[] = [];
  const level = Math.round(result.estimatedGradeLevel);

  if (result.comprehensionRating === "Needs Practice") {
    recommendations.push({
      title: "Charlotte's Web",
      reason: "Short chapters and clear story structure are great for building confidence.",
    });
  } else if (result.comprehensionRating === "Developing") {
    recommendations.push({
      title: "The One and Only Ivan",
      reason: "A compelling story with accessible vocabulary that supports stronger reading habits.",
    });
  } else {
    recommendations.push({
      title: "Wonder",
      reason: "Rich characterization with thoughtful pacing, ideal for readers ready to deepen comprehension.",
    });
  }

  if (result.fluencyRating === "Below") {
    recommendations.unshift({
      title: "Magic Tree House: Dinosaurs Before Dark",
      reason: "Short sentences and familiar words can help improve reading speed without extra frustration.",
    });
  }

  if (level >= 8) {
    recommendations.push({
      title: "The Giver",
      reason: "A step up in complexity with strong themes and vocabulary development.",
    });
  }

  return recommendations;
}
