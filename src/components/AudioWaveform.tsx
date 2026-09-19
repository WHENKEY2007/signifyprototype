import React from 'react';

interface AudioWaveformProps {
  isActive?: boolean;
  barCount?: number;
  mode?: 'speech' | 'listening';
  className?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isActive = true,
  barCount = 18,
  mode = 'speech',
  className = ''
}) => {
  const bars = Array.from({ length: barCount }, (_, i) => {
    const centerFactor = 1 - Math.abs((i - barCount / 2) / (barCount / 2)) * 0.5;
    const baseHeight = isActive ? Math.max(25, Math.floor(centerFactor * 85)) : 15;
    const animDelay = (i * 0.08) % 0.8;
    const animDuration = 0.5 + ((i % 4) * 0.15);

    return {
      id: i,
      baseHeight,
      animDelay,
      animDuration
    };
  });

  return (
    <div className={`flex items-center justify-center gap-1.5 h-16 px-4 bg-black border border-neutral-800 ${className}`}>
      {bars.map((bar) => (
        <div
          key={bar.id}
          className={`w-1.5 rounded-none transition-all ${
            isActive
              ? mode === 'speech'
                ? 'bg-brand-yellow'
                : 'bg-white'
              : 'bg-neutral-800'
          }`}
          style={{
            height: isActive ? `${bar.baseHeight}%` : '15%',
            animation: isActive
              ? `waveBar ${bar.animDuration}s ease-in-out ${bar.animDelay}s infinite alternate`
              : 'none'
          }}
        />
      ))}
    </div>
  );
};
