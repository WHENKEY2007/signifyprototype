import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CornerBrackets, YellowCornerBracket, TechLabel } from '../components/TechnicalDecoration';

interface IntroProps {
  onStart: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-6 select-none relative">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dots-tech opacity-20 pointer-events-none" />

      {/* Top Tag Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
          <TechLabel number="01" text="SYSTEM" yellowDot />
          <span className="font-mono text-[9px] font-black text-black bg-brand-yellow px-1.5 py-0.5">
            ASSISTIVE INTELLIGENCE
          </span>
        </div>
        <p className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
          // BIDIRECTIONAL COMMUNICATION BRIDGE
        </p>
      </div>

      {/* Hero Poster Center */}
      <div className="relative z-10 my-auto py-4">
        <div className="relative border border-neutral-800 p-6 bg-neutral-950 shadow-lg">
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-3 h-3" />

          <div className="inline-block px-2 py-0.5 bg-brand-yellow text-black font-mono text-[10px] font-black uppercase mb-3">
            PHONE-FIRST ACCESSIBILITY
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl leading-[0.88] text-white tracking-tight uppercase mb-4">
            SIGNIFY
          </h1>

          <div className="w-12 h-1 bg-brand-yellow mb-4" />

          <h2 className="font-display font-black text-2xl sm:text-3xl leading-none text-white uppercase mb-3">
            COMMUNICATION<br />WITHOUT BARRIERS.
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
            An AI-powered phone-first communication assistant for sign-language users. Built specifically for the iQOO 15.
          </p>

          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-brand-yellow" /> ON-DEVICE PRIVACY
            </span>
            <span>v0.1 PROTOTYPE</span>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="relative z-10 pt-4">
        <button
          onClick={onStart}
          className="w-full group bg-brand-yellow hover:bg-yellow-400 text-black font-display text-xl uppercase tracking-wider py-4 px-6 flex items-center justify-between border-2 border-brand-yellow transition-all shadow-card-sharp active:translate-x-0.5 active:translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-black">
            <Sparkles className="w-4 h-4 text-black fill-black" />
            START EXPERIENCE
          </span>
          <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-neutral-500">
          <span>OPTIMIZED FOR iQOO 15</span>
          <span className="text-brand-yellow font-bold">2-WAY TRANSLATION</span>
        </div>
      </div>
    </div>
  );
};
