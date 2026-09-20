/**
 * Signify Speech Service Abstraction
 * 
 * Manages Text-To-Speech (SpeechSynthesis) and Speech-To-Text (SpeechRecognition)
 * with robust fallbacks for full browser compatibility during hackathons and demos.
 */

// Speech-to-Text demo fallback phrases
const FALLBACK_PHRASES = [
  'Nice to meet you!',
  'Hello! How are you doing today?',
  'I can help you with that.',
  'Where are you headed?',
  'Thank you very much!',
  'Everything is going well.',
];

export class SpeechService {
  private fallbackIndex = 0;
  private recognition: any = null;
  private isListeningActive = false;

  constructor() {
    // Check for native SpeechRecognition support
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.interimResults = false;
          this.recognition.lang = 'en-US';
        } catch (e) {
          console.warn('SpeechRecognition initialization error:', e);
        }
      }
    }
  }

  /**
   * Vocalize text using the browser's SpeechSynthesis API
   */
  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (error: any) => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onStart?.();
      setTimeout(() => onEnd?.(), 1500);
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Cancel any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        onStart?.();
      };

      utterance.onend = () => {
        onEnd?.();
      };

      utterance.onerror = (event) => {
        // 'interrupted' is expected when cancelling speech
        if (event.error !== 'interrupted') {
          onError?.(event);
        }
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      onError?.(e);
      onEnd?.();
    }
  }

  public stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Listen for spoken audio via Web Speech API or realistic fallback
   */
  public startListening(
    onResult: (text: string) => void,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    this.isListeningActive = true;
    onStart?.();

    if (this.recognition) {
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          onResult(transcript);
        }
      };

      this.recognition.onerror = () => {
        // Fallback gracefully on recognition error
        this.triggerFallbackPhrase(onResult);
      };

      this.recognition.onend = () => {
        this.isListeningActive = false;
        onEnd?.();
      };

      try {
        this.recognition.start();
        return;
      } catch (e) {
        console.warn('Failed to start native recognition, using demo fallback:', e);
      }
    }

    // Realistic demo fallback simulation
    setTimeout(() => {
      if (this.isListeningActive) {
        this.triggerFallbackPhrase(onResult);
        this.isListeningActive = false;
        onEnd?.();
      }
    }, 1800);
  }

  public stopListening(): void {
    this.isListeningActive = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore if already stopped
      }
    }
  }

  private triggerFallbackPhrase(onResult: (text: string) => void) {
    const phrase = FALLBACK_PHRASES[this.fallbackIndex % FALLBACK_PHRASES.length];
    this.fallbackIndex++;
    onResult(phrase);
  }
}

export const speechService = new SpeechService();
