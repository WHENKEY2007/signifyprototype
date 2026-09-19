import React from 'react';

export const CornerBrackets: React.FC<{ size?: string; className?: string }> = ({ size = 'w-3 h-3', className = '' }) => (
  <>
    <div className={`absolute top-0 left-0 border-t-2 border-l-2 border-white/40 ${size} ${className}`} />
    <div className={`absolute top-0 right-0 border-t-2 border-r-2 border-white/40 ${size} ${className}`} />
    <div className={`absolute bottom-0 left-0 border-b-2 border-l-2 border-white/40 ${size} ${className}`} />
    <div className={`absolute bottom-0 right-0 border-b-2 border-r-2 border-white/40 ${size} ${className}`} />
  </>
);

export const YellowCornerBracket: React.FC<{ position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  position = 'top-right'
}) => {
  const posClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }[position];

  return (
    <div className={`absolute ${posClasses} w-3 h-3 bg-brand-yellow z-10`} />
  );
};

export const Crosshair: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`inline-flex items-center justify-center font-mono text-xs text-neutral-400 select-none ${className}`}>
    +
  </span>
);

export const TechLabel: React.FC<{
  number?: string;
  text: string;
  yellowDot?: boolean;
  className?: string;
}> = ({ number, text, yellowDot = false, className = '' }) => (
  <div className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider uppercase ${className}`}>
    {yellowDot && <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />}
    {number && <span className="text-brand-yellow font-black">[{number}]</span>}
    <span className="text-white">{text}</span>
  </div>
);

export const DiagonalHatch: React.FC<{ className?: string }> = ({ className = 'w-12 h-3' }) => (
  <div className={`bg-diagonal-tech border border-black/20 ${className}`} />
);

export const YellowBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <span className={`inline-flex items-center px-2 py-0.5 bg-brand-yellow text-brand-black text-[10px] font-mono font-black uppercase tracking-wider ${className}`}>
    {children}
  </span>
);
