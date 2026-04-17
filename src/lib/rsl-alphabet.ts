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
  // Приветствия
  "здравствуйте": { gloss: "ЗДРАВСТВУЙТЕ", description: "Ладонь у лба, взмах вперёд", rightArmX: 0.45, rightArmY: 0.95, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "greeting" },
  "привет": { gloss: "ПРИВЕТ", description: "Поднятая рука, помахать", rightArmX: 0.5, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 15, category: "greeting" },
  "спасибо": { gloss: "СПАСИБО", description: "Ладонь от подбородка вперёд", rightArmX: 0.1, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -20, category: "greeting" },
  "пожалуйста": { gloss: "ПОЖАЛУЙСТА", description: "Открытая ладонь, круговое движение", rightArmX: 0.2, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "greeting" },
  "извините": { gloss: "ИЗВИНИТЕ", description: "Кулак кругом по груди", rightArmX: 0.05, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "greeting" },
  "до свидания": { gloss: "ДО СВИДАНИЯ", description: "Рука машет вперёд", rightArmX: 0.5, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -10, category: "greeting" },
  // Ответы
  "да": { gloss: "ДА", description: "Кулак кивает вперёд", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: -25, category: "response" },
  "нет": { gloss: "НЕТ", description: "Ладонь качается из стороны в сторону", rightArmX: 0.35, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "response" },
  // Базовые
  "помощь": { gloss: "ПОМОЩЬ", description: "Кулак на открытой ладони, поднять вверх", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.45, rightFingers: [0,0,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "basic" },
  "понимаю": { gloss: "ПОНИМАЮ", description: "Указательный палец у виска, щелчок вверх", rightArmX: 0.35, rightArmY: 0.95, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "basic" },
  "не понимаю": { gloss: "НЕ ПОНИМАЮ", description: "Покачать пальцем у виска", rightArmX: 0.35, rightArmY: 0.95, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 25, category: "basic" },
  "имя": { gloss: "ИМЯ", description: "Два пальца постукивают по другой руке", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.1, leftArmY: 0.55, rightFingers: [0,1,1,0,0], leftFingers: [0,1,1,0,0], rotation: 0, category: "basic" },
  "можно": { gloss: "МОЖНО", description: "Кулаки опускаются вместе", rightArmX: 0.2, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.55, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "basic" },
  "нельзя": { gloss: "НЕЛЬЗЯ", description: "Скрещённые руки отталкивают", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.15, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "basic" },
  "хочу": { gloss: "ХОЧУ", description: "Рука тянется к груди", rightArmX: 0.05, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -15, category: "basic" },
  "не хочу": { gloss: "НЕ ХОЧУ", description: "Рука отталкивает от груди", rightArmX: 0.45, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 15, category: "basic" },
  "знаю": { gloss: "ЗНАЮ", description: "Ладонь касается лба", rightArmX: 0.2, rightArmY: 0.95, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "basic" },
  "не знаю": { gloss: "НЕ ЗНАЮ", description: "Рука отмахивается от лба", rightArmX: 0.45, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 20, category: "basic" },
  "люблю": { gloss: "ЛЮБЛЮ", description: "Руки скрещены на груди", rightArmX: 0.05, rightArmY: 0.5, leftArmX: -0.05, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "basic" },
  "дела": { gloss: "ДЕЛА", description: "Ладони вверх, развести в стороны", rightArmX: 0.35, rightArmY: 0.45, leftArmX: -0.35, leftArmY: 0.45, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "basic" },
  "нормально": { gloss: "НОРМАЛЬНО", description: "Ладонь покачивается из стороны в сторону", rightArmX: 0.3, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  // Местоимения
  "я": { gloss: "Я", description: "Указательный палец на себя", rightArmX: 0.0, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "pronoun" },
  "вы": { gloss: "ВЫ", description: "Указательный палец вперёд", rightArmX: 0.5, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "pronoun" },
  // Вопросы
  "где": { gloss: "ГДЕ", description: "Указательный палец качается в стороны", rightArmX: 0.35, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "question" },
  "когда": { gloss: "КОГДА", description: "Указательный палец рисует круг", rightArmX: 0.3, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 45, category: "question" },
  "что": { gloss: "ЧТО", description: "Ладони вверх, пожатие плечами", rightArmX: 0.35, rightArmY: 0.45, leftArmX: -0.35, leftArmY: 0.45, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "question" },
  "как": { gloss: "КАК", description: "Руки вместе, поворот", rightArmX: 0.15, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 30, category: "question" },
  "сколько": { gloss: "СКОЛЬКО", description: "Пальцы раскрываются из кулака", rightArmX: 0.35, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "question" },
  "почему": { gloss: "ПОЧЕМУ", description: "Палец от виска вперёд", rightArmX: 0.35, rightArmY: 0.9, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: -15, category: "question" },
  "кто": { gloss: "КТО", description: "Указательный палец крутится в воздухе", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 25, category: "question" },
  // Прилагательные
  "хорошо": { gloss: "ХОРОШО", description: "Большой палец вверх", rightArmX: 0.35, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "плохо": { gloss: "ПЛОХО", description: "Большой палец вниз", rightArmX: 0.35, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 180, category: "adjective" },
  "большой": { gloss: "БОЛЬШОЙ", description: "Руки широко в стороны", rightArmX: 0.5, rightArmY: 0.55, leftArmX: -0.5, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "adjective" },
  "маленький": { gloss: "МАЛЕНЬКИЙ", description: "Ладони близко друг к другу", rightArmX: 0.08, rightArmY: 0.55, leftArmX: -0.08, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "adjective" },
  "красивый": { gloss: "КРАСИВЫЙ", description: "Ладонь обводит лицо", rightArmX: 0.2, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "быстро": { gloss: "БЫСТРО", description: "Кулаки резко назад", rightArmX: 0.3, rightArmY: 0.55, leftArmX: -0.3, leftArmY: 0.55, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "медленно": { gloss: "МЕДЛЕННО", description: "Рука медленно скользит по руке", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.45, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "adjective" },
  // Существительные
  "документ": { gloss: "ДОКУМЕНТ", description: "Плоские руки как бумага", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "паспорт": { gloss: "ПАСПОРТ", description: "Открыть книжку", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -20, category: "noun" },
  "деньги": { gloss: "ДЕНЬГИ", description: "Потереть большой и указательный палец", rightArmX: 0.25, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "время": { gloss: "ВРЕМЯ", description: "Показать на запястье", rightArmX: -0.1, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "работа": { gloss: "РАБОТА", description: "Кулаки поочерёдно вперёд", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.45, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "дом": { gloss: "ДОМ", description: "Руки складывают крышу", rightArmX: 0.12, rightArmY: 0.8, leftArmX: -0.12, leftArmY: 0.8, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 35, category: "noun" },
  "врач": { gloss: "ВРАЧ", description: "Пальцы на запястье — пульс", rightArmX: -0.1, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,1,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "аптека": { gloss: "АПТЕКА", description: "Ступка и пестик — толочь", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.4, rightFingers: [0,0,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "больница": { gloss: "БОЛЬНИЦА", description: "Крест на руке", rightArmX: 0.0, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "автобус": { gloss: "АВТОБУС", description: "Руки держат руль", rightArmX: 0.25, rightArmY: 0.55, leftArmX: -0.25, leftArmY: 0.55, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "вода": { gloss: "ВОДА", description: "Три пальца касаются подбородка", rightArmX: 0.1, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "еда": { gloss: "ЕДА", description: "Пальцы ко рту", rightArmX: 0.08, rightArmY: 0.88, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -10, category: "noun" },
  "мама": { gloss: "МАМА", description: "Ладонь гладит щёку вниз", rightArmX: 0.2, rightArmY: 0.75, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "папа": { gloss: "ПАПА", description: "Кулак стучит по лбу сбоку", rightArmX: 0.3, rightArmY: 0.98, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "друг": { gloss: "ДРУГ", description: "Указательные пальцы цепляются", rightArmX: 0.1, rightArmY: 0.55, leftArmX: -0.1, leftArmY: 0.55, rightFingers: [0,1,0,0,0], leftFingers: [0,1,0,0,0], rotation: 0, category: "noun" },
  "школа": { gloss: "ШКОЛА", description: "Хлопок ладонями дважды", rightArmX: 0.12, rightArmY: 0.55, leftArmX: -0.12, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "машина": { gloss: "МАШИНА", description: "Руки крутят руль", rightArmX: 0.18, rightArmY: 0.5, leftArmX: -0.18, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 20, category: "noun" },
  "телефон": { gloss: "ТЕЛЕФОН", description: "Рука-трубка у уха", rightArmX: 0.4, rightArmY: 0.9, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "магазин": { gloss: "МАГАЗИН", description: "Руки обмениваются", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -15, category: "noun" },
  // Глаголы
  "спать": { gloss: "СПАТЬ", description: "Рука наклоняется к голове", rightArmX: 0.3, rightArmY: 0.9, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 35, category: "verb" },
  "идти": { gloss: "ИДТИ", description: "Два пальца шагают вперёд", rightArmX: 0.35, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,0,0], leftFingers: [0,0,0,0,0], rotation: -90, category: "verb" },
  "ждать": { gloss: "ЖДАТЬ", description: "Руки подняты, пальцы шевелятся", rightArmX: 0.25, rightArmY: 0.65, leftArmX: -0.25, leftArmY: 0.65, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "говорить": { gloss: "ГОВОРИТЬ", description: "Палец от рта вперёд", rightArmX: 0.15, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "смотреть": { gloss: "СМОТРЕТЬ", description: "V-пальцы от глаз вперёд", rightArmX: 0.35, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "слышать": { gloss: "СЛЫШАТЬ", description: "Рука чашечкой у уха", rightArmX: 0.4, rightArmY: 0.92, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "писать": { gloss: "ПИСАТЬ", description: "Писать на ладони", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "читать": { gloss: "ЧИТАТЬ", description: "V-пальцы сканируют ладонь", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,1,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "учиться": { gloss: "УЧИТЬСЯ", description: "Пальцы берут с ладони к голове", rightArmX: 0.25, rightArmY: 0.8, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "звонить": { gloss: "ЗВОНИТЬ", description: "Рука-трубка у уха", rightArmX: 0.4, rightArmY: 0.9, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  // Время
  "сегодня": { gloss: "СЕГОДНЯ", description: "Обе руки указывают вниз дважды", rightArmX: 0.2, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.45, rightFingers: [0,1,0,0,0], leftFingers: [0,1,0,0,0], rotation: -90, category: "time" },
  "завтра": { gloss: "ЗАВТРА", description: "Большой палец от щеки вперёд", rightArmX: 0.35, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "вчера": { gloss: "ВЧЕРА", description: "Большой палец назад через плечо", rightArmX: 0.2, rightArmY: 0.75, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 160, category: "time" },
  "утро": { gloss: "УТРО", description: "Ладонь поднимается от груди вверх", rightArmX: 0.2, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "вечер": { gloss: "ВЕЧЕР", description: "Ладонь опускается сверху вниз", rightArmX: 0.2, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "ночь": { gloss: "НОЧЬ", description: "Ладони закрывают глаза", rightArmX: 0.15, rightArmY: 0.9, leftArmX: -0.15, leftArmY: 0.9, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "time" },
  "неделя": { gloss: "НЕДЕЛЯ", description: "Палец проводит по ладони", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "time" },
  "месяц": { gloss: "МЕСЯЦ", description: "Палец рисует полумесяц", rightArmX: 0.3, rightArmY: 0.75, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 30, category: "time" },
  "год": { gloss: "ГОД", description: "Кулак вращается вокруг другого кулака", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.1, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "час": { gloss: "ЧАС", description: "Палец стучит по запястью", rightArmX: -0.1, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "минута": { gloss: "МИНУТА", description: "Палец на запястье, короткое движение", rightArmX: -0.08, rightArmY: 0.48, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: -10, category: "time" },
  // Дни недели
  "понедельник": { gloss: "ПОНЕДЕЛЬНИК", description: "Один палец вверх", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "вторник": { gloss: "ВТОРНИК", description: "Два пальца вверх", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "среда": { gloss: "СРЕДА", description: "Три пальца вверх", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,1,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "четверг": { gloss: "ЧЕТВЕРГ", description: "Четыре пальца вверх", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "пятница": { gloss: "ПЯТНИЦА", description: "Пять пальцев раскрыты", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "time" },
  "суббота": { gloss: "СУББОТА", description: "Кулак + один палец другой руки", rightArmX: 0.2, rightArmY: 0.6, leftArmX: -0.15, leftArmY: 0.6, rightFingers: [0,0,0,0,0], leftFingers: [0,1,0,0,0], rotation: 0, category: "time" },
  "воскресенье": { gloss: "ВОСКРЕСЕНЬЕ", description: "Ладони прижаты, открываются вверх", rightArmX: 0.15, rightArmY: 0.65, leftArmX: -0.15, leftArmY: 0.65, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 15, category: "time" },
  // Числа
  "один": { gloss: "1", description: "Указательный палец вверх", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "number" },
  "два": { gloss: "2", description: "Два пальца вверх", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "number" },
  "три": { gloss: "3", description: "Три пальца вверх", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,1,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "number" },
  "четыре": { gloss: "4", description: "Четыре пальца", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "number" },
  "пять": { gloss: "5", description: "Раскрытая ладонь", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "number" },
  "шесть": { gloss: "6", description: "Пять + один", rightArmX: 0.25, rightArmY: 0.65, leftArmX: -0.15, leftArmY: 0.6, rightFingers: [1,1,1,1,1], leftFingers: [0,1,0,0,0], rotation: 0, category: "number" },
  "семь": { gloss: "7", description: "Пять + два", rightArmX: 0.25, rightArmY: 0.65, leftArmX: -0.15, leftArmY: 0.6, rightFingers: [1,1,1,1,1], leftFingers: [0,1,1,0,0], rotation: 0, category: "number" },
  "восемь": { gloss: "8", description: "Пять + три", rightArmX: 0.25, rightArmY: 0.65, leftArmX: -0.15, leftArmY: 0.6, rightFingers: [1,1,1,1,1], leftFingers: [0,1,1,1,0], rotation: 0, category: "number" },
  "девять": { gloss: "9", description: "Пять + четыре", rightArmX: 0.25, rightArmY: 0.65, leftArmX: -0.15, leftArmY: 0.6, rightFingers: [1,1,1,1,1], leftFingers: [0,1,1,1,1], rotation: 0, category: "number" },
  "десять": { gloss: "10", description: "Две раскрытые ладони", rightArmX: 0.25, rightArmY: 0.65, leftArmX: -0.25, leftArmY: 0.65, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "number" },
  // Цвета
  "красный": { gloss: "КРАСНЫЙ", description: "Палец проводит по губам", rightArmX: 0.1, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "color" },
  "синий": { gloss: "СИНИЙ", description: "Рука покачивается у подбородка", rightArmX: 0.15, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -10, category: "color" },
  "зелёный": { gloss: "ЗЕЛЁНЫЙ", description: "Пальцы шевелятся как трава", rightArmX: 0.3, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "color" },
  "жёлтый": { gloss: "ЖЁЛТЫЙ", description: "Мизинец у виска покачивается", rightArmX: 0.3, rightArmY: 0.9, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,1], leftFingers: [0,0,0,0,0], rotation: 15, category: "color" },
  "белый": { gloss: "БЕЛЫЙ", description: "Ладонь на груди, отвести вперёд", rightArmX: 0.05, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "color" },
  "чёрный": { gloss: "ЧЁРНЫЙ", description: "Указательный палец по лбу", rightArmX: 0.2, rightArmY: 0.95, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "color" },
  // Семья
  "семья": { gloss: "СЕМЬЯ", description: "Обе руки обнимают перед собой", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 10, category: "noun" },
  "брат": { gloss: "БРАТ", description: "Кулак стучит по плечу", rightArmX: 0.0, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "сестра": { gloss: "СЕСТРА", description: "Указательный палец по щеке вниз", rightArmX: 0.2, rightArmY: 0.78, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "сын": { gloss: "СЫН", description: "Ладонь покачивает на руках", rightArmX: 0.15, rightArmY: 0.45, leftArmX: -0.15, leftArmY: 0.45, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -10, category: "noun" },
  "дочь": { gloss: "ДОЧЬ", description: "Палец по щеке + покачать", rightArmX: 0.18, rightArmY: 0.75, leftArmX: -0.15, leftArmY: 0.45, rightFingers: [0,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "муж": { gloss: "МУЖ", description: "Кулак у лба + рукопожатие", rightArmX: 0.3, rightArmY: 0.95, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "жена": { gloss: "ЖЕНА", description: "Ладонь по щеке + рукопожатие", rightArmX: 0.2, rightArmY: 0.78, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "ребёнок": { gloss: "РЕБЁНОК", description: "Руки покачивают ребёнка", rightArmX: 0.15, rightArmY: 0.4, leftArmX: -0.15, leftArmY: 0.4, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -15, category: "noun" },
  "дедушка": { gloss: "ДЕДУШКА", description: "Кулак у лба + борода", rightArmX: 0.25, rightArmY: 0.95, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: -10, category: "noun" },
  "бабушка": { gloss: "БАБУШКА", description: "Ладонь по щеке + платок", rightArmX: 0.2, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -10, category: "noun" },
  // Эмоции
  "рад": { gloss: "РАД", description: "Ладони хлопают, руки вверх", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.3, leftArmY: 0.7, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "emotion" },
  "грустно": { gloss: "ГРУСТНО", description: "Ладонь скользит по лицу вниз", rightArmX: 0.15, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "emotion" },
  "злой": { gloss: "ЗЛОЙ", description: "Когти у лица, напряжённые пальцы", rightArmX: 0.25, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 10, category: "emotion" },
  "страх": { gloss: "СТРАХ", description: "Руки дрожат перед грудью", rightArmX: 0.2, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 5, category: "emotion" },
  "устал": { gloss: "УСТАЛ", description: "Руки опускаются вдоль тела", rightArmX: 0.25, rightArmY: 0.35, leftArmX: -0.25, leftArmY: 0.35, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "emotion" },
  "счастье": { gloss: "СЧАСТЬЕ", description: "Ладони от груди вверх раскрываются", rightArmX: 0.3, rightArmY: 0.75, leftArmX: -0.3, leftArmY: 0.75, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "emotion" },
  "больно": { gloss: "БОЛЬНО", description: "Указательные пальцы сходятся, резко", rightArmX: 0.15, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,0,0,0], leftFingers: [0,1,0,0,0], rotation: 0, category: "emotion" },
  // Еда и напитки
  "хлеб": { gloss: "ХЛЕБ", description: "Ладонь режет по другой ладони", rightArmX: 0.15, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.45, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -30, category: "food" },
  "молоко": { gloss: "МОЛОКО", description: "Кулак сжимается — доить", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "food" },
  "чай": { gloss: "ЧАЙ", description: "Пальцы мешают в чашке", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.45, rightFingers: [1,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 15, category: "food" },
  "кофе": { gloss: "КОФЕ", description: "Кулаки крутят кофемолку", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 20, category: "food" },
  "мясо": { gloss: "МЯСО", description: "Пальцы щипают складку кожи", rightArmX: 0.0, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.5, rightFingers: [1,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "food" },
  "рыба": { gloss: "РЫБА", description: "Ладонь плывёт как рыба", rightArmX: 0.3, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "food" },
  "фрукт": { gloss: "ФРУКТ", description: "Пальцы у щеки, поворот", rightArmX: 0.2, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 15, category: "food" },
  "овощ": { gloss: "ОВОЩ", description: "Кулак стучит по щеке", rightArmX: 0.2, rightArmY: 0.78, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "food" },
  // Места
  "город": { gloss: "ГОРОД", description: "Руки складывают крыши домов", rightArmX: 0.2, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.7, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 25, category: "place" },
  "улица": { gloss: "УЛИЦА", description: "Ладони параллельно вперёд", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "place" },
  "парк": { gloss: "ПАРК", description: "Пальцы раскрываются как деревья", rightArmX: 0.25, rightArmY: 0.7, leftArmX: -0.25, leftArmY: 0.7, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "place" },
  "метро": { gloss: "МЕТРО", description: "Ладонь проскальзывает под другой", rightArmX: 0.2, rightArmY: 0.45, leftArmX: -0.15, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "place" },
  "аэропорт": { gloss: "АЭРОПОРТ", description: "Рука-самолёт летит", rightArmX: 0.4, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,0,0,1], leftFingers: [0,0,0,0,0], rotation: -20, category: "place" },
  "ресторан": { gloss: "РЕСТОРАН", description: "Пальцы ко рту + выбор из меню", rightArmX: 0.1, rightArmY: 0.85, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "place" },
  "банк": { gloss: "БАНК", description: "Руки считают купюры", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "place" },
  "гостиница": { gloss: "ГОСТИНИЦА", description: "Руки крыша + ключ", rightArmX: 0.15, rightArmY: 0.75, leftArmX: -0.15, leftArmY: 0.75, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 30, category: "place" },
  "туалет": { gloss: "ТУАЛЕТ", description: "Буква Т покачивается", rightArmX: 0.3, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 10, category: "place" },
  "университет": { gloss: "УНИВЕРСИТЕТ", description: "Буква У вращается вверх", rightArmX: 0.3, rightArmY: 0.75, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,1], leftFingers: [0,0,0,0,0], rotation: 15, category: "place" },
  // Транспорт
  "поезд": { gloss: "ПОЕЗД", description: "Два пальца скользят по двум пальцам", rightArmX: 0.15, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,1,1,0,0], leftFingers: [0,1,1,0,0], rotation: 0, category: "transport" },
  "самолёт": { gloss: "САМОЛЁТ", description: "Рука-самолёт поднимается", rightArmX: 0.4, rightArmY: 0.75, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,0,0,1], leftFingers: [0,0,0,0,0], rotation: -25, category: "transport" },
  "такси": { gloss: "ТАКСИ", description: "Рука ловит такси — поднять вверх", rightArmX: 0.4, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "transport" },
  "велосипед": { gloss: "ВЕЛОСИПЕД", description: "Кулаки крутят педали", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.45, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 30, category: "transport" },
  // Дополнительные глаголы
  "делать": { gloss: "ДЕЛАТЬ", description: "Кулаки стучат друг о друга", rightArmX: 0.15, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "думать": { gloss: "ДУМАТЬ", description: "Палец у виска", rightArmX: 0.3, rightArmY: 0.92, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "есть": { gloss: "ЕСТЬ/КУШАТЬ", description: "Рука подносит еду ко рту", rightArmX: 0.1, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -10, category: "verb" },
  "пить": { gloss: "ПИТЬ", description: "Рука подносит стакан ко рту", rightArmX: 0.15, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: -30, category: "verb" },
  "открыть": { gloss: "ОТКРЫТЬ", description: "Ладони раскрываются наружу", rightArmX: 0.3, rightArmY: 0.55, leftArmX: -0.3, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 20, category: "verb" },
  "закрыть": { gloss: "ЗАКРЫТЬ", description: "Ладони сходятся вместе", rightArmX: 0.1, rightArmY: 0.55, leftArmX: -0.1, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -20, category: "verb" },
  "купить": { gloss: "КУПИТЬ", description: "Рука отсчитывает деньги с ладони", rightArmX: 0.15, rightArmY: 0.5, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "продать": { gloss: "ПРОДАТЬ", description: "Ладони выдвигаются вперёд", rightArmX: 0.3, rightArmY: 0.5, leftArmX: -0.3, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "играть": { gloss: "ИГРАТЬ", description: "Большие пальцы и мизинцы покачиваются", rightArmX: 0.25, rightArmY: 0.6, leftArmX: -0.25, leftArmY: 0.6, rightFingers: [1,0,0,0,1], leftFingers: [1,0,0,0,1], rotation: 0, category: "verb" },
  "работать": { gloss: "РАБОТАТЬ", description: "Кулаки стучат поочерёдно", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.45, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 10, category: "verb" },
  "жить": { gloss: "ЖИТЬ", description: "Ладони поднимаются по бокам тела", rightArmX: 0.2, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.6, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "любить": { gloss: "ЛЮБИТЬ", description: "Руки обнимают грудь", rightArmX: 0.05, rightArmY: 0.5, leftArmX: -0.05, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 5, category: "verb" },
  "ехать": { gloss: "ЕХАТЬ", description: "Руки крутят руль", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 15, category: "verb" },
  "лететь": { gloss: "ЛЕТЕТЬ", description: "Руки-крылья раскрыты", rightArmX: 0.45, rightArmY: 0.6, leftArmX: -0.45, leftArmY: 0.6, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "помогать": { gloss: "ПОМОГАТЬ", description: "Кулак поднимается на ладони", rightArmX: 0.1, rightArmY: 0.55, leftArmX: -0.1, leftArmY: 0.45, rightFingers: [0,0,0,0,0], leftFingers: [1,1,1,1,1], rotation: 0, category: "verb" },
  "искать": { gloss: "ИСКАТЬ", description: "Рука у глаз — козырёк", rightArmX: 0.3, rightArmY: 0.9, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -5, category: "verb" },
  "найти": { gloss: "НАЙТИ", description: "Рука хватает из воздуха", rightArmX: 0.35, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "дать": { gloss: "ДАТЬ", description: "Ладонь протягивается вперёд", rightArmX: 0.4, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "взять": { gloss: "ВЗЯТЬ", description: "Рука хватает и тянет к себе", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "приходить": { gloss: "ПРИХОДИТЬ", description: "Палец движется к себе", rightArmX: 0.05, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "уходить": { gloss: "УХОДИТЬ", description: "Палец указывает в сторону", rightArmX: 0.45, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "verb" },
  "стоять": { gloss: "СТОЯТЬ", description: "Два пальца стоят на ладони", rightArmX: 0.1, rightArmY: 0.55, leftArmX: -0.15, leftArmY: 0.45, rightFingers: [0,1,1,0,0], leftFingers: [1,1,1,1,1], rotation: -90, category: "verb" },
  "сидеть": { gloss: "СИДЕТЬ", description: "Два пальца сидят на двух пальцах", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.45, rightFingers: [0,1,1,0,0], leftFingers: [0,1,1,0,0], rotation: -90, category: "verb" },
  // Дополнительные прилагательные
  "новый": { gloss: "НОВЫЙ", description: "Ладонь черпает с другой ладони", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.15, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "adjective" },
  "старый": { gloss: "СТАРЫЙ", description: "Кулак у подбородка тянет вниз — борода", rightArmX: 0.1, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "молодой": { gloss: "МОЛОДОЙ", description: "Ладони пружинят перед грудью", rightArmX: 0.2, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "горячий": { gloss: "ГОРЯЧИЙ", description: "Рука отдёргивается от горячего", rightArmX: 0.35, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 10, category: "adjective" },
  "холодный": { gloss: "ХОЛОДНЫЙ", description: "Руки дрожат, сжимаются", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.15, leftArmY: 0.55, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 5, category: "adjective" },
  "дорогой": { gloss: "ДОРОГОЙ", description: "Пальцы потирают — деньги", rightArmX: 0.25, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "дешёвый": { gloss: "ДЕШЁВЫЙ", description: "Рука отбрасывает вниз", rightArmX: 0.3, rightArmY: 0.35, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "правильно": { gloss: "ПРАВИЛЬНО", description: "Палец указывает вверх, кивок", rightArmX: 0.3, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  "важно": { gloss: "ВАЖНО", description: "Палец поднимается вверх резко", rightArmX: 0.3, rightArmY: 0.8, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "adjective" },
  // Дополнительные существительные
  "человек": { gloss: "ЧЕЛОВЕК", description: "Ладони параллельно опускаются", rightArmX: 0.2, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "женщина": { gloss: "ЖЕНЩИНА", description: "Ладонь гладит щёку", rightArmX: 0.2, rightArmY: 0.78, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "мужчина": { gloss: "МУЖЧИНА", description: "Кулак у лба", rightArmX: 0.25, rightArmY: 0.95, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,0,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "книга": { gloss: "КНИГА", description: "Ладони раскрываются как книга", rightArmX: 0.2, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: -25, category: "noun" },
  "ключ": { gloss: "КЛЮЧ", description: "Пальцы поворачивают ключ", rightArmX: 0.15, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.5, rightFingers: [1,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 30, category: "noun" },
  "окно": { gloss: "ОКНО", description: "Руки обрисовывают прямоугольник", rightArmX: 0.25, rightArmY: 0.65, leftArmX: -0.25, leftArmY: 0.65, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "дверь": { gloss: "ДВЕРЬ", description: "Ладонь открывается как дверь", rightArmX: 0.3, rightArmY: 0.6, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: -30, category: "noun" },
  "стол": { gloss: "СТОЛ", description: "Плоские ладони — столешница", rightArmX: 0.25, rightArmY: 0.5, leftArmX: -0.25, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "стул": { gloss: "СТУЛ", description: "Два пальца сидят на двух пальцах", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.45, rightFingers: [0,1,1,0,0], leftFingers: [0,1,1,0,0], rotation: -90, category: "noun" },
  "компьютер": { gloss: "КОМПЬЮТЕР", description: "Руки печатают на клавиатуре", rightArmX: 0.2, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.45, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "интернет": { gloss: "ИНТЕРНЕТ", description: "Средние пальцы соединяются и крутятся", rightArmX: 0.15, rightArmY: 0.55, leftArmX: -0.15, leftArmY: 0.55, rightFingers: [0,0,1,0,0], leftFingers: [0,0,1,0,0], rotation: 15, category: "noun" },
  "погода": { gloss: "ПОГОДА", description: "Руки покачиваются — ветер", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.3, leftArmY: 0.65, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 10, category: "noun" },
  "дождь": { gloss: "ДОЖДЬ", description: "Пальцы шевелятся сверху вниз — капли", rightArmX: 0.25, rightArmY: 0.7, leftArmX: -0.25, leftArmY: 0.7, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "снег": { gloss: "СНЕГ", description: "Пальцы порхают сверху вниз — снежинки", rightArmX: 0.3, rightArmY: 0.75, leftArmX: -0.3, leftArmY: 0.75, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 5, category: "noun" },
  "солнце": { gloss: "СОЛНЦЕ", description: "Раскрытая ладонь вверху — лучи", rightArmX: 0.3, rightArmY: 0.85, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "страна": { gloss: "СТРАНА", description: "Ладонь описывает территорию", rightArmX: 0.3, rightArmY: 0.5, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  "россия": { gloss: "РОССИЯ", description: "Ладони хлопают по бёдрам", rightArmX: 0.25, rightArmY: 0.35, leftArmX: -0.25, leftArmY: 0.35, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "noun" },
  "узбекистан": { gloss: "УЗБЕКИСТАН", description: "Буква У + жест территории", rightArmX: 0.3, rightArmY: 0.65, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,0,0,0,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "noun" },
  // Предлоги / связки
  "и": { gloss: "И", description: "Пальцы соединяются", rightArmX: 0.1, rightArmY: 0.5, leftArmX: -0.1, leftArmY: 0.5, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "connector" },
  "или": { gloss: "ИЛИ", description: "Руки покачиваются попеременно", rightArmX: 0.25, rightArmY: 0.55, leftArmX: -0.25, leftArmY: 0.55, rightFingers: [0,1,0,0,0], leftFingers: [0,1,0,0,0], rotation: 0, category: "connector" },
  "потом": { gloss: "ПОТОМ", description: "Ладонь отодвигается вперёд", rightArmX: 0.4, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 0, category: "connector" },
  "сейчас": { gloss: "СЕЙЧАС", description: "Обе руки опускаются резко вниз", rightArmX: 0.2, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.45, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "connector" },
  "здесь": { gloss: "ЗДЕСЬ", description: "Указательный палец указывает вниз", rightArmX: 0.2, rightArmY: 0.45, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: -90, category: "connector" },
  "там": { gloss: "ТАМ", description: "Указательный палец указывает в сторону", rightArmX: 0.5, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "connector" },
  "много": { gloss: "МНОГО", description: "Руки разводятся широко", rightArmX: 0.4, rightArmY: 0.55, leftArmX: -0.4, leftArmY: 0.55, rightFingers: [1,1,1,1,1], leftFingers: [1,1,1,1,1], rotation: 0, category: "connector" },
  "мало": { gloss: "МАЛО", description: "Пальцы показывают щепотку", rightArmX: 0.25, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "connector" },
  "всегда": { gloss: "ВСЕГДА", description: "Палец рисует круг горизонтально", rightArmX: 0.3, rightArmY: 0.55, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [0,1,0,0,0], leftFingers: [0,0,0,0,0], rotation: 0, category: "connector" },
  "никогда": { gloss: "НИКОГДА", description: "Рука отрицательно машет от лица", rightArmX: 0.35, rightArmY: 0.7, leftArmX: -0.2, leftArmY: 0.3, rightFingers: [1,1,1,1,1], leftFingers: [0,0,0,0,0], rotation: 15, category: "connector" },
};

// Map words to video files in /signs/
export const RSL_VIDEOS: Record<string, string> = {
  "привет": "/signs/privet.mp4",
  "спасибо": "/signs/spasibo.mp4",
  "да": "/signs/da.mp4",
  "нет": "/signs/net.mp4",
  "помощь": "/signs/pomosh.mp4",
  "пожалуйста": "/signs/pozhaluysta.mp4",
  "здравствуйте": "/signs/zdravstvuyte.mp4",
  "до свидания": "/signs/do_svidaniya.mp4",
  "хорошо": "/signs/horosho.mp4",
  "плохо": "/signs/ploho.mp4",
  "где": "/signs/gde.mp4",
  "когда": "/signs/kogda.mp4",
  "что": "/signs/chto.mp4",
  "как": "/signs/kak.mp4",
  "мама": "/signs/mama.mp4",
  "папа": "/signs/papa.mp4",
  "дом": "/signs/dom.mp4",
  "работа": "/signs/rabota.mp4",
  "вода": "/signs/voda.mp4",
  "еда": "/signs/eda.mp4",
  "друг": "/signs/drug.mp4",
};

// Simple Russian stemming — strip common endings to find dictionary base form
function findInDictionary(word: string): string | null {
  if (RSL_COMMON_SIGNS[word]) return word;

  // Common Russian suffixes to strip (ordered by length)
  const suffixes = [
    "ться", "ются", "ется", "ёмся", "ёте", "ают", "ают", "ите", "ишь",
    "ает", "ает", "ить", "ать", "еть", "ешь", "ёт", "ут", "ют", "ем",
    "ой", "ей", "ом", "ам", "ах", "ов", "ев", "ым", "им", "их",
    "ую", "юю", "ая", "яя", "ое", "ее", "ые", "ие", "ой", "ей",
    "ку", "ке", "ки", "ка", "ко", "це", "цу", "ца",
    "ну", "не", "на", "но", "ни", "ны",
    "ту", "те", "та", "то", "ти", "ты",
    "у", "ю", "а", "я", "о", "е", "и", "ы",
  ];

  for (const suffix of suffixes) {
    if (word.length > suffix.length + 2 && word.endsWith(suffix)) {
      const stem = word.slice(0, -suffix.length);
      // Try stem directly
      if (RSL_COMMON_SIGNS[stem]) return stem;
      // Try stem + common endings
      for (const ending of ["", "а", "о", "е", "ь", "й", "ть", "ый", "ой", "ий"]) {
        const candidate = stem + ending;
        if (RSL_COMMON_SIGNS[candidate]) return candidate;
      }
    }
  }

  // Try removing ь and adding common bases
  if (word.endsWith("ь")) {
    const base = word.slice(0, -1);
    if (RSL_COMMON_SIGNS[base]) return base;
  }

  return null;
}

// Convert text to gloss tokens
export function textToGloss(text: string): Array<{ type: "word" | "fingerspell"; value: string; sign?: WordSign; letters?: string[] }> {
  const words = text.toLowerCase().trim().split(/\s+/).map(w => w.replace(/[.,!?;:'"()]/g, "")).filter(Boolean);
  const result: Array<{ type: "word" | "fingerspell"; value: string; sign?: WordSign; letters?: string[] }> = [];

  let i = 0;
  while (i < words.length) {
    // Try multi-word phrases first (check 3 words, then 2)
    let matched = false;
    for (let len = 3; len >= 2; len--) {
      if (i + len <= words.length) {
        const phrase = words.slice(i, i + len).join(" ");
        if (RSL_COMMON_SIGNS[phrase]) {
          result.push({ type: "word", value: phrase, sign: RSL_COMMON_SIGNS[phrase] });
          i += len;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    // Single word lookup with stemming fallback
    const word = words[i];
    const dictWord = findInDictionary(word);
    if (dictWord) {
      result.push({ type: "word", value: dictWord, sign: RSL_COMMON_SIGNS[dictWord] });
    } else {
      // Fingerspell unknown words
      const upperLetters = word.toUpperCase().split("");
      const validLetters = upperLetters.filter(l => RSL_ALPHABET[l]);
      if (validLetters.length > 0) {
        result.push({ type: "fingerspell", value: word, letters: validLetters });
      }
    }
    i++;
  }

  return result;
}
