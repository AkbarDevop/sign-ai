// Russian Sign Language Dactyl Alphabet (fingerspelling)
// Each letter maps to a simplified hand pose description for the SVG avatar
// Poses define: right hand shape, right arm position, optional left hand

export interface HandPose {
  // Right hand finger positions (0 = closed, 1 = extended)
  thumb: number;
  index: number;
  middle: number;
  ring: number;
  pinky: number;
  // Hand orientation
  rotation: number; // degrees
  // Arm position
  armX: number; // -1 to 1 (left to right relative to body)
  armY: number; // 0 to 1 (bottom to top)
  // Optional description
  description: string;
}

// Simplified RSL alphabet hand poses
export const RSL_ALPHABET: Record<string, HandPose> = {
  "А": { thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "Index finger pointing up" },
  "Б": { thumb: 0, index: 1, middle: 1, ring: 1, pinky: 1, rotation: 0, armX: 0.3, armY: 0.7, description: "Four fingers extended, thumb tucked" },
  "В": { thumb: 0, index: 1, middle: 1, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "V shape - two fingers" },
  "Г": { thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0, rotation: -90, armX: 0.3, armY: 0.7, description: "Index finger horizontal" },
  "Д": { thumb: 1, index: 1, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "Thumb and index extended" },
  "Е": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.65, description: "Loose fist" },
  "Ж": { thumb: 0, index: 1, middle: 1, ring: 0, pinky: 1, rotation: 0, armX: 0.3, armY: 0.7, description: "Three fingers spread" },
  "З": { thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0, rotation: -45, armX: 0.3, armY: 0.7, description: "Curved index finger" },
  "И": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 1, rotation: 0, armX: 0.3, armY: 0.7, description: "Pinky extended" },
  "К": { thumb: 1, index: 1, middle: 1, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "Three fingers up" },
  "Л": { thumb: 1, index: 1, middle: 0, ring: 0, pinky: 0, rotation: 45, armX: 0.3, armY: 0.7, description: "L shape" },
  "М": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.2, armY: 0.6, description: "Fist with thumb under three fingers" },
  "Н": { thumb: 0, index: 1, middle: 1, ring: 0, pinky: 0, rotation: -90, armX: 0.3, armY: 0.7, description: "H shape horizontal" },
  "О": { thumb: 1, index: 1, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "O shape - thumb touches index" },
  "П": { thumb: 0, index: 1, middle: 1, ring: 0, pinky: 0, rotation: -90, armX: 0.3, armY: 0.65, description: "Two fingers pointing down" },
  "Р": { thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "Index pointing up, wrist twist" },
  "С": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "C shape - curved hand" },
  "Т": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.25, armY: 0.65, description: "Fist with thumb between fingers" },
  "У": { thumb: 1, index: 0, middle: 0, ring: 0, pinky: 1, rotation: 0, armX: 0.3, armY: 0.7, description: "Y shape - thumb and pinky" },
  "Ф": { thumb: 1, index: 0, middle: 1, ring: 1, pinky: 1, rotation: 0, armX: 0.3, armY: 0.7, description: "Thumb touches index circle" },
  "Х": { thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0, rotation: -30, armX: 0.3, armY: 0.7, description: "Hooked index finger" },
  "Ц": { thumb: 0, index: 1, middle: 1, ring: 0, pinky: 0, rotation: -90, armX: 0.3, armY: 0.65, description: "Two fingers down with motion" },
  "Ч": { thumb: 0, index: 1, middle: 1, ring: 1, pinky: 0, rotation: -90, armX: 0.3, armY: 0.65, description: "Three fingers pointing down" },
  "Ш": { thumb: 0, index: 1, middle: 1, ring: 1, pinky: 0, rotation: 0, armX: 0.3, armY: 0.7, description: "Three fingers up spread" },
  "Щ": { thumb: 0, index: 1, middle: 1, ring: 1, pinky: 0, rotation: -45, armX: 0.3, armY: 0.65, description: "Three fingers with motion" },
  "Ъ": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.2, armY: 0.6, description: "Fist palm forward" },
  "Ы": { thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.65, description: "Index up from fist" },
  "Ь": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.25, armY: 0.65, description: "Relaxed fist" },
  "Э": { thumb: 0, index: 1, middle: 0, ring: 0, pinky: 0, rotation: -45, armX: 0.35, armY: 0.7, description: "Curved hand backward" },
  "Ю": { thumb: 1, index: 0, middle: 0, ring: 0, pinky: 1, rotation: 0, armX: 0.3, armY: 0.7, description: "Thumb and pinky with rotation" },
  "Я": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 1, rotation: 0, armX: 0.3, armY: 0.7, description: "Pinky with wrist motion" },
  "Й": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 1, rotation: 15, armX: 0.3, armY: 0.7, description: "Pinky with shake" },
  "Ё": { thumb: 0, index: 0, middle: 0, ring: 0, pinky: 0, rotation: 0, armX: 0.3, armY: 0.65, description: "Loose fist with motion" },
};

