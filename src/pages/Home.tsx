import React from 'react';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';
import { TechLabel, CornerBrackets, YellowCornerBracket } from '../components/TechnicalDecoration';

interface HomeProps {
  onStartInterpreting: () => void;
  onTryDemo: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartInterpreting, onTryDemo }) => {
  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />

      {/* Top Status Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-brand-yellow flex items-center justify-center">
            <span className="font-display text-black text-xs font-black">S</span>
          </div>
          <span className="font-display font-black tracking-wider text-base text-white">
            SIGNIFY
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 bg-neutral-900 border border-brand-yellow/50 text-brand-yellow font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          <span>AI READY</span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="relative z-10 my-auto py-2">
        <div className="border border-neutral-800 p-5 bg-neutral-950 relative shadow-lg">
          <CornerBrackets size="w-3 h-3" />
          <YellowCornerBracket position="top-right" />

          <div className="flex items-center gap-2 mb-2">
            <TechLabel number="01" text="HANDS TO VOICE" yellowDot />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl leading-[0.92] text-white uppercase tracking-tight mb-3">
            SPEAK<br />
            WITH YOUR<br />
            <span className="bg-brand-yellow text-black px-1 inline-block">HANDS.</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
            Turn sign language into natural communication, directly from your phone.
          </p>

          {/* Camera / Hand Concept Visual Preview */}
          <div className="relative h-28 w-full bg-black border border-neutral-800 p-2 flex items-center justify-between overflow-hidden">
            <div className="absolute inset-0 bg-dots-tech opacity-20 pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 bg-neutral-900 border border-brand-yellow/60 flex items-center justify-center text-xl">
                ✋
              </div>
              <div className="font-mono text-[10px] text-white">
                <div className="text-brand-yellow font-bold flex items-center gap-1">
                  <Camera className="w-3 h-3" /> iQOO 15 VISION
                </div>
                <div className="text-neutral-400 text-[9px]">21-POINT SKELETON DETECT</div>
                <div className="text-[9px] text-brand-yellow font-semibold">CONFIDENCE GATED</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-end font-mono text-[9px] text-brand-yellow">
              <span className="px-1.5 py-0.5 bg-neutral-900 border border-brand-yellow/40">1080P // 60FPS</span>
              <span className="text-neutral-300 mt-1">NPU ACCELERATED</span>
            </div>
          </div>
        </div>

        {/* Technical Badges Row */}
        <div className="grid grid-cols-3 gap-1.5 mt-3">
          <div className="p-1.5 border border-neutral-800 bg-neutral-900 font-mono text-[9px] text-center">
            <span className="text-black bg-brand-yellow px-1 font-bold">1</span>
            <div className="font-bold text-neutral-200 mt-0.5">PHONE-FIRST</div>
          </div>
          <div className="p-1.5 border border-neutral-800 bg-neutral-900 font-mono text-[9px] text-center">
            <span className="text-black bg-brand-yellow px-1 font-bold">2</span>
            <div className="font-bold text-neutral-200 mt-0.5">AI ASSISTED</div>
          </div>
          <div className="p-1.5 border border-neutral-800 bg-neutral-900 font-mono text-[9px] text-center">
            <span className="text-black bg-brand-yellow px-1 font-bold">3</span>
            <div className="font-bold text-neutral-200 mt-0.5">PRIVACY-FIRST</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 space-y-2 pt-2">
        <button
          onClick={onStartInterpreting}
          className="w-full group bg-brand-yellow hover:bg-yellow-400 text-black font-display text-lg tracking-wider py-3.5 px-5 flex items-center justify-between border-2 border-brand-yellow transition-all shadow-card-sharp active:translate-x-0.5 active:translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-black">
            <Sparkles className="w-4 h-4 text-black fill-black" />
            START INTERPRETING
          </span>
          <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onTryDemo}
          className="w-full group bg-neutral-900 hover:bg-neutral-800 text-white font-mono font-bold text-xs tracking-wider py-3 px-5 flex items-center justify-between border border-neutral-700 transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          <span>TRY DEMO SCENARIOS</span>
          <span className="text-brand-yellow group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};
