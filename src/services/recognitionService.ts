/**
 * Signify Recognition Service
 * 
 * Clean service layer connecting the frontend to the Kaggle ASL 250-Class ML model.
 * Single source of truth: src/data/modelVocabulary.ts
 * 
 * Honest AI Architecture:
 * - When backend is online: Streams webcam frames to Kaggle ASL TFLite model, returning real predictions.
 * - When backend is offline: Exposes transparent OFFLINE state with option to launch DEMO WALKTHROUGH.
 * - Never silently presents simulated data as real AI.
 */

import {
  isKaggleSupported,
  normalizeSignWord,
  KAGGLE_ASL_250_MAP,
  KAGGLE_CONFIDENCE_THRESHOLD,
} from '../data/modelVocabulary';

export type RecognitionMode = 'live' | 'demo';
export type ServerStatus = 'connected' | 'disconnected' | 'connecting';

export interface RecognitionResult {
  word: string;
  sign: string; // Backward compatibility alias
  text: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  isSimulated: boolean;
  source: 'LIVE MODEL' | 'DEMO MODE';
  isKaggleSupported: boolean;
  top3?: Array<[string, number]>;
  isStable?: boolean;
  isNewStable?: boolean;
  candidateWord?: string;
  handDetected?: boolean;
}

export interface IRecognitionService {
  getMode(): RecognitionMode;
  setMode(mode: RecognitionMode): void;
  getServerStatus(): ServerStatus;
  checkServerHealth(): Promise<boolean>;
  recognizeSign(frameOrKey?: any, preferredSign?: string): Promise<RecognitionResult>;
  getUncertainSign(): Promise<RecognitionResult>;
  getAvailableSigns(): string[];
  resetBuffer(): Promise<void>;
  getServerUrl(): string;
  isKaggleConnected(): boolean;
}

export class LiveKaggleRecognitionService implements IRecognitionService {
  private mode: RecognitionMode = 'live';
  private serverUrl: string = (import.meta as any).env?.VITE_ASL_SERVER_URL || '';
  private candidateUrls = [
    'https://signifyprototype.onrender.com',
    'http://localhost:7860',
    'http://127.0.0.1:7860',
    'http://127.0.0.1:8000',
    'https://sponsorship-tanks-pos-street.trycloudflare.com',
  ];
  private serverStatus: ServerStatus = 'connecting';
  private lastHealthCheck = 0;
  private offscreenCanvas: HTMLCanvasElement | null = null;
  private availableSigns: string[] = Object.keys(KAGGLE_ASL_250_MAP).map(s => s.toUpperCase());

  // Temporal stability tracker
  private candidateWord: string | null = null;
  private candidateCount: number = 0;
  private lastAcceptedWord: string | null = null;
  private readonly STABILITY_THRESHOLD = 2; // frames of identical prediction required for stability

  constructor() {
    this.checkServerHealth();
  }

  public getMode(): RecognitionMode {
    return this.mode;
  }

  public setMode(mode: RecognitionMode): void {
    this.mode = mode;
  }

  public getServerStatus(): ServerStatus {
    return this.serverStatus;
  }

  public getServerUrl(): string {
    return this.serverUrl || 'Checking candidate endpoints...';
  }

  public isKaggleConnected(): boolean {
    return this.serverStatus === 'connected';
  }

  public getAvailableSigns(): string[] {
    return this.availableSigns;
  }

