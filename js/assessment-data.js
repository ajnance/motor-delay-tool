function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const AGE_MONTHS = {
  "2m": 2, "4m": 4, "6m": 6, "9m": 9, "12m": 12,
  "15m": 15, "18m": 18, "24m": 24, "30m": 30,
  "36m": 36, "48m": 48, "60m": 60
};

const AGE_LABELS = {
  "2m": "2 months", "4m": "4 months", "6m": "6 months",
  "9m": "9 months", "12m": "12 months", "15m": "15 months",
  "18m": "18 months", "24m": "2 years", "30m": "2.5 years",
  "36m": "3 years", "48m": "4 years", "60m": "5 years"
};

const SKILL_AGE_MONTHS = {
  "2 months": 2, "4 months": 4, "6 months": 6, "9 months": 9,
  "12 months": 12, "15 months": 15, "18 months": 18,
  "2 years": 24, "2.5 years": 30, "3 years": 36,
  "4 years": 48, "5 years": 60
};

const CATEGORIES = [
  { id: "hold-head", title: "Hold Head Up", icon: "hold-head-up", category: "Hold head up" },
  { id: "roll-over", title: "Roll Over", icon: "roll-over", category: "Roll over" },
  { id: "use-hands", title: "Use Hands", icon: "use-hands", category: "Use hands" },
  { id: "sit", title: "Sit", icon: "sit", category: "Sit" },
  { id: "stand", title: "Stand", icon: "stand", category: "Stand" },
  { id: "walk", title: "Walk", icon: "walk", category: "Walk" },
  { id: "climb", title: "Climb", icon: "climb", category: "Climb" },
  { id: "run", title: "Run", icon: "run", category: "Run" }
];

