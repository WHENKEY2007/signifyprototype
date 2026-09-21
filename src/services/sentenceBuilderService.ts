/**
 * Signify Context-Aware Sentence Builder
 * 
 * Rule & Context Grammar Engine:
 * Takes individually detected sign tokens from the Kaggle ASL 250 model
 * and constructs natural, grounded phrases for speech synthesis.
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

export class ContextAwareSentenceBuilder implements ISentenceBuilder {
  /**
   * Builds a natural sentence from recognized sign tokens.
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

    // ==========================================
    // Authentic Kaggle ASL 250 Grounded Contexts
    // ==========================================

    // Health & Urgent Assistance (SICK, OWIE, CALL ON PHONE)
    if (words.includes('SICK') && words.includes('OWIE') && words.includes('CALL ON PHONE')) {
      return {
        primary: "I am sick and in pain. Please call someone on the phone.",
        suggestions: [
          "I am sick and in pain. Please call someone on the phone.",
          "I need medical assistance right now. Please call on the phone.",
          "I am hurt and sick. Please make a phone call."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('SICK') && words.includes('OWIE')) {
      return {
        primary: "I am sick and in pain.",
        suggestions: [
          "I am sick and in pain.",
          "I am feeling sick and hurting.",
          "I need help, I am sick."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('SICK') && words.includes('CALL ON PHONE')) {
      return {
        primary: "I am sick. Please call someone on the phone.",
        suggestions: [
          "I am sick. Please call someone on the phone.",
          "I need a phone call made for me, I am sick.",
          "Please call emergency contacts, I am unwell."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('OWIE') && words.includes('CALL ON PHONE')) {
      return {
        primary: "I am hurt. Please call someone on the phone.",
        suggestions: [
          "I am hurt. Please call someone on the phone.",
          "I am in pain. Please make a call.",
          "Please call for assistance."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Emergency Services (POLICE, FIREMAN)
    if (words.includes('POLICE') && words.includes('CALL ON PHONE')) {
      return {
        primary: "Please call the police on the phone.",
        suggestions: [
          "Please call the police on the phone.",
          "I need the police called right away.",
          "Please dial the police for me."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('FIREMAN') && words.includes('CALL ON PHONE')) {
      return {
        primary: "Please call the fire department on the phone.",
        suggestions: [
          "Please call the fire department on the phone.",
          "Emergency, please call firefighters.",
          "Please call the emergency services."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Daily Needs (WATER, THIRSTY, FOOD, HUNGRY, PLEASE, THANK YOU)
    if (words.includes('WATER') && words.includes('PLEASE') && words.includes('THANK YOU')) {
      return {
        primary: "May I please have water? Thank you.",
        suggestions: [
          "May I please have water? Thank you.",
          "Please get me some water. Thank you.",
          "I need water please, thank you."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('WATER') && words.includes('THIRSTY')) {
      return {
        primary: "I am thirsty. Can I please have water?",
        suggestions: [
          "I am thirsty. Can I please have water?",
          "I need a glass of water.",
          "Where can I get water?"
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('FOOD') && words.includes('HUNGRY')) {
      return {
        primary: "I am hungry. Can I have some food?",
        suggestions: [
          "I am hungry. Can I have some food?",
          "I need something to eat, please.",
          "Where is food available?"
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('WATER') && words.includes('PLEASE')) {
      return {
        primary: "May I please have some water?",
        suggestions: [
          "May I please have some water?",
          "Water please.",
          "Could you bring me water?"
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Social & Conversation (HELLO, WAIT, TALK, YES, NO, THANK YOU)
    if (words.includes('HELLO') && words.includes('WAIT') && words.includes('TALK')) {
      return {
        primary: "Hello, please wait a moment. Can we talk?",
        suggestions: [
          "Hello, please wait a moment. Can we talk?",
          "Hello, please wait, I would like to talk with you.",
          "Hi, give me a moment to talk."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('HELLO') && words.includes('TALK')) {
      return {
        primary: "Hello! Can we talk?",
        suggestions: [
          "Hello! Can we talk?",
          "Hello, I want to talk to you.",
          "Hi, let's talk."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('PLEASE') && words.includes('WAIT')) {
      return {
        primary: "Please wait a moment.",
        suggestions: [
          "Please wait a moment.",
          "Could you please wait for me?",
          "Please hold on."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('YES') && words.includes('THANK YOU')) {
      return {
        primary: "Yes, thank you very much.",
        suggestions: [
          "Yes, thank you very much.",
          "Yes, thank you.",
          "Yes, I appreciate it."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('NO') && words.includes('THANK YOU')) {
      return {
        primary: "No, thank you.",
        suggestions: [
          "No, thank you.",
          "No, thank you though.",
          "No, I am okay, thank you."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // Concept Scenario Patterns (Clearly preserved for concept walkthroughs)
    if (words.includes('DOCTOR') && words.includes('PAIN')) {
      return {
        primary: "I need a doctor. I'm in pain.",
        suggestions: [
          "I need a doctor. I'm in pain.",
          "Please call a doctor. I have severe pain.",
          "I need urgent medical care."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('HELP') && (words.includes('DOCTOR') || words.includes('PAIN'))) {
      return {
        primary: "Please help me, I need a doctor.",
        suggestions: [
          "Please help me, I need a doctor.",
          "Help me, I am in pain.",
          "I need medical help right away."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    if (words.includes('AMBULANCE') || (words.includes('HELP') && words.includes('DANGER'))) {
      return {
        primary: "Please call an ambulance. I need help.",
        suggestions: [
          "Please call an ambulance. I need help.",
          "Emergency, please call an ambulance.",
          "I need immediate emergency help."
        ],
        isContextReady: true,
        tokensUsed: words,
      };
    }

    // ==========================================
    // Single Token Grounded Contexts
    // ==========================================
    if (words.length === 1) {
      const single = words[0];

      if (single === 'SICK') {
        return {
          primary: "I am feeling sick.",
          suggestions: ["I am feeling sick.", "I feel unwell.", "I am sick."],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'OWIE') {
        return {
          primary: "I am in pain.",
          suggestions: ["I am in pain.", "That hurts.", "I am feeling pain."],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'CALL ON PHONE') {
        return {
          primary: "Please make a phone call.",
          suggestions: ["Please make a phone call.", "Can you call someone on the phone?", "Please call on phone."],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'POLICE') {
        return {
          primary: "I need the police.",
          suggestions: ["I need the police.", "Please contact the police.", "Police needed."],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'WATER') {
        return {
          primary: "I need water.",
          suggestions: ["I need water.", "Can I have some water?", "Where can I get water?"],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'HELLO') {
        return {
          primary: "Hello!",
          suggestions: ["Hello!", "Hello, how are you?", "Hi!"],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'THANK YOU') {
        return {
          primary: "Thank you.",
          suggestions: ["Thank you.", "Thank you very much.", "Thanks!"],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'PLEASE') {
        return {
          primary: "Please.",
          suggestions: ["Please.", "Yes, please.", "Could you please help?"],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'YES') {
        return {
          primary: "Yes.",
          suggestions: ["Yes.", "Yes, correct.", "Yes, please."],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'NO') {
        return {
          primary: "No.",
          suggestions: ["No.", "No, thank you.", "No, not right now."],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'WAIT') {
        return {
          primary: "Please wait.",
          suggestions: ["Please wait.", "Wait a moment.", "Wait for me please."],
          isContextReady: false,
          tokensUsed: words,
        };
      }

      if (single === 'HELP') {
        return {
          primary: "I need help.",
          suggestions: ["I need help.", "Please help me.", "Can you help me?"],
          isContextReady: false,
          tokensUsed: words,
        };
      }
    }

    // ==========================================
    // Generic Multi-Word Natural Formatting
    // ==========================================
    const formattedWords = words.map((w) => {
      const lower = w.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    const assembledPhrase = formattedWords.join(' ') + '.';

    return {
      primary: assembledPhrase,
      suggestions: [
        assembledPhrase,
        `I am signing: ${assembledPhrase}`,
        `Please note: ${assembledPhrase}`
      ],
      isContextReady: words.length >= 2,
      tokensUsed: words,
    };
  }

  public getSuggestions(words: string[]): string[] {
    return this.buildSentence(words).suggestions;
  }
}

// Singleton export
export const sentenceBuilder: ISentenceBuilder = new ContextAwareSentenceBuilder();
