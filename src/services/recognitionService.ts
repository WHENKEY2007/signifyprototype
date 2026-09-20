/**
 * Signify Recognition Service Abstraction
 * 
 * Clean service layer separating sign recognition from the UI.
 * Connects to on-device ML models (MediaPipe / TFLite / WebNN) in production.
 * Provides deterministic simulation for hackathon demonstration.
 */

export interface RecognitionResult {
  sign: string;
  text: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  isSimulated: boolean;
}

export const DEMO_SIGNS: Record<string, { text: string; confidence: number }> = {
  'HELLO': { text: 'Hello', confidence: 96 },
  'THANK YOU': { text: 'Thank you', confidence: 95 },
  'YES': { text: 'Yes', confidence: 98 },
  'NO': { text: 'No', confidence: 94 },
  'HELP': { text: 'I need help', confidence: 97 },
  'PLEASE': { text: 'Please', confidence: 93 },
  'I LOVE YOU': { text: 'I love you', confidence: 99 },
};

export interface IRecognitionService {
  isSimulated(): boolean;
  recognizeSign(signKey?: string): Promise<RecognitionResult>;
  getUncertainSign(): Promise<RecognitionResult>;
  getAvailableSigns(): string[];
}

export class DemoRecognitionService implements IRecognitionService {
  private currentIndex = 0;
  private signKeys = Object.keys(DEMO_SIGNS);

  public isSimulated(): boolean {
    return true;
  }

  public getAvailableSigns(): string[] {
    return this.signKeys;
  }

  public async recognizeSign(preferredSign?: string): Promise<RecognitionResult> {
    // Realistic subtle inference rhythm
    await new Promise((resolve) => setTimeout(resolve, 650));

    const sign = preferredSign && DEMO_SIGNS[preferredSign]
      ? preferredSign
      : this.signKeys[this.currentIndex % this.signKeys.length];

    // Cycle to next sign for natural demo exploration if not specified
    if (!preferredSign) {
      this.currentIndex++;
    }

    const data = DEMO_SIGNS[sign];
    return {
      sign,
      text: data.text,
      confidence: data.confidence,
      status: 'high',
      isSimulated: true,
    };
  }

  public async getUncertainSign(): Promise<RecognitionResult> {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return {
      sign: 'UNCERTAIN',
      text: 'Sign not clear',
      confidence: 48,
      status: 'low',
      isSimulated: true,
    };
  }
}

// Singleton export
export const recognitionService: IRecognitionService = new DemoRecognitionService();