const MASTER_SKILLS = [
  { skillCategory: "Hold head up", skillName: "Hold head up during tummy time", age: "2 months", tryIt: "Place your baby on their stomach during awake tummy time. Can they lift their head from the surface for a short time?", shortDescription: "Your baby can lift and hold their head up briefly while lying on their stomach." },
  { skillCategory: "Hold head up", skillName: "Hold head steady", age: "4 months", tryIt: "Hold your baby upright with support around their body. Does their head stay steady instead of flopping forward or to the side?", shortDescription: "Your baby can hold their head steady without support when being held upright." },
  { skillCategory: "Hold head up", skillName: "Control head and neck when pulled to sit", age: "4 months", tryIt: "Lay your baby on their back and gently pull them toward sitting while holding their hands. Does their head come forward with their body instead of lagging behind?", shortDescription: "Your baby can keep their head in line with their body when gently pulled toward a sitting position." },
  { skillCategory: "Hold head up", skillName: "Push up to elbows", age: "4 months", tryIt: "Place your baby on their stomach during awake tummy time. Can they lift their head and push up onto their elbows?", shortDescription: "Your baby can lift their head and chest and push up onto their elbows during tummy time." },
  { skillCategory: "Concerns", skillName: "Muscle tone", age: "all ages", tryIt: "Notice how your child's body feels when you hold, dress, carry, or move them. Do their arms, legs, neck, or body seem unusually stiff, tight, loose, or floppy?", shortDescription: "Your child's muscles may seem unusually stiff, tight, loose, or floppy." },
  { skillCategory: "Roll over", skillName: "Get ready to roll", age: "4 months", tryIt: "Place your baby on their back or stomach while they are awake. Can they lift their head and upper shoulders from the surface?", shortDescription: "Your baby can lift their head and upper shoulders while lying on their back or stomach." },
  { skillCategory: "Roll over", skillName: "Roll both ways", age: "6 months", tryIt: "Place your baby on a safe, flat surface while awake. Can they roll from their tummy to their back and from their back to their tummy?", shortDescription: "Your baby can roll from tummy to back and from back to tummy." },
  { skillCategory: "Roll over", skillName: "Push up on forearms", age: "6 months", tryIt: "Place your baby on their stomach during awake tummy time. Can they push their chest up using their elbows and forearms?", shortDescription: "Your baby can push up onto their elbows and forearms while lying on their stomach." },
  { skillCategory: "Use hands", skillName: "Open hands briefly", age: "2 months", tryIt: "Watch your baby's hands when they are awake and calm. Do they open their hands briefly on their own?", shortDescription: "Your baby can open their hands briefly instead of keeping them in fists all the time." },
  { skillCategory: "Use hands", skillName: "Move arms and legs", age: "2 months", tryIt: "Lay your baby on their back and hold a toy where they can see it. Do they move both arms and legs and try to reach toward the toy?", shortDescription: "Your baby moves both arms and both legs and may try to reach toward a nearby object." },
  { skillCategory: "Use hands", skillName: "Bring hands to mouth", age: "4 months", tryIt: "Watch your baby while they are awake and calm. Can they bring one or both hands to their mouth?", shortDescription: "Your baby can bring either hand to their mouth." },
  { skillCategory: "Use hands", skillName: "Hold on to an object", age: "4 months", tryIt: "Place a small toy in your baby's hand. Can they hold on to it briefly with either hand?", shortDescription: "Your baby can hold a toy or small object in either hand." },
  { skillCategory: "Use hands", skillName: "Swing or bat at toys", age: "4 months", tryIt: "Place your baby on their back or in a reclined position with a toy within reach. Do they swing or bat at the toy with their hands?", shortDescription: "Your baby can swing or bat at toys with their hands." },
  { skillCategory: "Use hands", skillName: "Hold toy with both hands", age: "6 months", tryIt: "Offer your baby a toy that is easy to grasp. Can they hold it using both hands at the same time?", shortDescription: "Your baby can use both hands at the same time to hold a toy." },
  { skillCategory: "Use hands", skillName: "Grab, reach for, or hold a toy", age: "6 months", tryIt: "Place a toy within your baby's reach. Can they reach for it, grab it, and hold it?", shortDescription: "Your baby can reach for a toy, grasp it, and hold it in their hand." },
  { skillCategory: "Use hands", skillName: "Rake food with fingers", age: "9 months", tryIt: "Place a few small, safe pieces of food on your baby's tray. Can they use their fingers to pull the food toward them?", shortDescription: "Your baby can use their fingers to rake small pieces of food toward them." },
  { skillCategory: "Use hands", skillName: "Bang two things together", age: "9 months", tryIt: "Give your baby two small toys or blocks. Can they bring them together and bang them?", shortDescription: "Your baby can hold an object in each hand and bang them together." },
  { skillCategory: "Use hands", skillName: "Lift two hands to be picked up", age: "9 months", tryIt: "Stand or sit near your baby and reach toward them. Do they lift both hands or arms toward you to be picked up?", shortDescription: "Your baby can lift both hands or arms to show they want to be picked up." },
  { skillCategory: "Use hands", skillName: "Pass object from one hand to the other", age: "9 months", tryIt: "Place a small toy in one of your baby's hands. Can they pass it from one hand to the other?", shortDescription: "Your baby can move an object from one hand to the other." },
  { skillCategory: "Use hands", skillName: "Pick up small objects", age: "12 months", tryIt: "Place a small, safe piece of food on your baby's tray. Can they pick it up using their thumb and pointer finger?", shortDescription: "Your baby can pick up small objects using their thumb and pointer finger." },
  { skillCategory: "Use hands", skillName: "Place object in container", age: "12 months", tryIt: "Give your baby a block and a cup or small container. Can they put the block into the container?", shortDescription: "Your baby can put an object into a container." },
  { skillCategory: "Use hands", skillName: "Clap when excited", age: "15 months", tryIt: "Play a simple game, sing a song, or celebrate with your child. Do they clap their hands when excited?", shortDescription: "Your child can clap their hands when excited." },
  { skillCategory: "Use hands", skillName: "Point to ask for something", age: "15 months", tryIt: "Place a favorite toy or snack where your child can see it but not reach it. Do they point to ask for it or get help?", shortDescription: "Your child can point to ask for something or get help." },
  { skillCategory: "Use hands", skillName: "Stack two objects", age: "15 months", tryIt: "Give your child two small blocks or similar objects. Can they place one on top of the other?", shortDescription: "Your child can stack at least two small objects, such as blocks." },
  { skillCategory: "Use hands", skillName: "Pick up small objects with pincer grasp", age: "15 months", tryIt: "Place a small, safe piece of food on your child's tray. Can they pick it up using their thumb and pointer finger?", shortDescription: "Your child can pick up small objects using their thumb and pointer finger." },
  { skillCategory: "Use hands", skillName: "Scribble", age: "18 months", tryIt: "Give your child a crayon or marker and a piece of paper. Can they make marks on the paper?", shortDescription: "Your child can use a crayon or marker to make marks on paper." },
  { skillCategory: "Use hands", skillName: "Drink from a cup", age: "18 months", tryIt: "Offer your child a small amount of water in an open cup. Can they bring the cup to their mouth and drink from it?", shortDescription: "Your child can use a cup without a lid to drink. They may spill." },
  { skillCategory: "Use hands", skillName: "Use fingers to feed self", age: "18 months", tryIt: "Place small, safe pieces of food on your child's tray. Can they pick up the food with their fingers and bring it to their mouth?", shortDescription: "Your child can use their fingers to pick up food and feed themselves." },
  { skillCategory: "Use hands", skillName: "Try to use a spoon", age: "18 months", tryIt: "Give your child a spoon and a soft food, like yogurt or applesauce. Can they try to scoop the food and bring the spoon toward their mouth?", shortDescription: "Your child can try to use a spoon to feed themselves. They may spill or drop food." },
  { skillCategory: "Use hands", skillName: "Use two hands for different parts of a task", age: "2 years", tryIt: "Give your child a container with a lid. Can they hold the container with one hand while using the other hand to remove the lid?", shortDescription: "Your child can use both hands for different parts of a task at the same time." },
  { skillCategory: "Use hands", skillName: "Eat with a spoon", age: "2 years", tryIt: "Give your child a spoon and a soft food, like yogurt or applesauce. Can they scoop the food and bring the spoon to their mouth?", shortDescription: "Your child can use a spoon to feed themselves." },
  { skillCategory: "Use hands", skillName: "Use switches, knobs, or buttons on a toy", age: "2 years", tryIt: "Give your child a toy with buttons, knobs, or switches. Can they try to press, turn, or move them?", shortDescription: "Your child can try to turn knobs, press buttons, or use switches on a toy." },
  { skillCategory: "Use hands", skillName: "Twist things with hands", age: "2.5 years", tryIt: "Offer your child a safe object that twists, such as a large toy knob or container lid. Can they turn it with their hand?", shortDescription: "Your child can use their hands to twist things, such as turning a door knob." },
  { skillCategory: "Use hands", skillName: "Turn pages one at a time", age: "2.5 years", tryIt: "Read a board book or picture book with your child. Can they turn one page at a time?", shortDescription: "Your child can turn book pages one at a time." },
  { skillCategory: "Use hands", skillName: "Copy a circle", age: "3 years", tryIt: "Draw a simple circle on paper and give your child a crayon. Can they try to draw a circle like yours?", shortDescription: "Your child can draw a circle after you show them how." },
  { skillCategory: "Use hands", skillName: "String items", age: "3 years", tryIt: "Give your child large beads or pasta and a thick string. Can they place the items onto the string?", shortDescription: "Your child can string large items together, such as large beads or macaroni." },
  { skillCategory: "Use hands", skillName: "Use a fork", age: "3 years", tryIt: "Give your child a child-safe fork and soft food pieces. Can they use the fork to pick up food and bring it to their mouth?", shortDescription: "Your child can use a fork to eat." },
  { skillCategory: "Use hands", skillName: "Catch a ball", age: "4 years", tryIt: "Stand close to your child and gently toss a large, soft ball toward their chest. Can they catch it most of the time?", shortDescription: "Your child can catch a large ball most of the time." },
  { skillCategory: "Use hands", skillName: "Unbutton some buttons", age: "4 years", tryIt: "Give your child a shirt, jacket, or dressing toy with large buttons. Can they unbutton some of the buttons?", shortDescription: "Your child can unbutton some buttons on clothing." },
  { skillCategory: "Use hands", skillName: "Grip a crayon", age: "4 years", tryIt: "Give your child a crayon or pencil and ask them to draw. Do they hold it between their fingers and thumb instead of in a fist?", shortDescription: "Your child can hold a crayon or pencil between their fingers and thumb instead of in a fist." },
  { skillCategory: "Use hands", skillName: "Button some buttons", age: "5 years", tryIt: "Give your child a shirt, jacket, or dressing toy with large buttons. Can they button some of the buttons?", shortDescription: "Your child can button some buttons on clothing." },
  { skillCategory: "Sit", skillName: "Balance with hands", age: "6 months", tryIt: "Place your baby in a seated position on a safe, soft surface and stay close. Can they sit with support and use their hands to help balance?", shortDescription: "Your baby can sit with support and use their hands to help balance." },
  { skillCategory: "Sit", skillName: "Sit without support", age: "9 months", tryIt: "Place your baby in a seated position on a safe, soft surface and stay close. Can they sit without leaning on their hands or another support?", shortDescription: "Your baby can sit without support and does not need to lean on their hands to stay balanced." },
  { skillCategory: "Stand", skillName: "Stand with support", age: "4 months", tryIt: "Hold your baby under their arms with their feet on a firm surface. Can they straighten their legs, push down, or bounce?", shortDescription: "Your baby can support some weight on their legs when held upright with their feet on a hard surface." },
  { skillCategory: "Stand", skillName: "Stand", age: "12 months", tryIt: "Place your baby near a low table, couch, or wall. Can they use it to pull themselves up into a standing position?", shortDescription: "Your baby can pull up to a standing position using a low table, couch, or wall." },
  { skillCategory: "Stand", skillName: "Stand up from the floor", age: "18 months", tryIt: "Have your child sit on the floor with space around them. Can they stand up without using their hands, arms, furniture, or another person for support?", shortDescription: "Your child can stand up from the floor without using their hands, arms, furniture, or another person for support." },
  { skillCategory: "Walk", skillName: "Cruise", age: "12 months", tryIt: "Place your child near a couch, low table, or other stable furniture. Can they take steps sideways while holding on?", shortDescription: "Your child can walk while holding onto furniture." },
  { skillCategory: "Walk", skillName: "Take steps", age: "15 months", tryIt: "Stand close to your child on a safe surface and encourage them to come toward you. Can they take a few steps without holding on?", shortDescription: "Your child can take a few steps on their own without holding on." },
  { skillCategory: "Walk", skillName: "Walk without holding on", age: "18 months", tryIt: "Place your child on a safe, flat surface. Can they walk across the room without holding on?", shortDescription: "Your child can walk without holding on to anyone or anything." },
  { skillCategory: "Walk", skillName: "Walk steadily", age: "2 years", tryIt: "Watch your child walk across a room or hallway. Do they walk steadily without tripping or falling more than expected?", shortDescription: "Your child can walk steadily on their own without frequently tripping or falling." },
  { skillCategory: "Walk", skillName: "Walk with typical arm and hip movement", age: "3 years", tryIt: "Watch your child walk down a hallway or sidewalk. Does their walk look steady without unusual arm swinging or hip swaying?", shortDescription: "Your child can walk steadily without unusual arm swinging or side-to-side hip movement." },
  { skillCategory: "Walk", skillName: "Walk like a big kid", age: "5 years", tryIt: "Watch your child walk across a room, hallway, or sidewalk. Do they usually walk with their heels down instead of mostly on their toes?", shortDescription: "Your child walks more like an older child or adult and does not usually walk on their toes." },
  { skillCategory: "Walk", skillName: "Used to walk and now has stopped walking", age: "Any age", tryIt: "Think about your child's recent movement. Have they stopped walking after previously being able to walk?", shortDescription: "Your child used to walk but no longer does." },
  { skillCategory: "Walk", skillName: "Unusual waddle when walking", age: "Any age", tryIt: "Watch your child walk from behind and from the side. Does their walk look like a waddle or seem unusual compared with other children their age?", shortDescription: "Your child's walk looks like a waddle or appears different from other children their age." },
  { skillCategory: "Walk", skillName: "Gets tired from walking", age: "Any age", tryIt: "Think about walks, errands, or playtime. Does your child need to stop or rest much sooner than other children their age?", shortDescription: "Your child seems to get much more tired from walking than other children the same age." },
  { skillCategory: "Climb", skillName: "Climb onto a seat", age: "18 months", tryIt: "Stay close while your child is near a low couch or sturdy chair. Can they climb on and off without help?", shortDescription: "Your child can climb on and off a couch or chair without help." },
  { skillCategory: "Climb", skillName: "Go up stairs", age: "2 years", tryIt: "Stay close while your child approaches a few stairs. Can they walk up the stairs with or without holding a hand or railing?", shortDescription: "Your child can walk up a few stairs with or without help, instead of climbing with their hands." },
  { skillCategory: "Climb", skillName: "Get undressed", age: "2.5 years", tryIt: "Give your child an open jacket, loose pants, or similar clothing. Can they take it off without help?", shortDescription: "Your child can take off some clothing, such as an open jacket or loose pants, without help." },
  { skillCategory: "Climb", skillName: "Get dressed", age: "3 years", tryIt: "Give your child a jacket, loose pants, or similar clothing. Can they put it on without help?", shortDescription: "Your child can put on some clothing, such as a jacket or loose pants, without help." },
  { skillCategory: "Run", skillName: "Run", age: "2 years", tryIt: "Ask your child to run a short distance on a safe, open surface. Can they run instead of only walking quickly?", shortDescription: "Your child can run." },
  { skillCategory: "Run", skillName: "Kick a ball", age: "2 years", tryIt: "Place a large, soft ball in front of your child. Can they swing one leg forward to kick it?", shortDescription: "Your child can kick a ball." },
  { skillCategory: "Run", skillName: "Jump", age: "2.5 years", tryIt: "Ask your child to jump on a safe, flat surface. Do both feet leave the ground at the same time?", shortDescription: "Your child can jump off the ground with both feet." },
  { skillCategory: "Run", skillName: "Stay balanced when running", age: "3 years", tryIt: "Watch your child run on a safe, open surface. Do they stay balanced without tripping or falling more than expected?", shortDescription: "Your child can run without frequently tripping, falling, or seeming much clumsier than other children their age." },
  { skillCategory: "Run", skillName: "Hop on one foot", age: "5 years", tryIt: "Ask your child to stand on one foot and hop on a safe, flat surface. Can they hop on one foot?", shortDescription: "Your child can hop on one foot." },
  { skillCategory: "Run", skillName: "Gets tired from running", age: "Any age", tryIt: "Watch your child during active play. Do they need to stop running or rest much sooner than other children their age?", shortDescription: "Your child seems to get tired very quickly from running or cannot keep up with most playmates the same age." }
];

