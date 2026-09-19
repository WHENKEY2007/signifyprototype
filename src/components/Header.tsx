import React from 'react';
import { ArrowLeft, Sliders, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onSettings?: () => void;
  scenarioName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'SIGNIFY',
  subtitle,
  onBack,
  onSettings,
  scenarioName
}) => {
  return (
    <header className="w-full bg-black border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30 select-none text-white">
      <div className="flex items-center gap-2.5">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center border border-neutral-700 bg-neutral-900 hover:bg-brand-yellow hover:text-black transition-colors text-white"
            title="Go Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-8 h-8 bg-brand-yellow flex items-center justify-center shadow-sm">
            <span className="font-display font-black text-black text-sm tracking-wider">S</span>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-lg tracking-wider text-white leading-none uppercase">
              {title}
            </h1>
            {scenarioName && (
              <span className="px-1.5 py-0.2 bg-brand-yellow text-black text-[9px] font-mono font-black uppercase">
                {scenarioName}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="font-mono text-[9px] text-neutral-400 tracking-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden xs:flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 border border-neutral-800 bg-neutral-900 text-neutral-300">
          <ShieldCheck className="w-3 h-3 text-brand-yellow" />
          <span className="font-bold">ON-DEVICE</span>
        </div>

        {onSettings && (
          <button
            onClick={onSettings}
            className="w-8 h-8 flex items-center justify-center border border-neutral-700 bg-neutral-900 hover:bg-brand-yellow hover:text-black transition-colors text-neutral-300"
            title="Settings & Privacy"
            aria-label="Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
