import React, { useState } from 'react';
import { ArrowRight, Video, Mic } from 'lucide-react';
import { TechLabel, CornerBrackets, YellowCornerBracket } from '../components/TechnicalDecoration';

interface ModeSelectionProps {
  onSelectSignToSpeech: () => void;
  onSelectSpeechToText: () => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({
  onSelectSignToSpeech,
  onSelectSpeechToText
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <TechLabel number="01" text="CHANNEL SELECT" yellowDot />
        <h1 className="font-display font-black text-3xl sm:text-4xl leading-none text-white uppercase mt-1">
          CHOOSE YOUR<br />CHANNEL
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // BIDIRECTIONAL COMMUNICATION MODES
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 my-auto space-y-4 py-3">
        {/* CARD 01: SIGN -> SPEECH */}
        <button
          onClick={onSelectSignToSpeech}
          onMouseEnter={() => setHoveredCard('sign-speech')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`w-full text-left p-5 border transition-all relative group bg-neutral-950 hover:translate-x-1 ${
            hoveredCard === 'sign-speech'
              ? 'border-brand-yellow shadow-active-sharp'
              : 'border-neutral-800'
          }`}
        >
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-2.5 h-2.5" />

          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-black text-2xl text-brand-yellow px-1">
              01
            </span>
            <div className="w-8 h-8 rounded-none border border-neutral-700 bg-neutral-900 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-black transition-colors text-white">
              <Video className="w-4 h-4" />
            </div>
          </div>

          <h2 className="font-display font-black text-2xl text-white tracking-wide uppercase mb-1">
            SIGN → SPEECH
          </h2>

          <p className="font-sans text-xs text-neutral-300 leading-relaxed mb-3">
            Use gestures to communicate naturally. Camera interprets signs into audible speech.
          </p>

          <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-neutral-800">
            <span className="px-1.5 py-0.5 bg-brand-yellow text-black font-bold uppercase">
              CAMERA VISION
            </span>
            <div className="flex items-center gap-1 font-bold text-brand-yellow">
              <span>ENTER MODE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>

        {/* CARD 02: SPEECH -> TEXT */}
        <button
          onClick={onSelectSpeechToText}
          onMouseEnter={() => setHoveredCard('speech-text')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`w-full text-left p-5 border transition-all relative group bg-neutral-950 hover:translate-x-1 ${
            hoveredCard === 'speech-text'
              ? 'border-brand-yellow shadow-active-sharp'
              : 'border-neutral-800'
          }`}
        >
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-2.5 h-2.5" />

          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-black text-2xl text-brand-yellow px-1">
              02
            </span>
            <div className="w-8 h-8 rounded-none border border-neutral-700 bg-neutral-900 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-black transition-colors text-white">
              <Mic className="w-4 h-4" />
            </div>
          </div>

          <h2 className="font-display font-black text-2xl text-white tracking-wide uppercase mb-1">
            SPEECH → TEXT
          </h2>

          <p className="font-sans text-xs text-neutral-300 leading-relaxed mb-3">
            Turn spoken communication into readable text on the phone screen for signers.
          </p>

          <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-neutral-800">
            <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-300 font-bold uppercase">
              VOICE LISTENER
            </span>
            <div className="flex items-center gap-1 font-bold text-brand-yellow">
              <span>ENTER MODE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      </div>

      {/* Bottom Technical Note */}
      <div className="relative z-10 pt-2 border-t border-neutral-800 flex items-center justify-between text-[9px] font-mono text-neutral-500">
        <span>ON-DEVICE PROCESSING</span>
        <span className="text-brand-yellow font-bold">ZERO CLOUD LATENCY</span>
      </div>
    </div>
  );
};