const ALL_STEPS = [
  { id: "start", label: "Start", icon: "start" },
  { id: "hold-head", label: "Hold Head Up", icon: "hold-head-up" },
  { id: "roll-over", label: "Roll Over", icon: "roll-over" },
  { id: "use-hands", label: "Use Hands", icon: "use-hands" },
  { id: "sit", label: "Sit", icon: "sit" },
  { id: "stand", label: "Stand", icon: "stand" },
  { id: "walk", label: "Walk", icon: "walk" },
  { id: "climb", label: "Climb", icon: "climb" },
  { id: "run", label: "Run", icon: "run" },
  { id: "summary", label: "Summary", icon: "summary" }
];

function getSkillsForAge(ageCode) {
  const maxMonths = AGE_MONTHS[ageCode];
  if (!maxMonths) return null;

  const sections = [];

  CATEGORIES.forEach(cat => {
    const catSkills = MASTER_SKILLS.filter(s => s.skillCategory === cat.category);
    const hasAgeSpecific = catSkills.some(s =>
      s.age !== "Any age" && SKILL_AGE_MONTHS[s.age] <= maxMonths
    );
    const isAlwaysShow = catSkills.every(s => s.age === "Any age");

    if (!hasAgeSpecific && !isAlwaysShow) return;

    const skills = catSkills
      .filter(s => s.age === "Any age" || SKILL_AGE_MONTHS[s.age] <= maxMonths)
      .map(s => ({
        id: slugify(s.skillName),
        name: s.skillName,
        description: s.shortDescription,
        tryIt: s.tryIt,
        hasVideo: false
      }));

    if (skills.length > 0) {
      sections.push({
        id: cat.id,
        title: cat.title,
        icon: cat.icon,
        skills
      });
    }
  });

  return { ageLabel: AGE_LABELS[ageCode], sections };
}

function getStepsForAge(ageCode) {
  const data = getSkillsForAge(ageCode);
  if (!data) return ALL_STEPS;
  const sectionIds = new Set(data.sections.map(s => s.id));
  return ALL_STEPS.filter(s =>
    s.id === "start" || s.id === "summary" || sectionIds.has(s.id)
  );
}
