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
  { gradeBand: 0, title: "Goodnight Moon", author: "Margaret Wise Brown", description: "A gentle bedtime story with simple, repetitive language perfect for beginning readers." },
  { gradeBand: 0, title: "Brown Bear, Brown Bear, What Do You See?", author: "Bill Martin Jr. & Eric Carle", description: "Repetitive text and bright illustrations help early readers recognize common words." },
  { gradeBand: 0, title: "The Very Hungry Caterpillar", author: "Eric Carle", description: "A story that combines counting, days of the week, and simple sentence patterns." },
  { gradeBand: 0, title: "Where's Spot?", author: "Eric Hill", description: "Interactive lift-the-flap storytelling with short, predictable text." },
  { gradeBand: 0, title: "Chicka Chicka Boom Boom", author: "Bill Martin Jr. & John Archambault", description: "A playful alphabet story with strong rhythm and repetition." },
  { gradeBand: 0, title: "Dear Zoo", author: "Rod Campbell", description: "Predictable animal names and repeated phrases make this a satisfying first-read experience." },
  { gradeBand: 0, title: "Go, Dog. Go!", author: "P.D. Eastman", description: "Simple verbs and bright visuals help new readers follow along easily." },
  { gradeBand: 0, title: "Hop on Pop", author: "Dr. Seuss", description: "Rhyming word pairs and short sentences support early phonics practice." },
  { gradeBand: 0, title: "The Snowy Day", author: "Ezra Jack Keats", description: "A quiet story with clear structure and familiar winter vocabulary." },
  { gradeBand: 0, title: "Little Blue Truck", author: "Alice Schertle", description: "Rhythm, repetition, and friendly animal characters keep reading light and fun." },
  { gradeBand: 1, title: "The Very Busy Spider", author: "Eric Carle", description: "Repeated phrases and simple narrative make this story accessible for first readers." },
  { gradeBand: 1, title: "Elephant & Piggie: I Am Invited to a Party!", author: "Mo Willems", description: "Short dialogue and humor help build confidence in early readers." },
  { gradeBand: 1, title: "Duck on a Bike", author: "David Shannon", description: "A simple, silly story with easy-to-follow action and vocabulary." },
  { gradeBand: 1, title: "Biscuit", author: "Alyssa Satin Capucilli", description: "A charming early reader with repeated words and gentle pacing." },
  { gradeBand: 1, title: "Frog and Toad Are Friends", author: "Arnold Lobel", description: "Short, humorous stories about friendship with a predictable sentence style." },
  { gradeBand: 1, title: "Amelia Bedelia", author: "Peggy Parish", description: "Playful wordplay and clear repetition make this a great chapter book transition." },
  { gradeBand: 1, title: "Henry and Mudge: The First Book", author: "Cynthia Rylant", description: "A gentle early chapter book about friendship and family routines." },
  { gradeBand: 1, title: "Pete the Cat: I Love My White Shoes", author: "Eric Litwin", description: "Catchy rhythm and repeated phrases build reading momentum." },
  { gradeBand: 1, title: "Olivia", author: "Ian Falconer", description: "Short, witty prose with strong visual cues aids comprehension." },
  { gradeBand: 1, title: "The Magic Tree House: Dinosaurs Before Dark", author: "Mary Pope Osborne", description: "A first chapter book with straightforward narrative and adventure." },
  { gradeBand: 2, title: "Amelia Bedelia Means Business", author: "Peggy Parish", description: "Simple misunderstandings and clear sentence patterns help new readers." },
  { gradeBand: 2, title: "Nate the Great", author: "Marjorie Weinman Sharmat", description: "A friendly mystery with manageable vocabulary and strong context clues." },
  { gradeBand: 2, title: "Junie B. Jones and the Stupid Smelly Bus", author: "Barbara Park", description: "Humor and expressive narration keep young readers engaged." },
  { gradeBand: 2, title: "Mr. Putter & Tabby Walk the Dog", author: "Cynthia Rylant", description: "Short chapters with kind humor and predictable language." },
  { gradeBand: 2, title: "Poppleton", author: "Cynthia Rylant", description: "A gentle chapter book series with clear, everyday language." },
  { gradeBand: 2, title: "Flat Stanley", author: "Jeff Brown", description: "A quirky premise with short paragraphs and straightforward vocabulary." },
  { gradeBand: 2, title: "Magic Tree House: The Knight at Dawn", author: "Mary Pope Osborne", description: "Action-driven chapters with simple sentences and clear pacing." },
  { gradeBand: 2, title: "Henry and Mudge and the Starry Night", author: "Cynthia Rylant", description: "Warm storytelling and accessible word choice make this a great read-aloud." },
  { gradeBand: 2, title: "The Boxcar Children", author: "Gertrude Chandler Warner", description: "A gentle mystery that uses familiar vocabulary and steady pacing." },
  { gradeBand: 2, title: "The Secrets of Droon: The Hidden Stairs and the Magic Carpet", author: "Tony Abbott", description: "A fantasy adventure with clear prose and manageable new words." },
  { gradeBand: 3, title: "Charlotte's Web", author: "E.B. White", description: "A classic story with thoughtful language and strong emotional themes." },
  { gradeBand: 3, title: "The One and Only Ivan", author: "Katherine Applegate", description: "An accessible novel with emotional depth and clear narrative voice." },
  { gradeBand: 3, title: "The Lemonade War", author: "Jacqueline Davies", description: "A fast-moving story about siblings, business, and problem solving." },
  { gradeBand: 3, title: "Frindle", author: "Andrew Clements", description: "Smart dialogue and school-based humor support comprehension." },
  { gradeBand: 3, title: "Ivy + Bean", author: "Annie Barrows", description: "A playful early chapter book with short chapters and lively characters." },
  { gradeBand: 3, title: "Ramona Quimby, Age 8", author: "Beverly Cleary", description: "Realistic school and family situations with clear, engaging prose." },
  { gradeBand: 3, title: "The Miraculous Journey of Edward Tulane", author: "Kate DiCamillo", description: "A short novel with beautiful imagery and accessible vocabulary." },
  { gradeBand: 3, title: "The Tale of Despereaux", author: "Kate DiCamillo", description: "A charming adventure with clear structure and imaginative language." },
  { gradeBand: 3, title: "Because of Winn-Dixie", author: "Kate DiCamillo", description: "Heartfelt storytelling with a warm voice and gentle pacing." },
  { gradeBand: 3, title: "The Boxcar Children: Surprise Island", author: "Gertrude Chandler Warner", description: "Simple mystery elements and steady, kid-friendly language." },
  { gradeBand: 4, title: "Wonder", author: "R.J. Palacio", description: "A character-driven story with accessible language and strong emotional impact." },
  { gradeBand: 4, title: "Bridge to Terabithia", author: "Katherine Paterson", description: "A moving novel with clear narrative and meaningful themes." },
  { gradeBand: 4, title: "The Secret Garden", author: "Frances Hodgson Burnett", description: "Classic English prose made approachable through magical storytelling." },
  { gradeBand: 4, title: "The Phantom Tollbooth", author: "Norton Juster", description: "Clever wordplay and imaginative scenes that stretch young readers gently." },
  { gradeBand: 4, title: "Esperanza Rising", author: "Pam Muñoz Ryan", description: "A compelling family story with accessible historical context." },
  { gradeBand: 4, title: "The Lightning Thief", author: "Rick Riordan", description: "An exciting modern myth adventure with simple, fast-paced chapters." },
  { gradeBand: 4, title: "Flora & Ulysses", author: "Kate DiCamillo", description: "Humorous, unusual characters and a strong narrative voice make this a fun read." },
  { gradeBand: 4, title: "The Lemonade Crime", author: "Jacqueline Davies", description: "A sequel that keeps the same easy-to-follow pacing and problem-solving energy." },
  { gradeBand: 4, title: "Holes", author: "Louis Sachar", description: "A layered story with accessible prose and smart humor for upper elementary readers." },
  { gradeBand: 4, title: "Because of Winn-Dixie", author: "Kate DiCamillo", description: "A warm and relatable chapter book that readers often enjoy again and again." },
  { gradeBand: 5, title: "Hatchet", author: "Gary Paulsen", description: "A survival story with clear, engaging descriptions and strong pacing." },
  { gradeBand: 5, title: "The Watsons Go to Birmingham", author: "Christopher Paul Curtis", description: "A historical novel told with humor and heart through a family's road trip." },
  { gradeBand: 5, title: "The Crossover", author: "Kwame Alexander", description: "Poetic, rhythmic text about basketball, family, and growing up." },
  { gradeBand: 5, title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", description: "A classic fantasy with accessible language and strong adventure elements." },
  { gradeBand: 5, title: "Wonder", author: "R.J. Palacio", description: "A powerful story about kindness with straightforward narrative and relatable characters." },
  { gradeBand: 5, title: "Esperanza Rising", author: "Pam Muñoz Ryan", description: "A moving story about resilience and change with clear, vivid writing." },
  { gradeBand: 5, title: "The Tale of Despereaux", author: "Kate DiCamillo", description: "An imaginative, character-rich story that is still easy to follow." },
  { gradeBand: 5, title: "Percy Jackson and the Olympians: The Lightning Thief", author: "Rick Riordan", description: "A modern myth adventure with a fast pace and accessible dialogue." },
  { gradeBand: 5, title: "Bridge to Terabithia", author: "Katherine Paterson", description: "A thoughtful, emotional story with clear, resonant prose." },
  { gradeBand: 5, title: "Holes", author: "Louis Sachar", description: "An inventive mystery with humor, suspense, and accessible complexity." },
  { gradeBand: 6, title: "The Giver", author: "Lois Lowry", description: "A thought-provoking novel that introduces more abstract themes in clear language." },
  { gradeBand: 6, title: "The Lightning Thief", author: "Rick Riordan", description: "A youthful adventure that blends myth with modern dialogue." },
  { gradeBand: 6, title: "Walk Two Moons", author: "Sharon Creech", description: "A layered story told through accessible first-person narration." },
  { gradeBand: 6, title: "The Watsons Go to Birmingham", author: "Christopher Paul Curtis", description: "A historical family story with compelling pacing and vivid scenes." },
  { gradeBand: 6, title: "Hatchet", author: "Gary Paulsen", description: "A gripping survival novel with direct, descriptive language." },
  { gradeBand: 6, title: "The City of Ember", author: "Jeanne DuPrau", description: "A science-fiction adventure that remains easy to follow and suspenseful." },
  { gradeBand: 6, title: "The False Prince", author: "Jennifer A. Nielsen", description: "A tense historical fantasy with clear political intrigue." },
  { gradeBand: 6, title: "The Graveyard Book", author: "Neil Gaiman", description: "A spooky, imaginative story told with crisp, engaging prose." },
  { gradeBand: 6, title: "The Book Thief", author: "Markus Zusak", description: "A richer middle-grade novel with evocative language and emotional depth." },
  { gradeBand: 6, title: "A Wrinkle in Time", author: "Madeleine L'Engle", description: "A science-fantasy adventure with thoughtful world-building and accessible ideas." },
  { gradeBand: 7, title: "The Outsiders", author: "S.E. Hinton", description: "A coming-of-age novel with realistic dialogue and strong thematic depth." },
  { gradeBand: 7, title: "A Wrinkle in Time", author: "Madeleine L'Engle", description: "A blend of science fiction and fantasy that encourages critical thinking." },
  { gradeBand: 7, title: "Number the Stars", author: "Lois Lowry", description: "A historical novel with clear language and powerful emotional resonance." },
  { gradeBand: 7, title: "The Maze Runner", author: "James Dashner", description: "A suspenseful dystopian adventure with fast pacing and concise sentences." },
  { gradeBand: 7, title: "The Hobbit", author: "J.R.R. Tolkien", description: "A classic fantasy quest with manageable chapters and vivid imagery." },
  { gradeBand: 7, title: "The Hunger Games", author: "Suzanne Collins", description: "A gripping dystopian story with strong pacing and relatable stakes." },
  { gradeBand: 7, title: "The House on Mango Street", author: "Sandra Cisneros", description: "Short vignettes and poetic language make this an accessible teen classic." },
  { gradeBand: 7, title: "Speak", author: "Laurie Halse Anderson", description: "A raw, voice-driven story with clear prose and important themes." },
  { gradeBand: 7, title: "The Giver", author: "Lois Lowry", description: "A thought-provoking novel that remains readable while exploring complex ideas." },
  { gradeBand: 7, title: "Monster", author: "Walter Dean Myers", description: "A courtroom drama told in direct, engaging language with emotional weight." },
  { gradeBand: 8, title: "The Hunger Games", author: "Suzanne Collins", description: "A fast-paced dystopian novel with strong action and accessible voice." },
  { gradeBand: 8, title: "The Book Thief", author: "Markus Zusak", description: "A moving historical novel with rich characters and mature themes." },
  { gradeBand: 8, title: "The Fault in Our Stars", author: "John Green", description: "A contemporary young adult story with vivid dialogue and emotional honesty." },
  { gradeBand: 8, title: "The Maze Runner", author: "James Dashner", description: "A tense, page-turning thriller with clear, direct language." },
  { gradeBand: 8, title: "Divergent", author: "Veronica Roth", description: "A dystopian adventure with strong world-building and accessible chapters." },
  { gradeBand: 8, title: "The Hobbit", author: "J.R.R. Tolkien", description: "A fantasy classic that remains approachable through episodic storytelling." },
  { gradeBand: 8, title: "Speak", author: "Laurie Halse Anderson", description: "A modern coming-of-age novel with strong voice and clear emotional beats." },
  { gradeBand: 8, title: "The Perks of Being a Wallflower", author: "Stephen Chbosky", description: "A diary-style novel with relatable teenage voice and honest reflections." },
  { gradeBand: 8, title: "The Curious Incident of the Dog in the Night-Time", author: "Mark Haddon", description: "A distinctive first-person narrative with clear logic and emotional depth." },
  { gradeBand: 8, title: "Lord of the Flies", author: "William Golding", description: "A classic novel with strong themes and accessible structure for advanced middle school readers." },
  { gradeBand: 9, title: "The Catcher in the Rye", author: "J.D. Salinger", description: "A classic teen novel with strong voice and relatable adolescent concerns." },
  { gradeBand: 9, title: "To Kill a Mockingbird", author: "Harper Lee", description: "A powerful novel with historical context and vivid, accessible characters." },
  { gradeBand: 9, title: "The Hunger Games", author: "Suzanne Collins", description: "A high-interest novel with fast pacing and strong plot momentum." },
  { gradeBand: 9, title: "The Book Thief", author: "Markus Zusak", description: "A literary historical read with rich imagery and emotionally resonant storytelling." },
  { gradeBand: 9, title: "The Fault in Our Stars", author: "John Green", description: "A contemporary love story with introspective, relatable voice." },
  { gradeBand: 9, title: "Speak", author: "Laurie Halse Anderson", description: "A short, powerful novel about voice and personal growth." },
  { gradeBand: 9, title: "The Perks of Being a Wallflower", author: "Stephen Chbosky", description: "A modern epistolary novel with strong teenage perspective." },
  { gradeBand: 9, title: "The Hate U Give", author: "Angie Thomas", description: "A current young adult novel with impactful themes and engaging dialogue." },
  { gradeBand: 9, title: "Fahrenheit 451", author: "Ray Bradbury", description: "A dystopian classic with clear, urgent prose and strong ideas." },
  { gradeBand: 9, title: "A Separate Peace", author: "John Knowles", description: "A coming-of-age novel that balances thoughtful writing with dramatic conflict." },
  { gradeBand: 10, title: "1984", author: "George Orwell", description: "A classic dystopian novel with clear, direct language and powerful ideas." },
  { gradeBand: 10, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A literary classic with rich themes and concise, elegant prose." },
  { gradeBand: 10, title: "The Catcher in the Rye", author: "J.D. Salinger", description: "A character-driven novel with a strong teenage voice and memorable scenes." },
  { gradeBand: 10, title: "A Separate Peace", author: "John Knowles", description: "A thoughtful, compact novel about friendship, rivalry, and identity." },
  { gradeBand: 10, title: "The Kite Runner", author: "Khaled Hosseini", description: "A powerful coming-of-age story told with clear, moving prose." },
  { gradeBand: 10, title: "Fahrenheit 451", author: "Ray Bradbury", description: "A classic read about books, censorship, and the power of ideas." },
  { gradeBand: 10, title: "The Perks of Being a Wallflower", author: "Stephen Chbosky", description: "A modern high school story with authentic voice and emotional honesty." },
  { gradeBand: 10, title: "Speak", author: "Laurie Halse Anderson", description: "A brief but impactful novel about finding your voice in difficult circumstances." },
  { gradeBand: 10, title: "The Book Thief", author: "Markus Zusak", description: "A complex historical novel with vivid imagery and mature themes." },
  { gradeBand: 10, title: "The Outsiders", author: "S.E. Hinton", description: "A classic young adult novel with strong conflict and clear, emotional writing." },
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
  const roundedLevel = Math.round(result.estimatedGradeLevel);

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
      title: "Bob Books, Set 1: Beginning Readers",
      reason: "Very short, highly predictable stories that help improve accuracy and confidence when reading aloud.",
      category: "skill",
    });
  }

  const level = Math.min(10, Math.max(0, roundedLevel));
  const enjoymentLevel = result.comprehensionRating === "Needs Practice" ? Math.max(0, level - 1) : level;
  const gradeBooks = getBooksForGradeBand(enjoymentLevel).slice(0, 2);

  if (gradeBooks.length > 0) {
    const reason =
      result.comprehensionRating === "Needs Practice"
        ? "A comfortable, confidence-building story at an easier level while reading skills strengthen."
        : result.comprehensionRating === "Developing"
        ? "A level-appropriate title with clear language and a strong story to support continued growth."
        : "A rewarding title for readers who are ready to deepen comprehension with strong pacing and themes.";

    for (const book of gradeBooks) {
      suggestions.push({
        title: `${book.title} (${book.author})`,
        reason,
        category: "enjoyment",
      });
    }
  } else if (result.comprehensionRating === "Needs Practice") {
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
