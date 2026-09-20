/**
 * Signify Sentence Builder Service
 * 
 * Takes individually detected sign words and produces grounded,
 * natural-language sentence suggestions.
 * 
 * Architecture:
 * WORD RECOGNITION -> WORD BUFFER -> CONTEXT BUILDER -> NATURAL SENTENCE
 * 
 * Crucial Product Rule:
 * Sentences must be strictly grounded in recognized words without hallucinating
 * or exposing low-level AI internals (no LLM, tokens, embeddings, logits).
 */

export interface SentenceResult {
  primary: string;
  suggestions: string[];
  isContextReady: boolean;
}

export interface ISentenceBuilder {
  buildSentence(words: string[]): SentenceResult;
  getSuggestions(words: string[]): string[];
}

export class SentenceBuilderService implements ISentenceBuilder {
  /**
   * Deterministic phrase mapping based on recognized word sequence.
   * Grounded strictly in detected vocabulary.
   */
  public buildSentence(rawWords: string[]): SentenceResult {
    const words = rawWords.map((w) => w.trim().toUpperCase()).filter(Boolean);

    if (words.length === 0) {
      return {
        primary: '',
        suggestions: [],
        isContextReady: false,
      };
    }

    const joined = words.join(' ');

    // Multi-word sequence matches
    if (joined === 'HELLO HOW YOU' || (words.includes('HELLO') && words.includes('HOW') && words.includes('YOU'))) {
      return {
        primary: 'Hello, how are you?',
        suggestions: [
          'Hello, how are you?',
          'Hello! How are you doing?',
          'Hello, nice to meet you.',
        ],
        isContextReady: true,
      };
    }

    if (joined === 'I NEED HELP' || (words.includes('NEED') && words.includes('HELP')) || (words.includes('I') && words.includes('HELP'))) {
      return {
        primary: 'I need help.',
        suggestions: [
          'I need help.',
          'Please help me.',
          'Can you help me?',
        ],
        isContextReady: true,
      };
    }

    if (joined === 'THANK YOU' || joined === 'THANK' || words.includes('THANK') && words.includes('YOU')) {
      return {
        primary: 'Thank you.',
        suggestions: [
          'Thank you.',
          'Thank you for helping me.',
          'Thank you very much.',
        ],
        isContextReady: words.length >= 2 || joined === 'THANK YOU',
      };
    }

    if (joined === 'WHERE WATER' || (words.includes('WHERE') && words.includes('WATER'))) {
      return {
        primary: 'Where can I get water?',
        suggestions: [
          'Where can I get water?',
          'I need water.',
          'Can I have some water?',
        ],
        isContextReady: true,
      };
    }

    // Healthcare / Emergency combinations
    if (words.includes('DOCTOR') && words.includes('PAIN')) {
      return {
        primary: "I need a doctor. I'm in pain.",
        suggestions: [
          "I need a doctor. I'm in pain.",
          'Please call a doctor.',
          'I am having severe pain.',
        ],
        isContextReady: true,
      };
    }

    if (words.includes('AMBULANCE') || (words.includes('EMERGENCY') && words.includes('HELP'))) {
      return {
        primary: 'Please call an ambulance.',
        suggestions: [
          'Please call an ambulance.',
          'I need emergency medical help.',
          'This is an emergency.',
        ],
        isContextReady: true,
      };
    }

    // Single-word grounded suggestions
    if (words.length === 1) {
      const single = words[0];

      if (single === 'HELP') {
        return {
          primary: 'I need help.',
          suggestions: [
            'I need help.',
            'Please help me.',
            'Can you help me?',
          ],
          isContextReady: false,
        };
      }

      if (single === 'WATER') {
        return {
          primary: 'I need water.',
          suggestions: [
            'I need water.',
            'Can I have some water?',
            'Where can I get water?',
          ],
          isContextReady: false,
        };
      }

      if (single === 'HELLO') {
        return {
          primary: 'Hello!',
          suggestions: [
            'Hello!',
            'Hello, how are you?',
            'Hello, nice to meet you.',
          ],
          isContextReady: false,
        };
      }

      if (single === 'THANK YOU') {
        return {
          primary: 'Thank you.',
          suggestions: [
            'Thank you.',
            'Thank you for helping me.',
            'Thank you very much.',
          ],
          isContextReady: true,
        };
      }

      if (single === 'YES') {
        return {
          primary: 'Yes, that is correct.',
          suggestions: [
            'Yes, that is correct.',
            'Yes, please.',
            'Yes, I agree.',
          ],
          isContextReady: false,
        };
      }

      if (single === 'NO') {
        return {
          primary: 'No, thank you.',
          suggestions: [
            'No, thank you.',
            'No, that is not correct.',
            'No, I do not need that.',
          ],
          isContextReady: false,
        };
      }

      if (single === 'PLEASE') {
        return {
          primary: 'Please.',
          suggestions: [
            'Please.',
            'Please help me.',
            'Could you please assist me?',
          ],
          isContextReady: false,
        };
      }
    }

    // Dynamic contextual expansion fallback: grounded in recognized words
    const formattedWords = words.map((w) => {
      const lower = w.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    const simpleSentence = `${formattedWords.join(' ')}.`;

    return {
      primary: simpleSentence,
      suggestions: [
        simpleSentence,
        `I am communicating: ${formattedWords.join(', ')}.`,
      ],
      isContextReady: words.length >= 2,
    };
  }

  public getSuggestions(words: string[]): string[] {
    return this.buildSentence(words).suggestions;
  }
}

export const sentenceBuilder: ISentenceBuilder = new SentenceBuilderService();
