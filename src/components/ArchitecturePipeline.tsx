import React from 'react';
import { ChevronRight, Sparkles, Cpu, ShieldCheck } from 'lucide-react';

interface ArchitecturePipelineProps {
  compact?: boolean;
  onOpenFullModal?: () => void;
}

export const ArchitecturePipeline: React.FC<ArchitecturePipelineProps> = ({
  compact = true,
  onOpenFullModal,
}) => {
  const fiveSteps = [
    { num: '1', title: 'CAMERA', desc: 'Captures hand motion (60 FPS)', icon: '📷' },
    { num: '2', title: 'KAGGLE ASL', desc: '250-class landmark model', icon: '🧠' },
    { num: '3', title: 'GATE & FILTER', desc: '≥70% gate + temporal stability', icon: '✓' },
    { num: '4', title: 'CONTEXT', desc: 'Context-aware sentence builder', icon: '💬' },
    { num: '5', title: 'VOICE', desc: 'Audio speech synthesis', icon: '🔊' },
  ];

  const currentNodes = [
    { icon: '📷', label: 'CAMERA VISION', detail: 'Optical stream via getUserMedia' },
    { icon: '✋', label: 'MEDIAPIPE', detail: 'Extracts 21 hand keypoints into 543x3 tensor' },
    { icon: '🧠', label: 'KAGGLE ASL 250', detail: 'TFLite signature runner (REST API bridge)' },
    { icon: '✓', label: 'CONFIDENCE GATE', detail: '≥70.0% acceptance threshold' },
    { icon: '⏳', label: 'TEMPORAL FILTER', detail: '2-frame stability filter against flicker' },
    { icon: '📝', label: 'WORD BUFFER', detail: 'Accumulates deduplicated tokens' },
    { icon: '💬', label: 'CONTEXT BUILDER', detail: 'Rule-grounded grammar (not an LLM)' },
    { icon: '🔊', label: 'VOICE SYNTHESIS', detail: 'Web Speech API dual-speaker output' },
  ];

  const productionHardwareNodes = [
    { icon: '⚡', label: 'QUALCOMM QNN DIRECT', detail: 'Direct Hexagon DSP runtime via Qualcomm AI Engine SDK' },
    { icon: '🧠', label: 'HEXAGON NPU (MANDATORY)', detail: 'INT8 execution for sub-20ms latency and all-day thermal endurance' },
    { icon: '🔒', label: 'ZERO-LEAK PRIVACY', detail: '100% on-device offline processing without cloud transmission' },
    { icon: '💻', label: 'vivo/iQOO OFFICE KIT', detail: 'Phone-to-laptop native dual-screen meeting transcription' },
  ];

  if (compact) {
    return (
      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-brand-gold/40 select-none font-mono">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[10px] text-brand-gold font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-brand-gold fill-brand-gold" />
            <span>5-STEP ACCESSIBILITY PIPELINE</span>
          </div>
          {onOpenFullModal && (
            <button
              onClick={onOpenFullModal}
              className="text-[9.5px] font-mono font-bold text-brand-gold hover:underline flex items-center gap-0.5"
            >
              <span>SPECS</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* 5-Step Flow */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 text-[9.5px] font-mono font-bold scrollbar-none">
          {fiveSteps.map((step, idx) => (
            <React.Fragment key={step.title}>
              <div className="px-2 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-1.5 whitespace-nowrap text-white">
                <span className="text-xs">{step.icon}</span>
                <span>{step.title}</span>
              </div>
              {idx < fiveSteps.length - 1 && (
                <span className="text-brand-gold text-xs">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Full Expanded Modal View
  return (
    <div className="space-y-4 font-mono text-xs select-none">
      {/* SECTION 1: CURRENT IMPLEMENTATION */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <span className="text-brand-gold font-bold flex items-center gap-1.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>CURRENT IMPLEMENTATION (DEV PROTOTYPE)</span>
          </span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/40">
            KAGGLE ASL 250
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentNodes.map((node, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5">
              <span className="text-base">{node.icon}</span>
              <div>
                <div className="font-bold text-white text-[10.5px]">{node.label}</div>
                <div className="text-[9.5px] text-neutral-400 font-sans leading-tight mt-0.5">{node.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: MANDATORY PRODUCTION SILICON (iQOO 15 / SNAPDRAGON) */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <span className="text-white font-bold flex items-center gap-1.5 text-xs">
            <Cpu className="w-4 h-4 text-brand-gold" />
            <span>MANDATORY PRODUCTION SILICON (iQOO 15)</span>
          </span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/40 font-bold">
            REQUIRED HARDWARE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {productionHardwareNodes.map((node, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5">
              <span className="text-base">{node.icon}</span>
              <div>
                <div className="font-bold text-brand-gold text-[10.5px]">{node.label}</div>
                <div className="text-[9.5px] text-neutral-400 font-sans leading-tight mt-0.5">{node.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
