import React from 'react';

interface ConfidenceMeterProps {
  confidence: number; // 0 to 100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: 'high' | 'medium' | 'low';
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  showLabel = true,
  status = confidence >= 85 ? 'high' : confidence >= 70 ? 'medium' : 'low'
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'high':
        return {
          label: 'HIGH CONFIDENCE',
          barColor: 'bg-brand-yellow',
          badgeClass: 'bg-brand-yellow text-black font-black',
          description: 'SAFE FOR AUTO-ASSEMBLY'
        };
      case 'medium':
        return {
          label: 'MEDIUM CONFIDENCE',
          barColor: 'bg-brand-yellow',
          badgeClass: 'bg-brand-yellow text-black font-black',
          description: 'CONFIRMATION RECOMMENDED'
        };
      case 'low':
      default:
        return {
          label: 'LOW CONFIDENCE',
          barColor: 'bg-amber-500',
          badgeClass: 'bg-amber-950 text-amber-200 border border-amber-600',
          description: 'UNCERTAINTY GATE TRIGGERED'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="w-full font-mono">
      {showLabel && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className={`px-1.5 py-0.5 text-[9px] font-black uppercase ${config.badgeClass}`}>
              {config.label}
            </span>
            <span className="text-[10px] text-neutral-400 hidden sm:inline">
              // {config.description}
            </span>
          </div>
          <span className="font-bold text-sm text-white tracking-tight">
            {confidence}%
          </span>
        </div>
      )}

      {/* Segmented / Technical Meter Bar */}
      <div className="relative w-full h-3 bg-neutral-900 border border-neutral-700 p-0.5 flex items-center">
        <div
          className={`h-full ${config.barColor} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(Math.max(confidence, 4), 100)}%` }}
        />
        {/* Safety Threshold Line at 75% */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white z-10"
          style={{ left: '75%' }}
          title="Safety Gate Threshold (75%)"
        />
      </div>

      <div className="flex justify-between items-center text-[9px] text-neutral-400 mt-1 font-mono">
        <span>0%</span>
        <span className="text-neutral-200 font-semibold">GATING THRESHOLD: 75%</span>
        <span>100%</span>
      </div>
    </div>
  );
};
