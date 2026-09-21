import React, { useState, useEffect } from 'react';
import { CameraPreview } from '../components/CameraPreview';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { CornerBrackets, YellowCornerBracket } from '../components/TechnicalDecoration';
import { DEMO_SCENARIOS, ScenarioStep } from '../data/demoScenarios';
import { Plus, RotateCcw, AlertCircle } from 'lucide-react';
import { isKaggleSupported } from '../data/modelVocabulary';

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
  const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS.health_urgency;
  const currentStepIndex = Math.min(collectedSigns.length, scenario.steps.length - 1);
  const currentStep: ScenarioStep = scenario.steps[currentStepIndex];

  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [showResultCard, setShowResultCard] = useState<boolean>(false);

  useEffect(() => {
    setIsDetecting(true);
    setShowResultCard(false);

    const timer = setTimeout(() => {
      setIsDetecting(false);
      setShowResultCard(true);
    }, 750);

    return () => clearTimeout(timer);
  }, [currentStepIndex, scenarioId]);

  const handleRetry = () => {
    setIsDetecting(true);
    setShowResultCard(false);
    setTimeout(() => {
      setIsDetecting(false);
      setShowResultCard(true);
    }, 600);
  };

  const handleAddSign = () => {
    const nextSigns = [...collectedSigns, currentStep.sign];
    onAddSignToSentence(currentStep.sign);

    if (nextSigns.length >= scenario.steps.length) {
      onCompleteSentence(nextSigns);
    }
  };

  const isCurrentSignKaggle = isKaggleSupported(currentStep.sign);

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between select-none overflow-y-auto">
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
                className={`px-1.5 py-0.2 text-[9px] font-mono border ${
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
          statusText={isDetecting ? 'INFERRING SIGN...' : `✓ DETECTED: ${currentStep.sign}`}
          handPoseType={currentStep.handPoseType}
          className="h-[210px] sm:h-[240px]"
        />
      </div>

      {/* Recognition Result HUD Card */}
      <div className="p-3 my-auto">
        {showResultCard && (
          <div className="p-3.5 bg-neutral-950 border border-neutral-800 relative space-y-2.5 shadow-lg animate-in fade-in zoom-in-95 duration-200">
            <YellowCornerBracket position="top-right" />
            <CornerBrackets size="w-2 h-2" />

            {/* Word Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <span>DETECTED SIGN TOKEN:</span>
                  {isCurrentSignKaggle ? (
                    <span className="text-[8px] text-brand-gold bg-brand-gold/10 px-1 border border-brand-gold/30">
                      KAGGLE 250
                    </span>
                  ) : (
                    <span className="text-[8px] text-neutral-400 bg-neutral-900 px-1 border border-neutral-700">
                      CONCEPT DEMO
                    </span>
                  )}
                </div>
                <div className="font-display font-black text-2xl text-brand-yellow tracking-wider mt-0.5">
                  {currentStep.sign}
                </div>
              </div>

              {/* Confidence Badge */}
              <div className="text-right font-mono">
                <div className="text-[9px] text-neutral-500">CONFIDENCE</div>
                <div className="text-base font-black text-white">
                  {currentStep.confidence}%
                </div>
              </div>
            </div>

            {/* Confidence Meter Bar */}
            <ConfidenceMeter
              confidence={currentStep.confidence}
              showLabel={true}
              threshold={70.0}
              source="DEMO MODE"
              isSimulated={true}
            />

            {/* Gesture Physical Guidance */}
            <div className="p-2 bg-neutral-900/90 border border-neutral-800 text-[10px] text-neutral-300 font-sans flex items-start gap-2">
              <span className="text-brand-yellow font-mono font-bold text-xs mt-0.5">ℹ</span>
              <span>{currentStep.gestureDescription}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <button
                onClick={handleRetry}
                className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                <span>RETRY</span>
              </button>

              <button
                onClick={handleAddSign}
                className="py-2 px-3 bg-brand-yellow hover:bg-yellow-400 text-black font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(255,208,0,0.3)]"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>ACCEPT SIGN</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between font-mono text-[10px]">
        <button
          onClick={onTriggerUncertainState}
          className="text-amber-400 hover:underline flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          <span>TEST UNCERTAIN STATE (48%)</span>
        </button>

        <span className="text-neutral-500">
          STEP {currentStepIndex + 1} OF {scenario.steps.length}
        </span>
      </div>
    </div>
  );
};
