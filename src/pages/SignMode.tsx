import React, { useState, useEffect, useRef } from 'react';
import { CameraPreview } from '../components/CameraPreview';
import { recognitionService, RecognitionResult, ServerStatus, RecognitionMode } from '../services/recognitionService';
import { sentenceBuilder } from '../services/sentenceBuilderService';
import { speechService } from '../services/speechService';
import { hapticService } from '../services/hapticService';
import {
  KAGGLE_CONFIDENCE_THRESHOLD,
} from '../data/modelVocabulary';
import {
  Volume2,
  RotateCcw,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  VolumeX,
  Play,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  WifiOff,
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
  // Recognition Mode & Backend Status
  const [currentMode, setCurrentMode] = useState<RecognitionMode>(recognitionService.getMode());
  const [serverStatus, setServerStatus] = useState<ServerStatus>(recognitionService.getServerStatus());
  const [isSystemStatusOpen, setIsSystemStatusOpen] = useState<boolean>(false);

  // Word buffer & detection state
  const [wordBuffer, setWordBuffer] = useState<string[]>([]);
  const [currentDetection, setCurrentDetection] = useState<RecognitionResult | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [isLowConfidence, setIsLowConfidence] = useState<boolean>(false);
  const [stabilityState, setStabilityState] = useState<'idle' | 'analyzing' | 'stable' | 'accepted'>('idle');

  // Context & Sentence Builder state
  const [isContextThinking, setIsContextThinking] = useState<boolean>(false);
  const [activePhrase, setActivePhrase] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Speech state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [hasSpokenOnce, setHasSpokenOnce] = useState<boolean>(false);

  // Demo sequence timer
  const sequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check health on mount and poll server status
  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      await recognitionService.checkServerHealth();
      if (isMounted) {
        setServerStatus(recognitionService.getServerStatus());
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
      speechService.stopSpeaking();
    };
  }, []);

  // Sentence generation whenever word buffer changes
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
    }, wordBuffer.length > 1 ? 250 : 120);

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

  // Manual Trigger for explicit demo button or walkthrough
  const triggerSignDetection = async (signWord: string) => {
    setIsDetecting(true);
    setIsLowConfidence(false);
    setStabilityState('analyzing');

    const result = await recognitionService.recognizeSign(undefined, signWord);
    setCurrentDetection(result);

    if (result.confidence >= KAGGLE_CONFIDENCE_THRESHOLD) {
      setIsLowConfidence(false);
      setStabilityState('accepted');
      setWordBuffer((prev) => {
        if (prev.length === 0 || prev[prev.length - 1] !== result.word) {
          return [...prev, result.word];
        }
        return prev;
      });
      hapticService.triggerSuccess();
    } else {
      setIsLowConfidence(true);
      setStabilityState('idle');
      hapticService.triggerUncertain();
    }

    setIsDetecting(false);
  };

  const triggerUncertainSign = async () => {
    setIsDetecting(true);
    setIsLowConfidence(false);
    setStabilityState('analyzing');

    const result = await recognitionService.getUncertainSign();
    setCurrentDetection(result);
    setIsLowConfidence(true);
    setStabilityState('idle');
    hapticService.triggerUncertain();
    setIsDetecting(false);
  };

  // Live camera polling loop
  useEffect(() => {
    let isMounted = true;
    let loopTimeout: ReturnType<typeof setTimeout>;
    let isProcessing = false;

    const pollLiveCamera = async () => {
      if (!isMounted) return;

      // Only poll when in LIVE mode, not speaking, not running demo sequence
      if (currentMode === 'live' && !isSpeaking && !sequenceTimerRef.current && !isProcessing) {
        const video = document.getElementById('signify-camera-video') as HTMLVideoElement | null;
        if (video && video.readyState >= 2 && !video.paused) {
          isProcessing = true;
          try {
            const result = await recognitionService.recognizeSign();
            if (isMounted && result) {
              setCurrentDetection(result);

              if (result.word && result.word !== 'ANALYZING') {
                if (result.confidence >= KAGGLE_CONFIDENCE_THRESHOLD) {
                  setIsLowConfidence(false);
                  setStabilityState('stable');

                  if (result.isNewStable) {
                    setStabilityState('accepted');
                    setWordBuffer((prev) => {
                      if (prev.length === 0 || prev[prev.length - 1] !== result.word) {
                        return [...prev, result.word];
                      }
                      return prev;
                    });
                    hapticService.triggerSuccess();
                    // Cooldown between words
                    await new Promise((r) => setTimeout(r, 1000));
                  }
                } else {
                  setIsLowConfidence(true);
                  setStabilityState('idle');
                }
              } else if (result.word === 'ANALYZING') {
                setStabilityState('analyzing');
                setIsDetecting(true);
              } else {
                setIsDetecting(false);
                setStabilityState('idle');
              }
            }
          } catch {
            // Quiet catch
          } finally {
            isProcessing = false;
          }
        }
      }

      if (isMounted) {
        loopTimeout = setTimeout(pollLiveCamera, currentMode === 'live' ? 350 : 800);
      }
    };

    loopTimeout = setTimeout(pollLiveCamera, 500);

    return () => {
      isMounted = false;
      clearTimeout(loopTimeout);
    };
  }, [currentMode, isSpeaking]);

  const toggleMode = (newMode: RecognitionMode) => {
    recognitionService.setMode(newMode);
    setCurrentMode(newMode);
    setCurrentDetection(null);
    setIsLowConfidence(false);
    setStabilityState('idle');
  };

  const handleRetryBackend = async () => {
    setServerStatus('connecting');
    await recognitionService.checkServerHealth();
    setServerStatus(recognitionService.getServerStatus());
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
        sequenceTimerRef.current = setTimeout(executeStep, 1000);
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
    setStabilityState('idle');
    setActivePhrase('');
    setSuggestions([]);
    setHasSpokenOnce(false);
    recognitionService.resetBuffer();
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

  const isBackendConnected = serverStatus === 'connected';
  const isBackendConnecting = serverStatus === 'connecting';

  return (
    <div className="flex-1 w-full bg-[#050505] text-white flex flex-col justify-between select-none relative overflow-y-auto">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-15 pointer-events-none" />

      {/* HEADER */}
      <div className="w-full bg-[#050505]/95 backdrop-blur-md border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0 z-30">
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
              SIGN RECOGNITION
            </h1>
          </div>
        </div>

        {/* HONEST MODE PILL */}
        <div className="flex items-center gap-2">
          {currentMode === 'live' ? (
            isBackendConnected ? (
              <div className="flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 bg-neutral-900 text-green-400 border border-green-500/50 rounded-full font-bold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span>● LIVE KAGGLE MODEL</span>
              </div>
            ) : isBackendConnecting ? (
              <div className="flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 bg-neutral-900 text-yellow-400 border border-yellow-500/50 rounded-full font-bold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                <span>WAKING UP AI...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 bg-neutral-900 text-amber-400 border border-amber-500/50 rounded-full font-bold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>○ MODEL SLEEPING</span>
              </div>
            )
          ) : (
            <div className="flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 bg-neutral-900 text-brand-gold border border-brand-gold/60 rounded-full font-bold shadow-sm">
              <span>◆ DEMO WALKTHROUGH</span>
            </div>
          )}
        </div>
      </div>

      {/* CONNECTING / WAKING UP BANNER */}
      {currentMode === 'live' && isBackendConnecting && (
        <div className="mx-3.5 mt-2.5 p-2.5 rounded-xl bg-neutral-900 border border-brand-gold/60 flex items-center justify-between z-20 animate-in fade-in">
          <div className="flex items-center gap-2 text-brand-gold font-sans text-xs">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping flex-shrink-0" />
            <span>Waking up Kaggle ASL model (Render free tier cold start ~30s)...</span>
          </div>
          <button
            onClick={() => toggleMode('demo')}
            className="px-2 py-1 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-[9px] uppercase rounded"
          >
            USE DEMO
          </button>
        </div>
      )}

      {/* SLEEPING / OFFLINE MODEL BANNER */}
      {currentMode === 'live' && !isBackendConnected && !isBackendConnecting && (
        <div className="mx-3.5 mt-2.5 p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/60 flex items-center justify-between z-20 animate-in fade-in">
          <div className="flex items-center gap-2 text-amber-300 font-sans text-xs">
            <WifiOff className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
            <span>Kaggle ASL cloud instance is asleep. Click WAKE UP to connect.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRetryBackend}
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono text-[9px] font-bold rounded"
            >
              WAKE UP
            </button>
            <button
              onClick={() => toggleMode('demo')}
              className="px-2 py-1 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-[9px] uppercase rounded"
            >
              ENTER DEMO
            </button>
          </div>
        </div>
      )}

      {/* DEMO MODE BANNER (Shown when user is actively in demo mode) */}
      {currentMode === 'demo' && (
        <div className="mx-3.5 mt-2.5 p-2 rounded-xl bg-neutral-900 border border-brand-gold/40 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5 text-neutral-300 font-mono text-[9px]">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>DEMO MODE: Deterministic walkthrough for judges.</span>
          </div>
          <button
            onClick={() => toggleMode('live')}
            className="text-[9px] font-mono font-bold text-brand-gold hover:underline"
          >
            SWITCH TO LIVE MODEL
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA - PHONE FIRST HIERARCHY */}
      <div className="flex-1 p-3.5 flex flex-col gap-2.5 z-10">
        
        {/* 1. CAMERA PREVIEW */}
        <CameraPreview
          currentSign={currentDetection?.word}
          confidence={currentDetection?.confidence}
          isScanning={isDetecting || stabilityState === 'analyzing'}
          statusText={
            stabilityState === 'analyzing'
              ? 'ANALYZING GESTURE MOTION...'
              : stabilityState === 'stable'
              ? `STABLE SIGN: ${currentDetection?.word}`
              : stabilityState === 'accepted'
              ? `✓ ACCEPTED: ${currentDetection?.word}`
              : currentDetection?.word
              ? `${currentDetection.word}`
              : 'POSITION HAND IN FRAME'
          }
          className="h-[280px] sm:h-[320px] flex-shrink-0"
        />

        {/* 2. DETECTED SIGN & RECOGNITION STATE STRIP */}
        <div className="px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] font-mono text-neutral-400 uppercase font-bold">
              DETECTED SIGN:
            </span>
            <span className="font-mono text-base font-black text-brand-gold">
              {currentDetection && currentDetection.word && currentDetection.word !== 'ANALYZING'
                ? currentDetection.word
                : '—'}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9.5px]">
            {/* Stability Pill */}
            {stabilityState === 'analyzing' && (
              <span className="px-1.5 py-0.5 rounded bg-blue-950/70 border border-blue-600 text-blue-300 animate-pulse">
                ANALYZING...
              </span>
            )}
            {stabilityState === 'stable' && (
              <span className="px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-600 text-amber-300">
                STABLE
              </span>
            )}
            {stabilityState === 'accepted' && (
              <span className="px-1.5 py-0.5 rounded bg-green-950/70 border border-green-600 text-green-300 font-bold">
                ✓ ACCEPTED
              </span>
            )}

            {/* Confidence Number */}
            {currentDetection && currentDetection.confidence > 0 && (
              <span
                className={`px-2 py-0.5 rounded font-bold uppercase ${
                  currentDetection.confidence >= KAGGLE_CONFIDENCE_THRESHOLD
                    ? 'bg-brand-gold text-black'
                    : 'bg-amber-950 text-amber-300 border border-amber-600'
                }`}
              >
                {currentDetection.confidence.toFixed(1)}%
              </span>
            )}
          </div>
        </div>

        {/* 3. LOW CONFIDENCE RETRY NOTICE (Only when < 70%) */}
        {isLowConfidence && currentDetection && (
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/60 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-1.5 text-amber-300 font-sans text-xs">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
              <span>Low confidence ({currentDetection.confidence.toFixed(1)}%). Hold sign steady in frame.</span>
            </div>
            {currentMode === 'demo' && (
              <button
                onClick={() => triggerSignDetection(currentDetection.word || 'SICK')}
                className="px-2 py-1 bg-brand-gold text-black font-mono font-black text-[9px] uppercase rounded flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RETRY</span>
              </button>
            )}
          </div>
        )}

        {/* 4. DETECTED WORD BUFFER */}
        <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-1">
            <span className="font-mono text-[9.5px] font-black text-brand-gold uppercase tracking-wider">
              WORD BUFFER (ACCEPTED TOKENS)
            </span>

            {wordBuffer.length > 0 && (
              <div className="flex items-center gap-2 text-[9.5px] font-mono">
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

          <div className="flex flex-wrap gap-1.5 min-h-[30px] items-center">
            {wordBuffer.map((word, idx) => (
              <span
                key={`${word}-${idx}`}
                className="px-2.5 py-0.5 rounded-lg bg-neutral-900 text-brand-gold border border-brand-gold/70 font-mono text-xs font-bold shadow-sm animate-in zoom-in-95 duration-150"
              >
                {word}
              </span>
            ))}

            {wordBuffer.length === 0 && (
              <span className="text-neutral-500 font-mono text-xs italic">
                Accepted signs will accumulate here
              </span>
            )}
          </div>
        </div>

        {/* 5. CONTEXT-AWARE SENTENCE BUILDER & VOICE */}
        {isContextThinking && (
          <div className="p-2 rounded-xl bg-neutral-950 border border-brand-gold/40 flex items-center gap-2 text-brand-gold text-xs font-mono animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Context Grammar: Grounding words into natural sentence...</span>
          </div>
        )}

        {activePhrase && !isContextThinking && (
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-brand-gold/70 shadow-[0_0_15px_rgba(255,208,0,0.12)] space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 uppercase font-bold tracking-wider">
              <span>GENERATED MESSAGE</span>
              <span className="text-brand-gold">CONTEXT-AWARE GRAMMAR</span>
            </div>

            <div className="text-lg sm:text-xl font-sans font-black text-white leading-tight">
              "{activePhrase}"
            </div>

            {/* Contextual Suggestions Chips */}
            {suggestions.length > 1 && (
              <div className="flex flex-wrap gap-1 pt-0.5">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhrase(sug)}
                    className={`text-[10.5px] font-sans px-2 py-0.5 rounded-lg border transition-all ${
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

            {/* Speaking Waveform */}
            {isSpeaking && (
              <div className="py-0.5">
                <AudioWaveform isActive={isSpeaking} mode="speech" className="h-7 border-0 bg-transparent" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {isSpeaking ? (
                <button
                  onClick={handleStopSpeaking}
                  className="py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <VolumeX className="w-3.5 h-3.5 text-brand-gold" />
                  <span>STOP</span>
                </button>
              ) : (
                <button
                  onClick={handleSpeak}
                  className="py-2 px-3 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(255,208,0,0.3)] transition-all active:scale-[0.98]"
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
                  className="py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                  <span>TO CHAT</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 6. EXPANDABLE SYSTEM STATUS & TELEMETRY TRAY */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden font-mono text-[9px]">
          <button
            onClick={() => setIsSystemStatusOpen(!isSystemStatusOpen)}
            className="w-full px-3 py-2 flex items-center justify-between text-neutral-400 hover:text-white transition-colors"
          >
            <span className="font-bold flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-brand-gold" />
              <span>SYSTEM STATUS & TELEMETRY</span>
            </span>
            <div className="flex items-center gap-2">
              <span className={isBackendConnected ? 'text-green-400' : 'text-amber-400'}>
                {isBackendConnected ? 'LIVE BRIDGE OK' : 'BRIDGE OFFLINE'}
              </span>
              {isSystemStatusOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </div>
          </button>

          {isSystemStatusOpen && (
            <div className="px-3 pb-3 pt-1 border-t border-neutral-900 space-y-1.5 text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">Kaggle ASL Model:</span>
                <span className="font-bold text-brand-gold">250 Classes (TFLite ISLR)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Inference Location:</span>
                <span>{recognitionService.getServerUrl()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Inference Engine:</span>
                <span>FastAPI + TFLite Signature Runner</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Confidence Gate:</span>
                <span className="font-bold text-brand-gold">70.0% Threshold</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Temporal Stability:</span>
                <span className="text-green-400">Active (Multi-frame Window)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Snapdragon NPU:</span>
                <span className="text-brand-gold font-bold">REQUIRED HARDWARE (Hexagon / QNN)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Offline Silicon:</span>
                <span className="text-neutral-300 font-bold">MANDATORY FOR SUB-20ms</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* COMPACT FOOTER DEMO BAR WITH VERIFIED KAGGLE SIGNS */}
      <div className="p-3 bg-[#050505] border-t border-neutral-900 flex flex-col gap-2 z-20 flex-shrink-0 font-mono">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-neutral-500 font-bold uppercase">KAGGLE 250 TOKENS:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => runDemoSequence(['SICK', 'OWIE', 'CALL ON PHONE'])}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-brand-gold text-neutral-300 hover:text-white"
              title="Kaggle ASL: SICK + OWIE + CALL ON PHONE"
            >
              Sick + Owie
            </button>
            <button
              onClick={() => runDemoSequence(['WATER', 'PLEASE', 'THANK YOU'])}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-brand-gold text-neutral-300 hover:text-white"
              title="Kaggle ASL: WATER + PLEASE + THANK YOU"
            >
              Water + Please
            </button>
            <button
              onClick={() => runDemoSequence(['POLICE', 'CALL ON PHONE'])}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-brand-gold text-neutral-300 hover:text-white"
              title="Kaggle ASL: POLICE + CALL ON PHONE"
            >
              Police + Call
            </button>
          </div>
        </div>

        {/* Minimal truthful pipeline */}
        <div className="flex items-center justify-between text-[8px] text-neutral-500 pt-1 border-t border-neutral-900/60">
          <span className="text-neutral-400">Kaggle ASL</span>
          <span className="text-brand-gold">→</span>
          <span className="text-neutral-400">Gate (≥70%)</span>
          <span className="text-brand-gold">→</span>
          <span className="text-neutral-400">Stability</span>
          <span className="text-brand-gold">→</span>
          <span className="text-neutral-400">Context Grammar</span>
          <span className="text-brand-gold">→</span>
          <span className="text-brand-gold">Voice</span>
        </div>
      </div>

    </div>
  );
};
