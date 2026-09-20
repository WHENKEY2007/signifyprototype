import React from 'react';
import { RefreshCw, ArrowRight, Sparkles, Smartphone, Cpu } from 'lucide-react';
import { DEMO_SIGNS } from '../services/recognitionService';

interface DesktopEditorialLayoutProps {
  children: React.ReactNode;
  activeScreen?: string;
  onNavigateTab?: (tab: 'home' | 'sign' | 'conversation' | 'help') => void;
  onSelectDemoSign?: (signKey: string) => void;
  onTriggerUncertain?: () => void;
  onResetDemo?: () => void;
}

export const DesktopEditorialLayout: React.FC<DesktopEditorialLayoutProps> = ({
  children,
  activeScreen = 'HOME',
  onNavigateTab,
  onSelectDemoSign,
  onTriggerUncertain,
  onResetDemo,
}) => {
  const demoSignKeys = Object.keys(DEMO_SIGNS);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden flex flex-col justify-between selection:bg-brand-gold selection:text-black">
      {/* Subtle Background Tech Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-30 w-full border-b border-neutral-800 bg-black/90 backdrop-blur-md px-4 lg:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-brand-gold flex items-center justify-center text-black font-mono font-black text-xs shadow-[0_0_12px_rgba(255,208,0,0.5)]">
            S
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans font-black tracking-widest text-xs sm:text-sm text-white">SIGNIFY</span>
            <span className="text-neutral-600 text-xs font-mono">//</span>
            <span className="font-mono text-[11px] font-bold text-neutral-300 uppercase">
              TWO-WAY AI COMMUNICATION ASSISTANT
            </span>
          </div>
          <span className="hidden sm:inline-block px-1.5 py-0.2 bg-brand-gold text-black font-mono text-[8px] font-black uppercase tracking-wider">
            ACCESSIBILITY AI
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse shadow-[0_0_8px_#FFD000]" />
            <span className="font-semibold text-brand-gold text-[10px]">ON-DEVICE AI READY</span>
          </div>

          {onResetDemo && (
            <button
              onClick={onResetDemo}
              className="px-2.5 py-1 rounded border border-neutral-700 bg-neutral-900 hover:bg-brand-gold hover:text-black text-neutral-300 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Reset Demo Flow"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESET DEMO</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Responsive Layout */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* LEFT COLUMN: Black + Gold Technical HUD matching reference */}
        <div className="hidden lg:flex flex-col justify-between w-[300px] xl:w-[320px] h-[840px] py-2 select-none font-mono">
          <div className="space-y-4">
            {/* Tagline Ribbon */}
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="text-brand-gold">● [01] VISION</span>
              <span className="text-neutral-700">/</span>
              <span className="text-brand-gold">[02] AI</span>
              <span className="text-neutral-700">/</span>
              <span className="text-brand-gold">[03] VOICE</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="font-sans font-black text-3xl xl:text-4xl leading-[0.95] tracking-tight text-white uppercase mb-2">
                SPEAK<br />
                <span className="text-neutral-400">WITH YOUR</span><br />
                <span className="relative inline-block text-white">
                  HANDS.
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-gold -z-10 shadow-[0_0_10px_rgba(255,208,0,0.6)]" />
                </span>
              </h1>

              <p className="font-sans text-[11px] leading-relaxed text-neutral-400 font-normal">
                Phone-first on-device AI translating sign language to real-time speech and reverse spoken audio to visual text.
              </p>
            </div>

            {/* Compact Pipeline Card */}
            <div className="border border-neutral-800 bg-neutral-950 p-3.5 relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-gold" />
              <div className="font-mono text-[9px] font-bold text-neutral-400 mb-2 flex items-center justify-between">
                <span>PIPELINE</span>
                <span className="text-black bg-brand-gold px-1 text-[8px] font-black">REAL-TIME</span>
              </div>
              <div className="space-y-2 text-[10px]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">1</span>
                  <span className="truncate">CAMERA 21-PT SKELETON</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">2</span>
                  <span className="truncate">CONFIDENCE GATING (≥75%)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">3</span>
                  <span className="truncate">SYNTHESIS &amp; DUAL SPEAKERS</span>
                </div>
              </div>
            </div>

            {/* Judge Demo Selector Shortcuts */}
            <div className="border-t border-neutral-800 pt-3 space-y-2">
              <div className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                <span>JUDGE SHORTCUTS</span>
                <span className="text-[8px] text-brand-gold font-bold">DEMO SIGNS</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {demoSignKeys.slice(0, 3).map((sign, idx) => (
                  <button
                    key={sign}
                    onClick={() => onSelectDemoSign?.(sign)}
                    className="px-1.5 py-2 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                  >
                    <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">0{idx + 1}</div>
                    <div className="font-bold truncate">{sign}</div>
                  </button>
                ))}
              </div>

              {onTriggerUncertain && (
                <button
                  onClick={onTriggerUncertain}
                  className="w-full px-2 py-2 border border-dashed border-amber-600/70 bg-amber-950/30 hover:bg-amber-950/60 text-amber-200 font-mono text-[9px] font-bold flex items-center justify-between transition-colors"
                  title="Test low-confidence safety handling"
                >
                  <span>TRIGGER UNCERTAINTY (48%)</span>
                  <span className="px-1 bg-brand-gold text-black text-[7px] font-black">SAFETY TEST</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Device Badges */}
          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3 h-3 text-brand-gold" />
              <span>TARGET: <strong className="text-white">iQOO 15</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-brand-gold" />
              <span>LOCAL NPU</span>
            </div>
          </div>
        </div>

        {/* CENTER STAGE: PHONE PROTOTYPE WITH 3D HUD LABELS */}
        <div className="w-full flex-1 flex justify-center items-center relative">
          {/* 3D Floating HUD Markers framing the Phone (Desktop Only) */}
          <div className="hidden lg:flex absolute -left-12 top-1/4 flex-col gap-1 text-[8px] font-mono text-neutral-500 uppercase select-none pointer-events-none">
            <span className="text-brand-gold font-black">ALT: +14mm</span>
            <span className="w-8 h-[1px] bg-neutral-700" />
            <span>3D LEVITATION</span>
          </div>

          <div className="hidden lg:flex absolute -right-12 top-1/3 flex-col items-end gap-1 text-[8px] font-mono text-neutral-500 uppercase select-none pointer-events-none">
            <span className="text-white font-bold">iQOO 15</span>
            <span className="w-8 h-[1px] bg-brand-gold/60" />
            <span className="text-brand-gold">FLAGSHIP CHASSIS</span>
          </div>

          {children}
        </div>

        {/* RIGHT COLUMN: Technical Telemetry HUD matching reference */}
        <div className="hidden xl:flex flex-col justify-between w-[220px] h-[840px] py-2 select-none font-mono text-xs">
          <div className="space-y-3">
            {/* System Telemetry Box */}
            <div className="border border-neutral-800 bg-neutral-950 p-3.5 relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-gold" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8px] font-black uppercase text-black bg-brand-gold px-1">
                  SYS TELEMETRY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
              </div>
              <div className="space-y-1.5 text-[9px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">INFERENCE:</span>
                  <span className="font-bold text-neutral-200">18ms (NPU)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ACCURACY:</span>
                  <span className="font-bold text-brand-gold">96.2% AVG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">GATE:</span>
                  <span className="font-bold text-neutral-200">75.0% SAFE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">LATENCY:</span>
                  <span className="font-bold text-brand-gold">&lt;25ms</span>
                </div>
              </div>
            </div>

            {/* Current State Indicator */}
            <div className="p-2.5 border border-neutral-800 bg-neutral-950 text-[9px]">
              <div className="font-bold text-neutral-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-brand-gold fill-brand-gold" />
                <span>STATE</span>
              </div>
              <div className="text-white uppercase font-black tracking-wider text-[11px] truncate">
                {activeScreen || 'ACTIVE'}
              </div>
            </div>

            {/* Navigation Mode Jumps */}
            <div className="border border-neutral-800 bg-neutral-950 p-3 space-y-1.5">
              <span className="text-[8px] font-black uppercase text-brand-gold">MODES</span>
              <div className="space-y-1 text-[10px]">
                <button
                  onClick={() => onNavigateTab?.('home')}
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between transition-colors ${
                    activeScreen === 'HOME'
                      ? 'bg-brand-gold text-black font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>1. HOME</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => onNavigateTab?.('sign')}
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between transition-colors ${
                    activeScreen === 'SIGN'
                      ? 'bg-brand-gold text-black font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>2. SIGN MODE</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => onNavigateTab?.('conversation')}
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between transition-colors ${
                    activeScreen === 'CONVERSATION'
                      ? 'bg-brand-gold text-black font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>3. CONVERSATION</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => onNavigateTab?.('help')}
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between transition-colors ${
                    activeScreen === 'HELP'
                      ? 'bg-brand-gold text-black font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>4. QUICK HELP</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-neutral-500 border-t border-neutral-900 pt-2 flex items-center justify-between">
            <span>AMOLED 1.5K 144Hz</span>
            <span className="text-brand-gold font-bold">iQOO 15</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full border-t border-neutral-900 bg-black px-4 lg:px-8 py-2 flex items-center justify-between text-[9px] font-mono text-neutral-500">
        <div className="flex items-center gap-3">
          <span>SIGNIFY v0.2</span>
          <span>•</span>
          <span className="text-neutral-400 font-semibold">ON-DEVICE ACCESSIBILITY AI</span>
        </div>
        <div className="flex items-center gap-2">
          <span>FLAGSHIP HARDWARE OPTIMIZED</span>
        </div>
      </footer>
    </div>
  );
};
