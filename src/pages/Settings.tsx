import React, { useState } from 'react';
import { ArrowLeft, Shield, Volume2, Cpu, Sparkles } from 'lucide-react';
import { CornerBrackets, YellowCornerBracket, TechLabel } from '../components/TechnicalDecoration';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between mb-1">
          <TechLabel number="SYS" text="CONFIGURATION" yellowDot />
          <span className="px-2 py-0.5 bg-neutral-900 border border-brand-yellow/50 text-brand-yellow font-mono text-[9px] font-black uppercase">
            ● READY
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl leading-none text-white uppercase">
          SETTINGS & ABOUT
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // ON-DEVICE PRIVACY & SYSTEM CONTROLS
        </p>
      </div>

      {/* Settings List */}
      <div className="relative z-10 my-auto space-y-3 py-2">
        {/* On-Device Privacy Card */}
        <div className="border border-neutral-800 bg-neutral-950 p-4 relative shadow-lg">
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-2 h-2" />

          <div className="flex items-center gap-2 mb-2 text-white">
            <Shield className="w-4 h-4 text-brand-yellow" />
            <span className="font-mono text-xs font-black uppercase">OFFLINE AI & PRIVACY</span>
          </div>
          <p className="font-sans text-xs text-neutral-300 leading-relaxed">
            "Your communication is designed to stay on-device. No camera feeds or audio transcripts are sent to external servers."
          </p>
        </div>

        {/* Toggles */}
        <div className="border border-neutral-800 bg-neutral-950 divide-y divide-neutral-800">
          {/* Demo Mode Toggle */}
          <div className="p-3 flex items-center justify-between font-mono text-xs">
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                <span>DEMO MODE</span>
              </div>
              <div className="text-[9px] text-neutral-400">DETERMINISTIC INFERENCE BENCHMARK</div>
            </div>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className="font-mono text-xs font-black px-2 py-1 border border-brand-yellow bg-brand-yellow text-black flex items-center gap-1"
            >
              {demoMode ? 'ON [LOCKED]' : 'OFF'}
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="p-3 flex items-center justify-between font-mono text-xs">
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-brand-yellow" />
                <span>SOUND OUTPUT</span>
              </div>
              <div className="text-[9px] text-neutral-400">SPEECH SYNTHESIS ENGINE</div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`font-mono text-xs font-black px-2 py-1 border transition-colors ${
                soundEnabled
                  ? 'border-brand-yellow bg-brand-yellow text-black'
                  : 'border-neutral-700 bg-neutral-800 text-neutral-400'
              }`}
            >
              {soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Device Target */}
          <div className="p-3 flex items-center justify-between font-mono text-xs">
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-brand-yellow" />
                <span>TARGET HARDWARE</span>
              </div>
              <div className="text-[9px] text-neutral-400">iQOO 15 ACCELERATION</div>
            </div>
            <span className="font-bold text-brand-yellow text-[10px] bg-neutral-900 px-2 py-0.5 border border-neutral-700">
              iQOO 15 (ACTIVE)
            </span>
          </div>
        </div>

        {/* Minimal About Card */}
        <div className="p-3 border border-neutral-800 bg-neutral-900/60 text-[10px] font-mono">
          <div className="font-bold text-white mb-1">ABOUT SIGNIFY</div>
          <div className="text-neutral-400">
            Phone-first AI communication assistant for sign-language users. Interactive prototype.
          </div>
          <div className="mt-2 text-[9px] text-neutral-500 flex justify-between">
            <span>VERSION 0.1 PROTOTYPE</span>
            <span>BUILD 2026.09.20</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="relative z-10 pt-2">
        <button
          onClick={onBack}
          className="w-full py-3 px-4 bg-brand-yellow hover:bg-yellow-400 text-black font-mono font-black text-xs flex items-center justify-center gap-2 transition-colors border-2 border-brand-yellow shadow-card-sharp"
        >
          <ArrowLeft className="w-4 h-4 text-black" />
          <span>RETURN TO SIGNIFY</span>
        </button>
      </div>
    </div>
  );
};