// Common RSL word signs (two-hand poses for the avatar)
export interface WordSign {
  gloss: string;
  description: string;
  rightArmX: number;
  rightArmY: number;
  leftArmX: number;
  leftArmY: number;
  rightFingers: number[]; // [thumb, index, middle, ring, pinky]
  leftFingers: number[];
  rotation: number;
  category: string;
}

export const RSL_COMMON_SIGNS: Record<string, WordSign> = {
  "здравствуйте": { gloss: "HELLO", description: "Wave hand near forehead", rightArmX: 0.4, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "greeting" },
  "привет": { gloss: "HI", description: "Casual wave", rightArmX: 0.4, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 15, category: "greeting" },
  "спасибо": { gloss: "THANK-YOU", description: "Hand from chin forward", rightArmX: 0.1, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -15, category: "greeting" },
  "пожалуйста": { gloss: "PLEASE", description: "Open palm circular motion", rightArmX: 0.2, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "greeting" },
  "да": { gloss: "YES", description: "Fist nod forward", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: -20, category: "response" },
  "нет": { gloss: "NO", description: "Hand wave side to side", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "response" },
  "помощь": { gloss: "HELP", description: "Fist on open palm, lift up", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "basic" },
  "понимаю": { gloss: "UNDERSTAND", description: "Index finger at temple, flick up", rightArmX: 0.3, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "basic" },
  "не понимаю": { gloss: "NOT-UNDERSTAND", description: "Shake finger at temple", rightArmX: 0.3, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 20, category: "basic" },
  "имя": { gloss: "NAME", description: "Two fingers tap other hand", rightArmX: 0.2, rightArmY: 0.6, leftArmX: -0.1, leftArmY: 0.6, rightFingers: [0,1,1,0,0], leftFingers: [0,1,1,0,0], rotation: 0, category: "basic" },
  "я": { gloss: "I/ME", description: "Point to self", rightArmX: 0.0, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "pronoun" },
  "вы": { gloss: "YOU", description: "Point forward", rightArmX: 0.4, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "pronoun" },
  "хорошо": { gloss: "GOOD", description: "Thumbs up", rightArmX: 0.3, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "плохо": { gloss: "BAD", description: "Thumbs down", rightArmX: 0.3, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 180, category: "adjective" },
  "где": { gloss: "WHERE", description: "Index finger wave side to side", rightArmX: 0.3, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "question" },
  "когда": { gloss: "WHEN", description: "Circle with index finger", rightArmX: 0.3, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 45, category: "question" },
  "что": { gloss: "WHAT", description: "Palms up shrug motion", rightArmX: 0.3, rightArmY: 0.5, leftArmX: -0.3, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "question" },
  "как": { gloss: "HOW", description: "Hands together twist", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 30, category: "question" },
  "документ": { gloss: "DOCUMENT", description: "Flat hands like paper", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "паспорт": { gloss: "PASSPORT", description: "Open book gesture", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -15, category: "noun" },
  "деньги": { gloss: "MONEY", description: "Rubbing fingers", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "время": { gloss: "TIME", description: "Point to wrist", rightArmX: -0.1, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "работа": { gloss: "WORK", description: "Fists alternating forward", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "дом": { gloss: "HOME", description: "Hands form roof shape", rightArmX: 0.15, rightArmY: 0.75, leftArmX: -0.15, leftArmY: 0.75, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 30, category: "noun" },
  "врач": { gloss: "DOCTOR", description: "Fingers on wrist pulse", rightArmX: -0.1, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [0,1,1,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "аптека": { gloss: "PHARMACY", description: "Mortar and pestle motion", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.45, rightFingers: [0,0,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "больница": { gloss: "HOSPITAL", description: "Cross on arm", rightArmX: 0.0, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "автобус": { gloss: "BUS", description: "Hands on steering wheel", rightArmX: 0.2, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.55, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
};

// Convert text to gloss tokens
export function textToGloss(text: string): Array<{ type: "word" | "fingerspell"; value: string; sign?: WordSign; letters?: string[] }> {
  const words = text.toLowerCase().trim().split(/\s+/);
  const result: Array<{ type: "word" | "fingerspell"; value: string; sign?: WordSign; letters?: string[] }> = [];

  for (const word of words) {
    const cleanWord = word.replace(/[.,!?;:'"()]/g, "");
    if (!cleanWord) continue;

    if (RSL_COMMON_SIGNS[cleanWord]) {
      result.push({ type: "word", value: cleanWord, sign: RSL_COMMON_SIGNS[cleanWord] });
    } else {
      // Fingerspell unknown words
      const upperLetters = cleanWord.toUpperCase().split("");
      const validLetters = upperLetters.filter(l => RSL_ALPHABET[l]);
      if (validLetters.length > 0) {
        result.push({ type: "fingerspell", value: cleanWord, letters: validLetters });
      }
    }
  }

  return result;
}
