import React, { useState, useEffect } from 'react';
import { CameraPreview } from '../components/CameraPreview';
import { recognitionService, RecognitionResult } from '../services/recognitionService';
import { speechService } from '../services/speechService';
import { Volume2, RotateCcw, Check, AlertCircle, ArrowLeft, MessageSquare, VolumeX } from 'lucide-react';
import { AudioWaveform } from '../components/AudioWaveform';

interface SignModeProps {
  onBack: () => void;
  onAddToConversation?: (text: string) => void;
  preferredSign?: string;
  forceUncertain?: boolean;
}

type SignState = 'ready' | 'detecting' | 'success' | 'uncertain' | 'camera_error';

export const SignMode: React.FC<SignModeProps> = ({
  onBack,
  onAddToConversation,
  preferredSign,
  forceUncertain = false,
}) => {
  const [state, setState] = useState<SignState>('ready');
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [recognizedSignsList, setRecognizedSignsList] = useState<string[]>([]);
  const [stageProgress, setStageProgress] = useState<number>(1); // 1 to 5 for pipeline stages

  // Trigger recognition simulation
  const startRecognition = async (signKey?: string, isUncertain = false) => {
    setState('detecting');
    setResult(null);
    setStageProgress(2); // Tracking

    try {
      if (isUncertain) {
        setTimeout(() => setStageProgress(3), 300);
        const res = await recognitionService.getUncertainSign();
        setResult(res);
        setState('uncertain');
        setStageProgress(3);
      } else {
        setTimeout(() => setStageProgress(3), 300); // Recognition
        const res = await recognitionService.recognizeSign(signKey);
        setStageProgress(4); // Context
        setResult(res);
        setState('success');
        setRecognizedSignsList((prev) => (prev.includes(res.sign) ? prev : [...prev, res.sign]));
      }
    } catch {
      setState('uncertain');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startRecognition(preferredSign, forceUncertain);
    }, 600);

    return () => clearTimeout(timer);
  }, [preferredSign, forceUncertain]);

  const handleSpeak = () => {
    if (!result) return;
    setIsSpeaking(true);
    setStageProgress(5); // Voice
    speechService.speak(
      result.text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleStopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleClear = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setResult(null);
    setRecognizedSignsList([]);
    setState('ready');
    setStageProgress(1);
  };

  const handleTryAgain = () => {
    startRecognition(preferredSign, false);
  };

  // Compute natural phrase if multiple signs exist
  const getNaturalPhrase = (): string => {
    if (recognizedSignsList.length > 1) {
      if (recognizedSignsList.includes('HELLO') && recognizedSignsList.includes('HELP')) {
        return 'Hello, I need help.';
      }
      if (recognizedSignsList.includes('PLEASE') && recognizedSignsList.includes('HELP')) {
        return 'Please help me.';
      }
      return `${recognizedSignsList.map(s => s.charAt(0) + s.slice(1).toLowerCase()).join(' ')}.`;
    }
    return result?.text || 'Hello';
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
            SIGN MODE
          </h1>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-0.5 bg-neutral-900 text-brand-gold border border-brand-gold/60 rounded-full font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span>AI READY</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 flex flex-col justify-between z-10">
        
        {/* Large Camera Preview occupying visual focus */}
        <div className="w-full flex flex-col">
          <CameraPreview
            currentSign={state === 'success' ? result?.sign : undefined}
            confidence={state === 'success' ? result?.confidence : undefined}
            isScanning={state === 'detecting'}
            statusText={
              state === 'ready'
                ? 'SHOW YOUR SIGN'
                : state === 'detecting'
                ? 'DETECTING...'
                : state === 'success'
                ? `✓ SIGN DETECTED: ${result?.sign}`
                : state === 'uncertain'
                ? '! SIGN NOT CLEAR'
                : 'CAMERA UNAVAILABLE'
            }
            className="h-[270px] sm:h-[320px] flex-shrink-0"
          />

          {/* Interactive Recognition Feedback Area (Continuous Flow) */}
          <div className="mt-3 flex-1 flex flex-col justify-center">
            
            {/* STATE A: READY */}
            {state === 'ready' && (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-2">
                <div className="text-2xl">✋</div>
                <h2 className="font-sans font-black text-base text-white uppercase tracking-wide">
                  SHOW YOUR SIGN
                </h2>
                <p className="font-mono text-xs text-neutral-400">
                  Hold gesture steady inside the gold frame
                </p>
                <button
                  onClick={() => startRecognition()}
                  className="mt-2 px-5 py-2.5 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_12px_rgba(255,208,0,0.3)] transition-all"
                >
                  START DETECTING
                </button>
              </div>
            )}

            {/* STATE B: DETECTING */}
            {state === 'detecting' && (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-brand-gold/40 text-center flex flex-col items-center">
                <div className="w-7 h-7 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mb-2" />
                <h2 className="font-sans font-black text-sm text-brand-gold uppercase tracking-wider">
                  DETECTING...
                </h2>
                <p className="font-mono text-[10px] text-neutral-400 mt-0.5">
                  Neural gesture inference in progress
                </p>
              </div>
            )}

            {/* STATE C: SUCCESS */}
            {state === 'success' && result && (
              <div className="p-4 rounded-2xl bg-neutral-950 border-2 border-brand-gold/80 shadow-[0_0_20px_rgba(255,208,0,0.2)]">
                {/* Status Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-black text-brand-gold uppercase">
                    <span className="w-4 h-4 rounded-full bg-brand-gold text-black flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3.5]" />
                    </span>
                    <span>✓ SIGN DETECTED</span>
                  </div>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-neutral-900 text-brand-gold border border-brand-gold/50 rounded">
                    {result.confidence}% CONFIDENCE
                  </span>
                </div>

                {/* Sign & Text Display */}
                <div className="my-3">
                  <div className="flex items-baseline justify-between">
                    <div className="font-mono text-2xl font-black text-brand-gold tracking-wide">
                      {result.sign}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      SAFETY GATE: <strong className="text-white">PASS (≥75%)</strong>
                    </div>
                  </div>

                  <div className="mt-2 p-3 bg-black rounded-xl border border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-400 block uppercase">
                        NATURAL TEXT PHRASE
                      </span>
                      <span className="font-sans font-black text-xl text-white tracking-wide">
                        "{getNaturalPhrase()}"
                      </span>
                    </div>
                    <span className="text-xl">📝</span>
                  </div>
                </div>

                {/* Audio Waveform while speaking */}
                {isSpeaking && (
                  <div className="mb-3 p-2 bg-black rounded-xl border border-brand-gold/40">
                    <div className="flex items-center justify-between text-[10px] font-mono text-brand-gold font-bold mb-1">
                      <span>VOICE SYNTHESIS ACTIVE</span>
                      <span className="animate-pulse">● BROADCASTING</span>
                    </div>
                    <AudioWaveform isActive={isSpeaking} mode="speech" />
                  </div>
                )}

                {/* Primary Gold Speak Button + Clear */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {isSpeaking ? (
                    <button
                      onClick={handleStopSpeaking}
                      className="py-3 px-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <VolumeX className="w-4 h-4 text-brand-gold" />
                      <span>STOP SPEAKING</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSpeak}
                      className="py-3 px-3 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,208,0,0.4)] transition-all active:scale-[0.98]"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 SPEAK</span>
                    </button>
                  )}

                  <button
                    onClick={handleClear}
                    className="py-3 px-3 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>CLEAR</span>
                  </button>
                </div>

                {onAddToConversation && (
                  <button
                    onClick={() => onAddToConversation(getNaturalPhrase())}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-brand-gold hover:text-black text-neutral-300 text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>+ ADD TO LIVE CONVERSATION</span>
                  </button>
                )}
              </div>
            )}

            {/* STATE D: UNCERTAIN (Confidence < 75%) */}
            {state === 'uncertain' && (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-600/70 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-950/80 text-amber-400 border border-amber-600/60 flex items-center justify-center mx-auto font-bold">
                  !
                </div>
                <h2 className="font-sans font-black text-base text-white uppercase tracking-wide">
                  LOW CONFIDENCE ({result?.confidence || 48}%)
                </h2>
                <div className="text-[10px] font-mono text-amber-400">
                  BELOW SAFETY THRESHOLD (&lt;75%)
                </div>
                <p className="font-sans text-xs text-neutral-300">
                  Please show the sign again clearly inside the gold frame.
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={handleTryAgain}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>TRY AGAIN</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-3 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400 text-xs font-mono transition-colors"
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            )}

            {/* STATE E: CAMERA ERROR */}
            {state === 'camera_error' && (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-neutral-500 mx-auto" />
                <h2 className="font-sans font-black text-base text-white uppercase">
                  CAMERA UNAVAILABLE
                </h2>
                <p className="font-sans text-xs text-neutral-400">
                  Allow camera access to start translating.
                </p>
                <button
                  onClick={handleTryAgain}
                  className="mt-2 py-2.5 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider transition-colors"
                >
                  ENABLE CAMERA
                </button>
              </div>
            )}

          </div>
        </div>

        {/* SUBTLE ARCHITECTURE PROCESSING STAGE INDICATOR */}
        <div className="mt-3 pt-2.5 border-t border-neutral-900 flex items-center justify-between text-[9px] font-mono">
          <div className={`flex items-center gap-1 ${stageProgress >= 1 ? 'text-brand-gold font-bold' : 'text-neutral-600'}`}>
            <span>GESTURE</span>
            <span>{stageProgress >= 1 ? '✓' : '○'}</span>
          </div>
          <span className="text-neutral-700">→</span>
          <div className={`flex items-center gap-1 ${stageProgress >= 2 ? 'text-brand-gold font-bold' : 'text-neutral-600'}`}>
            <span>TRACKING</span>
            <span>{stageProgress >= 2 ? '✓' : '○'}</span>
          </div>
          <span className="text-neutral-700">→</span>
          <div className={`flex items-center gap-1 ${stageProgress >= 3 ? 'text-brand-gold font-bold' : 'text-neutral-600'}`}>
            <span>RECOGNITION</span>
            <span>{stageProgress >= 3 ? (state === 'detecting' ? '●' : '✓') : '○'}</span>
          </div>
          <span className="text-neutral-700">→</span>
          <div className={`flex items-center gap-1 ${stageProgress >= 4 ? 'text-brand-gold font-bold' : 'text-neutral-600'}`}>
            <span>CONTEXT</span>
            <span>{stageProgress >= 4 ? '✓' : '○'}</span>
          </div>
          <span className="text-neutral-700">→</span>
          <div className={`flex items-center gap-1 ${stageProgress >= 5 ? 'text-brand-gold font-bold' : 'text-neutral-600'}`}>
            <span>VOICE</span>
            <span>{stageProgress >= 5 ? '✓' : '○'}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
