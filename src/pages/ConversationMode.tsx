import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Camera, Trash2, X, Check, Mic } from 'lucide-react';
import { speechService } from '../services/speechService';
import { recognitionService } from '../services/recognitionService';
import { sentenceBuilder } from '../services/sentenceBuilderService';
import { CameraPreview } from '../components/CameraPreview';
import { AudioWaveform } from '../components/AudioWaveform';

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
  
  // Quick Sign modal state
  const [isSignModalOpen, setIsSignModalOpen] = useState<boolean>(false);
  const [signStatus, setSignStatus] = useState<'scanning' | 'detected'>('scanning');
  const [detectedSign, setDetectedSign] = useState<{ sign: string; text: string; confidence: number } | null>(null);

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

  // Quick Sign Trigger
  const handleOpenSignModal = () => {
    setIsSignModalOpen(true);
    setSignStatus('scanning');
    setDetectedSign(null);

    setTimeout(async () => {
      const res = await recognitionService.recognizeSign();
      const sentenceResult = sentenceBuilder.buildSentence([res.word]);
      setDetectedSign({
        sign: res.word,
        text: sentenceResult.primary || res.text,
        confidence: res.confidence,
      });
      setSignStatus('detected');
    }, 700);
  };

  const handleConfirmSignMessage = () => {
    if (detectedSign) {
      onAddMessage('signer', detectedSign.text, detectedSign.sign);
      setIsSignModalOpen(false);
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
                        <span className="text-[9px] bg-brand-gold/15 text-brand-gold px-1.5 py-0.2 rounded border border-brand-gold/30">
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

      {/* QUICK SIGN FULL-SCREEN INTERFACE (Immersive Phone Screen) */}
      {isSignModalOpen && (
        <div className="absolute inset-0 bg-black z-50 flex flex-col justify-between animate-in fade-in duration-200">
          {/* Top Bar Header */}
          <div className="w-full bg-black/95 border-b border-neutral-800 px-4 py-3 flex items-center justify-between flex-shrink-0 z-20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-brand-gold" />
              </div>
              <div>
                <div className="font-mono text-[9px] text-brand-gold font-bold uppercase tracking-wider">
                  TWO-WAY BRIDGE
                </div>
                <h2 className="font-sans font-black text-xs sm:text-sm text-white uppercase tracking-wide">
                  QUICK SIGN TRANSLATION
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

          {/* Full Screen Immersive Camera Preview */}
          <div className="flex-1 w-full p-3 flex flex-col min-h-0 relative">
            <CameraPreview
              isScanning={signStatus === 'scanning'}
              currentSign={detectedSign?.sign}
              confidence={detectedSign?.confidence}
              statusText={
                signStatus === 'scanning'
                  ? 'DETECTING SIGN...'
                  : `✓ DETECTED: ${detectedSign?.sign}`
              }
              className="w-full h-full flex-1 rounded-2xl overflow-hidden"
            />
          </div>

          {/* Bottom Action Section */}
          <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex-shrink-0 z-20 space-y-3">
            {detectedSign ? (
              <div className="p-3.5 rounded-2xl bg-black border border-brand-gold/70 text-center space-y-1.5 shadow-[0_0_20px_rgba(255,208,0,0.15)]">
                <div className="font-mono text-[9px] text-brand-gold font-bold uppercase tracking-wider">
                  RECOGNIZED SIGN:
                </div>
                <div className="text-xl font-sans font-black text-white">
                  "{detectedSign.text}"
                </div>
                <button
                  onClick={handleConfirmSignMessage}
                  className="mt-2 w-full py-3 px-4 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,208,0,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  <span>SEND TO CONVERSATION</span>
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-center space-y-1">
                <div className="font-mono text-xs text-brand-gold font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  <span>ANALYZING GESTURE IN REAL-TIME</span>
                </div>
                <p className="font-mono text-[10px] text-neutral-400">
                  Hold hand steady inside frame to trigger Kaggle ASL recognition
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
