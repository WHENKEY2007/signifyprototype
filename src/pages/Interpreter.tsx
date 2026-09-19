import React, { useState, useEffect } from 'react';
import { CameraPreview } from '../components/CameraPreview';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { CornerBrackets, YellowCornerBracket } from '../components/TechnicalDecoration';
import { DEMO_SCENARIOS, ScenarioStep } from '../data/demoScenarios';
import { Plus, RotateCcw, AlertCircle } from 'lucide-react';

interface InterpreterProps {
  scenarioId: string;
  onAddSignToSentence: (sign: string) => void;
  onCompleteSentence: (signs: string[]) => void;
  onTriggerUncertainState: () => void;
  collectedSigns: string[];
}

export const Interpreter: React.FC<InterpreterProps> = ({
  scenarioId,
  onAddSignToSentence,
  onCompleteSentence,
  onTriggerUncertainState,
  collectedSigns
}) => {
  const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS.hospital;
  const currentStepIndex = Math.min(collectedSigns.length, scenario.steps.length - 1);
  const currentStep: ScenarioStep = scenario.steps[currentStepIndex];

  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [showResultCard, setShowResultCard] = useState<boolean>(false);

  useEffect(() => {
    // Reset detection simulation when step changes
    setIsDetecting(true);
    setShowResultCard(false);

    const timer = setTimeout(() => {
      setIsDetecting(false);
      setShowResultCard(true);
    }, 850);

    return () => clearTimeout(timer);
  }, [currentStepIndex, scenarioId]);

  const handleRetry = () => {
    setIsDetecting(true);
    setShowResultCard(false);
    setTimeout(() => {
      setIsDetecting(false);
      setShowResultCard(true);
    }, 700);
  };

  const handleAddSign = () => {
    const nextSigns = [...collectedSigns, currentStep.sign];
    onAddSignToSentence(currentStep.sign);

    if (nextSigns.length >= scenario.steps.length) {
      onCompleteSentence(nextSigns);
    }
  };

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between select-none">
      {/* Top Scenario Progress Ribbon */}
      <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.2 bg-brand-yellow text-black font-black">
            {scenario.title}
          </span>
          <span className="text-neutral-400">
            GESTURE {currentStepIndex + 1}/{scenario.steps.length}
          </span>
        </div>

        {/* Collected tokens indicator */}
        <div className="flex items-center gap-1">
          {scenario.steps.map((step, idx) => {
            const isDone = idx < collectedSigns.length;
            const isCurrent = idx === collectedSigns.length;
            return (
              <span
                key={step.sign}
                className={`px-1 py-0.2 text-[9px] font-mono border ${
                  isDone
                    ? 'bg-neutral-800 text-brand-yellow border-neutral-700 font-bold'
                    : isCurrent
                    ? 'bg-brand-yellow text-black border-brand-yellow font-black'
                    : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                }`}
              >
                {step.sign}
              </span>
            );
          })}
        </div>
      </div>

      {/* Main Camera Live Feed Component */}
      <div className="p-3">
        <CameraPreview
          currentSign={currentStep.sign}
          confidence={currentStep.confidence}
          isScanning={isDetecting}
          statusText={isDetecting ? 'ANALYZING GESTURE...' : 'GESTURE DETECTED'}
          handPoseType={currentStep.handPoseType}
        />
      </div>

      {/* Recognition Result & Action Area */}
      <div className="flex-1 px-4 pb-4 flex flex-col justify-between">
        {showResultCard ? (
          <div className="border border-neutral-800 bg-neutral-950 p-4 relative shadow-lg my-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
            <YellowCornerBracket position="top-right" />
            <CornerBrackets size="w-2.5 h-2.5" />

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
                // DETECTED SIGN
              </span>
              <span className="px-1.5 py-0.5 bg-brand-yellow text-black text-[9px] font-mono font-black uppercase">
                VERIFIED MATCH
              </span>
            </div>

            {/* Big Sign Heading */}
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="font-display font-black text-4xl text-white tracking-wide leading-none">
                {currentStep.sign}
              </h2>
              <div className="font-mono text-xl font-black text-brand-yellow">
                {currentStep.confidence}%
              </div>
            </div>

            {/* Gesture description hint */}
            <p className="font-sans text-xs text-neutral-300 mb-3 border-l-2 border-brand-yellow pl-2">
              {currentStep.gestureDescription}
            </p>

            {/* Confidence Meter */}
            <div className="mb-4">
              <ConfidenceMeter
                confidence={currentStep.confidence}
                status={currentStep.status}
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
              <button
                onClick={handleRetry}
                className="py-2.5 px-3 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 font-mono text-xs font-bold text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RETRY</span>
              </button>

              <button
                onClick={handleAddSign}
                className="py-2.5 px-3 border-2 border-brand-yellow bg-brand-yellow hover:bg-yellow-400 text-black font-mono text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-active-sharp active:translate-x-0.5 active:translate-y-0.5"
              >
                <Plus className="w-4 h-4 text-black stroke-[3]" />
                <span className="text-black font-black">+ ADD</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-8 h-8 rounded-full border-2 border-neutral-700 border-t-brand-yellow animate-spin mb-3" />
            <div className="font-mono text-xs font-bold text-white">
              TRACKING HAND KEYPOINTS...
            </div>
            <div className="font-mono text-[10px] text-neutral-400 mt-1">
              HOLD POSE IN FRONT OF iQOO 15 CAMERA
            </div>
          </div>
        )}

        {/* Intentional Low Confidence Trigger for Judges */}
        <div className="pt-2">
          <button
            onClick={onTriggerUncertainState}
            className="w-full py-1.5 px-2 border border-dashed border-amber-600/70 bg-amber-950/40 hover:bg-amber-950/70 text-amber-200 font-mono text-[9px] flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span>TEST LOW-CONFIDENCE TRIGGER (WATER: 58%)</span>
            </span>
            <span className="font-bold underline text-amber-400">SIMULATE →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
