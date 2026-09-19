export interface DetectedSignItem {
  id: string;
  sign: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  gestureDescription: string;
  hint?: string;
}

export interface ScenarioStep {
  sign: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  contextSentence: string;
  gestureDescription: string;
  handPoseType: 'open-palm' | 'fist-thumb' | 'index-point' | 'two-finger' | 'crossed-palms' | 'wave';
}

export interface DemoScenario {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  categoryBadge: string;
  vocabulary: string[];
  steps: ScenarioStep[];
  finalSentence: string;
  lowConfidenceSign?: {
    sign: string;
    confidence: number;
    reason: string;
    tips: string[];
  };
}

export const DEMO_SCENARIOS: Record<string, DemoScenario> = {
  hospital: {
    id: 'hospital',
    number: '01',
    title: 'HOSPITAL',
    tagline: 'Essential healthcare & urgent triage',
    description: 'Critical communication for clinical staff, nursing teams, and emergency rooms.',
    categoryBadge: 'HEALTHCARE',
    vocabulary: ['HELP', 'DOCTOR', 'PAIN', 'WATER', 'MEDICINE', 'YES', 'NO'],
    steps: [
      {
        sign: 'HELP',
        confidence: 96,
        status: 'high',
        contextSentence: 'I need help.',
        gestureDescription: 'Closed fist with thumb up resting on flat opposite palm, lifted upward.',
        handPoseType: 'fist-thumb'
      },
      {
        sign: 'DOCTOR',
        confidence: 94,
        status: 'high',
        contextSentence: 'I need a doctor.',
        gestureDescription: 'Bent fingertips tapping inner wrist twice, mimicking pulse checking.',
        handPoseType: 'two-finger'
      },
      {
        sign: 'PAIN',
        confidence: 91,
        status: 'high',
        contextSentence: 'I need a doctor. I\'m in pain.',
        gestureDescription: 'Both index fingers pointing towards each other, twisting inward repeatedly.',
        handPoseType: 'index-point'
      }
    ],
    finalSentence: "I need a doctor. I'm in pain.",
    lowConfidenceSign: {
      sign: 'WATER',
      confidence: 58,
      reason: 'Low contrast lighting & rapid gesture transition',
      tips: [
        'MOVE HAND INTO FRAME',
        'IMPROVE LIGHTING',
        'HOLD GESTURE STEADY',
        'TRY AGAIN'
      ]
    }
  },
  emergency: {
    id: 'emergency',
    number: '02',
    title: 'EMERGENCY',
    tagline: 'Fast critical communication',
    description: 'High-urgency phrases for first responders, police, or roadside emergencies.',
    categoryBadge: 'URGENT',
    vocabulary: ['HELP', 'AMBULANCE', 'DANGER', 'CALL', 'STOP', 'YES', 'NO'],
    steps: [
      {
        sign: 'HELP',
        confidence: 95,
        status: 'high',
        contextSentence: 'I need emergency help.',
        gestureDescription: 'Fist resting on flat palm raised upward with urgency.',
        handPoseType: 'fist-thumb'
      },
      {
        sign: 'AMBULANCE',
        confidence: 93,
        status: 'high',
        contextSentence: 'Please call an ambulance.',
        gestureDescription: 'Open palm twisting rhythmically near ear level like flashing siren.',
        handPoseType: 'open-palm'
      },
      {
        sign: 'DANGER',
        confidence: 89,
        status: 'high',
        contextSentence: 'Please call an ambulance. I need help.',
        gestureDescription: 'Curved open hands retracting abruptly away from chest.',
        handPoseType: 'crossed-palms'
      }
    ],
    finalSentence: 'Please call an ambulance. I need help.',
    lowConfidenceSign: {
      sign: 'CALL',
      confidence: 54,
      reason: 'Partial occlusion of fingers from rapid movement',
      tips: [
        'POSITION PHONE AT CHEST HEIGHT',
        'STABILIZE HAND MOVEMENT',
        'KEEP PALM FACING CAMERA'
      ]
    }
  },
  daily: {
    id: 'daily',
    number: '03',
    title: 'DAILY',
    tagline: 'Everyday casual conversation',
    description: 'Frequent social interactions, greetings, and daily community situations.',
    categoryBadge: 'COMMUNITY',
    vocabulary: ['HELLO', 'THANK YOU', 'YES', 'NO', 'HELP', 'WATER', 'FOOD'],
    steps: [
      {
        sign: 'HELLO',
        confidence: 97,
        status: 'high',
        contextSentence: 'Hello.',
        gestureDescription: 'Open flat palm near temple moving gently forward in greeting.',
        handPoseType: 'open-palm'
      },
      {
        sign: 'THANK YOU',
        confidence: 95,
        status: 'high',
        contextSentence: 'Hello, thank you.',
        gestureDescription: 'Flat fingertips touching chin then extending forward smoothly toward recipient.',
        handPoseType: 'wave'
      },
      {
        sign: 'YES',
        confidence: 98,
        status: 'high',
        contextSentence: 'Hello, thank you.',
        gestureDescription: 'Fist with thumb across fingers nodding up and down like an affirming head.',
        handPoseType: 'fist-thumb'
      }
    ],
    finalSentence: 'Hello, thank you.',
    lowConfidenceSign: {
      sign: 'WATER',
      confidence: 58,
      reason: 'Ambient reflection and incomplete finger curl',
      tips: [
        'MOVE HAND INTO FRAME',
        'IMPROVE LIGHTING',
        'HOLD GESTURE',
        'TRY AGAIN'
      ]
    }
  }
};
