/**
 * SIGNIFY — Authoritative Kaggle ASL Model Vocabulary
 * 
 * Single Source of Truth for the Kaggle ASL 250-Class Model
 * Dataset: Google Isolated Sign Language Recognition (ISLR) Competition
 * Model: TFLite Signature Runner over 543 MediaPipe Landmarks
 * Total Classes: 250
 */

export interface KaggleSignItem {
  id: string;
  name: string;
  index: number;
  category: 'assistance' | 'greetings' | 'daily' | 'feelings' | 'actions' | 'objects' | 'community';
  description: string;
}

// Complete 250 classes from sign_to_prediction_index_map.json
export const KAGGLE_ASL_250_MAP: Record<string, number> = {
  "TV": 0, "after": 1, "airplane": 2, "all": 3, "alligator": 4, "animal": 5, "another": 6, "any": 7, "apple": 8, "arm": 9,
  "aunt": 10, "awake": 11, "backyard": 12, "bad": 13, "balloon": 14, "bath": 15, "because": 16, "bed": 17, "bedroom": 18, "bee": 19,
  "before": 20, "beside": 21, "better": 22, "bird": 23, "black": 24, "blow": 25, "blue": 26, "boat": 27, "book": 28, "boy": 29,
  "brother": 30, "brown": 31, "bug": 32, "bye": 33, "callonphone": 34, "can": 35, "car": 36, "carrot": 37, "cat": 38, "cereal": 39,
  "chair": 40, "cheek": 41, "child": 42, "chin": 43, "chocolate": 44, "clean": 45, "close": 46, "closet": 47, "cloud": 48, "clown": 49,
  "cow": 50, "cowboy": 51, "cry": 52, "cut": 53, "cute": 54, "dad": 55, "dance": 56, "dirty": 57, "dog": 58, "doll": 59,
  "donkey": 60, "down": 61, "drawer": 62, "drink": 63, "drop": 64, "dry": 65, "dryer": 66, "duck": 67, "ear": 68, "elephant": 69,
  "empty": 70, "every": 71, "eye": 72, "face": 73, "fall": 74, "farm": 75, "fast": 76, "feet": 77, "find": 78, "fine": 79,
  "finger": 80, "finish": 81, "fireman": 82, "first": 83, "fish": 84, "flag": 85, "flower": 86, "food": 87, "for": 88, "frenchfries": 89,
  "frog": 90, "garbage": 91, "gift": 92, "giraffe": 93, "girl": 94, "give": 95, "glasswindow": 96, "go": 97, "goose": 98, "grandma": 99,
  "grandpa": 100, "grass": 101, "green": 102, "gum": 103, "hair": 104, "happy": 105, "hat": 106, "hate": 107, "have": 108, "haveto": 109,
  "head": 110, "hear": 111, "helicopter": 112, "hello": 113, "hen": 114, "hesheit": 115, "hide": 116, "high": 117, "home": 118, "horse": 119,
  "hot": 120, "hungry": 121, "icecream": 122, "if": 123, "into": 124, "jacket": 125, "jeans": 126, "jump": 127, "kiss": 128, "kitty": 129,
  "lamp": 130, "later": 131, "like": 132, "lion": 133, "lips": 134, "listen": 135, "look": 136, "loud": 137, "mad": 138, "make": 139,
  "man": 140, "many": 141, "milk": 142, "minemy": 143, "mitten": 144, "mom": 145, "moon": 146, "morning": 147, "mouse": 148, "mouth": 149,
  "nap": 150, "napkin": 151, "night": 152, "no": 153, "noisy": 154, "nose": 155, "not": 156, "now": 157, "nuts": 158, "old": 159,
  "on": 160, "open": 161, "orange": 162, "outside": 163, "owie": 164, "owl": 165, "pajamas": 166, "pen": 167, "pencil": 168, "penny": 169,
  "person": 170, "pig": 171, "pizza": 172, "please": 173, "police": 174, "pool": 175, "potty": 176, "pretend": 177, "pretty": 178, "puppy": 179,
  "puzzle": 180, "quiet": 181, "radio": 182, "rain": 183, "read": 184, "red": 185, "refrigerator": 186, "ride": 187, "room": 188, "sad": 189,
  "same": 190, "say": 191, "scissors": 192, "see": 193, "shhh": 194, "shirt": 195, "shoe": 196, "shower": 197, "sick": 198, "sleep": 199,
  "sleepy": 200, "smile": 201, "snack": 202, "snow": 203, "stairs": 204, "stay": 205, "sticky": 206, "store": 207, "story": 208, "stuck": 209,
  "sun": 210, "table": 211, "talk": 212, "taste": 213, "thankyou": 214, "that": 215, "there": 216, "think": 217, "thirsty": 218, "tiger": 219,
  "time": 220, "tomorrow": 221, "tongue": 222, "tooth": 223, "toothbrush": 224, "touch": 225, "toy": 226, "tree": 227, "uncle": 228, "underwear": 229,
  "up": 230, "vacuum": 231, "wait": 232, "wake": 233, "water": 234, "wet": 235, "weus": 236, "where": 237, "white": 238, "who": 239,
  "why": 240, "will": 241, "wolf": 242, "yellow": 243, "yes": 244, "yesterday": 245, "yourself": 246, "yucky": 247, "zebra": 248, "zipper": 249
};

