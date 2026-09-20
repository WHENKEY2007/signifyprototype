import React, { useState, useEffect, useRef } from 'react';
import { CameraPreview } from '../components/CameraPreview';
import { recognitionService, RecognitionResult } from '../services/recognitionService';
import { sentenceBuilder } from '../services/sentenceBuilderService';
import { speechService } from '../services/speechService';
import { hapticService } from '../services/hapticService';
import {
  Volume2,
  RotateCcw,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  VolumeX,
  Play,
  Sparkles,
} from 'lucide-react';
import { AudioWaveform } from '../components/AudioWaveform';

interface SignModeProps {
  onBack: () => void;
  onAddToConversation?: (text: string) => void;
  preferredSign?: string;
  forceUncertain?: boolean;
}

export const SignMode: React.FC<SignModeProps> = ({
  onBack,
  onAddToConversation,
  preferredSign,
  forceUncertain = false,
}) => {
  // Word buffer & detection state
  const [wordBuffer, setWordBuffer] = useState<string[]>([]);
  const [currentDetection, setCurrentDetection] = useState<RecognitionResult | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [isLowConfidence, setIsLowConfidence] = useState<boolean>(false);
  const [lowConfidenceResult, setLowConfidenceResult] = useState<RecognitionResult | null>(null);

  // Context & Sentence Builder state
  const [isContextThinking, setIsContextThinking] = useState<boolean>(false);
  const [activePhrase, setActivePhrase] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Speech state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [hasSpokenOnce, setHasSpokenOnce] = useState<boolean>(false);

  // Multi-word sequence runner ref
  const sequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
      speechService.stopSpeaking();
    };
  }, []);

  // Update sentence & suggestions whenever word buffer changes
  useEffect(() => {
    if (wordBuffer.length === 0) {
      setActivePhrase('');
      setSuggestions([]);
      setIsContextThinking(false);
      return;
    }

    setIsContextThinking(true);
    const timer = setTimeout(() => {
      const result = sentenceBuilder.buildSentence(wordBuffer);
      setActivePhrase(result.primary);
      setSuggestions(result.suggestions);
      setIsContextThinking(false);
    }, wordBuffer.length > 1 ? 350 : 180);

    return () => clearTimeout(timer);
  }, [wordBuffer]);

  // Handle external preferred sign / uncertainty
  useEffect(() => {
    if (forceUncertain) {
      triggerUncertainSign();
    } else if (preferredSign) {
      triggerSignDetection(preferredSign);
    }
  }, [preferredSign, forceUncertain]);

  const triggerSignDetection = async (signWord: string) => {
    setIsDetecting(true);
    setIsLowConfidence(false);

    const result = await recognitionService.recognizeSign(undefined, signWord);
    setCurrentDetection(result);

    // Confidence safety gate (75%)
    if (result.confidence >= 75) {
      setIsLowConfidence(false);
      setWordBuffer((prev) => [...prev, result.word]);
      hapticService.triggerSuccess();
    } else {
      setIsLowConfidence(true);
      setLowConfidenceResult(result);
      hapticService.triggerUncertain();
    }

    setIsDetecting(false);
  };

  const triggerUncertainSign = async () => {
    setIsDetecting(true);
    setIsLowConfidence(false);

    const result = await recognitionService.getUncertainSign();
    setCurrentDetection(result);

    setIsLowConfidence(true);
    setLowConfidenceResult(result);
    hapticService.triggerUncertain();
    setIsDetecting(false);
  };

  const runDemoSequence = (words: string[]) => {
    setWordBuffer([]);
    setCurrentDetection(null);
    setIsLowConfidence(false);
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setHasSpokenOnce(false);

    let step = 0;
    const executeStep = () => {
      if (step < words.length) {
        triggerSignDetection(words[step]);
        step++;
        sequenceTimerRef.current = setTimeout(executeStep, 950);
      }
    };
    executeStep();
  };

  const handleUndoLastWord = () => {
    setWordBuffer((prev) => prev.slice(0, -1));
  };

  const handleClearBuffer = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setWordBuffer([]);
    setCurrentDetection(null);
    setIsLowConfidence(false);
    setActivePhrase('');
    setSuggestions([]);
    setHasSpokenOnce(false);
  };

  const handleSpeak = () => {
    if (!activePhrase) return;
    setIsSpeaking(true);
    hapticService.triggerBroadcast();

    speechService.speak(
      activePhrase,
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        setHasSpokenOnce(true);
      },
      () => {
        setIsSpeaking(false);
        setHasSpokenOnce(true);
      }
    );
  };

  const handleStopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="flex-1 w-full bg-[#050505] text-white flex flex-col justify-between select-none relative overflow-y-auto">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-15 pointer-events-none" />

      {/* HEADER */}
      <div className="w-full bg-[#050505]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 py-2.5 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white bg-neutral-900 border border-neutral-800 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors"
            title="Go Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
          <div>
            <h1 className="font-sans font-black text-sm tracking-wider text-white leading-none uppercase">
              LIVE SIGNING
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 bg-neutral-900 text-brand-gold border border-brand-gold/60 rounded-full font-bold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span>AI READY</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA - SPACIOUS & UNCLUTTERED */}
      <div className="flex-1 p-3.5 flex flex-col gap-3 z-10">
        
        {/* CAMERA PREVIEW */}
        <CameraPreview
          currentSign={currentDetection?.word}
          confidence={currentDetection?.confidence}
          isScanning={isDetecting}
          statusText={
            isDetecting
              ? 'INFERRING SIGN...'
              : currentDetection
              ? `✓ ${currentDetection.word}`
              : 'POSITION HAND IN FRAME'
          }
          className="h-[220px] sm:h-[260px] flex-shrink-0"
        />

        {/* COMPACT CURRENT DETECTION STRIP */}
        <div className="px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
              CURRENT DETECTION:
            </span>
            <span className="font-mono text-base font-black text-brand-gold">
              {currentDetection ? currentDetection.word : '—'}
            </span>
          </div>

          {currentDetection && (
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span
                className={`px-2 py-0.5 rounded font-bold uppercase ${
                  currentDetection.confidence >= 75
                    ? 'bg-brand-gold text-black'
                    : 'bg-amber-950 text-amber-300 border border-amber-600'
                }`}
              >
                {currentDetection.confidence}%
              </span>
            </div>
          )}
        </div>

        {/* LOW CONFIDENCE ALERT (Only shown if < 75%) */}
        {isLowConfidence && lowConfidenceResult && (
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/60 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-1.5 text-amber-300 font-sans">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
              <span>Please show the sign again clearly.</span>
            </div>
            <button
              onClick={() => triggerSignDetection(lowConfidenceResult.word)}
              className="px-2 py-1 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-[10px] uppercase rounded flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>TRY AGAIN</span>
            </button>
          </div>
        )}

        {/* DETECTED WORD BUFFER */}
        <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5">
            <span className="font-mono text-[10px] font-black text-brand-gold uppercase tracking-wider">
              DETECTED WORDS
            </span>

            {wordBuffer.length > 0 && (
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <button
                  onClick={handleUndoLastWord}
                  className="text-neutral-400 hover:text-brand-gold transition-colors"
                >
                  Undo
                </button>
                <span className="text-neutral-700">•</span>
                <button
                  onClick={handleClearBuffer}
                  className="text-neutral-400 hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[34px] items-center">
            {wordBuffer.map((word, idx) => (
              <span
                key={`${word}-${idx}`}
                className="px-2.5 py-1 rounded-lg bg-neutral-900 text-brand-gold border border-brand-gold/70 font-mono text-xs font-bold shadow-sm animate-in zoom-in-95 duration-150"
              >
                {word}
              </span>
            ))}

            {wordBuffer.length === 0 && (
              <span className="text-neutral-500 font-mono text-xs italic">
                Words you sign will appear here
              </span>
            )}
          </div>
        </div>

        {/* CONTEXT BUILDER & NATURAL PHRASE */}
        {isContextThinking && (
          <div className="p-2.5 rounded-xl bg-neutral-950 border border-brand-gold/40 flex items-center gap-2 text-brand-gold text-xs font-mono animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Context Builder: Understanding your message...</span>
          </div>
        )}

        {activePhrase && !isContextThinking && (
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-brand-gold/70 shadow-[0_0_15px_rgba(255,208,0,0.12)] space-y-2.5 animate-in fade-in">
            <div className="text-[9px] font-mono text-neutral-400 uppercase font-bold tracking-wider">
              NATURAL PHRASE
            </div>

            <div className="text-lg sm:text-xl font-sans font-black text-white leading-tight">
              "{activePhrase}"
            </div>

            {/* Contextual Suggestions Chips */}
            {suggestions.length > 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhrase(sug)}
                    className={`text-[11px] font-sans px-2.5 py-1 rounded-lg border transition-all ${
                      activePhrase === sug
                        ? 'bg-brand-gold text-black font-bold border-brand-gold'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
                    }`}
                  >
                    "{sug}"
                  </button>
                ))}
              </div>
            )}

            {/* Waveform when speaking */}
            {isSpeaking && (
              <div className="py-1">
                <AudioWaveform isActive={isSpeaking} mode="speech" className="h-8 border-0 bg-transparent" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {isSpeaking ? (
                <button
                  onClick={handleStopSpeaking}
                  className="py-2.5 px-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <VolumeX className="w-3.5 h-3.5 text-brand-gold" />
                  <span>STOP</span>
                </button>
              ) : (
                <button
                  onClick={handleSpeak}
                  className="py-2.5 px-3 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(255,208,0,0.3)] transition-all active:scale-[0.98]"
                >
                  {hasSpokenOnce ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>REPLAY</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>SPEAK</span>
                    </>
                  )}
                </button>
              )}

              {onAddToConversation && (
                <button
                  onClick={() => onAddToConversation(activePhrase)}
                  className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                  <span>TO CHAT</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* COMPACT FOOTER DEMO BAR & PIPELINE FLOW */}
      <div className="p-3 bg-[#050505] border-t border-neutral-900 flex flex-col gap-2 z-20 flex-shrink-0">
        {/* Sleek 1-line demo sequence selector */}
        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
          <span className="text-neutral-500 font-bold uppercase">DEMO:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => runDemoSequence(['HELLO', 'HOW', 'YOU'])}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-brand-gold text-neutral-300 hover:text-white"
            >
              Hello How You
            </button>
            <button
              onClick={() => runDemoSequence(['I', 'NEED', 'HELP'])}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-brand-gold text-neutral-300 hover:text-white"
            >
              I Need Help
            </button>
            <button
              onClick={() => runDemoSequence(['THANK', 'YOU'])}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-brand-gold text-neutral-300 hover:text-white"
            >
              Thank You
            </button>
          </div>
        </div>

        {/* Minimal 1-line pipeline indicator */}
        <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 pt-1 border-t border-neutral-900/60">
          <span className="text-neutral-400">Sign</span>
          <span className="text-brand-gold">→</span>
          <span className="text-neutral-400">Word</span>
          <span className="text-brand-gold">→</span>
          <span className="text-neutral-400">Context</span>
          <span className="text-brand-gold">→</span>
          <span className="text-neutral-400">Sentence</span>
          <span className="text-brand-gold">→</span>
          <span className="text-brand-gold">Voice</span>
        </div>
      </div>

    </div>
  );
};
