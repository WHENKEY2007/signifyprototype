/**
 * Signify Demonstration Scenarios
 * 
 * Truthful scenarios explicitly distinguished between:
 * 1. LIVE KAGGLE MODEL SCENARIOS: 100% authentic Kaggle ASL 250 vocabulary.
 * 2. CONCEPT WALKTHROUGH SCENARIOS: Visionary healthcare examples requiring future vocabulary expansion.
 */

export interface ScenarioStep {
  sign: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  contextSentence: string;
  gestureDescription: string;
  handPoseType: 'open-palm' | 'fist-thumb' | 'index-point' | 'two-finger' | 'crossed-palms' | 'wave';
  isKaggleSupported: boolean;
}

export interface DemoScenario {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  categoryBadge: string;
  isKaggleSupported: boolean;
  vocabulary: string[];
  steps: ScenarioStep[];
  finalSentence: string;
  conceptNote?: string;
  lowConfidenceSign?: {
    sign: string;
    confidence: number;
    reason: string;
    tips: string[];
  };
}

export const DEMO_SCENARIOS: Record<string, DemoScenario> = {
  health_urgency: {
    id: 'health_urgency',
    number: '01',
    title: 'HEALTHCARE & TRIAGE',
    tagline: 'Urgent medical assistance & symptoms',
    description: 'Real-world clinical intake utilizing authentic Kaggle ASL 250 classes.',
    categoryBadge: 'LIVE KAGGLE ASL',
    isKaggleSupported: true,
    vocabulary: ['SICK', 'OWIE', 'CALL ON PHONE', 'WATER', 'PLEASE', 'YES', 'NO'],
    steps: [
      {
        sign: 'SICK',
        confidence: 94,
        status: 'high',
        contextSentence: 'I am feeling sick.',
        gestureDescription: 'Middle finger bent, touching forehead and stomach simultaneously.',
        handPoseType: 'two-finger',
        isKaggleSupported: true,
      },
      {
        sign: 'OWIE',
        confidence: 91,
        status: 'high',
        contextSentence: 'I am sick and in pain.',
        gestureDescription: 'Index fingers twisting towards each other repeatedly at point of discomfort.',
        handPoseType: 'index-point',
        isKaggleSupported: true,
      },
      {
        sign: 'CALL ON PHONE',
        confidence: 95,
        status: 'high',
        contextSentence: 'I am sick and in pain. Please call someone on the phone.',
        gestureDescription: 'Y-handshape held to ear and mouth mimicking a phone handset.',
        handPoseType: 'fist-thumb',
        isKaggleSupported: true,
      },
    ],
    finalSentence: 'I am sick and in pain. Please call someone on the phone.',
    lowConfidenceSign: {
      sign: 'WATER',
      confidence: 48,
      reason: 'Low contrast lighting & fast hand velocity',
      tips: [
        'POSITION HAND CLEARLY IN FRAME',
        'HOLD GESTURE STEADY FOR 2 FRAMES',
        'IMPROVE AMBIENT LIGHTING',
        'RETRY RECOGNITION'
      ],
    },
  },

  daily_needs: {
    id: 'daily_needs',
    number: '02',
    title: 'DAILY COMMUNITY',
    tagline: 'Everyday requests and basic needs',
    description: 'Everyday interactions using authentic Kaggle ASL 250 classes.',
    categoryBadge: 'LIVE KAGGLE ASL',
    isKaggleSupported: true,
    vocabulary: ['WATER', 'PLEASE', 'THANK YOU', 'FOOD', 'HUNGRY', 'WAIT', 'YES', 'NO'],
    steps: [
      {
        sign: 'WATER',
        confidence: 96,
        status: 'high',
        contextSentence: 'Water.',
        gestureDescription: 'W-handshape tapping chin twice gently.',
        handPoseType: 'two-finger',
        isKaggleSupported: true,
      },
      {
        sign: 'PLEASE',
        confidence: 94,
        status: 'high',
        contextSentence: 'Water, please.',
        gestureDescription: 'Flat open palm rubbing chest in a clockwise circular motion.',
        handPoseType: 'open-palm',
        isKaggleSupported: true,
      },
      {
        sign: 'THANK YOU',
        confidence: 95,
        status: 'high',
        contextSentence: 'May I please have water? Thank you.',
        gestureDescription: 'Fingertips touching lips and extending outward toward person.',
        handPoseType: 'open-palm',
        isKaggleSupported: true,
      },
    ],
    finalSentence: 'May I please have water? Thank you.',
    lowConfidenceSign: {
      sign: 'FOOD',
      confidence: 52,
      reason: 'Partial hand occlusion outside sensor frame',
      tips: [
        'MOVE HAND TOWARDS CENTER VIEW',
        'KEEP PALM ORIENTATION STEADY',
        'AVOID MOTION BLUR'
      ],
    },
  },

  emergency_police: {
    id: 'emergency_police',
    number: '03',
    title: 'EMERGENCY POLICE',
    tagline: 'Critical responder communication',
    description: 'First responder contact using authentic Kaggle ASL 250 classes.',
    categoryBadge: 'LIVE KAGGLE ASL',
    isKaggleSupported: true,
    vocabulary: ['POLICE', 'CALL ON PHONE', 'PLEASE', 'FIREMAN', 'WAIT', 'TIME'],
    steps: [
      {
        sign: 'POLICE',
        confidence: 95,
        status: 'high',
        contextSentence: 'Police.',
        gestureDescription: 'C-handshape tapping opposite shoulder simulating police badge.',
        handPoseType: 'open-palm',
        isKaggleSupported: true,
      },
      {
        sign: 'CALL ON PHONE',
        confidence: 93,
        status: 'high',
        contextSentence: 'Please call the police on the phone.',
        gestureDescription: 'Y-handshape held to ear and mouth indicating phone call.',
        handPoseType: 'fist-thumb',
        isKaggleSupported: true,
      },
      {
        sign: 'PLEASE',
        confidence: 94,
        status: 'high',
        contextSentence: 'Please call the police on the phone.',
        gestureDescription: 'Flat hand rubbing chest in clockwise circle.',
        handPoseType: 'open-palm',
        isKaggleSupported: true,
      },
    ],
    finalSentence: 'Please call the police on the phone.',
    lowConfidenceSign: {
      sign: 'FIREMAN',
      confidence: 49,
      reason: 'Fast hand drop before stability check',
      tips: [
        'HOLD GESTURE FOR 1 SECOND',
        'ENSURE FULL HAND VISIBILITY'
      ],
    },
  },

  concept_hospital: {
    id: 'concept_hospital',
    number: '04',
    title: 'HOSPITAL CLINICAL (CONCEPT)',
    tagline: 'Healthcare expansion vision',
    description: 'Specialized clinical triage concept illustrating future vocabulary beyond Kaggle 250.',
    categoryBadge: 'CONCEPT DEMO',
    isKaggleSupported: false,
    conceptNote: 'Concept Demo: "HELP", "DOCTOR", "PAIN" are targets for clinical lexicon expansion outside the Kaggle 250 dataset.',
    vocabulary: ['HELP', 'DOCTOR', 'PAIN'],
    steps: [
      {
        sign: 'HELP',
        confidence: 85,
        status: 'high',
        contextSentence: 'I need help.',
        gestureDescription: 'Closed fist with thumb up lifted upward from opposite flat palm.',
        handPoseType: 'fist-thumb',
        isKaggleSupported: false,
      },
      {
        sign: 'DOCTOR',
        confidence: 85,
        status: 'high',
        contextSentence: 'I need a doctor.',
        gestureDescription: 'Bent fingertips tapping inner wrist twice mimicking pulse.',
        handPoseType: 'two-finger',
        isKaggleSupported: false,
      },
      {
        sign: 'PAIN',
        confidence: 85,
        status: 'high',
        contextSentence: "I need a doctor. I'm in pain.",
        gestureDescription: 'Both index fingers pointing towards each other twisting repeatedly.',
        handPoseType: 'index-point',
        isKaggleSupported: false,
      },
    ],
    finalSentence: "I need a doctor. I'm in pain.",
  },
};
