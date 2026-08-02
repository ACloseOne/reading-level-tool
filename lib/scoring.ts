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
