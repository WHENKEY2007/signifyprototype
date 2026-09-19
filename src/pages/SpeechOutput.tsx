import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, CheckCircle2, RotateCw } from 'lucide-react';
import { AudioWaveform } from '../components/AudioWaveform';
import { CornerBrackets, YellowCornerBracket, TechLabel } from '../components/TechnicalDecoration';

interface SpeechOutputProps {
  messageText: string;
  onFinishDelivery: () => void;
}

export const SpeechOutput: React.FC<SpeechOutputProps> = ({
  messageText,
  onFinishDelivery
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(true);

  // Play audio speech via Web Speech API
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any pending utterances
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsSpeaking(false);
      }, 2500);
    }
  };

  useEffect(() => {
    setIsSpeaking(true);
    speakText(messageText);

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [messageText]);

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleReplay = () => {
    setIsSpeaking(true);
    speakText(messageText);
  };

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between mb-1">
          <TechLabel number="05" text="SPEECH SYNTHESIS" yellowDot />
          <span
            className={`px-2 py-0.5 font-mono text-[9px] font-black uppercase transition-colors ${
              isSpeaking
                ? 'bg-brand-yellow text-black'
                : 'bg-green-500 text-black'
            }`}
          >
            {isSpeaking ? 'SPEAKING...' : 'COMPLETED'}
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl leading-none text-white uppercase">
          MESSAGE READY
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // VOCAL BROADCAST THROUGH PHONE SPEAKER
        </p>
      </div>

      {/* Main Content & Waveform */}
      <div className="relative z-10 my-auto space-y-4 py-2">
        {/* Large Message Display */}
        <div className="border border-neutral-800 bg-neutral-950 p-5 relative shadow-lg">
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-3 h-3" />

          <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider mb-2">
            BROADCAST CONTENT
          </div>

          <p className="font-display font-black text-3xl sm:text-4xl text-white tracking-wide leading-tight uppercase">
            "{messageText}"
          </p>

          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between font-mono text-[9px]">
            <span className="text-neutral-500">VOICE ENGINE: NATURAL EN-US</span>
            <span className="text-brand-yellow font-bold">100% VOLUME</span>
          </div>
        </div>

        {/* Audio Waveform Visualizer */}
        <div className="border border-neutral-800 p-3 bg-neutral-950">
          <div className="flex items-center justify-between font-mono text-[10px] mb-2">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Volume2 className="w-3.5 h-3.5 text-brand-yellow" />
              <span>OUTPUT SPECTRUM</span>
            </span>
            <span className="text-[9px] text-neutral-500">
              {isSpeaking ? '44.1 kHz // ACTIVE' : 'MUTED // IDLE'}
            </span>
          </div>

          <AudioWaveform isActive={isSpeaking} mode="speech" />
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="relative z-10 space-y-2 pt-2">
        {isSpeaking ? (
          <button
            onClick={handleStopSpeaking}
            className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <VolumeX className="w-4 h-4 text-brand-yellow" />
            <span>STOP SPEAKING</span>
          </button>
        ) : (
          <div className="space-y-2">
            <div className="p-2 bg-green-950/70 border border-green-600 text-green-300 font-mono text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="font-black">MESSAGE DELIVERED ✓</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleReplay}
                className="py-3 px-3 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 font-mono text-xs font-bold text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>SPEAK AGAIN</span>
              </button>

              <button
                onClick={onFinishDelivery}
                className="py-3 px-3 border-2 border-brand-yellow bg-brand-yellow hover:bg-yellow-400 text-black font-display text-lg tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-card-sharp active:translate-x-0.5 active:translate-y-0.5 font-black"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
