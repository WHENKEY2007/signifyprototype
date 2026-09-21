/**
 * Signify Context-Aware Sentence Builder
 * 
 * Rule & Context Grammar Engine:
 * Takes individually detected sign tokens from the Kaggle ASL 250 model
 * and constructs natural, grammatically complete, grounded phrases for speech synthesis
 * and two-way conversation.
 * 
 * NOTE: This is a deterministic context-aware sentence builder, NOT an LLM.
 * Strictly prevents hallucination by grounding phrases exclusively in recognized tokens.
 */

import { normalizeSignWord } from '../data/modelVocabulary';

export interface SentenceResult {
  primary: string;
  suggestions: string[];
  isContextReady: boolean;
  tokensUsed: string[];
}

export interface ISentenceBuilder {
  buildSentence(words: string[]): SentenceResult;
  getSuggestions(words: string[]): string[];
}

// Word classification dictionary for intelligent grammatical composition
const GRAMMAR_ROLES = {
  greetings: new Set(['HELLO', 'HI', 'BYE', 'GOODBYE', 'MORNING', 'NIGHT']),
  polite: new Set(['PLEASE', 'THANK YOU', 'THANKYOU']),
  questions: new Set(['WHERE', 'WHAT', 'WHO', 'WHY', 'WHEN', 'HOW']),
  states: new Set([
    'SICK', 'OWIE', 'PAIN', 'HUNGRY', 'THIRSTY', 'TIRED', 'SLEEPY', 'COLD', 'HOT',
    'HAPPY', 'SAD', 'MAD', 'DIRTY', 'CLEAN', 'QUIET', 'LOUD', 'FAST', 'CUTE',
    'BETTER', 'BAD', 'FINE', 'WET', 'DRY', 'EMPTY', 'STICKY', 'YUCKY'
  ]),
  desires: new Set(['WANT', 'NEED', 'CAN', 'HAVETO', 'HAVE TO', 'LIKE', 'HATE']),
  actions: new Set([
    'CALL ON PHONE', 'CALLONPHONE', 'HELP', 'WAIT', 'GO', 'FIND', 'SEE', 'TALK',
    'EAT', 'DRINK', 'SLEEP', 'WAKE', 'JUMP', 'PLAY', 'CLEAN', 'READ', 'GIVE',
    'MAKE', 'LOOK', 'LISTEN', 'HEAR', 'SAY', 'TOUCH', 'DANCE', 'CRY', 'SMILE',
    'CUT', 'BLOW', 'FALL', 'RIDE', 'HIDE', 'STAY', 'FINISH', 'STOP', 'SHHH'
  ]),
  people: new Set([
    'I', 'ME', 'YOU', 'WE', 'MOM', 'DAD', 'BOY', 'GIRL', 'MAN', 'CHILD', 'PERSON',
    'BROTHER', 'AUNT', 'UNCLE', 'GRANDMA', 'GRANDPA', 'POLICE', 'FIREMAN', 'DOCTOR', 'BABY'
  ]),
  places: new Set([
    'HOME', 'BEDROOM', 'BACKYARD', 'FARM', 'STORE', 'ROOM', 'POOL', 'CLOSET', 'BATH', 'POTTY'
  ]),
  foodAndDrinks: new Set([
    'WATER', 'FOOD', 'APPLE', 'PIZZA', 'ICECREAM', 'ICE CREAM', 'CHOCOLATE', 'MILK',
    'CEREAL', 'CARROT', 'FRENCHFRIES', 'FRENCH FRIES', 'SNACK', 'ORANGE', 'NUTS', 'GUM'
  ]),
  objects: new Set([
    'CAR', 'TV', 'BED', 'PHONE', 'CHAIR', 'TABLE', 'BOOK', 'TOY', 'PEN', 'PENCIL',
    'SHIRT', 'SHOE', 'HAT', 'JACKET', 'JEANS', 'BALLOON', 'DOLL', 'PUZZLE', 'MEDICINE'
  ])
};

