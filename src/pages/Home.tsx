import React, { useState } from 'react';
import { ArrowRight, MessageSquare, HelpCircle, Settings, X, Sparkles } from 'lucide-react';
import { ArchitecturePipeline } from '../components/ArchitecturePipeline';

interface HomeProps {
  onSelectSign: () => void;
  onSelectSpeak: () => void;
  onSelectConversation: () => void;
  onSelectHelp: () => void;
  onSettings?: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectSign,
  onSelectSpeak,
  onSelectConversation,
  onSelectHelp,
  onSettings,
}) => {
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative overflow-y-auto">
      {/* Subtle Ambient Background Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />

      {/* Top Header Status */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-neutral-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center text-black font-mono font-black text-sm shadow-[0_0_12px_rgba(255,208,0,0.4)]">
            S
          </div>
          <div>
            <span className="font-sans font-black tracking-wider text-base text-white leading-none uppercase">
              SIGNIFY
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-0.5 bg-neutral-900 text-brand-gold border border-brand-gold/60 rounded-full font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>AI READY</span>
          </div>

          {onSettings && (
            <button
              onClick={onSettings}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-black hover:bg-brand-gold transition-colors"
              title="Settings"
              aria-label="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 my-auto py-3 space-y-4">
        <div>
          <div className="font-mono text-[10px] font-bold text-brand-gold tracking-widest uppercase mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-brand-gold fill-brand-gold" />
            <span>TWO-WAY AI COMMUNICATION</span>
          </div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-[1.05] uppercase">
            Turn signs into<br />
            <span className="text-brand-gold">conversations.</span>
          </h1>
          <p className="font-sans text-xs text-neutral-400 mt-1.5 leading-relaxed">
            Communicate naturally with sign language, text and speech.
          </p>
        </div>

        {/* TWO DOMINANT ACTION CARDS */}
        <div className="space-y-3">
          {/* CARD 1: SIGN */}
          <button
            onClick={onSelectSign}
            className="w-full text-left p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-brand-gold/50 hover:border-brand-gold hover:shadow-[0_0_20px_rgba(255,208,0,0.25)] transition-all active:scale-[0.99] group relative overflow-hidden"
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-brand-gold" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-brand-gold" />

            <div className="flex items-start justify-between mb-2">
              <div className="text-3xl sm:text-4xl">🤟</div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/40 font-bold uppercase">
                FORWARD
              </span>
            </div>

            <h2 className="font-sans font-black text-2xl text-white tracking-wide uppercase">
              SIGN
            </h2>
            <p className="font-mono text-xs text-neutral-400 mt-0.5">
              Gesture → Voice
            </p>

            <div className="mt-3.5 pt-2.5 border-t border-neutral-900 flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-brand-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>START SIGNING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[9px] text-neutral-500">CAMERA VISION</span>
            </div>
          </button>

          {/* CARD 2: SPEAK */}
          <button
            onClick={onSelectSpeak}
            className="w-full text-left p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-brand-gold/50 hover:border-brand-gold hover:shadow-[0_0_20px_rgba(255,208,0,0.25)] transition-all active:scale-[0.99] group relative overflow-hidden"
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-brand-gold" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-brand-gold" />

            <div className="flex items-start justify-between mb-2">
              <div className="text-3xl sm:text-4xl">🎤</div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/40 font-bold uppercase">
                REVERSE
              </span>
            </div>

            <h2 className="font-sans font-black text-2xl text-white tracking-wide uppercase">
              SPEAK
            </h2>
            <p className="font-mono text-xs text-neutral-400 mt-0.5">
              Voice → Text
            </p>

            <div className="mt-3.5 pt-2.5 border-t border-neutral-900 flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-brand-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>START SPEAKING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[9px] text-neutral-500">VOICE RECOGNITION</span>
            </div>
          </button>
        </div>

        {/* Compact Visual Architecture Pipeline */}
        <div className="pt-1">
          <ArchitecturePipeline
            compact={true}
            onOpenFullModal={() => setIsArchitectureModalOpen(true)}
          />
        </div>
      </div>

      {/* Bottom Secondary Action Entries */}
      <div className="relative z-10 pt-2 space-y-2">
        <button
          onClick={onSelectConversation}
          className="w-full py-3 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-between transition-all shadow-[0_0_15px_rgba(255,208,0,0.3)] active:translate-x-0.5 active:translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-black" />
            <span>LIVE CONVERSATION MODE</span>
          </span>
          <ArrowRight className="w-4 h-4 text-black" />
        </button>

        <button
          onClick={onSelectHelp}
          className="w-full py-1.5 px-3 rounded-lg text-neutral-400 hover:text-white font-mono text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <HelpCircle className="w-3 h-3 text-brand-gold" />
          <span>URGENT SITUATIONS? <strong className="text-brand-gold underline ml-1">🆘 QUICK HELP</strong></span>
        </button>
      </div>

      {/* Full Architecture Modal */}
      {isArchitectureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg max-h-[90vh] bg-neutral-950 border border-brand-gold/60 rounded-3xl p-5 overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <div>
                <div className="font-mono text-[10px] text-brand-gold font-bold uppercase">
                  SYSTEM ARCHITECTURE
                </div>
                <h2 className="font-sans font-black text-lg text-white uppercase">
                  How Signify Works
                </h2>
              </div>
              <button
                onClick={() => setIsArchitectureModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-black hover:bg-brand-gold flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ArchitecturePipeline compact={false} />
          </div>
        </div>
      )}

    </div>
  );
};
