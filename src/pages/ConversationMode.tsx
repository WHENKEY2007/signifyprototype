import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Camera, Trash2, X, Check } from 'lucide-react';
import { speechService } from '../services/speechService';
import { recognitionService } from '../services/recognitionService';
import { sentenceBuilder } from '../services/sentenceBuilderService';
import { CameraPreview } from '../components/CameraPreview';

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
}

export const ConversationMode: React.FC<ConversationModeProps> = ({
  messages,
  onAddMessage,
  onClearConversation,
}) => {
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  
  // Quick Sign modal state
  const [isSignModalOpen, setIsSignModalOpen] = useState<boolean>(false);
  const [signStatus, setSignStatus] = useState<'scanning' | 'detected'>('scanning');
  const [detectedSign, setDetectedSign] = useState<{ sign: string; text: string; confidence: number } | null>(null);

  // Quick Speak state
  const [isListening, setIsListening] = useState<boolean>(false);

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

  // Quick Speak Trigger
  const handleStartSpeak = () => {
    setIsListening(true);
    speechService.startListening(
      (text) => {
        onAddMessage('speaker', text);
        setIsListening(false);
      },
      () => setIsListening(true),
      () => setIsListening(false)
    );
  };

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between select-none relative overflow-y-auto">
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
            onClick={handleStartSpeak}
            className={`p-3.5 rounded-2xl font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] border ${
              isListening
                ? 'bg-red-600 text-white border-red-500 animate-pulse'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white border-brand-gold/60 text-brand-gold'
            }`}
          >
            <span className="text-lg">🎤</span>
            <span>{isListening ? 'LISTENING...' : 'SPEAK'}</span>
          </button>
        </div>
      </div>

      {/* QUICK SIGN MODAL SHEET */}
      {isSignModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex flex-col justify-end p-3 animate-in fade-in duration-200">
          <div className="bg-neutral-950 border border-brand-gold/70 rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2 font-mono font-black text-xs text-brand-gold uppercase tracking-wider">
                <Camera className="w-4 h-4 text-brand-gold" />
                <span>QUICK SIGN TRANSLATION</span>
              </div>
              <button
                onClick={() => setIsSignModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Compact Camera Preview */}
            <CameraPreview
              isScanning={signStatus === 'scanning'}
              currentSign={detectedSign?.sign}
              confidence={detectedSign?.confidence}
              statusText={
                signStatus === 'scanning'
                  ? 'DETECTING SIGN...'
                  : `✓ DETECTED: ${detectedSign?.sign}`
              }
              className="h-44"
            />

            {detectedSign ? (
              <div className="p-3 rounded-xl bg-black border border-brand-gold/60 text-center">
                <div className="font-mono text-[9px] text-brand-gold font-bold uppercase">
                  RECOGNIZED SIGN:
                </div>
                <div className="text-xl font-sans font-black text-white mt-0.5">
                  "{detectedSign.text}"
                </div>
                <button
                  onClick={handleConfirmSignMessage}
                  className="mt-3 w-full py-2.5 px-4 bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_12px_rgba(255,208,0,0.3)] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4 text-black" />
                  <span>SEND TO CONVERSATION</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-2 font-mono text-xs text-neutral-400">
                Hold gesture inside frame to translate...
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
