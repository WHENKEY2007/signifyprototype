import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Camera, Trash2, X, Check, Mic, Plus, Sparkles, RefreshCw } from 'lucide-react';
import { speechService } from '../services/speechService';
import { recognitionService, RecognitionResult } from '../services/recognitionService';
import { sentenceBuilder } from '../services/sentenceBuilderService';
import { hapticService } from '../services/hapticService';
import { CameraPreview } from '../components/CameraPreview';
import { AudioWaveform } from '../components/AudioWaveform';
import { KAGGLE_CONFIDENCE_THRESHOLD } from '../data/modelVocabulary';

export interface ConversationMessage {
  id: string;
  sender: 'signer' | 'speaker';
  text: string;
  sign?: string;
  timestamp: number;
}

interface ConversationModeProps {
  messages: ConversationMessage[];
  onAddMessage: (sender: 'signer' | 'speaker', text: string, sign?: string) => void;
  onClearConversation: () => void;
  onSignModalStateChange?: (isOpen: boolean) => void;
}

export const ConversationMode: React.FC<ConversationModeProps> = ({
  messages,
  onAddMessage,
  onClearConversation,
  onSignModalStateChange,
}) => {
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  
  // Quick Sign Live Camera & Recognition state
  const [isSignModalOpen, setIsSignModalOpen] = useState<boolean>(false);
  const [signWordBuffer, setSignWordBuffer] = useState<string[]>([]);
  const [currentDetection, setCurrentDetection] = useState<RecognitionResult | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [stabilityState, setStabilityState] = useState<'idle' | 'analyzing' | 'stable' | 'accepted'>('idle');
  const [isLowConfidence, setIsLowConfidence] = useState<boolean>(false);
  const [meaningfulSentence, setMeaningfulSentence] = useState<string>('');
  const [sentenceSuggestions, setSentenceSuggestions] = useState<string[]>([]);
  const [serverOnline, setServerOnline] = useState<boolean>(false);

  // Quick Speak state
  const [isSpeakModalOpen, setIsSpeakModalOpen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');

  useEffect(() => {
    onSignModalStateChange?.(isSignModalOpen || isSpeakModalOpen);
  }, [isSignModalOpen, isSpeakModalOpen, onSignModalStateChange]);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update meaningful sentence whenever words change in buffer
  useEffect(() => {
    if (signWordBuffer.length === 0) {
      setMeaningfulSentence('');
      setSentenceSuggestions([]);
      return;
    }

    const result = sentenceBuilder.buildSentence(signWordBuffer);
    setMeaningfulSentence(result.primary);
    setSentenceSuggestions(result.suggestions);
  }, [signWordBuffer]);

  // LIVE CAMERA RECOGNITION LOOP for Conversation Mode
  useEffect(() => {
    if (!isSignModalOpen) return;

    let isMounted = true;
    let loopTimeout: ReturnType<typeof setTimeout>;
    let isProcessing = false;

    // Check server status
    recognitionService.checkServerHealth().then((online) => {
      if (isMounted) setServerOnline(online);
    });

    const pollLiveCamera = async () => {
      if (!isMounted) return;

      if (!isProcessing) {
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
                    setSignWordBuffer((prev) => {
                      if (prev.length === 0 || prev[prev.length - 1] !== result.word) {
                        return [...prev, result.word];
                      }
                      return prev;
                    });
                    hapticService.triggerSuccess();
                    // Brief pause to allow signer to reset hands
                    await new Promise((r) => setTimeout(r, 900));
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
        loopTimeout = setTimeout(pollLiveCamera, 350);
      }
    };

    loopTimeout = setTimeout(pollLiveCamera, 400);

    return () => {
      isMounted = false;
      clearTimeout(loopTimeout);
    };
  }, [isSignModalOpen]);

  const handlePlayMessage = (msg: ConversationMessage) => {
    if (playingMessageId === msg.id) {
      speechService.stopSpeaking();
      setPlayingMessageId(null);
      return;
    }

    setPlayingMessageId(msg.id);
    speechService.speak(
      msg.text,
      () => setPlayingMessageId(msg.id),
      () => setPlayingMessageId(null),
      () => setPlayingMessageId(null)
    );
  };

  // Quick Sign Open Trigger
  const handleOpenSignModal = () => {
    setSignWordBuffer([]);
    setCurrentDetection(null);
    setMeaningfulSentence('');
    setSentenceSuggestions([]);
    setStabilityState('idle');
    setIsLowConfidence(false);
    setIsSignModalOpen(true);
  };

  // Add individual sign to buffer (from one-tap chips or live detection)
  const handleAddSignToken = (token: string) => {
    setSignWordBuffer((prev) => [...prev, token]);
    hapticService.triggerSuccess();
  };

  // Remove token from buffer
  const handleRemoveSignToken = (index: number) => {
    setSignWordBuffer((prev) => prev.filter((_, i) => i !== index));
    hapticService.triggerClick();
  };

  // Clear all tokens
  const handleClearTokens = () => {
    setSignWordBuffer([]);
    setMeaningfulSentence('');
    setSentenceSuggestions([]);
    setCurrentDetection(null);
    hapticService.triggerClick();
  };

  // Confirm and Send Meaningful Sentence to Conversation
  const handleConfirmSignMessage = () => {
    const textToSend = meaningfulSentence || (currentDetection ? currentDetection.text : '');
    if (textToSend && textToSend.trim()) {
      const signLabel = signWordBuffer.length > 0
        ? signWordBuffer.join(' + ')
        : (currentDetection?.word || undefined);

      onAddMessage('signer', textToSend.trim(), signLabel);
      setIsSignModalOpen(false);
      setSignWordBuffer([]);
      setMeaningfulSentence('');
      hapticService.triggerBroadcast();
    }
  };

  // Quick Speak Trigger with Real-Time Transcription
  const handleOpenSpeakModal = () => {
    setIsSpeakModalOpen(true);
    setLiveTranscript('');
    setIsListening(true);

    speechService.startListening(
      // onFinal (dispatches exactly once):
      (finalText) => {
        if (finalText && finalText.trim()) {
          onAddMessage('speaker', finalText.trim());
          setIsSpeakModalOpen(false);
          setIsListening(false);
          setLiveTranscript('');
        }
      },
      // onStart:
      () => {
        setIsListening(true);
      },
      // onEnd:
      () => {
        setIsListening(false);
      },
      // onInterim (live real-time typing display):
      (interimText) => {
        setLiveTranscript(interimText);
      }
    );
  };

  const handleStopAndSendSpeech = () => {
    const textToSend = (liveTranscript || speechService.getCurrentTranscript()).trim();
    speechService.stopListening(false);
    if (textToSend) {
      onAddMessage('speaker', textToSend);
    }
    setIsSpeakModalOpen(false);
    setIsListening(false);
    setLiveTranscript('');
  };

  const handleCancelSpeak = () => {
    speechService.stopListening(false);
    setIsSpeakModalOpen(false);
    setIsListening(false);
    setLiveTranscript('');
  };

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between select-none relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="w-full bg-black/95 border-b border-neutral-800 px-4 py-3 flex items-center justify-between flex-shrink-0 z-20">
        <div>
          <div className="font-mono text-[9px] text-brand-gold font-bold uppercase tracking-wider">
            SIGNIFY
          </div>
          <h1 className="font-sans font-black text-base text-white leading-none uppercase tracking-wide">
            LIVE CONVERSATION
          </h1>
        </div>

        <button
          onClick={onClearConversation}
          className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-neutral-900 transition-colors"
          title="Clear Conversation"
          aria-label="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Conversation Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 z-10">
        {messages.map((msg) => {
          const isSigner = msg.sender === 'signer';
          const isPlaying = playingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`p-4 rounded-2xl border transition-all relative ${
                isSigner
                  ? 'bg-neutral-950 border-brand-gold/60 shadow-[0_0_15px_rgba(255,208,0,0.1)]'
                  : 'bg-neutral-900/90 border-neutral-800 text-white'
              }`}
            >
              {/* Speaker Label Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800/80">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase">
                  {isSigner ? (
                    <>
                      <span className="text-sm">🤟</span>
                      <span className="text-brand-gold">SIGN (YOU)</span>
                      {msg.sign && (
                        <span className="text-[9px] bg-brand-gold/15 text-brand-gold px-1.5 py-0.5 rounded border border-brand-gold/30">
                          [{msg.sign}]
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-sm">🎤</span>
                      <span className="text-neutral-300">SPEECH (OTHER PERSON)</span>
                    </>
                  )}
                </div>

                {/* Inline Play Button */}
                <button
                  onClick={() => handlePlayMessage(msg)}
                  className={`px-2 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1 transition-colors ${
                    isPlaying
                      ? 'bg-brand-gold text-black'
                      : 'bg-neutral-900 border border-neutral-700 text-brand-gold hover:bg-brand-gold hover:text-black'
                  }`}
                  title="Play message audio"
                >
                  {isPlaying ? (
                    <>
                      <VolumeX className="w-3 h-3" />
                      <span>PLAYING...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Message Content */}
              <p className="font-sans font-extrabold text-base sm:text-lg text-white leading-relaxed">
                "{msg.text}"
              </p>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500 my-auto">
            <div className="text-3xl mb-2">🤟 💬 🎤</div>
            <p className="font-mono text-xs max-w-[200px] uppercase">
              NO MESSAGES YET. USE BUTTONS BELOW TO START TWO-WAY BRIDGE.
            </p>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* BOTTOM TWO ACTIONS: [ 🤟 SIGN ] and [ 🎤 SPEAK ] */}
      <div className="p-4 bg-black/95 border-t border-neutral-800 z-20 space-y-2 flex-shrink-0">
        <div className="font-mono text-[9px] font-bold text-neutral-500 text-center uppercase tracking-wider">
          TWO-WAY COMMUNICATION BRIDGE:
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* ACTION 1: SIGN */}
          <button
            onClick={handleOpenSignModal}
            className="p-3.5 rounded-2xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,208,0,0.3)] transition-all active:scale-[0.98]"
          >
            <span className="text-lg">🤟</span>
            <span>SIGN</span>
          </button>

          {/* ACTION 2: SPEAK */}
          <button
            onClick={handleOpenSpeakModal}
            className="p-3.5 rounded-2xl font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] border bg-neutral-900 hover:bg-neutral-800 text-brand-gold border-brand-gold/60 shadow-sm"
          >
            <span className="text-lg">🎤</span>
            <span>SPEAK</span>
          </button>
        </div>
      </div>

      {/* QUICK SIGN FULL-SCREEN INTERFACE (Live Camera Model Recognition + Meaningful Sentence Builder) */}
      {isSignModalOpen && (
        <div className="absolute inset-0 bg-black z-50 flex flex-col justify-between animate-in fade-in duration-200">
          {/* Top Bar Header */}
          <div className="w-full bg-black/95 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0 z-20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-brand-gold" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-mono text-[8px] text-brand-gold font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE CAMERA ML MODEL</span>
                </div>
                <h2 className="font-sans font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                  SIGN RECOGNITION
                </h2>
              </div>
            </div>
            <button
              onClick={() => setIsSignModalOpen(false)}
              className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Close and return to conversation"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Live Camera Preview with Real Reticle & NPU Indicator */}
          <div className="flex-1 w-full px-3 py-2 flex flex-col min-h-0 relative">
            <CameraPreview
              isScanning={stabilityState === 'analyzing' || stabilityState === 'stable'}
              currentSign={currentDetection?.word}
              confidence={currentDetection?.confidence}
              statusText={
                currentDetection?.word && currentDetection.word !== 'ANALYZING'
                  ? `LIVE: ${currentDetection.word} (${Math.round(currentDetection.confidence)}%)`
                  : 'POSITION HAND INSIDE FRAME TO SIGN'
              }
              className="w-full h-full flex-1 rounded-2xl overflow-hidden border border-brand-gold/50"
            />

            {/* Real-time Detection Badge Floating pill */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700 text-neutral-300 font-mono text-[9px] font-bold">
                <span className={`w-2 h-2 rounded-full ${isDetecting ? 'bg-brand-gold animate-spin' : serverOnline ? 'bg-emerald-400 animate-ping' : 'bg-brand-gold'}`} />
                <span>{isDetecting ? 'INFERRING...' : serverOnline ? 'RENDER AI LIVE' : 'CONNECTING NPU...'}</span>
              </div>

              {isLowConfidence && !currentDetection?.word && (
                <div className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono text-[9px] font-bold animate-pulse">
                  LOW CONFIDENCE (&lt;70%)
                </div>
              )}

              {currentDetection?.word && currentDetection.word !== 'ANALYZING' && (
                <div className="px-2.5 py-1 rounded-full bg-brand-gold text-black font-mono text-[10px] font-black shadow-[0_0_12px_rgba(255,208,0,0.6)] animate-in zoom-in-95">
                  {currentDetection.word} {Math.round(currentDetection.confidence)}%
                </div>
              )}
            </div>
          </div>

          {/* Word Token Accumulation Bar & One-Tap Testing Chips */}
          <div className="px-3 py-2 bg-neutral-950/95 border-t border-neutral-800/80 flex-shrink-0 z-20 space-y-2">
            {/* Word Tokens Accumulated Chips */}
            <div className="flex items-center justify-between">
              <div className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                <span>ACCEPTED SIGN TOKENS:</span>
                <span className="text-brand-gold">({signWordBuffer.length})</span>
              </div>
              {signWordBuffer.length > 0 && (
                <button
                  onClick={handleClearTokens}
                  className="font-mono text-[9px] text-neutral-500 hover:text-red-400 uppercase tracking-wider flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>RESET</span>
                </button>
              )}
            </div>

            {/* Tokens Display Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 min-h-[36px]">
              {signWordBuffer.length > 0 ? (
                signWordBuffer.map((token, idx) => (
                  <div
                    key={`${token}-${idx}`}
                    className="flex items-center gap-1 bg-brand-gold/15 border border-brand-gold/50 text-brand-gold rounded-lg px-2 py-1 font-mono text-xs font-black shrink-0 animate-in zoom-in-95"
                  >
                    <span>{token}</span>
                    <button
                      onClick={() => handleRemoveSignToken(idx)}
                      className="hover:text-red-400 p-0.5"
                      title="Remove token"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="font-mono text-[10px] text-neutral-500 italic">
                  Sign in front of camera or tap quick signs below to construct sentence...
                </div>
              )}
            </div>

            {/* Quick Kaggle ASL Demo Signs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5 pb-1">
              <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase shrink-0">
                QUICK SIGNS:
              </span>
              {['WATER', 'PLEASE', 'THANK YOU', 'SICK', 'OWIE', 'CALL ON PHONE', 'HELP'].map((word) => (
                <button
                  key={word}
                  onClick={() => handleAddSignToken(word)}
                  className="shrink-0 px-2 py-0.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-brand-gold border border-neutral-800 text-[9px] font-mono font-bold flex items-center gap-0.5 active:scale-95 transition-all"
                >
                  <Plus className="w-2.5 h-2.5 text-brand-gold" />
                  <span>{word}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Action Section: Meaningful Sentence Preview & Send */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex-shrink-0 z-20 space-y-2">
            {meaningfulSentence ? (
              <div className="p-3 rounded-2xl bg-black border border-brand-gold/70 space-y-2 shadow-[0_0_20px_rgba(255,208,0,0.15)]">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[9px] text-brand-gold font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-gold" />
                    <span>SYNTHESIZED MEANINGFUL SENTENCE:</span>
                  </div>
                </div>

                <div className="text-base sm:text-lg font-sans font-black text-white leading-snug">
                  "{meaningfulSentence}"
                </div>

                {/* Alternative suggestion pills */}
                {sentenceSuggestions.length > 1 && (
                  <div className="space-y-1 pt-1 border-t border-neutral-900">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-wider">
                      ALTERNATIVE PHRASING:
                    </span>
                    <div className="flex flex-col gap-1">
                      {sentenceSuggestions.slice(1, 3).map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => setMeaningfulSentence(sug)}
                          className="text-left font-mono text-[10px] text-neutral-400 hover:text-brand-gold truncate transition-colors"
                        >
                          • "{sug}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleConfirmSignMessage}
                  className="mt-1 w-full py-3 px-4 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,208,0,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  <span>SEND TO CONVERSATION</span>
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-center space-y-1">
                <div className="font-mono text-xs text-brand-gold font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  <span>AI CAMERA READY & LISTENING</span>
                </div>
                <p className="font-mono text-[10px] text-neutral-400">
                  Hold hand in frame or tap Quick Signs to construct a meaningful sentence
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK SPEAK FULL-SCREEN / LIVE TRANSCRIPTION INTERFACE */}
      {isSpeakModalOpen && (
        <div className="absolute inset-0 bg-black z-50 flex flex-col justify-between animate-in fade-in duration-200">
          {/* Top Header */}
          <div className="w-full bg-black/95 border-b border-neutral-800 px-4 py-3 flex items-center justify-between flex-shrink-0 z-20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-red-950/80 border border-red-500/50 flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              </div>
              <div>
                <div className="font-mono text-[9px] text-brand-gold font-bold uppercase tracking-wider">
                  VOICE → ACCESSIBLE TEXT
                </div>
                <h2 className="font-sans font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                  SPEECH RECOGNITION
                </h2>
              </div>
            </div>
            <button
              onClick={handleCancelSpeak}
              className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Live Waveform & Real-Time Transcription */}
          <div className="flex-1 w-full p-4 flex flex-col items-center justify-center space-y-6 min-h-0">
            {/* Pulsing Mic Graphic */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500/10 border-2 border-red-500/60 shadow-[0_0_35px_rgba(239,68,68,0.3)] animate-pulse'
                    : 'bg-neutral-900 border border-neutral-800'
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    isListening ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  <Mic className="w-9 h-9" />
                </div>
              </div>
            </div>

            {/* Audio Waveform */}
            <div className="w-full max-w-[280px]">
              <AudioWaveform isActive={isListening} mode="listening" />
            </div>

            {/* Live Transcription Box */}
            <div className="w-full p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-2 min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] font-bold text-brand-gold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                <span>{isListening ? 'LISTENING IN REAL-TIME...' : 'PROCESSING SPEECH...'}</span>
              </div>

              {liveTranscript ? (
                <p className="font-sans font-black text-lg sm:text-xl text-white leading-snug">
                  "{liveTranscript}"
                </p>
              ) : (
                <p className="font-mono text-xs text-neutral-500">
                  Speak clearly into your microphone...
                </p>
              )}
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex-shrink-0 z-20 space-y-2.5">
            {liveTranscript ? (
              <button
                onClick={handleStopAndSendSpeech}
                className="w-full py-3.5 px-4 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,208,0,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>SEND SPOKEN MESSAGE</span>
              </button>
            ) : (
              <button
                onClick={handleCancelSpeak}
                className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono font-bold text-xs uppercase tracking-wider rounded-xl border border-neutral-700 transition-colors"
              >
                CANCEL
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
