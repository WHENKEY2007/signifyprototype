import React, { useState, useEffect } from 'react';
import { Mic, MicOff, ArrowRight, RefreshCw } from 'lucide-react';
import { AudioWaveform } from '../components/AudioWaveform';
import { CornerBrackets, YellowCornerBracket, TechLabel } from '../components/TechnicalDecoration';

interface SpeechToTextProps {
  onBackToHome: () => void;
}

const SAMPLE_SPOKEN_PHRASES = [
  'Are you okay?',
  'Where does it hurt?',
  'The doctor is on the way.',
  'Can you hear me clearly?'
];

export const SpeechToText: React.FC<SpeechToTextProps> = ({ onBackToHome }) => {
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(true);
  const [displayedText, setDisplayedText] = useState<string>('');

  const currentPhrase = SAMPLE_SPOKEN_PHRASES[phraseIndex];

  useEffect(() => {
    setIsListening(true);
    setDisplayedText('');

    const typingTimer = setTimeout(() => {
      setDisplayedText(currentPhrase.toUpperCase());
      setIsListening(false);
    }, 1800);

    return () => clearTimeout(typingTimer);
  }, [phraseIndex, currentPhrase]);

  const handleNextMessage = () => {
    setPhraseIndex((prev) => (prev + 1) % SAMPLE_SPOKEN_PHRASES.length);
  };

  const handleListenAgain = () => {
    setIsListening(true);
    setDisplayedText('');
    setTimeout(() => {
      setDisplayedText(currentPhrase.toUpperCase());
      setIsListening(false);
    }, 1600);
  };

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between mb-1">
          <TechLabel number="03" text="REVERSE CHANNEL" yellowDot />
          <span
            className={`px-2 py-0.5 font-mono text-[9px] font-black uppercase ${
              isListening
                ? 'bg-brand-yellow text-black animate-pulse'
                : 'bg-neutral-800 text-brand-yellow border border-brand-yellow/30'
            }`}
          >
            {isListening ? 'LISTENING...' : 'TRANSCRIPTION READY'}
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl leading-none text-white uppercase">
          SPEECH → TEXT
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // SPOKEN AUDIO CONVERTED FOR SIGN-LANGUAGE USERS
        </p>
      </div>

      {/* Main Microphone & Transcription Card */}
      <div className="relative z-10 my-auto space-y-4 py-2">
        {/* Prominent High-Contrast Visual Text Display */}
        <div className="border border-neutral-800 bg-neutral-950 p-6 relative shadow-lg">
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-3 h-3" />

          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 uppercase tracking-wider mb-2">
            <span>VISUAL DISPLAY FOR SIGN-LANGUAGE USER</span>
            <span className="text-brand-yellow font-bold">100% VISIBLE</span>
          </div>

          <div className="min-h-[100px] flex items-center justify-center text-center">
            {displayedText ? (
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide leading-[0.95] uppercase animate-in zoom-in-95 duration-200">
                "{displayedText}"
              </h2>
            ) : (
              <div className="flex flex-col items-center gap-2 text-neutral-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
                <span>LISTENING TO SPEAKER...</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between font-mono text-[9px]">
            <span className="text-neutral-500">SOURCE: iQOO MICROPHONE ARRAY</span>
            <span className="text-brand-yellow font-bold">WHISPER ON-DEVICE</span>
          </div>
        </div>

        {/* Audio Visualizer Bar */}
        <div className="border border-neutral-800 p-3 bg-neutral-950">
          <div className="flex items-center justify-between font-mono text-[10px] mb-2">
            <span className="flex items-center gap-1.5 font-bold text-white">
              {isListening ? (
                <Mic className="w-3.5 h-3.5 text-brand-yellow animate-pulse" />
              ) : (
                <MicOff className="w-3.5 h-3.5 text-neutral-500" />
              )}
              <span>MICROPHONE INGEST</span>
            </span>
            <span className="text-[9px] text-neutral-500">
              {isListening ? 'LIVE AUDIO DETECTED' : 'STANDBY'}
            </span>
          </div>

          <AudioWaveform isActive={isListening} mode="listening" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 space-y-2 pt-2">
        <button
          onClick={handleNextMessage}
          className="w-full group bg-brand-yellow hover:bg-yellow-400 text-black font-display text-xl tracking-wider py-4 px-6 flex items-center justify-between border-2 border-brand-yellow transition-all shadow-card-sharp active:translate-x-0.5 active:translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-black">
            <RefreshCw className="w-4 h-4 text-black" />
            <span>NEW MESSAGE (NEXT PROMPT)</span>
          </span>
          <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleListenAgain}
            className="py-2.5 px-3 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 font-mono text-xs font-bold text-neutral-200 flex items-center justify-center gap-1 transition-colors"
          >
            <span>LISTEN AGAIN</span>
          </button>

          <button
            onClick={onBackToHome}
            className="py-2.5 px-3 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 font-mono text-xs font-bold text-neutral-200 flex items-center justify-center gap-1 transition-colors"
          >
            <span>BACK TO HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
