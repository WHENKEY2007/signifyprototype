import React, { useState } from 'react';
import { ArrowLeft, Mic, MicOff, RotateCw, Volume2, MessageSquare } from 'lucide-react';
import { speechService } from '../services/speechService';
import { AudioWaveform } from '../components/AudioWaveform';

interface SpeakModeProps {
  onBack: () => void;
  onAddToConversation?: (text: string) => void;
}

export const SpeakMode: React.FC<SpeakModeProps> = ({ onBack, onAddToConversation }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [isReplaying, setIsReplaying] = useState<boolean>(false);

  const handleStartListening = () => {
    setRecognizedText('');
    speechService.startListening(
      (text) => {
        setRecognizedText(text);
        setIsListening(false);
      },
      () => setIsListening(true),
      () => setIsListening(false)
    );
  };

  const handleStopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const handleReplay = () => {
    if (!recognizedText) return;
    setIsReplaying(true);
    speechService.speak(
      recognizedText,
      () => setIsReplaying(true),
      () => setIsReplaying(false),
      () => setIsReplaying(false)
    );
  };

  const handleNewMessage = () => {
    setRecognizedText('');
    handleStartListening();
  };

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
          <h1 className="font-sans font-black text-base tracking-wider text-white leading-none uppercase">
            SPEAK MODE
          </h1>
        </div>

        <div className="font-mono text-[10px] font-bold px-2.5 py-0.5 bg-neutral-900 text-brand-gold rounded-full border border-brand-gold/60">
          VOICE → TEXT
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-5 flex flex-col justify-between z-10">
        
        {/* Top Prompt Hint */}
        <div className="text-center pt-2">
          <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            SPOKEN AUDIO CONVERTED TO HIGH-CONTRAST TEXT FOR SIGNERS
          </p>
        </div>

        {/* Center: Microphone Interaction or Recognized Speech Card */}
        <div className="my-auto py-4 flex flex-col items-center">
          
          {/* Recognized Text Display (Large, High-Contrast for Signers) */}
          {recognizedText ? (
            <div className="w-full p-6 rounded-3xl bg-neutral-950 border-2 border-brand-gold shadow-[0_0_25px_rgba(255,208,0,0.2)] animate-in fade-in zoom-in-95 duration-200 text-center relative overflow-hidden">
              {/* Gold Corner Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-brand-gold" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-brand-gold" />

              <div className="font-mono text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2">
                SPEECH RECOGNIZED:
              </div>

              <div className="text-2xl sm:text-3xl font-sans font-black text-white leading-snug py-3 tracking-wide">
                "{recognizedText}"
              </div>

              {/* Audio Waveform when replaying */}
              {isReplaying && (
                <div className="my-2 p-2 bg-black rounded-xl border border-brand-gold/40">
                  <AudioWaveform isActive={isReplaying} mode="speech" />
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between font-mono text-[9px] text-neutral-400">
                <span>ON-DEVICE TRANSCRIPTION</span>
                <span className="text-brand-gold font-bold">100% VISIBLE</span>
              </div>
            </div>
          ) : (
            /* Microphone Button Stage */
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center mb-4">
                {/* Gold ripple animation when listening */}
                {isListening && (
                  <div className="absolute w-36 h-36 rounded-full bg-brand-gold/20 animate-voice-ripple-gold" />
                )}

                <button
                  onClick={isListening ? handleStopListening : handleStartListening}
                  className={`w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg transition-all transform active:scale-95 border-2 ${
                    isListening
                      ? 'bg-red-600 text-white border-red-500 shadow-red-500/40'
                      : 'bg-brand-gold hover:bg-yellow-400 text-black border-brand-gold shadow-[0_0_25px_rgba(255,208,0,0.4)]'
                  }`}
                  aria-label={isListening ? 'Stop Listening' : 'Tap to speak'}
                >
                  {isListening ? (
                    <MicOff className="w-10 h-10 animate-pulse text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-black stroke-[2.5]" />
                  )}
                </button>
              </div>

              <h2 className="font-sans font-black text-2xl text-white tracking-wide uppercase mt-2">
                {isListening ? 'LISTENING...' : 'TAP TO SPEAK'}
              </h2>
              <p className="font-mono text-xs text-neutral-400 mt-1">
                {isListening ? 'Speak clearly toward your phone' : 'Press microphone to capture voice'}
              </p>

              {/* Waveform indicator when listening */}
              {isListening && (
                <div className="w-48 mt-4 p-2 bg-neutral-950 rounded-xl border border-neutral-800">
                  <AudioWaveform isActive={isListening} mode="listening" />
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-2">
          {recognizedText ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleReplay}
                  disabled={isReplaying}
                  className="py-3 px-4 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-brand-gold" />
                  <span>{isReplaying ? 'REPLAYING...' : '▶ REPLAY'}</span>
                </button>

                <button
                  onClick={handleNewMessage}
                  className="py-3 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(255,208,0,0.3)] transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>NEW MESSAGE</span>
                </button>
              </div>

              {onAddToConversation && (
                <button
                  onClick={() => onAddToConversation(recognizedText)}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-brand-gold hover:text-black text-neutral-300 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>+ ADD TO LIVE CONVERSATION</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={handleStartListening}
              className="w-full py-3.5 px-5 rounded-2xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,208,0,0.3)] transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>START SPEAKING</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
