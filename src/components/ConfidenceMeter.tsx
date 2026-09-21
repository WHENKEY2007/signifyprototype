import React from 'react';
import { KAGGLE_CONFIDENCE_THRESHOLD } from '../data/modelVocabulary';

interface ConfidenceMeterProps {
  confidence: number; // 0 to 100
  showLabel?: boolean;
  threshold?: number;
  source?: 'LIVE MODEL' | 'DEMO MODE';
  isSimulated?: boolean;
  status?: 'high' | 'medium' | 'low';
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  showLabel = true,
  threshold = KAGGLE_CONFIDENCE_THRESHOLD,
  source = 'LIVE MODEL',
  isSimulated = false,
  status,
}) => {
  const isAccepted = status ? status === 'high' : confidence >= threshold;

  const statusConfig = isAccepted
    ? {
        label: 'HIGH CONFIDENCE',
        badgeClass: 'bg-brand-gold text-black font-black',
        barColor: 'bg-brand-gold',
        subtext: '✓ ACCEPTED / ADDED TO MESSAGE',
      }
    : {
        label: 'LOW CONFIDENCE',
        badgeClass: 'bg-amber-950 text-amber-200 border border-amber-600 font-bold',
        barColor: 'bg-amber-500',
        subtext: '↻ HOLD STEADY / TRY AGAIN',
      };

  return (
    <div className="w-full font-mono select-none">
      {showLabel && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className={`px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded ${statusConfig.badgeClass}`}>
              {statusConfig.label}
            </span>
            <span className="text-[10px] text-neutral-400 hidden sm:inline">
              // {statusConfig.subtext}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[7.5px] px-1 py-0.2 bg-neutral-900 border border-neutral-700 text-neutral-400 font-mono">
              {source}
            </span>
            {isSimulated && (
              <span className="text-[7.5px] px-1 py-0.2 bg-neutral-900 border border-neutral-700 text-brand-gold font-mono">
                ILLUSTRATIVE
              </span>
            )}
            <span className="font-bold text-sm text-white tracking-tight">
              {confidence.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {/* Segmented Meter Bar */}
      <div className="relative w-full h-2.5 bg-neutral-900 border border-neutral-800 rounded p-0.5 flex items-center overflow-hidden">
        <div
          className={`h-full ${statusConfig.barColor} transition-all duration-300 ease-out rounded-sm`}
          style={{ width: `${Math.min(Math.max(confidence, 4), 100)}%` }}
        />
        {/* Threshold Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white z-10 shadow-sm"
          style={{ left: `${threshold}%` }}
          title={`Gating Threshold (${threshold}%)`}
        />
      </div>

      <div className="flex justify-between items-center text-[8.5px] text-neutral-400 mt-1 font-mono">
        <span>0%</span>
        <span className="text-neutral-300 font-semibold">
          CONFIDENCE GATE: {threshold}%
        </span>
        <span>100%</span>
      </div>
    </div>
  );
};
