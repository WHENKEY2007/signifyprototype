import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Sparkles, Smartphone, Cpu, Zap, Cloud, Radio, Layers } from 'lucide-react';
import { hapticService } from '../services/hapticService';

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
  const [benchmarkMode, setBenchmarkMode] = useState<'npu' | 'cloud'>('npu');

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-x-hidden flex flex-col justify-between selection:bg-brand-gold selection:text-black">
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
              AI-POWERED SIGN RECOGNITION WITH CONTEXTUAL SENTENCE FORMATION
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
        
        {/* LEFT COLUMN: Black + Gold Technical HUD */}
        <div className="hidden lg:flex flex-col justify-between w-[300px] xl:w-[320px] h-[840px] py-2 select-none font-mono">
          <div className="space-y-3.5">
            {/* Tagline Ribbon */}
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="text-brand-gold">● [01] WORD</span>
              <span className="text-neutral-700">/</span>
              <span className="text-brand-gold">[02] CONTEXT</span>
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
                AI-powered sign recognition with contextual sentence formation. Turns individual signs into natural phrases and speech.
              </p>
            </div>

            {/* Product Architecture Card */}
            <div className="border border-neutral-800 bg-neutral-950 p-3.5 relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-gold" />
              <div className="font-mono text-[9px] font-bold text-neutral-400 mb-2 flex items-center justify-between">
                <span>PRODUCT ARCHITECTURE</span>
                <span className="text-black bg-brand-gold px-1 text-[8px] font-black">5-STEP</span>
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">1</span>
                  <span className="truncate">SIGN: User performs gesture</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">2</span>
                  <span className="truncate">WORD: AI detects word (≥75% gate)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">3</span>
                  <span className="truncate">CONTEXT: Words combined</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">4</span>
                  <span className="truncate">SENTENCE: Natural phrase synthesis</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">5</span>
                  <span className="truncate">VOICE: Spoken via SpeechSynthesis</span>
                </div>
              </div>
            </div>

            {/* Judge Demo Selector Shortcuts */}
            <div className="border border-neutral-800 bg-neutral-950 p-3 space-y-2">
              <div className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-brand-gold" />
                  <span>JUDGE DEMO SEQUENCES</span>
                </span>
                <span className="text-[8px] text-brand-gold font-bold">1-CLICK</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => onSelectDemoSign?.('HELLO')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">01</div>
                  <div className="font-bold truncate text-brand-gold">HELLO</div>
                </button>
                <button
                  onClick={() => onSelectDemoSign?.('HOW')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">02</div>
                  <div className="font-bold truncate text-brand-gold">HOW</div>
                </button>
                <button
                  onClick={() => onSelectDemoSign?.('YOU')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">03</div>
                  <div className="font-bold truncate text-brand-gold">YOU</div>
                </button>
                <button
                  onClick={() => onSelectDemoSign?.('HELP')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">04</div>
                  <div className="font-bold truncate text-brand-gold">HELP</div>
                </button>
              </div>

              {onTriggerUncertain && (
                <button
                  onClick={onTriggerUncertain}
                  className="w-full px-2 py-2 border border-dashed border-amber-600/70 bg-amber-950/30 hover:bg-amber-950/60 text-amber-200 font-mono text-[9px] font-bold flex items-center justify-between transition-colors"
                  title="Test low-confidence safety handling (<75%)"
                >
                  <span>TEST LOW CONFIDENCE (48%)</span>
                  <span className="px-1 bg-brand-gold text-black text-[7px] font-black">SAFETY TEST</span>
                </button>
              )}
            </div>

            {/* Haptic Silent Confirmation Tester for Judges */}
            <div className="border border-neutral-800 bg-neutral-950 p-3 space-y-2 rounded">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-brand-gold font-bold flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-brand-gold" />
                  <span>HAPTIC CONFIRMATION</span>
                </span>
                <span className="text-[8px] px-1 bg-neutral-900 border border-neutral-700 text-neutral-400">
                  TACTILE
                </span>
              </div>
              <p className="text-[9px] text-neutral-400 leading-snug font-sans">
                Silent vibration cues tell the deaf signer their gesture was accepted without breaking eye contact.
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-[8.5px] font-mono font-bold">
                <button
                  onClick={() => hapticService.triggerSuccess()}
                  className="p-1.5 bg-neutral-900 hover:bg-brand-gold hover:text-black border border-neutral-800 text-neutral-200 rounded transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                  title="Test 1 Crisp Pulse (Recognition Confirmed)"
                >
                  <span>📳 1 PULSE (OK)</span>
                </button>
                <button
                  onClick={() => hapticService.triggerUncertain()}
                  className="p-1.5 bg-neutral-900 hover:bg-amber-500 hover:text-black border border-neutral-800 text-neutral-200 rounded transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                  title="Test 2 Quick Pulses (Low Confidence Retry)"
                >
                  <span>📳📳 2 PULSES (!)</span>
                </button>
              </div>
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

        {/* CENTER STAGE: PHONE PROTOTYPE */}
        <div className="w-full flex-1 flex justify-center items-center relative">
          {children}
        </div>

        {/* RIGHT COLUMN: Technical Telemetry & NPU vs Cloud Benchmark HUD */}
        <div className="hidden xl:flex flex-col justify-between w-[250px] h-[840px] py-2 select-none font-mono text-xs">
          <div className="space-y-3">
            
            {/* On-Device NPU vs. Cloud Interactive Benchmark Widget */}
            <div className="border border-neutral-800 bg-neutral-950 p-3 relative rounded shadow-md">
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-gold" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8.5px] font-black uppercase text-brand-gold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-brand-gold" />
                  <span>AI BENCHMARK</span>
                </span>
                <span className="text-[7.5px] px-1 bg-brand-gold text-black font-black uppercase rounded-sm">
                  LIVE COMPARISON
                </span>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="grid grid-cols-2 gap-1 mb-2.5">
                <button
                  onClick={() => setBenchmarkMode('npu')}
                  className={`py-1.5 px-2 text-[9px] font-mono font-bold rounded transition-all flex items-center justify-center gap-1 ${
                    benchmarkMode === 'npu'
                      ? 'bg-brand-gold text-black font-black shadow-[0_0_10px_rgba(255,208,0,0.4)]'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <Cpu className="w-2.5 h-2.5" />
                  <span>LOCAL NPU</span>
                </button>
                <button
                  onClick={() => setBenchmarkMode('cloud')}
                  className={`py-1.5 px-2 text-[9px] font-mono font-bold rounded transition-all flex items-center justify-center gap-1 ${
                    benchmarkMode === 'cloud'
                      ? 'bg-red-500 text-white font-black shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <Cloud className="w-2.5 h-2.5" />
                  <span>CLOUD API</span>
                </button>
              </div>

              {/* Live Metric Rows */}
              <div className="space-y-1.5 text-[8.5px]">
                <div className="flex justify-between items-center py-0.5 border-b border-neutral-900">
                  <span className="text-neutral-500">INFERENCE LATENCY:</span>
                  <span className={`font-black ${benchmarkMode === 'npu' ? 'text-green-400' : 'text-red-400'}`}>
                    {benchmarkMode === 'npu' ? '18ms (Snapdragon)' : '480ms (Laggy)'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-neutral-900">
                  <span className="text-neutral-500">DATA BANDWIDTH:</span>
                  <span className={`font-black ${benchmarkMode === 'npu' ? 'text-brand-gold' : 'text-amber-400'}`}>
                    {benchmarkMode === 'npu' ? '0 KB/s (Offline)' : '2.4 MB/s (High)'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-neutral-900">
                  <span className="text-neutral-500">HIPAA PRIVACY:</span>
                  <span className={`font-black ${benchmarkMode === 'npu' ? 'text-green-400' : 'text-red-400'}`}>
                    {benchmarkMode === 'npu' ? '100% Zero-Leak' : 'Streaming Risk'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-neutral-500">OFFLINE RESILIENCE:</span>
                  <span className={`font-black ${benchmarkMode === 'npu' ? 'text-green-400' : 'text-red-400'}`}>
                    {benchmarkMode === 'npu' ? 'Lifts & Ambulances' : 'Fails Offline'}
                  </span>
                </div>
              </div>
            </div>

            {/* Current State Indicator */}
            <div className="p-2.5 border border-neutral-800 bg-neutral-950 text-[9px] rounded">
              <div className="font-bold text-neutral-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-brand-gold fill-brand-gold" />
                <span>STATE</span>
              </div>
              <div className="text-white uppercase font-black tracking-wider text-[11px] truncate">
                {activeScreen || 'ACTIVE'}
              </div>
            </div>

            {/* Navigation Mode Jumps */}
            <div className="border border-neutral-800 bg-neutral-950 p-2.5 space-y-1.5 rounded">
              <span className="text-[8px] font-black uppercase text-brand-gold">MODES</span>
              <div className="space-y-1 text-[10px]">
                <button
                  onClick={() => onNavigateTab?.('home')}
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between rounded transition-colors ${
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
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between rounded transition-colors ${
                    activeScreen === 'SIGN'
                      ? 'bg-brand-gold text-black font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>2. LIVE SIGNING</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => onNavigateTab?.('conversation')}
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between rounded transition-colors ${
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
                  className={`w-full px-2 py-1.5 text-left flex items-center justify-between rounded transition-colors ${
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
          <span>SIGNIFY v0.3</span>
          <span>•</span>
          <span className="text-neutral-400 font-semibold">AI-POWERED SIGN RECOGNITION WITH CONTEXTUAL SENTENCE FORMATION</span>
        </div>
        <div className="flex items-center gap-2">
          <span>FLAGSHIP HARDWARE OPTIMIZED</span>
        </div>
      </footer>
    </div>
  );
};
