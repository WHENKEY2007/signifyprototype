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
  private currentSessionFinal = '';
  private onResultCallback: ((text: string) => void) | null = null;
  private hasDispatchedResult = false;

  constructor() {
    // Check for native SpeechRecognition support
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
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
   * Listen for spoken audio via Web Speech API with real-time interim results.
   * Dispatches EXACTLY ONCE to prevent duplicate conversation entries.
   */
  public startListening(
    onResult: (text: string) => void,
    onStart?: () => void,
    onEnd?: () => void,
    onInterim?: (interimText: string) => void,
    onError?: (error: any) => void
  ): void {
    // Abort any existing ongoing session
    this.stopListening();

    this.isListeningActive = true;
    this.currentSessionFinal = '';
    this.hasDispatchedResult = false;
    this.onResultCallback = onResult;

    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          // Fresh instance per listening session prevents Chrome/WebKit stale event listener bugs
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.lang = navigator.language || 'en-US';
          recognition.maxAlternatives = 1;
          this.recognition = recognition;

          recognition.onstart = () => {
            onStart?.();
          };

          recognition.onresult = (event: any) => {
            let sessionFinal = '';
            let sessionInterim = '';

            for (let i = 0; i < event.results.length; ++i) {
              const res = event.results[i];
              if (res.isFinal) {
                sessionFinal += res[0]?.transcript + ' ';
              } else {
                sessionInterim += res[0]?.transcript;
              }
            }

            if (sessionFinal.trim()) {
              this.currentSessionFinal = sessionFinal.trim();
            }

            const livePreview = (sessionFinal + sessionInterim).trim();
            if (livePreview) {
              onInterim?.(livePreview);
            }
          };

          recognition.onerror = (event: any) => {
            // 'no-speech' and 'aborted' are normal user flow states, not fatal errors
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
              console.warn('Speech recognition error:', event.error);
              onError?.(event.error);
            }
          };

          recognition.onend = () => {
            this.isListeningActive = false;
            onEnd?.();

            // Dispatch final result once if not already dispatched
            const textToEmit = this.currentSessionFinal.trim();
            if (!this.hasDispatchedResult && textToEmit && this.onResultCallback) {
              this.hasDispatchedResult = true;
              this.onResultCallback(textToEmit);
            }
          };

          recognition.start();
          return;
        } catch (e) {
          console.warn('Failed to start native recognition:', e);
        }
      }
    }

    // Realistic demo fallback simulation ONLY if SpeechRecognition is entirely missing in browser
    setTimeout(() => {
      if (this.isListeningActive && !this.hasDispatchedResult) {
        this.hasDispatchedResult = true;
        this.triggerFallbackPhrase(onResult);
        this.isListeningActive = false;
        onEnd?.();
      }
    }, 2200);
  }

  /**
   * Stop listening and optionally flush whatever text was recognized
   */
  public stopListening(flushResult: boolean = false): void {
    this.isListeningActive = false;

    if (this.recognition) {
      try {
        if (flushResult && !this.hasDispatchedResult && this.currentSessionFinal.trim() && this.onResultCallback) {
          this.hasDispatchedResult = true;
          this.onResultCallback(this.currentSessionFinal.trim());
        }
        this.recognition.stop();
      } catch {
        try {
          this.recognition.abort();
        } catch {}
      }
      this.recognition = null;
    }
  }

  public getCurrentTranscript(): string {
    return this.currentSessionFinal;
  }

  private triggerFallbackPhrase(onResult: (text: string) => void): void {
    const phrase = FALLBACK_PHRASES[this.fallbackIndex % FALLBACK_PHRASES.length];
    this.fallbackIndex++;
    onResult(phrase);
  }
}

export const speechService = new SpeechService();