  public async checkServerHealth(isExplicitRetry = false): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastHealthCheck < 3000 && this.serverStatus === 'connected') {
      return true;
    }
    this.lastHealthCheck = now;

    const urlsToCheck = this.serverUrl ? [this.serverUrl] : this.candidateUrls;
    if (this.serverStatus !== 'connected') {
      this.serverStatus = 'connecting';
    }

    const timeoutMs = isExplicitRetry ? 12000 : 5000;

    for (const url of urlsToCheck) {
      try {
        const res = await fetch(`${url}/health`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (res.ok) {
          this.serverUrl = url;
          this.serverStatus = 'connected';
          return true;
        }
      } catch {
        // Try next candidate
      }
    }

    this.serverStatus = 'disconnected';
    return false;
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
    return this.offscreenCanvas.toDataURL('image/jpeg', 0.80);
  }

  public async recognizeSign(frameOrKey?: any, preferredSign?: string): Promise<RecognitionResult> {
    const targetKey = typeof frameOrKey === 'string' ? frameOrKey : preferredSign;

    // 1. Explicit Demo Token or Demo Mode Walkthrough Triggered
    if (targetKey || this.mode === 'demo') {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const word = targetKey ? normalizeSignWord(targetKey) : 'HELLO';
      const isSupported = isKaggleSupported(word);

      return {
        word,
        sign: word,
        text: word,
        confidence: 85.0, // Illustrative confidence for demo walkthrough
        status: 'high',
        isSimulated: true,
        source: 'DEMO MODE',
        isKaggleSupported: isSupported,
        isStable: true,
        isNewStable: true,
        handDetected: true,
        top3: [[word, 85.0], ['YES', 8.2], ['PLEASE', 4.1]]
      };
    }

    // 2. Live Model Mode: Check backend availability
    const online = await this.checkServerHealth();
    if (!online) {
      return {
        word: '',
        sign: '',
        text: 'Kaggle ASL model is unavailable',
        confidence: 0,
        status: 'low',
        isSimulated: false,
        source: 'LIVE MODEL',
        isKaggleSupported: false,
        handDetected: false
      };
    }

    // 3. Capture camera frame
    const base64Frame = this.captureFrameBase64();
    if (!base64Frame) {
      return {
        word: '',
        sign: '',
        text: 'Position hand inside camera frame',
        confidence: 0,
        status: 'low',
        isSimulated: false,
        source: 'LIVE MODEL',
        isKaggleSupported: false,
        handDetected: false
      };
    }

    // 4. Send frame to real Kaggle ASL TFLite backend
    try {
      const res = await fetch(`${this.serverUrl}/predict_frame`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frame: base64Frame }),
        signal: AbortSignal.timeout(2200),
      });

      if (!res.ok) {
        return {
          word: '',
          sign: '',
          text: 'Kaggle ASL backend busy...',
          confidence: 0,
          status: 'low',
          isSimulated: false,
          source: 'LIVE MODEL',
          isKaggleSupported: false,
          handDetected: false
        };
      }

      const data = await res.json();

      if (data && data.prediction && data.prediction.word) {
        const pred = data.prediction;
        const normalized = normalizeSignWord(pred.word);
        const rawConf = Number(pred.confidence) || 0;
        const confPercent = Math.min(99.0, Math.round(rawConf * 10) / 10);
        const isSupported = isKaggleSupported(normalized);
        const passesThreshold = confPercent >= KAGGLE_CONFIDENCE_THRESHOLD;

        // Temporal stability logic
        let isStable = false;
        let isNewStable = false;

        if (this.candidateWord === normalized) {
          this.candidateCount++;
          if (this.candidateCount >= this.STABILITY_THRESHOLD && passesThreshold) {
            isStable = true;
            if (this.lastAcceptedWord !== normalized) {
              isNewStable = true;
              this.lastAcceptedWord = normalized;
            }
          }
        } else {
          this.candidateWord = normalized;
          this.candidateCount = 1;
        }

        return {
          word: normalized,
          sign: normalized,
          text: normalized,
          confidence: confPercent,
          status: passesThreshold ? 'high' : 'low',
          isSimulated: false,
          source: 'LIVE MODEL',
          isKaggleSupported: isSupported,
          isStable,
          isNewStable,
          candidateWord: this.candidateWord || undefined,
          handDetected: true,
          top3: pred.top3 || []
        };
      }

      // Hand detected by MediaPipe, accumulating buffer
      if (data && data.hand_detected) {
        return {
          word: 'ANALYZING',
          sign: 'ANALYZING',
          text: 'Analyzing gesture motion...',
          confidence: 50,
          status: 'medium',
          isSimulated: false,
          source: 'LIVE MODEL',
          isKaggleSupported: true,
          handDetected: true
        };
      }

      // No hand in view
      this.candidateWord = null;
      this.candidateCount = 0;
      return {
        word: '',
        sign: '',
        text: 'Show sign gesture to camera',
        confidence: 0,
        status: 'low',
        isSimulated: false,
        source: 'LIVE MODEL',
        isKaggleSupported: false,
        handDetected: false
      };
    } catch (e) {
      return {
        word: '',
        sign: '',
        text: 'Connecting to Kaggle ASL bridge...',
        confidence: 0,
        status: 'low',
        isSimulated: false,
        source: 'LIVE MODEL',
        isKaggleSupported: false,
        handDetected: false
      };
    }
  }

  public async getUncertainSign(): Promise<RecognitionResult> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return {
      word: 'UNCERTAIN',
      sign: 'UNCERTAIN',
      text: 'Low confidence — hold the sign steady',
      confidence: 48.0,
      status: 'low',
      isSimulated: true,
      source: 'DEMO MODE',
      isKaggleSupported: false,
      isStable: false,
      isNewStable: false,
      handDetected: true
    };
  }

  public async resetBuffer(): Promise<void> {
    this.candidateWord = null;
    this.candidateCount = 0;
    this.lastAcceptedWord = null;
    try {
      if (this.serverUrl && this.serverStatus === 'connected') {
        await fetch(`${this.serverUrl}/reset`, { method: 'POST', signal: AbortSignal.timeout(1000) });
      }
    } catch {
      // Ignore
    }
  }
}

// Singleton export
export const recognitionService: IRecognitionService = new LiveKaggleRecognitionService();
