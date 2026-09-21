/**
 * Signify Recognition Service Abstraction
 * 
 * Clean service layer separating sign word recognition from sentence synthesis.
 * Connects to the Kaggle ASL 250-class ML model (Hugging Face Cloud / Local Bridge).
 * Strictly guards against random word spam during live camera streaming.
 */

export interface RecognitionResult {
  word: string;
  sign: string; // Alias for backward compatibility
  text: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  isSimulated: boolean;
  top3?: Array<[string, number]>;
}

export const DEMO_SIGNS: Record<string, { text: string; confidence: number }> = {
  'HELLO': { text: 'Hello', confidence: 96 },
  'HOW': { text: 'How', confidence: 94 },
  'YOU': { text: 'You', confidence: 95 },
  'I': { text: 'I', confidence: 97 },
  'NEED': { text: 'Need', confidence: 93 },
  'HELP': { text: 'Help', confidence: 96 },
  'THANK': { text: 'Thank', confidence: 95 },
  'THANK YOU': { text: 'Thank you', confidence: 95 },
  'WHERE': { text: 'Where', confidence: 92 },
  'WATER': { text: 'Water', confidence: 94 },
  'YES': { text: 'Yes', confidence: 98 },
  'NO': { text: 'No', confidence: 94 },
  'PLEASE': { text: 'Please', confidence: 93 },
  'DOCTOR': { text: 'Doctor', confidence: 94 },
  'PAIN': { text: 'Pain', confidence: 91 },
};

export interface IRecognitionService {
  isSimulated(): boolean;
  recognizeSign(frameOrKey?: any, preferredSign?: string): Promise<RecognitionResult>;
  getUncertainSign(): Promise<RecognitionResult>;
  getAvailableSigns(): string[];
  checkServerHealth?(): Promise<boolean>;
  resetBuffer?(): Promise<void>;
}

export class DemoRecognitionService implements IRecognitionService {
  // currentIndex removed to prevent random cycle
  private signKeys = Object.keys(DEMO_SIGNS);

  public isSimulated(): boolean {
    return true;
  }

  public getAvailableSigns(): string[] {
    return this.signKeys;
  }

  public async recognizeSign(frameOrKey?: any, preferredSign?: string): Promise<RecognitionResult> {
    const targetKey = typeof frameOrKey === 'string' ? frameOrKey : preferredSign;

    // Only recognize when an explicit key/word is requested (e.g. Demo bar buttons)
    if (targetKey) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const word = targetKey.toUpperCase();
      const data = DEMO_SIGNS[word] || { text: word, confidence: 95 };

      return {
        word,
        sign: word,
        text: data.text,
        confidence: data.confidence,
        status: data.confidence >= 75 ? 'high' : 'low',
        isSimulated: true,
      };
    }

    // If called without target key during live preview, remain idle (never spam random words!)
    return {
      word: '',
      sign: '',
      text: 'Show hand to sign',
      confidence: 0,
      status: 'low',
      isSimulated: true,
    };
  }

  public async getUncertainSign(): Promise<RecognitionResult> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      word: 'UNCERTAIN',
      sign: 'UNCERTAIN',
      text: 'Sign not clear',
      confidence: 48,
      status: 'low',
      isSimulated: true,
    };
  }
}

export class LiveKaggleRecognitionService implements IRecognitionService {
  private demoService: DemoRecognitionService;
  private serverUrl = (import.meta as any).env?.VITE_ASL_SERVER_URL || 'https://srivenkatesh2007-signify-asl-bridge.hf.space';
  private isServerOnline = false;
  private lastHealthCheck = 0;
  private offscreenCanvas: HTMLCanvasElement | null = null;
  private availableSigns: string[] = Object.keys(DEMO_SIGNS);

  constructor() {
    this.demoService = new DemoRecognitionService();
    this.checkServerHealth();
  }

