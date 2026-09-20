import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onSettings?: () => void;
  showStatus?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'SIGNIFY',
  subtitle,
  onBack,
  onSettings,
  showStatus = true,
}) => {
  return (
    <header className="w-full bg-black border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30 select-none flex-shrink-0">
      <div className="flex items-center gap-2.5">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-neutral-900 border border-neutral-800 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors"
            title="Go Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center text-black font-mono font-black text-sm shadow-[0_0_10px_rgba(255,208,0,0.4)]">
            S
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-sans font-black text-base tracking-wider text-white leading-tight uppercase">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="font-mono text-[10px] text-neutral-400 font-normal">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {showStatus && (
          <div className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-0.5 bg-neutral-900 text-brand-gold border border-brand-gold/60 rounded-full font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>AI READY</span>
          </div>
        )}

        {onSettings && (
          <button
            onClick={onSettings}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-black hover:bg-brand-gold transition-colors"
            title="Settings & Privacy"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
