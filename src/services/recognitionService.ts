/**
 * Signify Recognition Service Abstraction
 * 
 * Note: This prototype currently implements `DemoRecognitionService` with
 * deterministic sign recognition for product demonstration and benchmarking purposes.
 * It is architected so that `RealRecognitionService` (connecting to on-device TFLite /
 * MediaPipe / WebNN models) can be swapped seamlessly in the future without UI rewrites.
 */

import { DEMO_SCENARIOS, ScenarioStep } from '../data/demoScenarios';

export interface RecognitionResult {
  sign: string;
  confidence: number;
  status: 'high' | 'medium' | 'low';
  timestamp: number;
  isSimulated: boolean;
  handPoseType?: string;
  contextSentence?: string;
  gestureDescription?: string;
}

export interface IRecognitionService {
  isSimulated(): boolean;
  getScenarioStep(scenarioId: string, stepIndex: number): Promise<RecognitionResult>;
  getUncertainSign(scenarioId: string): Promise<RecognitionResult>;
  getVocabulary(scenarioId: string): string[];
}

export class DemoRecognitionService implements IRecognitionService {
  private modeLabel = 'DEMO RECOGNITION (DETERMINISTIC SIMULATION)';

  public isSimulated(): boolean {
    return true;
  }

  public getModeLabel(): string {
    return this.modeLabel;
  }

  public async getScenarioStep(scenarioId: string, stepIndex: number): Promise<RecognitionResult> {
    // Small simulated network / inference pause for realistic rhythm
    await new Promise((resolve) => setTimeout(resolve, 600));

    const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS.hospital;
    const boundedIndex = Math.min(stepIndex, scenario.steps.length - 1);
    const step: ScenarioStep = scenario.steps[boundedIndex];

    return {
      sign: step.sign,
      confidence: step.confidence,
      status: step.status,
      timestamp: Date.now(),
      isSimulated: true,
      handPoseType: step.handPoseType,
      contextSentence: step.contextSentence,
      gestureDescription: step.gestureDescription
    };
  }

  public async getUncertainSign(scenarioId: string): Promise<RecognitionResult> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS.hospital;
    const lowConf = scenario.lowConfidenceSign || {
      sign: 'WATER',
      confidence: 58,
      reason: 'Low contrast lighting'
    };

    return {
      sign: lowConf.sign,
      confidence: lowConf.confidence,
      status: 'low',
      timestamp: Date.now(),
      isSimulated: true,
      gestureDescription: 'Gestural pattern match below safety threshold (<70%).'
    };
  }

  public getVocabulary(scenarioId: string): string[] {
    const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS.hospital;
    return scenario.vocabulary;
  }
}

// Singleton export
export const recognitionService: IRecognitionService = new DemoRecognitionService();