  public async checkServerHealth(): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastHealthCheck < 4000 && this.isServerOnline) {
      return this.isServerOnline;
    }
    this.lastHealthCheck = now;

    try {
      const res = await fetch(`${this.serverUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) {
        this.isServerOnline = true;
        this.fetchSignClasses();
        return true;
      }
    } catch {
      this.isServerOnline = false;
    }
    return false;
  }

  private async fetchSignClasses() {
    try {
      const res = await fetch(`${this.serverUrl}/signs`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.signs) && data.signs.length > 0) {
          this.availableSigns = data.signs.map((s: string) => s.toUpperCase());
        }
      }
    } catch {
      // Keep existing signs
    }
  }

  public isSimulated(): boolean {
    return !this.isServerOnline;
  }

  public getAvailableSigns(): string[] {
    return this.availableSigns;
  }

  private captureFrameBase64(): string | null {
    if (typeof document === 'undefined') return null;

    const video = document.getElementById('signify-camera-video') as HTMLVideoElement | null;
    if (!video || video.readyState < 2 || video.videoWidth === 0) {
      return null;
    }

    if (!this.offscreenCanvas) {
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCanvas.width = 320;
      this.offscreenCanvas.height = 240;
    }

    const ctx = this.offscreenCanvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, 320, 240);
    return this.offscreenCanvas.toDataURL('image/jpeg', 0.82);
  }

  public async recognizeSign(frameOrKey?: any, preferredSign?: string): Promise<RecognitionResult> {
    const targetKey = typeof frameOrKey === 'string' ? frameOrKey : preferredSign;

    // Explicit demo sequence / button requested
    if (targetKey) {
      return this.demoService.recognizeSign(targetKey, preferredSign);
    }

    // Check server status
    const online = await this.checkServerHealth();
    if (!online) {
      // In live camera mode without server, remain idle (NO random words!)
      return {
        word: '',
        sign: '',
        text: 'Connecting to AI model...',
        confidence: 0,
        status: 'low',
        isSimulated: true,
      };
    }

    // Capture real frame from webcam
    const base64Frame = this.captureFrameBase64();
    if (!base64Frame) {
      return {
        word: '',
        sign: '',
        text: 'Position hand inside frame',
        confidence: 0,
        status: 'low',
        isSimulated: false,
      };
    }

    try {
      const res = await fetch(`${this.serverUrl}/predict_frame`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frame: base64Frame }),
        signal: AbortSignal.timeout(2500),
      });

      if (!res.ok) {
        return {
          word: '',
          sign: '',
          text: 'AI model busy...',
          confidence: 0,
          status: 'low',
          isSimulated: false,
        };
      }

      const data = await res.json();

      if (data && data.prediction && data.prediction.word) {
        const pred = data.prediction;
        return {
          word: pred.word,
          sign: pred.word,
          text: pred.word,
          confidence: Math.round(pred.confidence),
          status: pred.confidence >= 70 ? 'high' : 'low',
          isSimulated: false,
          top3: pred.top3,
        };
      }

      // Hand detected but still accumulating or analyzing gesture
      if (data && data.hand_detected) {
        return {
          word: 'SCANNING',
          sign: 'SCANNING',
          text: 'Analyzing gesture...',
          confidence: 50,
          status: 'medium',
          isSimulated: false,
        };
      }

      // No hand in view
      return {
        word: '',
        sign: '',
        text: 'Show your hand to sign',
        confidence: 0,
        status: 'low',
        isSimulated: false,
      };
    } catch (e) {
      // On network failure, stay idle (NEVER generate random words!)
      return {
        word: '',
        sign: '',
        text: 'AI model connecting...',
        confidence: 0,
        status: 'low',
        isSimulated: true,
      };
    }
  }

  public async getUncertainSign(): Promise<RecognitionResult> {
    return this.demoService.getUncertainSign();
  }

  public async resetBuffer(): Promise<void> {
    try {
      await fetch(`${this.serverUrl}/reset`, { method: 'POST', signal: AbortSignal.timeout(1000) });
    } catch {
      // Ignore
    }
  }
}

// Export live service singleton
export const recognitionService: IRecognitionService = new LiveKaggleRecognitionService();