// Set of normalized uppercase Kaggle sign words for fast lookup
export const KAGGLE_UPPERCASE_WORDS = new Set<string>(
  Object.keys(KAGGLE_ASL_250_MAP).map(w => {
    if (w.toLowerCase() === 'thankyou') return 'THANK YOU';
    if (w.toLowerCase() === 'callonphone') return 'CALL ON PHONE';
    return w.toUpperCase();
  })
);

// Check if a sign word is supported by the Kaggle ASL 250 model
export function isKaggleSupported(sign: string): boolean {
  if (!sign) return false;
  const clean = sign.trim().toUpperCase();
  if (clean === 'THANK YOU' || clean === 'THANKYOU') return true;
  if (clean === 'CALL ON PHONE' || clean === 'CALLONPHONE') return true;
  return KAGGLE_UPPERCASE_WORDS.has(clean) || clean.toLowerCase() in KAGGLE_ASL_250_MAP;
}

// Normalize word for display
export function normalizeSignWord(raw: string): string {
  if (!raw) return '';
  const upper = raw.trim().toUpperCase();
  if (upper === 'THANKYOU' || upper === 'THANK YOU') return 'THANK YOU';
  if (upper === 'CALLONPHONE' || upper === 'CALL ON PHONE') return 'CALL ON PHONE';
  return upper;
}

// Standard confidence threshold for Kaggle model prediction acceptance
export const KAGGLE_CONFIDENCE_THRESHOLD = 70.0; // 70% threshold

/**
 * Valid Kaggle ASL Demo Sequences for Live-Model Demonstrations
 * Every single word in these sequences is an authentic class in the 250-class model.
 */
export interface SupportedDemoSequence {
  id: string;
  title: string;
  badge: string;
  tokens: string[];
  generatedPhrase: string;
  isKaggleSupported: boolean;
  contextNote?: string;
}

export const SUPPORTED_DEMO_SEQUENCES: SupportedDemoSequence[] = [
  {
    id: 'health_urgency',
    title: 'HEALTH / URGENT',
    badge: 'KAGGLE ASL 250',
    tokens: ['SICK', 'OWIE', 'CALL ON PHONE'],
    generatedPhrase: "I am sick and in pain. Please call someone on the phone.",
    isKaggleSupported: true,
    contextNote: 'Authentic 250-class Kaggle ISLR vocabulary'
  },
  {
    id: 'daily_water',
    title: 'DAILY NEEDS',
    badge: 'KAGGLE ASL 250',
    tokens: ['WATER', 'PLEASE', 'THANK YOU'],
    generatedPhrase: "May I please have water? Thank you.",
    isKaggleSupported: true,
    contextNote: 'Authentic 250-class Kaggle ISLR vocabulary'
  },
  {
    id: 'community_greeting',
    title: 'COMMUNITY',
    badge: 'KAGGLE ASL 250',
    tokens: ['HELLO', 'WAIT', 'TALK'],
    generatedPhrase: "Hello, please wait a moment. Can we talk?",
    isKaggleSupported: true,
    contextNote: 'Authentic 250-class Kaggle ISLR vocabulary'
  },
  {
    id: 'police_assistance',
    title: 'EMERGENCY POLICE',
    badge: 'KAGGLE ASL 250',
    tokens: ['POLICE', 'CALL ON PHONE', 'PLEASE'],
    generatedPhrase: "Please call the police on the phone.",
    isKaggleSupported: true,
    contextNote: 'Authentic 250-class Kaggle ISLR vocabulary'
  },
  // Clearly demarcated CONCEPTUAL scenario (contains words outside 250-class model)
  {
    id: 'concept_hospital',
    title: 'HOSPITAL TRIAGE',
    badge: 'CONCEPT WALKTHROUGH',
    tokens: ['HELP', 'DOCTOR', 'PAIN'],
    generatedPhrase: "I need a doctor. I'm in pain.",
    isKaggleSupported: false,
    contextNote: 'Concept Walkthrough: "HELP", "DOCTOR", "PAIN" are targets for clinical lexicon expansion outside Kaggle 250.'
  }
];

/**
 * Factual Kaggle ASL Model Specifications
 * Verified from actual model.tflite and app.py integration
 */
export const KAGGLE_MODEL_SPECS = {
  name: "Google Isolated Sign Language Recognition (ISLR)",
  architecture: "Transformer / 1D-CNN Encoder over MediaPipe Landmarks",
  framework: "TensorFlow Lite (TFLite Signature Runner)",
  classesCount: 250,
  inputShape: "(Batch, Frames, 543, 3)",
  keypointsBreakdown: "543 total (468 Face, 21 Pose, 21 Left Hand, 21 Right Hand)",
  inferenceRuntime: "FastAPI REST Bridge / HF Spaces ZeroGPU",
  confidenceMetric: "Softmax probability scaled over logit distribution",
  acceptanceThreshold: "70.0%",
  hardwareTarget: "Qualcomm Hexagon NPU via QNN TFLite Delegate (Snapdragon 8 Gen Series)"
};
