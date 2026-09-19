import React from 'react';
import { TechLabel, CornerBrackets, YellowCornerBracket, Crosshair } from './TechnicalDecoration';
import { Cpu, Smartphone, Sparkles, RefreshCw } from 'lucide-react';

interface DesktopEditorialLayoutProps {
  children: React.ReactNode;
  activeScenarioId?: string;
  onSelectScenarioShortcut?: (scenarioId: string) => void;
  onTriggerUncertainShortcut?: () => void;
  onResetFlow?: () => void;
  currentScreenName?: string;
}

export const DesktopEditorialLayout: React.FC<DesktopEditorialLayoutProps> = ({
  children,
  activeScenarioId = 'hospital',
  onSelectScenarioShortcut,
  onTriggerUncertainShortcut,
  onResetFlow,
  currentScreenName
}) => {
  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden flex flex-col justify-between selection:bg-brand-yellow selection:text-black">
      {/* Subtle Background Tech Grid & Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
      
      {/* Top Global Navigation Bar - Sleek & Refined */}
      <header className="relative z-30 w-full border-b border-neutral-800/80 bg-black/80 backdrop-blur-md px-4 lg:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-brand-yellow flex items-center justify-center shadow-[0_0_10px_rgba(255,208,0,0.5)]">
            <span className="font-display text-black text-xs font-black">S</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-black tracking-widest text-xs sm:text-sm text-white">SIGNIFY</span>
            <span className="text-neutral-600 text-xs font-mono">//</span>
            <span className="font-mono text-[11px] font-bold text-neutral-300 uppercase">
              AI COMMUNICATION ASSISTANT
            </span>
          </div>
          <span className="hidden sm:inline-block px-1.5 py-0.2 bg-brand-yellow text-black font-mono text-[8px] font-black uppercase tracking-wider">
            ACCESSIBILITY AI
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span className="font-semibold text-neutral-300 text-[10px]">ON-DEVICE NPU READY</span>
          </div>
          {onResetFlow && (
            <button
              onClick={onResetFlow}
              className="px-2 py-1 border border-neutral-700/80 bg-neutral-900/90 hover:bg-brand-yellow hover:text-black text-neutral-300 text-[9px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Reset Demo to Intro / Home"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESET DEMO</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Responsive Grid Layout - Phone Centric Stage */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* LEFT COLUMN: Compact Technical HUD Sidebar (Supportive, Not Dominating) */}
        <div className="hidden lg:flex flex-col justify-between w-[290px] xl:w-[320px] h-[860px] py-2 select-none">
          <div className="space-y-4">
            {/* Tagline */}
            <div className="flex items-center gap-2">
              <TechLabel number="01" text="VISION" yellowDot />
              <span className="text-neutral-700 text-xs">/</span>
              <TechLabel number="02" text="AI" />
              <span className="text-neutral-700 text-xs">/</span>
              <TechLabel number="03" text="VOICE" />
            </div>

            {/* Refined, Elegant Heading (Proportional to Phone) */}
            <div>
              <h1 className="font-display font-black text-3xl xl:text-4xl leading-[0.95] tracking-tight text-white uppercase mb-2">
                SPEAK<br />
                <span className="text-neutral-400">WITH YOUR</span><br />
                <span className="relative inline-block text-white">
                  HANDS.
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-yellow -z-10 shadow-[0_0_8px_rgba(255,208,0,0.6)]" />
                </span>
              </h1>

              <p className="font-mono text-[11px] leading-relaxed text-neutral-400">
                Phone-first on-device AI translating sign language to real-time speech and reverse spoken audio to visual text.
              </p>
            </div>

            {/* Compact 3-Step Flow Card */}
            <div className="border border-neutral-800 bg-neutral-950/80 p-3 relative rounded-none backdrop-blur-sm">
              <YellowCornerBracket position="top-right" />
              <div className="font-mono text-[9px] font-bold text-neutral-400 mb-2 flex items-center justify-between">
                <span>PIPELINE</span>
                <span className="text-black bg-brand-yellow px-1 text-[8px] font-black">REAL-TIME</span>
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-3.5 h-3.5 bg-neutral-900 border border-brand-yellow text-brand-yellow flex items-center justify-center font-bold text-[8px]">1</span>
                  <span className="truncate">CAMERA 21-PT SKELETON</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-3.5 h-3.5 bg-neutral-900 border border-brand-yellow text-brand-yellow flex items-center justify-center font-bold text-[8px]">2</span>
                  <span className="truncate">CONFIDENCE GATING (&gt;75%)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-3.5 h-3.5 bg-neutral-900 border border-brand-yellow text-brand-yellow flex items-center justify-center font-bold text-[8px]">3</span>
                  <span className="truncate">SYNTHESIS &amp; DUAL SPEAKERS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Judge Demo Selector Shortcuts - Compact & Sleek */}
          <div className="border-t border-neutral-800/90 pt-3 space-y-2">
            <div className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>JUDGE SHORTCUTS</span>
              <span className="text-[8px] text-neutral-600">SCENARIOS</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => onSelectScenarioShortcut?.('hospital')}
                className={`px-1.5 py-1.5 text-left font-mono text-[9px] border transition-all ${
                  activeScenarioId === 'hospital'
                    ? 'border-brand-yellow bg-brand-yellow text-black font-black shadow-[0_0_12px_rgba(255,208,0,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/90 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <div className="text-[7px] opacity-60">01</div>
                <div className="font-bold truncate">HOSPITAL</div>
              </button>

              <button
                onClick={() => onSelectScenarioShortcut?.('emergency')}
                className={`px-1.5 py-1.5 text-left font-mono text-[9px] border transition-all ${
                  activeScenarioId === 'emergency'
                    ? 'border-brand-yellow bg-brand-yellow text-black font-black shadow-[0_0_12px_rgba(255,208,0,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/90 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <div className="text-[7px] opacity-60">02</div>
                <div className="font-bold truncate">EMERGENCY</div>
              </button>

              <button
                onClick={() => onSelectScenarioShortcut?.('daily')}
                className={`px-1.5 py-1.5 text-left font-mono text-[9px] border transition-all ${
                  activeScenarioId === 'daily'
                    ? 'border-brand-yellow bg-brand-yellow text-black font-black shadow-[0_0_12px_rgba(255,208,0,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/90 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <div className="text-[7px] opacity-60">03</div>
                <div className="font-bold truncate">DAILY</div>
              </button>
            </div>

            <button
              onClick={() => onTriggerUncertainShortcut?.()}
              className="w-full px-2 py-1.5 border border-dashed border-amber-600/60 bg-amber-950/30 hover:bg-amber-950/60 text-amber-200 font-mono text-[9px] font-bold flex items-center justify-between transition-colors"
              title="Test intentional AI low-confidence state handling"
            >
              <span>TRIGGER UNCERTAINTY (58%)</span>
              <span className="px-1 bg-amber-500 text-black text-[7px] font-black">SAFETY TEST</span>
            </button>
          </div>

          {/* Bottom Device Badges */}
          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3 h-3 text-brand-yellow" />
              <span>TARGET: <strong className="text-white">iQOO 15</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-brand-yellow" />
              <span>LOCAL NPU</span>
            </div>
          </div>
        </div>

        {/* CENTER STAGE: THE HERO iQOO 15 SMARTPHONE (COMMANDING VISUAL FOCUS) */}
        <div className="w-full flex-1 flex justify-center items-center relative">
          {/* Subtle Ambient Radial Glow & Crosshairs framing the Phone */}
          <div className="hidden lg:block absolute -top-4 left-6 pointer-events-none opacity-30 text-neutral-600 font-mono text-[9px]">
            + [3D_HERO_STAGE]
          </div>
          <div className="hidden lg:block absolute -bottom-4 right-6 pointer-events-none opacity-30 text-neutral-600 font-mono text-[9px]">
            iQOO_15_PROTOTYPE_VIEW // 1080x2400 +
          </div>

          {children}
        </div>

        {/* RIGHT COLUMN: Ultra-Compact Technical HUD (Minimal & Futuristic) */}
        <div className="hidden xl:flex flex-col justify-between w-[200px] h-[860px] py-2 select-none font-mono text-xs">
          <div className="space-y-3">
            <div className="border border-neutral-800 bg-neutral-950/80 p-3 relative backdrop-blur-sm">
              <CornerBrackets size="w-2 h-2" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8px] font-black uppercase text-black bg-brand-yellow px-1">
                  SYS TELEMETRY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              </div>
              <div className="space-y-1.5 text-[9px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">INFERENCE:</span>
                  <span className="font-bold text-neutral-200">18ms (NPU)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ACCURACY:</span>
                  <span className="font-bold text-brand-yellow">94.8% AVG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">GATE:</span>
                  <span className="font-bold text-neutral-200">75.0% SAFE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">LATENCY:</span>
                  <span className="font-bold text-green-400">&lt;25ms</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 border border-neutral-800/80 bg-neutral-900/40 text-[9px]">
              <div className="font-bold text-neutral-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-brand-yellow fill-brand-yellow" />
                <span>STATE</span>
              </div>
              <div className="text-white uppercase font-black tracking-wider text-[11px] truncate">
                {currentScreenName || 'ACTIVE'}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-[9px] text-neutral-500 border-t border-neutral-900 pt-2">
            <div className="flex items-center gap-1 text-neutral-400">
              <Crosshair />
              <span>AMOLED 1.5K 144Hz</span>
            </div>
            <div className="text-brand-yellow font-bold text-[10px]">CORE VISION AI</div>
          </div>
        </div>

      </main>

      {/* Global Footer Minimalist Technical Line */}
      <footer className="relative z-20 w-full border-t border-neutral-900 bg-black px-4 lg:px-8 py-2 flex items-center justify-between text-[9px] font-mono text-neutral-500">
        <div className="flex items-center gap-3">
          <span>SIGNIFY v0.1</span>
          <span>•</span>
          <span className="text-neutral-400 font-semibold">HONEST AI: DETERMINISTIC PROTOTYPE MODE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>ACCESSIBILITY TECHNOLOGY</span>
        </div>
      </footer>
    </div>
  );
};
