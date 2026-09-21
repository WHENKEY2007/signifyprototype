import React, { useState } from 'react';
import {
  RefreshCw,
  ArrowRight,
  Sparkles,
  Smartphone,
  Cpu,
  Zap,
  Radio,
  Layers,
  ShieldCheck,
  X,
} from 'lucide-react';
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
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);

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
            iQOO HACKATHON 2026
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={() => setIsJudgeModalOpen(true)}
            className="px-2.5 py-1 rounded border border-brand-gold bg-brand-gold/10 hover:bg-brand-gold hover:text-black text-brand-gold text-[10px] font-mono font-black flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(255,208,0,0.2)]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>JUDGE MODE (60s AUDIT)</span>
          </button>

          {onResetDemo && (
            <button
              onClick={onResetDemo}
              className="px-2.5 py-1 rounded border border-neutral-700 bg-neutral-900 hover:bg-brand-gold hover:text-black text-neutral-300 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Reset Demo Flow"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESET</span>
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
              <span className="text-brand-gold">● [01] KAGGLE ASL</span>
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
                <span>PIPELINE ARCHITECTURE</span>
                <span className="text-black bg-brand-gold px-1 text-[8px] font-black">5-STEP</span>
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">1</span>
                  <span className="truncate">SIGN: Camera captures hand</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">2</span>
                  <span className="truncate">KAGGLE ML: 250-class inference</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">3</span>
                  <span className="truncate">GATE: 70% confidence + stability</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-4 h-4 bg-neutral-900 border border-brand-gold text-brand-gold flex items-center justify-center font-bold text-[8px]">4</span>
                  <span className="truncate">CONTEXT: Natural sentence builder</span>
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
                  <span>KAGGLE 250 DEMO TOKENS</span>
                </span>
                <span className="text-[8px] text-brand-gold font-bold">1-CLICK</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => onSelectDemoSign?.('SICK')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">01</div>
                  <div className="font-bold truncate text-brand-gold">SICK</div>
                </button>
                <button
                  onClick={() => onSelectDemoSign?.('OWIE')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">02</div>
                  <div className="font-bold truncate text-brand-gold">OWIE</div>
                </button>
                <button
                  onClick={() => onSelectDemoSign?.('CALL ON PHONE')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">03</div>
                  <div className="font-bold truncate text-brand-gold">CALL ON PHONE</div>
                </button>
                <button
                  onClick={() => onSelectDemoSign?.('WATER')}
                  className="px-2 py-1.5 text-left font-mono text-[9px] border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-brand-gold hover:text-white transition-all group"
                >
                  <div className="text-[7px] text-neutral-500 group-hover:text-brand-gold">04</div>
                  <div className="font-bold truncate text-brand-gold">WATER</div>
                </button>
              </div>

              {onTriggerUncertain && (
                <button
                  onClick={onTriggerUncertain}
                  className="w-full px-2 py-1.5 border border-dashed border-amber-600/70 bg-amber-950/30 hover:bg-amber-950/60 text-amber-200 font-mono text-[9px] font-bold flex items-center justify-between transition-colors"
                  title="Test low-confidence gating handling (<70%)"
                >
                  <span>TEST LOW CONFIDENCE (48%)</span>
                  <span className="px-1 bg-amber-600 text-black text-[7px] font-black">GATE TEST</span>
                </button>
              )}
            </div>

            {/* Haptic Silent Confirmation Tester */}
            <div className="border border-neutral-800 bg-neutral-950 p-3 space-y-2 rounded">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-brand-gold font-bold flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-brand-gold" />
                  <span>TACTILE HAPTIC CUES</span>
                </span>
                <span className="text-[8px] px-1 bg-neutral-900 border border-neutral-700 text-neutral-400">
                  VIBRATION
                </span>
              </div>
              <p className="text-[9px] text-neutral-400 leading-snug font-sans">
                Silent tactile feedback alerts the deaf signer that their gesture was accepted without breaking eye contact.
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-[8.5px] font-mono font-bold">
                <button
                  onClick={() => hapticService.triggerSuccess()}
                  className="p-1.5 bg-neutral-900 hover:bg-brand-gold hover:text-black border border-neutral-800 text-neutral-200 rounded transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                  title="Test 1 Pulse (Accepted)"
                >
                  <span>📳 1 PULSE (ACCEPTED)</span>
                </button>
                <button
                  onClick={() => hapticService.triggerUncertain()}
                  className="p-1.5 bg-neutral-900 hover:bg-amber-500 hover:text-black border border-neutral-800 text-neutral-200 rounded transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                  title="Test 2 Pulses (Low Confidence Retry)"
                >
                  <span>📳📳 2 PULSES (RETRY)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Device Target Badges */}
          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3 h-3 text-brand-gold" />
              <span>PLATFORM: <strong className="text-white">iQOO 15 (Snapdragon 8 Elite)</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-brand-gold" />
              <span>HEXAGON NPU (REQUIRED)</span>
            </div>
          </div>
        </div>

        {/* CENTER STAGE: PHONE PROTOTYPE */}
        <div className="w-full flex-1 flex justify-center items-center relative">
          {children}
        </div>

        {/* RIGHT COLUMN: Truthful Architecture Roadmap & Navigation */}
        <div className="hidden xl:flex flex-col justify-between w-[255px] h-[840px] py-2 select-none font-mono text-xs">
          <div className="space-y-3">
            
            {/* Architecture Roadmap: Dev Emulation vs Mandatory Production Silicon */}
            <div className="border border-neutral-800 bg-neutral-950 p-3 relative rounded shadow-md">
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-gold" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8.5px] font-black uppercase text-brand-gold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-brand-gold" />
                  <span>ARCHITECTURE PIPELINE</span>
                </span>
                <span className="text-[7.5px] px-1 bg-neutral-800 text-brand-gold font-bold uppercase rounded-sm border border-brand-gold/30">
                  HARDWARE SPECS
                </span>
              </div>

              {/* Status Comparison */}
              <div className="space-y-2 text-[8.5px]">
                <div className="p-2 rounded bg-neutral-900/80 border border-neutral-800">
                  <div className="text-[7.5px] text-neutral-400 font-bold uppercase mb-0.5">DEV EMULATION BRIDGE</div>
                  <div className="text-brand-gold font-bold">Kaggle ASL 250 Bridge</div>
                  <div className="text-neutral-400 text-[8px]">TFLite Signature Runner (Emulation on PC/Web)</div>
                </div>

                <div className="p-2 rounded bg-neutral-900/80 border border-brand-gold/60 shadow-[0_0_10px_rgba(255,208,0,0.1)]">
                  <div className="text-[7.5px] text-brand-gold font-bold uppercase mb-0.5">MANDATORY ON-DEVICE SILICON</div>
                  <div className="text-white font-bold">Snapdragon Hexagon NPU</div>
                  <div className="text-neutral-300 text-[8px]">Qualcomm QNN SDK Direct (Required for Sub-20ms Live Camera)</div>
                </div>

                <div className="pt-1 border-t border-neutral-900 space-y-1 text-neutral-400 text-[8px]">
                  <div className="flex justify-between">
                    <span>Confidence Gate:</span>
                    <span className="text-white font-bold">70.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Model Format:</span>
                    <span className="text-white font-bold">TFLite 543 Landmarks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PC Collaboration:</span>
                    <span className="text-brand-gold font-bold">vivo/iQOO Office Kit Native</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current State Indicator */}
            <div className="p-2.5 border border-neutral-800 bg-neutral-950 text-[9px] rounded">
              <div className="font-bold text-neutral-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-brand-gold fill-brand-gold" />
                <span>ACTIVE SCREEN</span>
              </div>
              <div className="text-white uppercase font-black tracking-wider text-[11px] truncate">
                {activeScreen || 'ACTIVE'}
              </div>
            </div>

            {/* Navigation Mode Jumps */}
            <div className="border border-neutral-800 bg-neutral-950 p-2.5 space-y-1.5 rounded">
              <span className="text-[8px] font-black uppercase text-brand-gold">PROTOTYPE MODES</span>
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
            <span className="text-brand-gold font-bold">iQOO 15 FLAGSHIP SILICON</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full border-t border-neutral-900 bg-black px-4 lg:px-8 py-2 flex items-center justify-between text-[9px] font-mono text-neutral-500">
        <div className="flex items-center gap-3">
          <span>SIGNIFY v0.3</span>
          <span>•</span>
          <span className="text-neutral-400 font-semibold">KAGGLE ASL 250 FOUNDATION // PHONE-FIRST ACCESSIBILITY</span>
        </div>
        <div className="flex items-center gap-2">
          <span>iQOO HACKATHON 2026 // JURY CANDIDATE</span>
        </div>
      </footer>

      {/* JUDGE MODE 60-SECOND AUDIT MODAL (Phase 18) */}
      {isJudgeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-neutral-950 border border-brand-gold rounded-2xl p-5 sm:p-6 shadow-2xl relative font-mono text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsJudgeModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-neutral-800 pb-2">
              <div className="flex items-center gap-2 text-brand-gold font-bold text-[10px]">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>iQOO HACKATHON 2026 // JURY TECHNICAL AUDIT</span>
              </div>
              <h2 className="text-lg font-sans font-black text-white uppercase mt-0.5">
                Signify 60-Second Technical Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-xl space-y-1.5">
                <div className="text-brand-gold font-bold uppercase text-[9px]">1. WHAT WORKS RIGHT NOW (REAL)</div>
                <ul className="space-y-1 text-neutral-300 text-[10px] list-disc list-inside">
                  <li>Kaggle ASL 250-class ML model integration</li>
                  <li>FastAPI REST Bridge running TFLite Signature Runner</li>
                  <li>Real camera vision stream with MediaPipe hand tracking</li>
                  <li>Temporal stability filter (2-frame persistence)</li>
                  <li>70% confidence gating for reliable word buffer</li>
                  <li>Context-Aware Sentence Builder (grounded grammar)</li>
                  <li>Web Speech API voice synthesis & microphone transcription</li>
                </ul>
              </div>

              <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-xl space-y-1.5">
                <div className="text-brand-gold font-bold uppercase text-[9px]">2. HARDWARE REQUIREMENT (WHY NPU IS MANDATORY)</div>
                <ul className="space-y-1 text-neutral-300 text-[10px] list-disc list-inside">
                  <li><strong>Snapdragon Hexagon NPU (Mandatory):</strong> 60 FPS sign translation on CPU/cloud creates 250ms+ lag and drains battery. Hexagon NPU is required for sub-20ms zero-latency execution.</li>
                  <li><strong>Qualcomm QNN Direct SDK:</strong> Native APK executes INT8 quantized tensors directly on iQOO 15 silicon.</li>
                  <li><strong>Zero-Cloud Privacy:</strong> 100% on-device processing guarantees deaf users total conversational privacy.</li>
                  <li><strong>Dev vs Production:</strong> Current prototype uses a PC TFLite Emulation Bridge for development; production requires native Hexagon NPU.</li>
                  <li><strong>Cross-Screen Bridge:</strong> vivo/iQOO Office Kit integration for live sign translation in desktop video calls.</li>
                </ul>
              </div>
            </div>

            {/* Model Specifications */}
            <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-1.5 text-[10px]">
              <div className="text-brand-gold font-bold uppercase text-[9px]">3. VERIFIED KAGGLE ASL MODEL SPECIFICATIONS</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-neutral-300">
                <div><span className="text-neutral-500">Dataset:</span> Google ISLR Competition</div>
                <div><span className="text-neutral-500">Classes:</span> 250 Isolated ASL Signs</div>
                <div><span className="text-neutral-500">Input:</span> (Batch, Frames, 543, 3) Landmarks</div>
                <div><span className="text-neutral-500">Format:</span> TFLite Signature Runner</div>
                <div><span className="text-neutral-500">Gating Threshold:</span> 70.0% Confidence</div>
                <div><span className="text-neutral-500">Sentence Builder:</span> Rule/Context Grammar (Not LLM)</div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[9px] text-neutral-500">
                Single Source of Truth: <code className="text-brand-gold">src/data/modelVocabulary.ts</code>
              </span>
              <button
                onClick={() => setIsJudgeModalOpen(false)}
                className="px-4 py-2 bg-brand-gold text-black font-bold text-xs rounded-xl hover:bg-yellow-400 transition-colors"
              >
                CLOSE AUDIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
