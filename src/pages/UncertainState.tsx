import React from 'react';
import { RotateCcw, ArrowRight, Sun, Hand, Eye, ShieldAlert } from 'lucide-react';
import { CornerBrackets, YellowCornerBracket, TechLabel } from '../components/TechnicalDecoration';
import { ConfidenceMeter } from '../components/ConfidenceMeter';

interface UncertainStateProps {
  signName?: string;
  confidence?: number;
  onTryAgain: () => void;
  onContinueAnyway: () => void;
}

export const UncertainState: React.FC<UncertainStateProps> = ({
  signName = 'WATER',
  confidence = 58,
  onTryAgain,
  onContinueAnyway
}) => {
  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between mb-1">
          <TechLabel number="SAFETY GATE" text="AI GUARDRAIL" yellowDot />
          <span className="px-2 py-0.5 bg-amber-950 border border-amber-600 text-amber-200 font-mono text-[9px] font-black uppercase">
            SAFETY GATED
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl leading-none text-white uppercase">
          NOT CONFIDENT
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // CONFIDENCE BELOW GATING THRESHOLD (75%)
        </p>
      </div>

      {/* Main Warning & Guidance Card */}
      <div className="relative z-10 my-auto space-y-3 py-2">
        {/* Core Product Principle Banner */}
        <div className="border border-amber-600/60 bg-amber-950/40 p-2.5 text-center font-mono text-[10px] text-amber-200 font-bold">
          "Uncertainty is a product state, not an error state."
        </div>

        {/* Card */}
        <div className="border border-neutral-800 bg-neutral-950 p-5 relative shadow-lg">
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-3 h-3" />

          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              GESTURE RECOGNITION LOW ACCURACY
            </span>
            <span className="px-1.5 py-0.2 bg-amber-950 text-amber-200 border border-amber-600 font-mono text-[9px] font-bold">
              {confidence}% SCORE
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="text-[10px] font-mono text-neutral-400">CANDIDATE SIGN:</div>
              <h2 className="font-display font-black text-3xl text-white tracking-wide leading-none">
                {signName}
              </h2>
            </div>
            <div className="font-mono text-xl font-black text-amber-400">
              {confidence}%
            </div>
          </div>

          <p className="font-sans text-xs text-neutral-300 mb-3">
            We couldn't confidently recognize that gesture with sufficient certainty for critical communication.
          </p>

          <ConfidenceMeter confidence={confidence} status="low" />

          {/* Actionable Guidance Tips */}
          <div className="mt-4 pt-3 border-t border-neutral-800">
            <div className="text-[10px] font-mono font-bold text-neutral-300 uppercase mb-2">
              RECOMMENDED ADJUSTMENTS:
            </div>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px]">
              <div className="p-1.5 border border-neutral-700 bg-neutral-900 flex items-center gap-1.5 text-neutral-200">
                <Hand className="w-3 h-3 text-brand-yellow shrink-0" />
                <span>MOVE HAND INTO FRAME</span>
              </div>
              <div className="p-1.5 border border-neutral-700 bg-neutral-900 flex items-center gap-1.5 text-neutral-200">
                <Sun className="w-3 h-3 text-brand-yellow shrink-0" />
                <span>IMPROVE LIGHTING</span>
              </div>
              <div className="p-1.5 border border-neutral-700 bg-neutral-900 flex items-center gap-1.5 text-neutral-200">
                <Eye className="w-3 h-3 text-brand-yellow shrink-0" />
                <span>HOLD GESTURE STEADY</span>
              </div>
              <div className="p-1.5 border border-neutral-700 bg-neutral-900 flex items-center gap-1.5 text-neutral-200">
                <RotateCcw className="w-3 h-3 text-brand-yellow shrink-0" />
                <span>TRY GESTURE AGAIN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 space-y-2 pt-2">
        <button
          onClick={onTryAgain}
          className="w-full group bg-brand-yellow hover:bg-yellow-400 text-black font-display text-xl tracking-wider py-3.5 px-5 flex items-center justify-between border-2 border-brand-yellow transition-all shadow-card-sharp active:translate-x-0.5 active:translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-black">
            <RotateCcw className="w-4 h-4 text-black" />
            <span>TRY AGAIN</span>
          </span>
          <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onContinueAnyway}
          className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 font-mono text-xs font-bold text-neutral-300 flex items-center justify-center transition-colors"
        >
          <span>CONTINUE ANYWAY (MANUAL OVERRIDE)</span>
        </button>
      </div>
    </div>
  );
};
