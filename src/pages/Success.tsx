import React, { useEffect } from 'react';
import { Check, ArrowRight, Home, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CornerBrackets, YellowCornerBracket, TechLabel } from '../components/TechnicalDecoration';

interface SuccessProps {
  deliveredMessage: string;
  onStartAgain: () => void;
  onBackToHome: () => void;
}

export const Success: React.FC<SuccessProps> = ({
  deliveredMessage,
  onStartAgain,
  onBackToHome
}) => {
  useEffect(() => {
    // Celebration burst with brand colors
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD000', '#FFFFFF', '#333333']
    });
  }, []);

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between mb-1">
          <TechLabel number="COMPLETE" text="PIPELINE SUCCESS" yellowDot />
          <span className="px-2 py-0.5 bg-green-500 text-black font-mono text-[9px] font-black uppercase">
            DELIVERED
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl leading-none text-white uppercase">
          COMMUNICATION<br />COMPLETE
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // AUDIBLE VOICE BROADCAST DELIVERED SUCCESSFULLY
        </p>
      </div>

      {/* Main Success Stamp & Content */}
      <div className="relative z-10 my-auto space-y-4 py-2">
        {/* Animated Checkmark Badge */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-brand-yellow border-2 border-brand-yellow flex items-center justify-center relative shadow-lg">
            <Check className="w-9 h-9 text-black stroke-[3.5]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white" />
          </div>
        </div>

        {/* Message Delivery Card */}
        <div className="border border-neutral-800 bg-neutral-950 p-5 relative shadow-lg text-center">
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-3 h-3" />

          <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider mb-2">
            DELIVERED PHRASE
          </div>

          <p className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide leading-tight uppercase mb-3">
            "{deliveredMessage}"
          </p>

          <div className="inline-block px-2.5 py-1 bg-neutral-900 border border-neutral-700 font-mono text-[9px] font-bold text-brand-yellow uppercase">
            SIGNIFY COMMUNICATION COMPLETE
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 space-y-2 pt-2">
        <button
          onClick={onStartAgain}
          className="w-full group bg-brand-yellow hover:bg-yellow-400 text-black font-display text-xl tracking-wider py-4 px-6 flex items-center justify-between border-2 border-brand-yellow transition-all shadow-card-sharp active:translate-x-0.5 active:translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-black">
            <RefreshCw className="w-4 h-4 text-black" />
            <span>START AGAIN</span>
          </span>
          <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onBackToHome}
          className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 font-mono text-xs font-bold text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </button>
      </div>
    </div>
  );
};
