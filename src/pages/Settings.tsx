import React, { useState } from 'react';
import { ArrowLeft, Shield, Volume2, Sparkles } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [demoMode, setDemoMode] = useState<boolean>(true);

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between select-none relative overflow-y-auto">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="w-full bg-black/95 border-b border-neutral-800 px-4 py-3 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-neutral-900 border border-neutral-800 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors"
            title="Go Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <h1 className="font-sans font-black text-base text-white leading-none uppercase tracking-wide">
            SETTINGS & ABOUT
          </h1>
        </div>
      </div>

      {/* Main Settings List */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 z-10">
        
        {/* Privacy Note */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-xs uppercase">
            <Shield className="w-4 h-4 text-brand-gold" />
            <span>ON-DEVICE PRIVACY GUARANTEE</span>
          </div>
          <p className="font-sans text-xs text-neutral-300 leading-relaxed">
            Signify is architected for on-device processing. No camera feeds or audio transcripts are transmitted to external servers.
          </p>
        </div>

        {/* Toggles */}
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 divide-y divide-neutral-900 overflow-hidden">
          
          {/* Sound Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 text-brand-gold flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono font-bold text-xs text-white uppercase">VOICE BROADCAST</div>
                <div className="font-mono text-[10px] text-neutral-400">SPEECH SYNTHESIS ENGINE</div>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                soundEnabled ? 'bg-brand-gold' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black shadow-sm transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Demo Mode Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 text-brand-gold flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono font-bold text-xs text-white uppercase">DEMO RECOGNITION</div>
                <div className="font-mono text-[10px] text-neutral-400">DETERMINISTIC INFERENCE</div>
              </div>
            </div>

            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                demoMode ? 'bg-brand-gold' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black shadow-sm transition-transform ${
                  demoMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* About Card */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <div className="font-mono font-bold text-xs text-brand-gold uppercase">ABOUT SIGNIFY</div>
          <p className="font-sans text-xs text-neutral-300 leading-relaxed">
            Two-way AI communication assistant bridging sign-language users and hearing individuals via real-time gesture-to-speech and voice-to-text.
          </p>
          <div className="pt-2 text-[9px] font-mono text-neutral-500 flex justify-between border-t border-neutral-900">
            <span>VERSION 0.2 PROTOTYPE</span>
            <span>FLAGSHIP HARDWARE</span>
          </div>
        </div>

      </div>

      {/* Return Button */}
      <div className="p-4 bg-black border-t border-neutral-800 flex-shrink-0 z-20">
        <button
          onClick={onBack}
          className="w-full py-3 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(255,208,0,0.3)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO SIGNIFY</span>
        </button>
      </div>

    </div>
  );
};