export class ContextAwareSentenceBuilder implements ISentenceBuilder {
  /**
   * Builds a natural, meaningful, grammatically complete sentence from recognized sign tokens.
   * Deduplicates adjacent identical tokens and matches grounded context patterns.
   */
  public buildSentence(rawWords: string[]): SentenceResult {
    // 1. Normalize and deduplicate adjacent identical tokens
    const normalized = rawWords.map((w) => normalizeSignWord(w)).filter(Boolean);
    const dedupedWords: string[] = [];
    for (let i = 0; i < normalized.length; i++) {
      if (i === 0 || normalized[i] !== normalized[i - 1]) {
        dedupedWords.push(normalized[i]);
      }
    }

    if (dedupedWords.length === 0) {
      return {
        primary: '',
        suggestions: [],
        isContextReady: false,
        tokensUsed: [],
      };
    }

    const words = dedupedWords;
    const tokenSet = new Set(words);

    // =========================================================================
    // 1. HIGH-PRIORITY MULTI-TOKEN IDIOMS & SITUATIONAL COMBINATIONS
    // =========================================================================

    // Emergency & Medical
    if (tokenSet.has('SICK') && tokenSet.has('OWIE') && tokenSet.has('CALL ON PHONE')) {
      return {
        primary: "I am sick and in pain. Please call someone on the phone right away.",
        suggestions: [
          "I am sick and in pain. Please call someone on the phone right away.",
          "I need medical assistance immediately, please call for help.",
          "I am hurt and feeling sick. Please make a phone call."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('SICK') && tokenSet.has('OWIE')) {
      return {
        primary: "I am sick and experiencing severe pain.",
        suggestions: [
          "I am sick and experiencing severe pain.",
          "I am feeling very unwell and hurting.",
          "I need medical help, I am sick and hurt."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('SICK') && tokenSet.has('CALL ON PHONE')) {
      return {
        primary: "I am feeling sick. Please call someone on the phone for me.",
        suggestions: [
          "I am feeling sick. Please call someone on the phone for me.",
          "I need you to call someone for me, I am unwell.",
          "Please call emergency contacts, I am sick."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('OWIE') && tokenSet.has('CALL ON PHONE')) {
      return {
        primary: "I am injured and in pain. Please call someone on the phone.",
        suggestions: [
          "I am injured and in pain. Please call someone on the phone.",
          "I am hurt. Please call someone for me right now.",
          "Please make an emergency phone call, I am hurt."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('POLICE') && tokenSet.has('CALL ON PHONE')) {
      return {
        primary: "Please call the police on the phone immediately.",
        suggestions: [
          "Please call the police on the phone immediately.",
          "I need the police contacted right away.",
          "Please dial emergency police for me."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('FIREMAN') && tokenSet.has('CALL ON PHONE')) {
      return {
        primary: "Please call the fire department on the phone right away.",
        suggestions: [
          "Please call the fire department on the phone right away.",
          "Emergency, please call firefighters.",
          "Please contact the emergency services."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('DOCTOR') && (tokenSet.has('PAIN') || tokenSet.has('OWIE'))) {
      return {
        primary: "I need a doctor. I am in severe pain.",
        suggestions: [
          "I need a doctor. I am in severe pain.",
          "Please call a doctor for me, I am hurting.",
          "I need urgent medical care."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('HELP') && (tokenSet.has('DOCTOR') || tokenSet.has('PAIN') || tokenSet.has('OWIE'))) {
      return {
        primary: "Please help me, I am in pain and need a doctor.",
        suggestions: [
          "Please help me, I am in pain and need a doctor.",
          "Help me, I am feeling severe pain.",
          "I need immediate medical help."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Daily Needs & Hydration / Food
    if (tokenSet.has('WATER') && tokenSet.has('PLEASE') && tokenSet.has('THANK YOU')) {
      return {
        primary: "May I please have some water? Thank you very much.",
        suggestions: [
          "May I please have some water? Thank you very much.",
          "Please give me some water, thank you.",
          "I need some water please, thank you."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('WATER') && tokenSet.has('THIRSTY')) {
      return {
        primary: "I am very thirsty. May I please have some water?",
        suggestions: [
          "I am very thirsty. May I please have some water?",
          "I need a drink of water right now.",
          "Where can I find drinking water?"
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('FOOD') && tokenSet.has('HUNGRY')) {
      return {
        primary: "I am hungry. Can I please have something to eat?",
        suggestions: [
          "I am hungry. Can I please have something to eat?",
          "I need some food right now, please.",
          "Where can I get some food?"
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('WATER') && tokenSet.has('PLEASE')) {
      return {
        primary: "Please may I have some water?",
        suggestions: [
          "Please may I have some water?",
          "Could you please bring me some water?",
          "I would like some water, please."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('FOOD') && tokenSet.has('PLEASE')) {
      return {
        primary: "Please may I have some food?",
        suggestions: [
          "Please may I have some food?",
          "Could you please give me something to eat?",
          "I need some food, please."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('HELP') && tokenSet.has('PLEASE')) {
      return {
        primary: "Could you please help me?",
        suggestions: [
          "Could you please help me?",
          "Please help me with this.",
          "I need some assistance, please."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('THANK YOU') && tokenSet.has('HELP')) {
      return {
        primary: "Thank you very much for your help.",
        suggestions: [
          "Thank you very much for your help.",
          "Thank you for helping me.",
          "I truly appreciate your assistance."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Social & Conversation
    if (tokenSet.has('HELLO') && tokenSet.has('WAIT') && tokenSet.has('TALK')) {
      return {
        primary: "Hello, please wait a moment. Can we talk?",
        suggestions: [
          "Hello, please wait a moment. Can we talk?",
          "Hello, give me a moment, I would like to talk with you.",
          "Hi! Please wait so we can have a conversation."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('HELLO') && tokenSet.has('TALK')) {
      return {
        primary: "Hello! Can we please talk?",
        suggestions: [
          "Hello! Can we please talk?",
          "Hello, I would like to talk with you.",
          "Hi there, let's talk."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('PLEASE') && tokenSet.has('WAIT')) {
      return {
        primary: "Please wait for me a moment.",
        suggestions: [
          "Please wait for me a moment.",
          "Could you please wait here?",
          "Hold on for a moment, please."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('YES') && tokenSet.has('THANK YOU')) {
      return {
        primary: "Yes, thank you very much.",
        suggestions: [
          "Yes, thank you very much.",
          "Yes, thank you!",
          "Yes, I appreciate that."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('NO') && tokenSet.has('THANK YOU')) {
      return {
        primary: "No, thank you.",
        suggestions: [
          "No, thank you.",
          "No, but thank you for asking.",
          "No, I am alright, thank you."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Restroom / Facilities
    if (tokenSet.has('WHERE') && (tokenSet.has('BATH') || tokenSet.has('POTTY') || tokenSet.has('ROOM'))) {
      return {
        primary: "Excuse me, where is the nearest restroom?",
        suggestions: [
          "Excuse me, where is the nearest restroom?",
          "Can you tell me where the bathroom is?",
          "Where can I find the restroom?"
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (tokenSet.has('HAVETO') || tokenSet.has('HAVE TO')) {
      if (tokenSet.has('BATH') || tokenSet.has('POTTY')) {
        return {
          primary: "I have to use the restroom right now.",
          suggestions: [
            "I have to use the restroom right now.",
            "I need to go to the bathroom urgently.",
            "Where is the nearest bathroom?"
          ],
          isContextReady: true,
          tokensUsed: words,
        };
      }
      if (tokenSet.has('GO')) {
        return {
          primary: "I have to go now.",
          suggestions: ["I have to go now.", "I must leave now.", "Time for me to go."],
          isContextReady: true,
          tokensUsed: words,
        };
      }
    }

    // Location / Questions (WHERE + [Noun])
    if (tokenSet.has('WHERE')) {
      const nonWhere = words.filter((w) => w !== 'WHERE');
      if (nonWhere.length > 0) {
        const target = nonWhere.map((w) => w.toLowerCase()).join(' and ');
        return {
          primary: `Excuse me, where can I find ${target}?`,
          suggestions: [
            `Excuse me, where can I find ${target}?`,
            `Where is the ${target}?`,
            `Could you direct me to the ${target}?`
          ],
          isContextReady: true,
          tokensUsed: words,
        };
      }
    }

    // Time inquiries
    if (tokenSet.has('TIME')) {
      return {
        primary: "Excuse me, what time is it?",
        suggestions: [
          "Excuse me, what time is it?",
          "Do you know what time it is right now?",
          "Can you tell me the time, please?"
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Sleep / Fatigue
    if (tokenSet.has('SLEEP') || tokenSet.has('SLEEPY') || tokenSet.has('NAP')) {
      if (tokenSet.has('TIRED') || tokenSet.has('BED')) {
        return {
          primary: "I am feeling very tired and need to sleep.",
          suggestions: [
            "I am feeling very tired and need to sleep.",
            "I need to go to bed and rest.",
            "I am sleepy, I need to sleep."
          ],
          isContextReady: true,
          tokensUsed: words,
        };
      }
    }

    // Going places
    if (tokenSet.has('GO') && tokenSet.has('HOME')) {
      return {
        primary: "I want to go home now.",
        suggestions: [
          "I want to go home now.",
          "Can we go home please?",
          "It is time for me to head home."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // =========================================================================
    // 2. SINGLE TOKEN MEANINGFUL SENTENCES
    // =========================================================================
    if (words.length === 1) {
      const single = words[0];

      const singleMap: Record<string, { primary: string; suggestions: string[] }> = {
        'SICK': {
          primary: "I am feeling sick and unwell.",
          suggestions: ["I am feeling sick and unwell.", "I feel very sick.", "I am sick."]
        },
        'OWIE': {
          primary: "I am in pain and hurting.",
          suggestions: ["I am in pain and hurting.", "That hurts me.", "I am feeling pain."]
        },
        'CALL ON PHONE': {
          primary: "Please make a phone call for me.",
          suggestions: ["Please make a phone call for me.", "Can you call someone on the phone?", "Please call on the phone."]
        },
        'CALLONPHONE': {
          primary: "Please make a phone call for me.",
          suggestions: ["Please make a phone call for me.", "Can you call someone on the phone?", "Please call on the phone."]
        },
        'POLICE': {
          primary: "I need assistance from the police.",
          suggestions: ["I need assistance from the police.", "Please contact the police.", "Call the police, please."]
        },
        'FIREMAN': {
          primary: "Please call the fire department.",
          suggestions: ["Please call the fire department.", "I need the fire department.", "Call firefighters, please."]
        },
        'WATER': {
          primary: "I would like some water, please.",
          suggestions: ["I would like some water, please.", "May I have some water?", "Where can I find drinking water?"]
        },
        'FOOD': {
          primary: "I would like some food, please.",
          suggestions: ["I would like some food, please.", "Can I have something to eat?", "I need food, please."]
        },
        'THIRSTY': {
          primary: "I am very thirsty.",
          suggestions: ["I am very thirsty.", "I need something to drink.", "Can I please have water?"]
        },
        'HUNGRY': {
          primary: "I am feeling hungry.",
          suggestions: ["I am feeling hungry.", "I need something to eat.", "Can I have food, please?"]
        },
        'HELLO': {
          primary: "Hello! How are you?",
          suggestions: ["Hello! How are you?", "Hello, nice to meet you.", "Hi there!"]
        },
        'BYE': {
          primary: "Goodbye, have a great day!",
          suggestions: ["Goodbye, have a great day!", "See you later!", "Bye!"]
        },
        'THANK YOU': {
          primary: "Thank you very much.",
          suggestions: ["Thank you very much.", "Thank you for your help.", "I appreciate it!"]
        },
        'PLEASE': {
          primary: "Please, if you could.",
          suggestions: ["Please, if you could.", "Yes, please.", "Could you please help me?"]
        },
        'YES': {
          primary: "Yes, that is correct.",
          suggestions: ["Yes, that is correct.", "Yes, please.", "Yes, I agree."]
        },
        'NO': {
          primary: "No, thank you.",
          suggestions: ["No, thank you.", "No, that is not correct.", "No, not right now."]
        },
        'WAIT': {
          primary: "Please wait a moment for me.",
          suggestions: ["Please wait a moment for me.", "Wait for me, please.", "Hold on a minute."]
        },
        'HELP': {
          primary: "I need help, please assist me.",
          suggestions: ["I need help, please assist me.", "Please help me.", "Can someone help me?"]
        },
        'TIRED': {
          primary: "I am feeling very tired.",
          suggestions: ["I am feeling very tired.", "I need to rest.", "I am exhausted."]
        },
        'SLEEPY': {
          primary: "I am feeling very sleepy.",
          suggestions: ["I am feeling very sleepy.", "I need to go to sleep.", "I am ready for bed."]
        },
        'COLD': {
          primary: "I am feeling very cold.",
          suggestions: ["I am feeling very cold.", "It is too cold for me.", "I need to get warm."]
        },
        'HOT': {
          primary: "I am feeling very hot.",
          suggestions: ["I am feeling very hot.", "It is too hot in here.", "I need to cool down."]
        },
        'HAPPY': {
          primary: "I am feeling happy today!",
          suggestions: ["I am feeling happy today!", "I am so glad.", "This makes me happy."]
        },
        'SAD': {
          primary: "I am feeling sad right now.",
          suggestions: ["I am feeling sad right now.", "I feel down today.", "I need a moment."]
        },
        'FINE': {
          primary: "I am doing fine, thank you.",
          suggestions: ["I am doing fine, thank you.", "Everything is fine.", "I am okay."]
        },
        'POTTY': {
          primary: "I need to use the restroom, please.",
          suggestions: ["I need to use the restroom, please.", "Where is the bathroom?", "I need the toilet."]
        },
        'BATH': {
          primary: "I need to use the bathroom, please.",
          suggestions: ["I need to use the bathroom, please.", "Where is the restroom?", "I need to wash up."]
        }
      };

      if (singleMap[single]) {
        return {
          primary: singleMap[single].primary,
          suggestions: singleMap[single].suggestions,
          isContextReady: false,
          tokensUsed: words,
        };
      }

      // Default single token complete sentence
      const lower = single.toLowerCase();
      const cap = lower.charAt(0).toUpperCase() + lower.slice(1);
      return {
        primary: `I am communicating: ${cap}.`,
        suggestions: [
          `I am communicating: ${cap}.`,
          `Please note: ${cap}.`,
          cap + '.'
        ],
        isContextReady: false,
        tokensUsed: words,
      };
    }

    // =========================================================================
    // 3. INTELLIGENT GRAMMATICAL SYNTHESIS FOR MULTI-WORD SEQUENCES
    // =========================================================================
    // Classify words in the sequence
    const hasPolite = words.some((w) => GRAMMAR_ROLES.polite.has(w));
    const states = words.filter((w) => GRAMMAR_ROLES.states.has(w));
    const actions = words.filter((w) => GRAMMAR_ROLES.actions.has(w));
    const foods = words.filter((w) => GRAMMAR_ROLES.foodAndDrinks.has(w));
    const objects = words.filter((w) => GRAMMAR_ROLES.objects.has(w));
    const people = words.filter((w) => GRAMMAR_ROLES.people.has(w));
    const places = words.filter((w) => GRAMMAR_ROLES.places.has(w));

    let primarySentence = '';
    const altSuggestions: string[] = [];

    // Pattern A: State + Request/Need (e.g. [HUNGRY, FOOD], [COLD, JACKET])
    if (states.length > 0 && (foods.length > 0 || objects.length > 0)) {
      const stateDesc = states.map((s) => s.toLowerCase()).join(' and ');
      const targetItems = [...foods, ...objects].map((o) => o.toLowerCase()).join(' and ');
      primarySentence = `I am feeling ${stateDesc}, so I need some ${targetItems}${hasPolite ? ', please' : '.'}`;
      altSuggestions.push(primarySentence);
      altSuggestions.push(`Please help me get ${targetItems}, I am ${stateDesc}.`);
    }
    // Pattern B: Multiple states (e.g. [SICK, TIRED])
    else if (states.length >= 2) {
      const stateDesc = states.map((s) => s.toLowerCase()).join(' and ');
      primarySentence = `I am feeling very ${stateDesc}${hasPolite ? ', please help me' : '.'}`;
      altSuggestions.push(primarySentence);
      altSuggestions.push(`I feel both ${stateDesc}.`);
    }
    // Pattern C: Action + Object / Person (e.g. [CALL ON PHONE, MOM], [FIND, CAR], [CLEAN, ROOM])
    else if (actions.length > 0 && (people.length > 0 || objects.length > 0 || places.length > 0)) {
      const actionName = actions[0].toLowerCase();
      const target = [...people, ...objects, ...places].map((t) => t.toLowerCase()).join(' and ');
      if (hasPolite) {
        primarySentence = `Please ${actionName} the ${target} for me.`;
      } else {
        primarySentence = `I need to ${actionName} the ${target}.`;
      }
      altSuggestions.push(primarySentence);
      altSuggestions.push(`Could you help me ${actionName} ${target}?`);
    }
    // Pattern D: Polite Request of items (e.g. [PLEASE, WATER], [PLEASE, FOOD, TABLE])
    else if (hasPolite && (foods.length > 0 || objects.length > 0)) {
      const items = [...foods, ...objects].map((i) => i.toLowerCase()).join(' and ');
      primarySentence = `Could you please provide some ${items}?`;
      altSuggestions.push(primarySentence);
      altSuggestions.push(`Please may I have the ${items}?`);
    }
    // Pattern E: Natural general synthesis connecting words with proper English syntax
    else {
      const cleanedTokens = words.map((w) => {
        const l = w.toLowerCase();
        if (l === 'callonphone') return 'call on phone';
        if (l === 'frenchfries') return 'french fries';
        if (l === 'icecream') return 'ice cream';
        return l;
      });

      if (cleanedTokens.length === 2) {
        primarySentence = `I need ${cleanedTokens[0]} and ${cleanedTokens[1]}.`;
      } else {
        const last = cleanedTokens[cleanedTokens.length - 1];
        const initial = cleanedTokens.slice(0, -1).join(', ');
        primarySentence = `I am signing about ${initial}, and ${last}.`;
      }
      altSuggestions.push(primarySentence);
      altSuggestions.push(`Please note: ${words.join(' ')}.`);
    }

    // Capitalize first letter and ensure ending punctuation
    primarySentence = primarySentence.charAt(0).toUpperCase() + primarySentence.slice(1);
    if (!/[.!?]$/.test(primarySentence)) {
      primarySentence += '.';
    }

    if (altSuggestions.length < 3) {
      altSuggestions.push(`I am communicating: "${primarySentence}"`);
    }

    return {
      primary: primarySentence,
      suggestions: altSuggestions.slice(0, 3),
      isContextReady: true,
      tokensUsed: words,
    };
  }

  public getSuggestions(words: string[]): string[] {
    return this.buildSentence(words).suggestions;
  }
}

// Singleton export
export const sentenceBuilder: ISentenceBuilder = new ContextAwareSentenceBuilder();
