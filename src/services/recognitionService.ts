/**
 * Signify Recognition Service Abstraction
 * 
 * Clean service layer separating sign word recognition from sentence synthesis.
 * Connects to on-device ML models (MediaPipe / TFLite / WebNN) in production.
 * Provides deterministic simulation for hackathon demonstration.
 * 
 * Product Architecture:
 * Camera Vision -> Word Recognition (returns word + confidence)
 */

export interface RecognitionResult {
  word: string;
  sign: string; // Alias for backward compatibility
  text: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  isSimulated: boolean;
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

  public async recognizeSign(frameOrKey?: any, preferredSign?: string): Promise<RecognitionResult> {
    // Determine sign key from arguments
    const targetKey = typeof frameOrKey === 'string'
      ? frameOrKey
      : preferredSign;

    // Realistic subtle inference rhythm (representing on-device NPU execution)
    await new Promise((resolve) => setTimeout(resolve, 550));

    const word = targetKey && DEMO_SIGNS[targetKey]
      ? targetKey
      : this.signKeys[this.currentIndex % this.signKeys.length];

    if (!targetKey) {
      this.currentIndex++;
    }

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

  public async getUncertainSign(): Promise<RecognitionResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));
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

// Singleton export
export const recognitionService: IRecognitionService = new DemoRecognitionService();
