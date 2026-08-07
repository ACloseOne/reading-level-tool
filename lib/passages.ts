export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Passage {
  id: string;
  gradeBand: number; // target grade level; 0 = Kindergarten
  title: string;
  text: string;
  questions: Question[];
}

// Display label for a grade band ("K" instead of "0").
export function gradeLabelFor(gradeBand: number): string {
  return gradeBand === 0 ? "K" : String(gradeBand);
}

// All grade bands represented in the passage bank, in order.
export const gradeBands: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// All passages are original content written for this tool.
export const passages: Passage[] = [
  // ---------------------------------------------------------------- K
  {
    id: "k-1",
    gradeBand: 0,
    title: "The Big Red Ball",
    text: `Ben has a big red ball. He likes to bounce the ball. Ben bounces the ball up and down. The ball rolls into the grass. Ben runs to get his ball. He picks it up and smiles.`,
    questions: [
      {
        question: "What color is the ball?",
        options: ["Red", "Blue", "Green"],
        correctIndex: 0,
      },
      {
        question: "What does Ben do with the ball?",
        options: ["Throws it in a tree", "Bounces it", "Buries it"],
        correctIndex: 1,
      },
      {
        question: "Where does the ball roll?",
        options: ["Into the grass", "Into the street", "Into the pond"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "k-2",
    gradeBand: 0,
    title: "My Cat Milo",
    text: `I have a cat named Milo. Milo is soft and gray. Milo likes to sleep in the sun. Milo also likes to play with string. At night, Milo sleeps on my bed.`,
    questions: [
      {
        question: "What is the cat's name?",
        options: ["Milo", "Max", "Tom"],
        correctIndex: 0,
      },
      {
        question: "What color is Milo?",
        options: ["Black", "Gray", "White"],
        correctIndex: 1,
      },
      {
        question: "Where does Milo sleep at night?",
        options: ["On my bed", "Outside", "In a box"],
        correctIndex: 0,
      },
    ],
  },

  // ---------------------------------------------------------------- 1
  {
    id: "level-1a",
    gradeBand: 1,
    title: "A Day at the Park",
    text: `On Saturday, Maria and her brother Leo went to the park with their mom. First, they played on the swings. Then Leo wanted to climb the big slide. Maria found some friends by the sandbox and helped them build a sand castle.

When the sun started to set, Mom called them over. "Time to go home," she said. Maria and Leo waved goodbye to their friends. They were tired, but happy after a fun day outside.`,
    questions: [
      {
        question: "Who went to the park with Maria and Leo?",
        options: ["Their mom", "Their dad", "Their teacher"],
        correctIndex: 0,
      },
      {
        question: "What did Maria do at the sandbox?",
        options: ["Took a nap", "Built a sand castle", "Read a book"],
        correctIndex: 1,
      },
      {
        question: "What did Leo want to climb?",
        options: ["The big slide", "A tree", "A ladder"],
        correctIndex: 0,
      },
      {
        question: "How did Maria and Leo feel at the end of the day?",
        options: ["Angry", "Tired but happy", "Scared"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-1b",
    gradeBand: 1,
    title: "The Little Seed",
    text: `A tiny seed fell into the soil. It rained, and the sun warmed the ground. Slowly, the seed began to change.

First, a small root grew down into the dirt. Then a green stem pushed up toward the sky. Tiny leaves unfolded on the stem. Day by day, the plant grew taller. After many weeks, a bright yellow flower opened on top. The little seed had become a sunflower.`,
    questions: [
      {
        question: "What fell into the soil?",
        options: ["A rock", "A seed", "A leaf"],
        correctIndex: 1,
      },
      {
        question: "What grew first?",
        options: ["The root", "The flower", "The stem"],
        correctIndex: 0,
      },
      {
        question: "What color was the flower?",
        options: ["Blue", "Yellow", "Red"],
        correctIndex: 1,
      },
      {
        question: "What did the seed become?",
        options: ["A tree", "A sunflower", "A bush"],
        correctIndex: 1,
      },
    ],
  },

  // ---------------------------------------------------------------- 2
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
    id: "level-2b",
    gradeBand: 2,
    title: "Ladybugs Are Helpful Bugs",
    text: `Ladybugs are small, round bugs with bright red or orange shells. Many ladybugs have black spots on their backs. Even though they are tiny, ladybugs help gardens stay healthy.

They eat insects called aphids, which can damage plants by eating their leaves. A single ladybug can eat dozens of aphids in one day. Because of this, farmers and gardeners are happy when ladybugs visit their plants.

Ladybugs are not just helpful; they can also fly. When a ladybug is ready to take off, its hard outer shell opens up to reveal a pair of thin wings underneath. Next time you see a ladybug, remember that this little bug is working hard to protect the garden.`,
    questions: [
      {
        question: "What do ladybugs eat that helps gardens?",
        options: ["Flowers", "Aphids", "Grass", "Dirt"],
        correctIndex: 1,
      },
      {
        question: "What color are most ladybug shells?",
        options: ["Red or orange", "Blue", "Brown", "Purple"],
        correctIndex: 0,
      },
      {
        question: "What is hidden under a ladybug's hard shell?",
        options: ["Legs", "Wings", "Eggs", "Antennae"],
        correctIndex: 1,
      },
      {
        question: "Why are farmers happy to see ladybugs?",
        options: [
          "They eat harmful bugs",
          "They pollinate flowers",
          "They make honey",
          "They scare away birds",
        ],
        correctIndex: 0,
      },
    ],
  },

  // ---------------------------------------------------------------- 3
  {
    id: "level-3a",
    gradeBand: 3,
    title: "The Class Pet",
    text: `Ms. Alvarez's third-grade class had a new pet: a small brown hamster named Pretzel. Every student took turns caring for Pretzel, filling his water bottle and giving him fresh food.

One Friday, it was Diego's turn to bring Pretzel home for the weekend. Diego was excited, but a little nervous. He had never taken care of a pet by himself before. That evening, Diego carefully cleaned Pretzel's cage and gave him a piece of carrot. Pretzel ran happily on his wheel until it was time for bed.

On Monday, Diego brought Pretzel back to school, along with a drawing he had made of the hamster. Ms. Alvarez hung the drawing on the class bulletin board. Diego felt proud that he had taken good care of Pretzel all by himself.`,
    questions: [
      {
        question: "What kind of animal is Pretzel?",
        options: ["A hamster", "A rabbit", "A turtle", "A bird"],
        correctIndex: 0,
      },
      {
        question: "Who took Pretzel home for the weekend?",
        options: ["Ms. Alvarez", "Diego", "The principal", "Diego's sister"],
        correctIndex: 1,
      },
      {
        question: "What did Diego bring back to school along with Pretzel?",
        options: ["A cage", "A drawing", "A book", "A toy"],
        correctIndex: 1,
      },
      {
        question: "How did Diego feel at the end of the story?",
        options: ["Nervous", "Proud", "Bored", "Angry"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-3b",
    gradeBand: 3,
    title: "How Bees Make Honey",
    text: `Honeybees work together in large groups called colonies to make honey. It all starts when a worker bee flies from flower to flower, collecting a sweet liquid called nectar. The bee stores the nectar in a special stomach and carries it back to the hive.

Inside the hive, the bee passes the nectar to other worker bees, who chew it and pass it along again. This process removes extra water from the nectar. Eventually, the bees store the thickened nectar in six-sided wax cells called honeycombs.

The bees fan the honeycombs with their wings to dry the honey even more. Once the honey is ready, the bees seal each cell with a thin layer of wax to keep it fresh. A single beehive can produce many pounds of honey in just one summer season.`,
    questions: [
      {
        question: "What do worker bees collect from flowers?",
        options: ["Pollen dust", "Nectar", "Water", "Pollen and seeds"],
        correctIndex: 1,
      },
      {
        question: "Where do bees store the thickened nectar?",
        options: ["In leaves", "In honeycombs", "In the ground", "In flowers"],
        correctIndex: 1,
      },
      {
        question: "Why do bees fan the honeycombs with their wings?",
        options: [
          "To cool the hive",
          "To dry the honey",
          "To scare away predators",
          "To clean the wax",
        ],
        correctIndex: 1,
      },
      {
        question: "What shape are the cells in a honeycomb?",
        options: ["Round", "Six-sided", "Square", "Triangular"],
        correctIndex: 1,
      },
    ],
  },

  // ---------------------------------------------------------------- 4
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
    id: "level-4b",
    gradeBand: 4,
    title: "The History of the Bicycle",
    text: `The bicycle we ride today looks very different from its earliest ancestors. In the early 1800s, a German inventor built a wooden device called a "running machine." It had two wheels and handlebars, but no pedals—riders pushed themselves along with their feet, much like a modern scooter.

Decades later, inventors added pedals directly to the front wheel, creating a bicycle nicknamed the "boneshaker" because of its rough, bumpy ride on cobblestone streets. In the 1870s, a new design featured an enormous front wheel and a tiny back wheel, allowing riders to travel faster with each pedal turn. However, these bicycles were difficult to balance and dangerous to fall from.

Everything changed in the 1880s with the invention of the "safety bicycle." This design used a chain to connect the pedals to the rear wheel, allowing both wheels to be the same, smaller size. The safety bicycle was much easier to ride and far less likely to tip over. This basic design, improved with rubber tires and gears, became the foundation for the bicycles people still ride today.`,
    questions: [
      {
        question: "What was the earliest bicycle called?",
        options: ["The safety bicycle", "The running machine", "The boneshaker", "The high wheel"],
        correctIndex: 1,
      },
      {
        question: 'Why was an early pedal bicycle nicknamed the "boneshaker"?',
        options: [
          "It was very fast",
          "It had a rough, bumpy ride",
          "It was made of bone",
          "It shook when parked",
        ],
        correctIndex: 1,
      },
      {
        question: "What problem did bicycles with a huge front wheel have?",
        options: [
          "They were hard to balance",
          "They had no pedals",
          "They could not turn",
          "They were too slow",
        ],
        correctIndex: 0,
      },
      {
        question: 'What made the "safety bicycle" easier to ride?',
        options: [
          "A chain connecting pedals to the rear wheel",
          "A bigger front wheel",
          "No wheels at all",
          "Wooden wheels",
        ],
        correctIndex: 0,
      },
    ],
  },

  // ---------------------------------------------------------------- 5
  {
    id: "level-5a",
    gradeBand: 5,
    title: "The Science Fair Surprise",
    text: `Priya had spent three weeks preparing her science fair project on plant growth, testing how different amounts of sunlight affected bean sprouts. The night before the fair, disaster struck: her poster board, left near an open window, was ruined by a sudden rainstorm. Priya stared at the smudged, dripping charts in dismay, wondering if she should just skip the fair entirely.

Her older brother, Arjun, noticed her sitting quietly at the kitchen table and asked what was wrong. After hearing the problem, he suggested they stay up a little later to recreate the charts using the data Priya had saved on her tablet. Working together, they redrew the graphs by hand, and Arjun helped Priya think of a clearer way to explain her results.

By midnight, the new poster looked even better than the original, with neat labels and a colorful diagram showing which bean sprouts had grown the tallest. The next day, Priya's classmates gathered around her table, impressed by how clearly she explained her experiment. When the judges announced the winners, Priya was surprised to hear her name called for "Most Creative Presentation." She realized that sometimes an unexpected setback could lead to an even better outcome, especially with a little help from someone who believed in her.`,
    questions: [
      {
        question: "What was Priya's science fair project about?",
        options: ["Volcanoes", "Plant growth and sunlight", "Weather patterns", "Magnets"],
        correctIndex: 1,
      },
      {
        question: "What ruined Priya's original poster?",
        options: ["A rainstorm", "Her brother", "A dog", "A spilled drink"],
        correctIndex: 0,
      },
      {
        question: "Who helped Priya fix her project?",
        options: ["Her teacher", "Her brother Arjun", "A judge", "A classmate"],
        correctIndex: 1,
      },
      {
        question: "What award did Priya win?",
        options: [
          "Best Data",
          "Most Creative Presentation",
          "First Place Overall",
          "Best Teamwork",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-5b",
    gradeBand: 5,
    title: "Volcanoes: Nature's Fireworks",
    text: `Deep beneath Earth's surface, temperatures are hot enough to melt solid rock into a thick liquid called magma. When pressure builds up enough, this molten rock can force its way upward through cracks in the Earth's crust, eventually erupting as lava at the surface. This dramatic process is what creates a volcano.

Not all volcanic eruptions look the same. Some volcanoes ooze slow-moving lava that flows gently down their sides, while others explode violently, launching ash, rock, and gas high into the sky. The difference often comes down to how thick the magma is and how much gas is trapped inside it. Thicker magma traps gas more easily, building up pressure until it bursts out in an explosive eruption.

Scientists who study volcanoes, called volcanologists, monitor these mountains closely for warning signs such as small earthquakes, changes in ground shape, and shifts in gas emissions. While volcanic eruptions can be dangerous, destroying towns and affecting climate for years afterward, volcanoes also play an important role in shaping our planet. Over millions of years, volcanic activity has built entire islands, enriched soil with minerals that help crops grow, and even released gases that helped form Earth's early atmosphere. Understanding volcanoes helps scientists predict eruptions and protect communities that live near them.`,
    questions: [
      {
        question: "What is magma called once it reaches the surface?",
        options: ["Ash", "Lava", "Gas", "Crust"],
        correctIndex: 1,
      },
      {
        question: "What causes some volcanoes to erupt explosively rather than gently?",
        options: [
          "Thicker magma trapping more gas",
          "Cooler temperatures",
          "Less rock underground",
          "Nearby earthquakes",
        ],
        correctIndex: 0,
      },
      {
        question: "What do volcanologists watch for as warning signs?",
        options: [
          "Rainfall patterns",
          "Small earthquakes and gas changes",
          "Ocean tides",
          "Wind speed",
        ],
        correctIndex: 1,
      },
      {
        question: "According to the passage, how can volcanoes benefit the planet?",
        options: [
          "They cool the climate permanently",
          "They enrich soil and build islands",
          "They prevent earthquakes",
          "They create fresh water",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ---------------------------------------------------------------- 6
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
    id: "level-6b",
    gradeBand: 6,
    title: "The Mystery of the Missing Trophy",
    text: `When the golden debate trophy vanished from its display case the night before the regional finals, the entire school buzzed with theories. Some students whispered that a rival school had snuck in to steal it. Others insisted it had simply been misplaced during last week's hallway renovation.

Jordan, the debate team's captain, wasn't interested in rumors; she wanted evidence. She started by examining the display case itself, noticing that the lock hadn't been forced or broken. That detail ruled out the idea of a break-in from outside. Next, she checked the sign-out sheet for the trophy case key and discovered only three people had access: the janitor, the principal, and Mr. Han, the debate coach.

When Jordan mentioned the missing trophy to Mr. Han, he suddenly looked uncomfortable and admitted he'd taken it to a local trophy shop to have it repolished as a surprise before the finals, hoping to present it looking brand new. He'd simply forgotten to tell anyone, assuming he would be back with it before anyone noticed it was gone. Jordan couldn't help but laugh with relief; the mystery she'd been so determined to solve had a far simpler explanation than she or her classmates had imagined. That afternoon, Mr. Han returned with the trophy, gleaming under the school's fluorescent lights, and the whole rumor mill quieted down almost as quickly as it had started.`,
    questions: [
      {
        question: "What was missing from the display case?",
        options: ["A medal", "A trophy", "A banner", "A photo"],
        correctIndex: 1,
      },
      {
        question: "What clue told Jordan the case hadn't been broken into?",
        options: [
          "The lock wasn't forced",
          "The window was open",
          "Fingerprints were found",
          "A note was left behind",
        ],
        correctIndex: 0,
      },
      {
        question: "Who had taken the trophy, and why?",
        options: [
          "Mr. Han, to get it repolished",
          "A rival school, to cheat",
          "The janitor, by accident",
          "The principal, for a meeting",
        ],
        correctIndex: 0,
      },
      {
        question: "How did Jordan feel once she learned the truth?",
        options: ["Angry", "Relieved", "Confused", "Embarrassed"],
        correctIndex: 1,
      },
    ],
  },

  // ---------------------------------------------------------------- 7
  {
    id: "level-7a",
    gradeBand: 7,
    title: "A Storm on Cedar Lake",
    text: `The sky over Cedar Lake had shifted from a hazy blue to a bruised gray in what felt like minutes, and Elena knew she and her cousin Marcus needed to get their canoe back to shore immediately. They had paddled out just after breakfast, planning only a short trip to the small island where herons nested, but the forecast the ranger had mentioned that morning—"a slight chance of afternoon showers"—had apparently changed its mind.

Wind pushed hard against the canoe, and the first fat raindrops began striking the water in scattered rings. "Dig in on your side," Elena shouted over the rising wind, remembering the paddling lessons their grandfather had drilled into them summer after summer. Marcus, gripping his paddle tightly, tried to match her rhythm, but panic made his strokes short and choppy, spinning the canoe slightly off course.

Elena forced herself to stay calm, focusing on the shoreline pines that marked the boat launch, now barely visible through the thickening rain. "We're almost there," she called back, though she wasn't entirely certain that was true. Lightning flickered somewhere behind the clouds, followed several seconds later by a low rumble of thunder. Finally, the canoe's bow scraped against the sandy shallows near the dock, and both cousins scrambled out, dragging the boat the rest of the way onto dry land. Soaked and breathing hard, they sat beneath the boathouse roof and watched the storm rage over the lake they'd been paddling across only minutes before. "Remind me to actually listen to the weather report next time," Marcus said, and despite the fear that still hummed in his chest, Elena couldn't help but laugh.`,
    questions: [
      {
        question: "What were Elena and Marcus doing before the storm arrived?",
        options: [
          "Fishing from a dock",
          "Paddling to an island to see herons",
          "Swimming across the lake",
          "Repairing their canoe",
        ],
        correctIndex: 1,
      },
      {
        question: "What had the ranger predicted that morning?",
        options: [
          "A slight chance of afternoon showers",
          "A major storm warning",
          "Clear skies all day",
          "Strong winds only",
        ],
        correctIndex: 0,
      },
      {
        question: "Why did the canoe spin slightly off course?",
        options: [
          "Elena stopped paddling",
          "Marcus's strokes became short and choppy from panic",
          "A large wave hit them",
          "The wind changed direction suddenly",
        ],
        correctIndex: 1,
      },
      {
        question: "What lesson does Marcus suggest they should learn from the experience?",
        options: [
          "To bring more supplies",
          "To actually listen to the weather report",
          "To never go canoeing again",
          "To paddle faster next time",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-7b",
    gradeBand: 7,
    title: "The Underground Railroad",
    text: `The term "Underground Railroad" did not refer to an actual railway built beneath the ground; instead, it described a secret network of people, routes, and hiding places that helped enslaved people in the United States escape to freedom during the 1800s. The network used railroad terms as code: safe houses were called "stations," the people who guided escapees were known as "conductors," and those escaping were sometimes referred to as "passengers."

Because helping an enslaved person escape was illegal and dangerous, this coded language allowed supporters to communicate without directly revealing their activities to authorities. One of the most famous conductors was Harriet Tubman, who escaped slavery herself in 1849 and later returned to the South at least thirteen times to guide roughly seventy other enslaved people to freedom, often traveling at night and navigating by the North Star.

Routes on the Underground Railroad varied widely, sometimes stretching hundreds of miles through forests, along rivers, and across state lines, often ending in Northern states or Canada, where slavery was illegal. Along the way, escapees depended on the courage of abolitionists—both Black and white—who risked severe punishment, including imprisonment, to shelter and feed those fleeing enslavement. Quakers were especially active participants in many Underground Railroad networks, offering their homes, barns, and churches as hiding places. Historians estimate that the Underground Railroad helped tens of thousands of enslaved people reach freedom before slavery was abolished in the United States in 1865, making it one of the most significant acts of organized resistance in American history.`,
    questions: [
      {
        question: "Was the Underground Railroad an actual railway?",
        options: [
          "Yes, built underground",
          "No, it was a secret network of people and routes",
          "Yes, but only in the North",
          "No, it was a type of ship",
        ],
        correctIndex: 1,
      },
      {
        question: "What was a hiding place along the route called in the network's coded language?",
        options: ["A depot", "A station", "A terminal", "A platform"],
        correctIndex: 1,
      },
      {
        question: "Who was one of the most famous conductors, and what did she do?",
        options: [
          "Harriet Tubman, who guided escapees to freedom",
          "Abraham Lincoln, who ended slavery",
          "Frederick Douglass, who wrote books",
          "Susan B. Anthony, who led marches",
        ],
        correctIndex: 0,
      },
      {
        question: "Which group is mentioned as especially active in offering shelter along the routes?",
        options: ["Quakers", "Explorers", "Soldiers", "Merchants"],
        correctIndex: 0,
      },
    ],
  },

  // ---------------------------------------------------------------- 8
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
    id: "level-8b",
    gradeBand: 8,
    title: "The Last Lighthouse Keeper",
    text: `By the time Theo accepted the position, most lighthouses along the coast had already been automated, their beacons controlled remotely from an office hundreds of miles away, requiring no human presence at all. Cliffside Point, however, remained one of the last lighthouses still staffed by a live-in keeper, largely because its aging equipment was too unreliable to trust to automation alone.

Theo had taken the job partly out of curiosity and partly out of a need for solitude after a difficult year, and he hadn't expected to feel quite so unprepared for the isolation that came with it. The nearest town was accessible only by a narrow causeway that flooded twice a day with the tide, cutting Theo off from the mainland for hours at a stretch.

During his first month, he spent long evenings learning to maintain the massive Fresnel lens, a precise arrangement of glass prisms that bent and focused light into a single powerful beam visible for miles across open water. He kept meticulous logs of passing ships, weather patterns, and the countless adjustments the aging machinery demanded, gradually developing a rhythm to his solitary days that he hadn't anticipated finding comforting.

What surprised Theo most, though, was how the isolation he'd initially dreaded slowly transformed into something closer to peace. Watching storms roll in from his tower window, tracking the slow rotation of the light he was responsible for maintaining, he began to understand why previous keepers had stayed at Cliffside Point for decades rather than months. When automation equipment finally arrived to replace him eighteen months later, Theo found himself oddly reluctant to leave, having grown attached to a job many would have found unbearably lonely, and to a rhythm of life increasingly rare in the modern world.`,
    questions: [
      {
        question: "Why was Cliffside Point still staffed by a live-in keeper?",
        options: [
          "Tradition required it",
          "Its aging equipment was too unreliable for automation",
          "It was the largest lighthouse on the coast",
          "No automation technology existed yet",
        ],
        correctIndex: 1,
      },
      {
        question: "What cut Theo off from the mainland for hours at a time?",
        options: ["A flooding causeway", "A broken bridge", "Heavy fog", "A locked gate"],
        correctIndex: 0,
      },
      {
        question: "What is a Fresnel lens, according to the passage?",
        options: [
          "A type of boat engine",
          "An arrangement of glass prisms that focuses light",
          "A weather-tracking instrument",
          "A type of radio antenna",
        ],
        correctIndex: 1,
      },
      {
        question: "How did Theo's feelings about the isolation change over time?",
        options: [
          "He grew angrier",
          "It slowly became something closer to peace",
          "He never adjusted to it",
          "He requested an immediate transfer",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ---------------------------------------------------------------- 9
  {
    id: "level-9a",
    gradeBand: 9,
    title: "The Debate Team",
    text: `Amara had always considered herself more comfortable with numbers than with words, which was precisely why joining the debate team in her sophomore year had struck most of her friends as an unlikely decision. She'd signed up almost on a dare, expecting to quit within the first few weeks once the anxiety of public speaking became unbearable. Instead, she found herself unexpectedly drawn to the structure debate provided: the way an argument could be built piece by piece, evidence stacked carefully atop reasoning, much like solving an equation where every step had to logically follow the last.

Her coach, Mr. Feldman, noticed this analytical tendency early on and began pairing her with policy debate cases that rewarded meticulous research over theatrical delivery, a pairing that played directly to her strengths. Still, the tournament circuit demanded skills that no amount of research alone could provide—the ability to think on her feet during cross-examination, to recover gracefully when an opponent exposed a weakness she hadn't anticipated, to project confidence even when her heart was pounding beneath a blazer two sizes too big, borrowed from her older sister.

By November, six months into the season, Amara found herself in the final round of a regional tournament, facing a senior from a rival school with a reputation for rattling less experienced opponents. When her opponent raised an argument she hadn't specifically prepared for, Amara felt the familiar flutter of panic rise in her chest, but instead of freezing, she paused, took a slow breath, and worked through the logic out loud, arriving at a rebuttal that surprised even herself. She didn't win that round, but walking off the stage afterward, she realized winning had stopped being the only measure of how far she'd come since that first anxious meeting six months earlier.`,
    questions: [
      {
        question: "Why did Amara's friends find her decision to join debate surprising?",
        options: [
          "She was known for being shy about numbers",
          "She was more comfortable with numbers than words",
          "She disliked her school",
          "She had no free time",
        ],
        correctIndex: 1,
      },
      {
        question: "What analytical tendency did Mr. Feldman notice in Amara?",
        options: [
          "A love of theatrical delivery",
          "A methodical, evidence-based approach to arguments",
          "A dislike of research",
          "A preference for working alone at all times",
        ],
        correctIndex: 1,
      },
      {
        question: "What happened when Amara's opponent raised an unexpected argument in the final round?",
        options: [
          "She froze completely",
          "She paused, breathed, and worked through the logic aloud",
          "She left the stage",
          "She asked for a recess",
        ],
        correctIndex: 1,
      },
      {
        question: "What did Amara realize by the end of the passage?",
        options: [
          "That winning was the only thing that mattered",
          "That she had grown, regardless of winning the round",
          "That she should quit debate",
          "That her coach had been wrong about her",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "level-9b",
    gradeBand: 9,
    title: "The Psychology of Memory",
    text: `For decades, many people assumed that human memory functioned something like a video recorder, capturing experiences in precise detail and storing them intact for later playback. Research in cognitive psychology, however, has revealed a far more complicated and, in some ways, less reliable picture. Rather than preserving a fixed recording, the brain appears to reconstruct memories each time they are recalled, a process that leaves them vulnerable to subtle distortion.

Psychologist Elizabeth Loftus demonstrated this vulnerability in a series of influential experiments during the 1970s, showing that simply changing the wording of a question could alter what research participants believed they had witnessed. In one well-known study, participants who watched a video of a car collision reported significantly higher estimated speeds when asked how fast the cars were going when they "smashed" into each other, compared to when the same question used the word "hit." Even more strikingly, Loftus's later research demonstrated that entirely false memories—events that never happened—could be implanted in some participants simply through suggestive conversation and repeated questioning, a phenomenon with significant implications for the reliability of eyewitness testimony in criminal trials.

These findings have prompted considerable debate within the legal system, as courts increasingly grapple with how much weight should be given to eyewitness accounts, particularly in cases relying heavily on recollections formed under the stress and confusion of a crime scene. Neuroscientists have since identified biological mechanisms that may help explain this reconstructive process: each time a memory is retrieved, the neural connections associated with it appear to become temporarily unstable before being rewritten and restored, a process sometimes called reconsolidation. This means that the very act of remembering something may subtly change the memory itself, an unsettling notion for anyone who has ever placed full confidence in their own recollections.`,
    questions: [
      {
        question: "What common assumption about memory does the passage challenge?",
        options: [
          "That memory works like an unreliable guess",
          "That memory functions like a fixed, video-recorder-like recording",
          "That memory does not exist",
          "That only some people have memories",
        ],
        correctIndex: 1,
      },
      {
        question: 'What did Elizabeth Loftus\'s experiment with word choice ("smashed" vs. "hit") demonstrate?',
        options: [
          "That word choice can alter estimated details in a memory",
          "That people never misremember events",
          "That car crashes are hard to study",
          "That memory improves with repetition",
        ],
        correctIndex: 0,
      },
      {
        question: "What significant and unsettling finding came from Loftus's later research?",
        options: [
          "Memories cannot be changed once formed",
          "Entirely false memories can be implanted through suggestion",
          "People remember everything perfectly",
          "Eyewitnesses are always accurate",
        ],
        correctIndex: 1,
      },
      {
        question: '"Reconsolidation," as described in the passage, refers to:',
        options: [
          "The process of memories becoming unstable and being rewritten each time they're recalled",
          "A type of memory loss disease",
          "A method for improving eyesight",
          "The brain's ability to erase memories permanently",
        ],
        correctIndex: 0,
      },
    ],
  },

  // ---------------------------------------------------------------- 10
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
  {
    id: "level-10b",
    gradeBand: 10,
    title: "Silence in the Courtroom",
    text: `The defense attorney had warned her that closing arguments rarely unfold the way young lawyers imagine them in law school, and Naomi was beginning to understand exactly what he meant as she stood before the jury box, her prepared notes suddenly feeling inadequate against the weight of the silence filling the room. This was her first case as lead counsel, a relatively minor contract dispute that had nonetheless kept her awake reviewing depositions for the better part of three weeks, and she was acutely aware that opposing counsel, a partner with nearly two decades of trial experience, had delivered a closing that was polished, confident, and almost unsettlingly persuasive.

Naomi had two choices, she realized: she could deliver the argument exactly as she had rehearsed it in front of her bathroom mirror each night that week, methodical and comprehensive, walking the jury through every relevant clause of the contested contract, or she could take a risk and address, directly and without notes, the single emotional thread she suspected the jury actually cared about—whether her client, a small business owner facing financial ruin, had been treated unfairly by a much larger and more powerful company.

She set her notes down on the table, a gesture that felt both terrifying and strangely clarifying, and began speaking not about clauses and precedent but about what it meant to sign a contract in good faith and then watch the other party quietly rewrite the terms once it became inconvenient for them. She watched several jurors lean forward almost imperceptibly, a detail she would replay in her memory for weeks afterward regardless of the verdict, uncertain even in the moment whether she was witnessing genuine engagement or simply projecting her own hope onto their expressions.

When the jury returned two hours later with a verdict in her client's favor, her supervising partner offered a single piece of feedback afterward, delivered with the dry understatement she was beginning to recognize as characteristic of him: sometimes, he said, the version of the argument you're afraid to give is the one actually worth giving. Naomi wasn't sure she entirely agreed—she suspected the methodical version might have worked just as well—but she found she couldn't quite bring herself to dismiss the comment either, not entirely, not yet.`,
    questions: [
      {
        question: "What was significant about this case for Naomi?",
        options: [
          "It was a criminal trial",
          "It was her first case as lead counsel",
          "It was a case she was certain to lose",
          "It involved a celebrity client",
        ],
        correctIndex: 1,
      },
      {
        question: "What choice did Naomi face before her closing argument?",
        options: [
          "Whether to settle out of court",
          "Whether to deliver a rehearsed, methodical argument or take a riskier, emotional approach",
          "Whether to call another witness",
          "Whether to request a delay",
        ],
        correctIndex: 1,
      },
      {
        question: "What central idea did Naomi focus on when she set her notes aside?",
        options: [
          "The exact legal precedents",
          "Whether her client had been treated unfairly by a larger company",
          "The salary of the opposing lawyer",
          "The history of contract law",
        ],
        correctIndex: 1,
      },
      {
        question: "What was the supervising partner's piece of feedback?",
        options: [
          "That she should have used her notes",
          "That the argument she was afraid to give was worth giving",
          "That she should quit law",
          "That the jury was biased",
        ],
        correctIndex: 1,
      },
    ],
  },

  // ------------------------------------------------------- Longer passages
  {
    id: "k-3",
    gradeBand: 0,
    title: "Snow Day Fun",
    text: `It snowed all night. In the morning, everything outside was white. Tom put on his warm coat, hat, and mittens. He went outside to play.

Tom made a big snowman with an orange carrot nose. His sister Amy made snow angels next to him. They drank hot cocoa when they came back inside. It was the best snow day ever.`,
    questions: [
      {
        question: "What happened all night?",
        options: ["It snowed", "It rained", "It was sunny"],
        correctIndex: 0,
      },
      {
        question: "What did Tom build?",
        options: ["A snowman", "A sandcastle", "A fort"],
        correctIndex: 0,
      },
      {
        question: "What did Amy make?",
        options: ["Snow angels", "A snowman", "A snowball"],
        correctIndex: 0,
      },
      {
        question: "What did they drink when they came inside?",
        options: ["Hot cocoa", "Juice", "Milk"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-1c",
    gradeBand: 1,
    title: "The Lemonade Stand",
    text: `It was the hottest day of summer, and Kayla wanted to earn some money. She asked her dad to help her set up a lemonade stand at the end of their driveway. Together, they made a big pitcher of lemonade and squeezed extra lemons for flavor.

Kayla made a bright yellow sign that said "Lemonade, 50 cents!" She placed a small table by the sidewalk and waited for customers. At first, no one stopped. Then a jogger paused for a cold drink, and soon two neighbors came by too.

By the end of the afternoon, Kayla had sold twelve cups of lemonade. She counted her coins proudly and decided to save the money for a new bike.`,
    questions: [
      {
        question: "What did Kayla set up at the end of the driveway?",
        options: ["A lemonade stand", "A bake sale", "A garage sale"],
        correctIndex: 0,
      },
      {
        question: "What did Kayla's sign say?",
        options: ["Lemonade, 50 cents!", "Free lemonade!", "Cold drinks, $1"],
        correctIndex: 0,
      },
      {
        question: "How many cups of lemonade did Kayla sell?",
        options: ["Twelve", "Six", "Twenty"],
        correctIndex: 0,
      },
      {
        question: "What did Kayla decide to do with her money?",
        options: ["Save it for a new bike", "Spend it on candy", "Give it to her dad"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-2c",
    gradeBand: 2,
    title: "How Rainbows Form",
    text: `Have you ever wondered why a rainbow appears in the sky after it rains? Rainbows form when sunlight passes through drops of water in the air. As the light enters a raindrop, it bends and splits into different colors. This is because sunlight is actually made up of many colors mixed together, even though it looks white to our eyes.

Each color bends a slightly different amount as it passes through the raindrop. Red light bends the least, while purple light bends the most. This is why a rainbow always shows its colors in the same order: red, orange, yellow, green, blue, and purple.

To see a rainbow, you need both sunlight and rain at the same time, with the sun behind you and the rain in front of you. That is why rainbows often appear after a storm, just as the sun starts to peek back out from behind the clouds.`,
    questions: [
      {
        question: "What is needed to see a rainbow?",
        options: ["Sunlight and rain at the same time", "Only rain", "Only sunlight", "Snow and wind"],
        correctIndex: 0,
      },
      {
        question: "What happens to sunlight when it enters a raindrop?",
        options: ["It bends and splits into colors", "It disappears", "It turns white", "It freezes"],
        correctIndex: 0,
      },
      {
        question: "Which color bends the least?",
        options: ["Red", "Purple", "Blue", "Green"],
        correctIndex: 0,
      },
      {
        question: "Where should the sun be for you to see a rainbow?",
        options: ["Behind you", "In front of you", "Directly overhead", "Setting on the horizon"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-3c",
    gradeBand: 3,
    title: "The Talent Show",
    text: `Every year, Riverside Elementary held a talent show in the gym, and every year, Marcus told himself he would sign up. This year, he finally did. Marcus had been practicing his magic tricks in his bedroom for months, using a deck of cards his uncle had given him for his birthday.

On the night of the show, Marcus waited backstage, his hands slightly shaky as he shuffled his cards over and over. When his name was called, he walked out onto the stage and took a deep breath. He asked a volunteer from the audience to pick a card, remember it, and put it back in the deck. Marcus shuffled the deck three times, then pulled out a card and held it up. It was the exact card the volunteer had picked!

The audience clapped and cheered. Marcus grinned, feeling proud of himself for finally being brave enough to perform. After the show, several classmates asked him to teach them a trick. Marcus realized that trying something new, even when it felt scary, could lead to one of the best nights of the school year.`,
    questions: [
      {
        question: "What talent did Marcus perform?",
        options: ["A magic trick", "A song", "A dance", "A poem"],
        correctIndex: 0,
      },
      {
        question: "Who gave Marcus his deck of cards?",
        options: ["His uncle", "His teacher", "His sister", "His coach"],
        correctIndex: 0,
      },
      {
        question: "How did Marcus feel while waiting backstage?",
        options: ["Slightly shaky and nervous", "Bored", "Angry", "Sleepy"],
        correctIndex: 0,
      },
      {
        question: "What did classmates want after the show?",
        options: [
          "For Marcus to teach them a trick",
          "For Marcus to quit",
          "To buy his cards",
          "To perform with him next year",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-4c",
    gradeBand: 4,
    title: "The Journey of a Raindrop",
    text: `Imagine a single drop of water beginning its journey high above a mountain lake. This drop is part of a continuous process called the water cycle, which has been recycling Earth's water for billions of years.

Our raindrop actually starts as water vapor, an invisible gas that rises from oceans, lakes, and rivers as the sun heats their surfaces. This process is called evaporation. As the water vapor rises higher into the atmosphere, it cools down and changes back into tiny liquid droplets, clustering together to form the clouds we see in the sky. This stage is known as condensation.

Eventually, so many droplets gather inside a cloud that they become too heavy to stay suspended in the air. They fall to the ground as precipitation, which might be rain, snow, sleet, or hail depending on the temperature. Our raindrop, formed this way, falls onto the mountain lake where it began its imagined journey.

From there, the water doesn't simply stop moving. Some of it soaks into the ground, becoming groundwater that plants can absorb through their roots. Some flows into streams and rivers, eventually making its way back to the ocean. Along every step of this journey, the sun's energy keeps driving the cycle forward, evaporating water once again and starting the whole process over.

Understanding the water cycle helps scientists predict weather patterns, manage freshwater resources, and understand how pollution introduced in one place might eventually travel somewhere else entirely, carried along by the same forces that shape rain, rivers, and clouds.`,
    questions: [
      {
        question: "What is the process called when water rises into the air as vapor?",
        options: ["Evaporation", "Condensation", "Precipitation", "Erosion"],
        correctIndex: 0,
      },
      {
        question: "What happens during condensation?",
        options: [
          "Water vapor cools and forms cloud droplets",
          "Water falls as rain",
          "Water soaks into soil",
          "Water freezes into ice",
        ],
        correctIndex: 0,
      },
      {
        question: "What are examples of precipitation mentioned in the passage?",
        options: ["Rain, snow, sleet, or hail", "Only rain", "Fog and mist", "Wind and clouds"],
        correctIndex: 0,
      },
      {
        question: "What keeps the water cycle moving, according to the passage?",
        options: ["The sun's energy", "Ocean currents", "Wind alone", "Gravity alone"],
        correctIndex: 0,
      },
      {
        question: "Why is understanding the water cycle useful to scientists?",
        options: [
          "It helps predict weather and manage water resources",
          "It has no practical use",
          "It only matters for artists",
          "It explains volcanoes",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-5c",
    gradeBand: 5,
    title: "The Time Capsule",
    text: `When the fifth-grade class at Lincoln Elementary learned their school was celebrating its fiftieth anniversary, their teacher, Mr. Ortiz, proposed an unusual project: burying a time capsule that wouldn't be opened for another twenty-five years. The idea captured the class's imagination immediately, and for the next two weeks, students debated passionately about what should go inside.

Some students wanted to include items that represented daily life in the present, arguing that future students would find it fascinating to see an ordinary smartphone case or a favorite snack wrapper. Others pushed for more meaningful contributions, like letters describing their hopes for the future or predictions about what technology might look like in twenty-five years. A heated but good-natured debate broke out over whether to include a class photograph, with some students worried that whoever opened the capsule wouldn't even recognize anyone in it by then.

Eventually, the class settled on a combination: each student wrote a letter to their future self, the class included a newspaper from that week, and they added a small time-locked box containing predictions about future inventions, which everyone found the most entertaining part of the whole project. Maya, who had been quiet during most of the debates, suggested they also include a list of questions for whoever eventually opened the capsule to answer, imagining a kind of conversation stretching across time.

On the day of the burial, the whole class gathered around a hole dug near the school's flagpole, watching as Mr. Ortiz lowered the sealed metal box into the ground. As the dirt was shoveled back over it, several students admitted they felt a strange mixture of excitement and sadness, knowing that by the time the capsule was unearthed, they would be adults with lives none of them could fully imagine yet.`,
    questions: [
      {
        question: "What special anniversary was the school celebrating?",
        options: ["Its fiftieth anniversary", "Its centennial", "Its tenth anniversary", "Its first anniversary"],
        correctIndex: 0,
      },
      {
        question: "How long would it be before the time capsule was opened?",
        options: ["Twenty-five years", "Ten years", "One hundred years", "Five years"],
        correctIndex: 0,
      },
      {
        question: "What idea did Maya suggest?",
        options: [
          "A list of questions for the future opener to answer",
          "That they cancel the project",
          "That they bury a second capsule",
          "That they open it early",
        ],
        correctIndex: 0,
      },
      {
        question: "What items did the class ultimately decide to include?",
        options: [
          "Letters to their future selves, a newspaper, and predictions about inventions",
          "Only a class photo",
          "Money and jewelry",
          "Nothing, they canceled the project",
        ],
        correctIndex: 0,
      },
      {
        question: "How did students feel as the capsule was buried?",
        options: [
          "A mixture of excitement and sadness",
          "Complete boredom",
          "Pure anger",
          "Total indifference",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-6c",
    gradeBand: 6,
    title: "How the Internet Sends a Message",
    text: `When you send a text message or load a webpage, it might feel instantaneous, as though the information travels in one smooth, continuous stream. In reality, the process is far more intricate, relying on a clever system of breaking information into small pieces before sending it anywhere at all.

Before your message leaves your device, it gets divided into small units called packets. Each packet contains a portion of your original message, along with important information about where it came from and where it needs to go, similar to an address written on an envelope. Breaking data into packets allows networks to handle traffic more efficiently, since different packets can travel along different paths simultaneously rather than waiting in a single long line.

Once your packets are created, they travel across a vast web of cables, routers, and satellites that make up the internet's physical infrastructure. Routers act like traffic directors, examining each packet's destination address and deciding the fastest available path to send it along. Because of this system, packets from the same message might actually travel along completely different routes, sometimes crossing entire countries or oceans, before arriving at their destination.

When all the packets finally reach their destination, they don't necessarily arrive in the correct order. The receiving device uses information embedded in each packet to reassemble them correctly, piecing your original message back together, whether that message was a few words of text or the countless packets required to load a single webpage.

This entire process, from breaking your message into packets to reassembling it on the other side, typically takes only a fraction of a second, which is why sending a message across the world can feel just as immediate as sending one to someone in the next room.`,
    questions: [
      {
        question: "What are the small units of data called that a message is divided into?",
        options: ["Packets", "Bytes", "Files", "Nodes"],
        correctIndex: 0,
      },
      {
        question: "What does each packet contain besides part of the message?",
        options: [
          "Information about where it came from and where it's going",
          "A picture",
          "A password",
          "Nothing else",
        ],
        correctIndex: 0,
      },
      {
        question: "What role do routers play in this process?",
        options: [
          "They decide the fastest path for each packet",
          "They create the packets",
          "They delete extra packets",
          "They store messages permanently",
        ],
        correctIndex: 0,
      },
      {
        question: "Why might packets from the same message travel different routes?",
        options: [
          "Because networks can handle traffic more efficiently that way",
          "Because it is required by law",
          "Because packets get lost on purpose",
          "Because computers cannot agree on one path",
        ],
        correctIndex: 0,
      },
      {
        question: "What does the receiving device do when packets arrive out of order?",
        options: [
          "Reassembles them correctly using embedded information",
          "Deletes the message",
          "Sends an error back",
          "Waits for new packets",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-7c",
    gradeBand: 7,
    title: "The Apprentice Blacksmith",
    text: `In 1847, twelve-year-old Nathaniel began his apprenticeship at Hargrove's Forge, the only blacksmith shop within twenty miles of the small farming settlement where his family had recently arrived. His father had arranged the position months earlier, explaining that a trade skill would serve Nathaniel far better in life than continuing to help with the family's struggling crops, which had suffered through two consecutive poor harvests.

The forge itself was unlike anything Nathaniel had encountered before: a cavernous, smoke-filled workshop dominated by an enormous stone hearth that roared with heat even on the coldest mornings. Master Hargrove, a broad-shouldered man with forearms scarred from decades of sparks and hot metal, assigned Nathaniel to the bellows during his first weeks, a seemingly simple task that left the boy's shoulders aching by midday from the repetitive motion required to keep the fire burning at the precise temperature needed for shaping iron.

Gradually, as months passed, Hargrove began teaching Nathaniel more demanding skills: how to judge when metal had reached the correct temperature by the exact shade of orange it glowed, how to strike with the hammer at precisely the right angle to shape rather than merely flatten the iron, and how to plunge a finished piece into the water trough at exactly the right moment to harden it properly without introducing dangerous cracks.

Nathaniel's early attempts were rough and often unusable—a horseshoe with an uneven curve, a hinge that wouldn't swing properly—but Hargrove rarely scolded him for these failures, instead pointing out specifically what had gone wrong and demonstrating the correction himself before handing the tools back. "Every smith ruins a hundred pieces of iron before he makes his first good one," Hargrove told him during one particularly frustrating afternoon, "the difference between a smith and someone who quits is simply which side of that hundred they stop counting on."

By the end of his second year, Nathaniel could forge simple tools and hardware competently enough that neighboring farms began requesting his work specifically, and for the first time since his family's difficult harvests, Nathaniel felt a growing confidence that he had found something at which he might genuinely excel.`,
    questions: [
      {
        question: "Why did Nathaniel's father arrange the apprenticeship?",
        options: [
          "He believed a trade skill would serve Nathaniel better than farming",
          "He wanted Nathaniel out of the house",
          "Nathaniel demanded it",
          "The family had extra money to spend",
        ],
        correctIndex: 0,
      },
      {
        question: "What was Nathaniel's first task at the forge?",
        options: ["Working the bellows", "Striking the hammer", "Selling tools", "Feeding the horses"],
        correctIndex: 0,
      },
      {
        question: "How did Hargrove typically respond to Nathaniel's early mistakes?",
        options: [
          "He pointed out what went wrong and demonstrated the correction",
          "He fired Nathaniel",
          "He ignored the mistakes completely",
          "He punished Nathaniel harshly",
        ],
        correctIndex: 0,
      },
      {
        question: 'What does Hargrove\'s quote about "a hundred pieces of iron" suggest?',
        options: [
          "That persistence through failure is part of mastering a skill",
          "That iron is a wasteful material",
          "That Nathaniel should give up",
          "That counting is more important than skill",
        ],
        correctIndex: 0,
      },
      {
        question: "How had Nathaniel's situation changed by the end of his second year?",
        options: [
          "Neighboring farms requested his work, and he felt growing confidence",
          "He quit the apprenticeship",
          "He returned to farming full-time",
          "He became the forge's owner",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-8c",
    gradeBand: 8,
    title: "The Discovery of Penicillin",
    text: `In September 1928, Scottish bacteriologist Alexander Fleming returned to his cluttered laboratory at St. Mary's Hospital in London after a month-long vacation, expecting to resume his research into staphylococcus bacteria much as he had left it. Instead, he noticed something unusual among the stack of petri dishes he had left unwashed on his workbench, an oversight that would ultimately transform modern medicine.

One dish, which had been contaminated by a stray mold spore, showed a curious pattern: a clear ring surrounded the mold colony, an area where the staphylococcus bacteria appeared to have been killed or prevented from growing altogether. Rather than dismissing this contamination as a failed experiment, Fleming's scientific curiosity led him to investigate further. He identified the mold as belonging to the genus Penicillium and began a series of experiments to understand what substance it was producing that seemed capable of destroying bacteria so effectively.

Fleming published his findings in 1929, naming the antibacterial substance "penicillin," but the scientific community's response was notably muted. Producing the substance in quantities large enough for practical medical use proved extraordinarily difficult with the technology and techniques available at the time, and Fleming himself eventually moved on to other research, apparently convinced that penicillin's potential as a therapeutic drug was limited by these production challenges.

It would take another decade, and the urgent medical demands of World War II, before a team of researchers at Oxford University—led by Howard Florey and Ernst Chain—revisited Fleming's discovery with renewed determination. Their team developed methods to purify and mass-produce penicillin, transforming what had been a laboratory curiosity into a life-saving medical treatment. Clinical trials during the early 1940s demonstrated penicillin's remarkable effectiveness against bacterial infections that had previously proven fatal or required amputation to prevent the spread of infection through the body.

By the time Allied forces stormed the beaches at Normandy in 1944, penicillin production had scaled up enough to treat wounded soldiers on a massive scale, saving countless lives that would otherwise have been lost to infected wounds. Fleming, Florey, and Chain were jointly awarded the Nobel Prize in Physiology or Medicine in 1945, recognition of a discovery that began, almost accidentally, with a single unwashed petri dish and a scientist curious enough not to simply throw it away.`,
    questions: [
      {
        question: "What did Fleming notice when he returned to his lab in 1928?",
        options: [
          "A mold had killed bacteria in a contaminated petri dish",
          "His experiments had all failed",
          "A new bacteria species had formed",
          "His equipment had been stolen",
        ],
        correctIndex: 0,
      },
      {
        question: "What genus did Fleming identify the mold as belonging to?",
        options: ["Penicillium", "Staphylococcus", "Bacillus", "Streptococcus"],
        correctIndex: 0,
      },
      {
        question: "Why did Fleming's initial discovery have limited impact?",
        options: [
          "Producing penicillin in large quantities was extraordinarily difficult at the time",
          "No one believed his results",
          "He never published his findings",
          "The mold was too rare to find again",
        ],
        correctIndex: 0,
      },
      {
        question: "Who developed methods to purify and mass-produce penicillin?",
        options: ["Howard Florey and Ernst Chain", "Fleming alone", "A team in Scotland", "The U.S. military"],
        correctIndex: 0,
      },
      {
        question: "What historical event created urgent demand for penicillin's mass production?",
        options: ["World War II", "The Great Depression", "World War I", "The Industrial Revolution"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-9c",
    gradeBand: 9,
    title: "The Last Train Home",
    text: `Eleanor had exactly eleven minutes to make the last train, and the taxi idling at the curb outside the conference center might as well have been parked on the moon for how far away it suddenly felt as she calculated the walk versus the wait versus the very real possibility that traffic on Fifth Street would make either option irrelevant. She had promised herself, driving into the city that morning, that she would leave the networking reception by seven regardless of how the conversations were going, and for the first ninety minutes she had kept that promise easily in mind, checking her watch periodically between introductions and forgettable exchanges of business cards.

Then Dr. Whitfield had approached her table, and every carefully maintained sense of time had dissolved into the particular kind of urgency that comes from realizing you are speaking, entirely by accident, with someone whose research has shaped the trajectory of your entire career without either of you having previously met. Their conversation about longitudinal data collection methods had stretched from what Eleanor intended as a brief, polite introduction into nearly forty-five unplanned minutes, minutes she did not regret even now, jogging toward the train platform with her laptop bag slapping uncomfortably against her hip.

The station clock, when she finally reached it, read six minutes past the hour, and the platform itself was nearly empty except for a maintenance worker sweeping near the far end, an emptiness that told Eleanor everything she needed to know before she'd even fully processed it. The last train to Millbrook had already departed, precisely on schedule, precisely as she had known it would if her calculations back at the conference center had been accurate, which apparently they had been.

Sitting on a cold metal bench to wait for the first morning train, nearly six hours away, Eleanor found herself, somewhat to her own surprise, unable to summon the frustration she expected to feel. She pulled out her phone and began drafting an email to Dr. Whitfield, not the perfunctory thank-you note she might have sent after a shorter exchange, but a genuine follow-up question about a methodological detail that had been turning over in her mind since their conversation ended. Missing the train, she realized while typing, had cost her a night's sleep in her own bed and would require an uncomfortable, apologetic phone call to her partner waiting at home. But measured against an unplanned conversation that had already reshaped how she intended to approach her own research for the next several years, the trade seemed, on reflection, entirely worth having made, even if she wouldn't have chosen it deliberately at the time.`,
    questions: [
      {
        question: "Why did Eleanor miss the last train?",
        options: [
          "An unplanned, extended conversation with Dr. Whitfield ran long",
          "Traffic blocked her taxi",
          "She fell asleep at the reception",
          "The train left early",
        ],
        correctIndex: 0,
      },
      {
        question: "How did Eleanor initially plan to manage her time at the reception?",
        options: [
          "By leaving by seven regardless of the conversations",
          "By staying as late as possible",
          "By skipping the reception entirely",
          "By leaving immediately after arriving",
        ],
        correctIndex: 0,
      },
      {
        question: "What was significant about the conversation with Dr. Whitfield?",
        options: [
          "Their research had shaped Eleanor's career, though they had never met",
          "They were old friends catching up",
          "Dr. Whitfield was Eleanor's former professor",
          "It was a scheduled meeting",
        ],
        correctIndex: 0,
      },
      {
        question: "How did Eleanor feel while waiting for the next train?",
        options: [
          "Surprisingly not as frustrated as she expected",
          "Furious and regretful",
          "Completely indifferent",
          "Relieved to have an excuse to leave",
        ],
        correctIndex: 0,
      },
      {
        question: "What did Eleanor decide the missed train was ultimately worth?",
        options: [
          "An unplanned conversation that reshaped her approach to research",
          "Nothing; she regretted the whole evening",
          "A chance to rest before the morning",
          "A free night away from home",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "level-10c",
    gradeBand: 10,
    title: "The Ethics of Artificial Intelligence in Everyday Decisions",
    text: `As artificial intelligence systems increasingly mediate decisions once reserved exclusively for human judgment—from loan approvals and hiring recommendations to medical diagnoses and parole assessments—a pressing ethical question has moved from academic philosophy departments into mainstream public discourse: to what extent should algorithmic systems be trusted with decisions that carry significant consequences for people's lives, and what safeguards, if any, can adequately address the risks such systems introduce?

Proponents of expanded AI decision-making frequently point to consistency as a primary advantage over human judgment. Human decision-makers, however well-intentioned, are demonstrably susceptible to fatigue, unconscious bias, and inconsistent standards applied across similar cases; a judge's sentencing decisions, research has shown, can be measurably influenced by factors as seemingly irrelevant as the time of day or whether the judge has recently eaten. Algorithmic systems, properly designed, offer at least the theoretical possibility of applying identical criteria uniformly across every case they evaluate, without the fluctuations that characterize human cognition.

Critics, however, raise a countervailing concern that has proven remarkably persistent: algorithmic systems do not eliminate bias so much as they can encode and obscure it, often rendering it more difficult to identify and challenge than bias in human decision-making. An algorithm trained on historical hiring data, for instance, may learn to replicate discriminatory patterns present in that historical data, effectively automating and scaling up biases that a human reviewer might, at least occasionally, recognize and consciously override. Because these systems frequently operate as "black boxes," with decision-making processes too complex for even their creators to fully explain, affected individuals may find it substantially more difficult to understand, let alone contest, an unfavorable algorithmic decision than they would a human one.

This tension between consistency and opacity has prompted growing calls for what researchers term "algorithmic accountability"—a set of practices and, increasingly, legal requirements designed to ensure that automated decision-making systems remain auditable, explainable, and subject to meaningful human oversight. Some jurisdictions have begun mandating that individuals affected by significant algorithmic decisions receive an explanation of the factors involved and retain the right to request human review, though implementing these requirements in practice has proven considerably more complicated than establishing them in principle, particularly for systems whose internal logic even their own engineers struggle to fully articulate.

Perhaps the most productive framing to emerge from this ongoing debate treats the question not as a binary choice between human and algorithmic decision-making, but as a matter of designing thoughtful collaboration between the two: leveraging algorithmic consistency and pattern recognition across large datasets while preserving meaningful human judgment, particularly for decisions involving unusual circumstances, competing values, or consequences severe enough to warrant the deliberative, context-sensitive reasoning that remains, at least for now, a distinctly human capacity.`,
    questions: [
      {
        question: "What advantage do proponents of AI decision-making frequently emphasize?",
        options: [
          "Consistency compared to fluctuating human judgment",
          "Lower cost only",
          "Faster processing speed only",
          "Total elimination of all bias",
        ],
        correctIndex: 0,
      },
      {
        question: "What is the main criticism raised against algorithmic decision-making described in the passage?",
        options: [
          "It can encode and obscure existing biases, making them harder to challenge",
          "It is always slower than human judgment",
          "It has no practical uses",
          "It is completely free of any flaws",
        ],
        correctIndex: 0,
      },
      {
        question: 'What does the passage mean by systems operating as "black boxes"?',
        options: [
          "Their decision-making processes are too complex to fully explain, even to their creators",
          "They are physically colored black",
          "They only work in the dark",
          "They are outdated technology",
        ],
        correctIndex: 0,
      },
      {
        question: '"Algorithmic accountability," as described in the passage, refers to:',
        options: [
          "Practices ensuring automated systems remain auditable, explainable, and subject to human oversight",
          "A law banning all AI systems",
          "A method for making algorithms faster",
          "A term for algorithm marketing",
        ],
        correctIndex: 0,
      },
      {
        question: "What framing does the passage suggest is most productive for this debate?",
        options: [
          "Designing thoughtful collaboration between human and algorithmic decision-making",
          "Banning AI entirely from decision-making",
          "Removing all human oversight from decisions",
          "Treating the issue as already fully resolved",
        ],
        correctIndex: 0,
      },
    ],
  },
];

export function getPassageById(id: string): Passage | undefined {
  return passages.find((p) => p.id === id);
}

export function passagesForGrade(gradeBand: number): Passage[] {
  return passages.filter((p) => p.gradeBand === gradeBand);
}
