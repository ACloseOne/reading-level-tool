export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Passage {
  id: string;
  gradeBand: number; // target grade level
  title: string;
  text: string;
  questions: Question[];
}

// All passages are original content written for this tool.
export const passages: Passage[] = [
  {
    id: "level-k",
    gradeBand: 0,
    title: "The Busy Ant",
    text: `An ant walked to the picnic blanket. The ant saw a crumb of bread. The ant picked it up and marched home.

The ant took the bread to the ant hill. The ant shared the crumb with friends. Everyone was happy.`,
    questions: [
      {
        question: "What did the ant find?",
        options: ["A leaf", "A crumb", "A toy", "A flower"],
        correctIndex: 1,
      },
      {
        question: "Where did the ant take the bread?",
        options: ["The hill", "The tree", "The pond", "The store"],
        correctIndex: 0,
      },
      {
        question: "Was the ant happy or sad?",
        options: ["Happy", "Sad", "Angry", "Tired"],
        correctIndex: 0,
      },
      {
        question: "Who shared the crumb?",
        options: ["The ant", "The bird", "The cat", "The dog"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-1",
    gradeBand: 1,
    title: "A Rainy Day",
    text: `Lily put on her yellow rain boots. She opened her red umbrella and stepped outside.

Rain pattered on the street. Lily jumped in puddles. She laughed as the water splashed.

At home, Lily drank warm cocoa. She wrote a rainy-day drawing for her mom.`,
    questions: [
      {
        question: "What color were Lily's boots?",
        options: ["Blue", "Green", "Yellow", "Black"],
        correctIndex: 2,
      },
      {
        question: "What did Lily do in the rain?",
        options: ["Ride a bike", "Jump in puddles", "Fly a kite", "Build a snowman"],
        correctIndex: 1,
      },
      {
        question: "What did Lily drink at home?",
        options: ["Water", "Lemonade", "Warm cocoa", "Milk"],
        correctIndex: 2,
      },
      {
        question: "Why did Lily use an umbrella?",
        options: ["Because it was sunny", "Because it was rainy", "Because it was windy", "Because it was snowy"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-2",
    gradeBand: 2,
    title: "The Lost Kite",
    text: `Sam had a red kite. He liked to fly it in the park. One windy day, Sam ran fast with his kite. The wind picked it up high into the sky.

Then the string snapped! The kite flew away over the trees. Sam felt sad. He did not know where it went.

Sam's dog, Biscuit, saw the kite fall behind a big oak tree. Biscuit ran to get it. He picked up the kite in his mouth and brought it back to Sam.

Sam was so happy. He gave Biscuit a big hug. "You are the best dog ever!" Sam said. They went home together, and Sam fixed the string that night.`,
    questions: [
      {
        question: "What color was Sam's kite?",
        options: ["Blue", "Red", "Green", "Yellow"],
        correctIndex: 1,
      },
      {
        question: "Why did the kite fly away?",
        options: [
          "Sam let it go on purpose",
          "The string snapped",
          "A bird took it",
          "It started raining",
        ],
        correctIndex: 1,
      },
      {
        question: "Who found the kite?",
        options: ["Sam", "A neighbor", "Biscuit the dog", "Sam's mom"],
        correctIndex: 2,
      },
      {
        question: "What did Sam do after getting the kite back?",
        options: [
          "Threw it away",
          "Gave Biscuit a hug",
          "Cried",
          "Bought a new kite",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-3",
    gradeBand: 3,
    title: "The Science Fair",
    text: `Marcus entered the gym carrying his model volcano. The school science fair had tables filled with projects. Some students showed solar ovens, others explained how plants grow.

Marcus's volcano bubbled red foam when he poured vinegar inside. Judges asked him why the foam was hot and asked what the liquid represented.

Marcus was proud when his teacher said he had a strong explanation. He smiled and waved to his parents in the audience.`,
    questions: [
      {
        question: "What did Marcus bring to the science fair?",
        options: ["A robot", "A model volcano", "A weather chart", "A plant"],
        correctIndex: 1,
      },
      {
        question: "What did the judges ask Marcus?",
        options: ["How old he was", "Why the foam was hot", "What his favorite color was", "Where he lives"],
        correctIndex: 1,
      },
      {
        question: "What did some students show at the fair?",
        options: ["Solar ovens", "Pirate ships", "Space rockets", "Magical spells"],
        correctIndex: 0,
      },
      {
        question: "How did Marcus feel at the end?",
        options: ["Sad", "Tired", "Proud", "Sleepy"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "level-4",
    gradeBand: 4,
    title: "The Community Garden",
    text: `Every spring, the families on Maple Street planted a community garden. Each family had a small plot of land where they could grow vegetables or flowers. Mrs. Chen grew tomatoes, while the Rodriguez family planted rows of colorful peppers.

This year, a long dry spell threatened the garden. Without rain, the plants began to wilt. The neighbors realized they needed a plan. They decided to take turns watering the garden every evening, using water saved in barrels from earlier rains.

The plan worked well. Within two weeks, the vegetables were growing strong again. At the end of summer, the neighbors held a potluck dinner using vegetables from the garden. Everyone agreed that working together had saved their garden, and they promised to keep the tradition going every year.`,
    questions: [
      {
        question: "What problem did the garden face this year?",
        options: [
          "Too many bugs",
          "A dry spell with little rain",
          "Animals eating the plants",
          "Not enough space",
        ],
        correctIndex: 1,
      },
      {
        question: "How did the neighbors solve the problem?",
        options: [
          "They bought new plants",
          "They gave up on the garden",
          "They took turns watering with saved rainwater",
          "They moved the garden indoors",
        ],
        correctIndex: 2,
      },
      {
        question: "What did the neighbors do at the end of summer?",
        options: [
          "Sold their vegetables",
          "Held a potluck dinner",
          "Planted a new garden",
          "Built a fence",
        ],
        correctIndex: 1,
      },
      {
        question: "What is the main idea of this passage?",
        options: [
          "Gardening is too difficult without rain",
          "Working together helped the community solve a problem",
          "Tomatoes grow better than peppers",
          "Potlucks are more fun than gardening",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-5",
    gradeBand: 5,
    title: "The Secret Garden Club",
    text: `A group of classmates formed the Secret Garden Club after school. They cleared out a small plot behind the library and planted vegetables, herbs, and flowers.

Every week they met to pull weeds, water the soil, and plant seeds. When the plants grew tall, the club shared fresh lettuce and basil with the cafeteria cooks.

The club learned that gardening takes patience and teamwork. They also enjoyed watching butterflies and bees visit the bright blossoms.`,
    questions: [
      {
        question: "Where did the Secret Garden Club plant their garden?",
        options: ["In a park", "Behind the library", "On the roof", "In a classroom"],
        correctIndex: 1,
      },
      {
        question: "What did the club share with the cafeteria?",
        options: ["Cookies", "Fresh lettuce and basil", "Paintings", "Books"],
        correctIndex: 1,
      },
      {
        question: "What did the club learn about gardening?",
        options: ["It is easy and quick", "It takes patience and teamwork", "It costs a lot of money", "It only works indoors"],
        correctIndex: 1,
      },
      {
        question: "Which creatures visited the garden?",
        options: ["Monkeys and lions", "Butterflies and bees", "Fish and frogs", "Bats and owls"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-6",
    gradeBand: 6,
    title: "Migration of the Monarch Butterfly",
    text: `Each autumn, millions of monarch butterflies begin one of the most remarkable journeys in the natural world. These delicate insects travel thousands of miles from the United States and Canada to the mountain forests of central Mexico, where they spend the winter clustered together on fir trees.

What makes this migration especially fascinating is that no single butterfly completes the entire round trip. The monarchs that fly south in the fall are not the same individuals that fly north again in spring. Instead, it takes three or four generations to complete the full migratory cycle, with each generation living only a few weeks except for the "super generation" that makes the long journey south and survives through the winter months.

Scientists still do not fully understand how monarchs navigate such vast distances with such precision, often returning to the very same forests their ancestors used. Researchers believe a combination of the sun's position and an internal magnetic compass helps guide them, but many mysteries about this incredible journey remain unsolved.`,
    questions: [
      {
        question: "Where do monarch butterflies spend the winter?",
        options: [
          "Fir forests in central Mexico",
          "The plains of Texas",
          "Coastal California",
          "Northern Canada",
        ],
        correctIndex: 0,
      },
      {
        question: "What is unusual about the monarch migration compared to other animals?",
        options: [
          "Monarchs migrate alone",
          "No single butterfly completes the whole round trip",
          "Monarchs only migrate once every ten years",
          "Monarchs migrate underwater",
        ],
        correctIndex: 1,
      },
      {
        question: "What do scientists believe helps monarchs navigate?",
        options: [
          "GPS satellites",
          "Following other migrating birds",
          "The sun's position and an internal magnetic compass",
          "Scent trails left by earlier generations",
        ],
        correctIndex: 2,
      },
      {
        question: "According to the passage, how is the migration cycle completed?",
        options: [
          "By a single long-lived butterfly",
          "Over three or four generations",
          "By butterflies born only in Mexico",
          "Through a process scientists fully understand",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-7",
    gradeBand: 7,
    title: "Saving the River",
    text: `The river near Eastwood had once been clear enough for children to spot fish. Over time, run-off from roads and nearby farms left the water cloudy and the riverbanks littered with trash.

A group of students decided to act. They organized a clean-up day, planted native grasses along the bank, and asked drivers to reduce oil leaks. They also tested the water and shared their results with the town council.

By the end of the year, the river was healthier, more plants were growing along the shore, and families could once again enjoy the walking path without seeing garbage in the water.`,
    questions: [
      {
        question: "What caused the river to become cloudy?",
        options: ["Mountain storms", "Run-off from roads and farms", "Too much sunlight", "Falling leaves"],
        correctIndex: 1,
      },
      {
        question: "What did the students do first?",
        options: ["Built a bridge", "Organized a clean-up day", "Moved to another town", "Started a garden"],
        correctIndex: 1,
      },
      {
        question: "Who received the water test results?",
        options: ["The school principal", "The town council", "The mayor's family", "A sports team"],
        correctIndex: 1,
      },
      {
        question: "What was one result by the end of the year?",
        options: ["The river disappeared", "The walking path was closed", "The water was healthier", "The trash doubled"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "level-8",
    gradeBand: 8,
    title: "The Rise of Renewable Energy",
    text: `Over the past two decades, renewable energy sources such as solar and wind power have transformed from niche technologies into major contributors to the global energy supply. This shift has been driven by a combination of falling costs, technological innovation, and growing concern about the environmental impact of fossil fuels.

Solar panel prices, for instance, have dropped by more than eighty percent since 2010, making solar power increasingly competitive with traditional energy sources in many parts of the world. Similarly, advances in turbine design have allowed wind farms to generate more electricity at lower costs than ever before.

Despite this progress, renewable energy still faces significant challenges. Because sunlight and wind are intermittent, energy storage remains a critical hurdle; batteries capable of storing large amounts of power are expensive and not yet widely deployed. Additionally, existing electrical grids were largely designed for centralized power plants, not the more distributed nature of renewable installations, requiring substantial infrastructure investment.

Nevertheless, many energy analysts argue that the trajectory is clear: renewable sources will likely continue to grow as both a practical necessity and an economic opportunity, reshaping how societies produce and consume energy for generations to come.`,
    questions: [
      {
        question: "What has primarily driven the growth of renewable energy?",
        options: [
          "Government mandates alone",
          "Falling costs, innovation, and environmental concerns",
          "A shortage of fossil fuels",
          "Public protests against oil companies",
        ],
        correctIndex: 1,
      },
      {
        question: "What is described as a critical hurdle for renewable energy?",
        options: [
          "Lack of public interest",
          "Energy storage due to intermittent sunlight and wind",
          "The cost of land for solar panels",
          "A lack of skilled workers",
        ],
        correctIndex: 1,
      },
      {
        question: "Why do existing electrical grids pose a challenge?",
        options: [
          "They were designed for centralized power plants, not distributed renewables",
          "They cannot carry any electricity at all",
          "They are too new to be updated",
          "They only work in cold climates",
        ],
        correctIndex: 0,
      },
      {
        question: "What is the overall tone of the passage regarding renewable energy's future?",
        options: [
          "Pessimistic and doubtful",
          "Cautiously optimistic despite challenges",
          "Completely neutral with no opinion",
          "Dismissive of renewable energy's potential",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-9",
    gradeBand: 9,
    title: "The Story Behind Photojournalism",
    text: `A powerful photo can tell a story without words. Photojournalists travel to events, schools, neighborhoods, and protests to capture moments that help people understand what is happening around the world.

They work quickly, choosing angles, light, and timing to show emotion and context. After the photo is taken, editors decide how the image will appear in print or online.

Good photojournalism respects the people in the picture, avoids staging scenes, and aims to be truthful. When readers see a strong image, they can feel a connection to the story in a deeper way than facts alone often allow.`,
    questions: [
      {
        question: "What can a powerful photo do?",
        options: ["Make people laugh", "Tell a story without words", "Hide information", "Create a fantasy"],
        correctIndex: 1,
      },
      {
        question: "What do photojournalists need to consider?",
        options: ["Angles, light, and timing", "Only the weather", "Their favorite colors", "How to avoid people"],
        correctIndex: 0,
      },
      {
        question: "What should good photojournalism avoid?",
        options: ["Showing emotion", "Using natural light", "Staging scenes", "Telling the truth"],
        correctIndex: 2,
      },
      {
        question: "Why do readers connect with strong images?",
        options: ["Because facts are always boring", "Because images are always true", "Because images can show emotion and context", "Because pictures are colorful"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "level-10",
    gradeBand: 10,
    title: "The Paradox of Choice in Modern Consumer Culture",
    text: `In contemporary consumer societies, the proliferation of choice is often presented as an unambiguous good—more options, the logic goes, necessarily translate into greater freedom and satisfaction. Yet a substantial body of psychological research suggests a more complicated reality, one in which an abundance of alternatives can paradoxically diminish rather than enhance well-being.

Psychologist Barry Schwartz popularized this phenomenon, arguing that excessive choice generates a kind of cognitive burden: as the number of options increases, so too does the cognitive effort required to evaluate them, along with the anxiety associated with the possibility of having chosen incorrectly. This effect is compounded by counterfactual thinking—the tendency to imagine how a different choice might have yielded superior outcomes—which can erode satisfaction even with objectively good decisions.

Critics of this thesis contend that the negative effects of choice overload are context-dependent, varying significantly based on factors such as the complexity of the decision, the expertise of the decision-maker, and whether the choice is reversible. A novice selecting among dozens of unfamiliar wine varietals, for example, likely experiences far greater decision fatigue than a sommelier facing the same array.

Regardless of where one falls in this debate, the practical implications are significant for designers of digital interfaces, retail environments, and public policy alike, all of whom must grapple with the tension between offering sufficient choice and overwhelming the people they aim to serve.`,
    questions: [
      {
        question: "What is the central paradox described in the passage?",
        options: [
          "More choices always lead to greater happiness",
          "An abundance of choice can diminish rather than enhance well-being",
          "Consumers prefer having no choices at all",
          "Choice has no measurable psychological effect",
        ],
        correctIndex: 1,
      },
      {
        question: "According to Schwartz's argument, what contributes to the burden of choice?",
        options: [
          "The low price of most goods",
          "Cognitive effort and anxiety about choosing incorrectly",
          "A lack of available information",
          "Government regulation of markets",
        ],
        correctIndex: 1,
      },
      {
        question: "What do critics of the choice-overload thesis argue?",
        options: [
          "The effect is universal and unchanging",
          "The effect is context-dependent, varying with expertise and reversibility",
          "The thesis has been completely disproven",
          "Choice overload only affects children",
        ],
        correctIndex: 1,
      },
      {
        question: "What is the practical significance noted at the end of the passage?",
        options: [
          "Designers should always maximize the number of options",
          "The debate has no real-world implications",
          "Designers must balance offering choice with avoiding overwhelm",
          "Public policy should eliminate consumer choice entirely",
        ],
        correctIndex: 2,
      },
    ],
  },
];

export function getPassageById(id: string): Passage | undefined {
  return passages.find((p) => p.id === id);
}
