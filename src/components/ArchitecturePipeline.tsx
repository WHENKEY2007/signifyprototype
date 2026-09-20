import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

interface ArchitecturePipelineProps {
  compact?: boolean;
  onOpenFullModal?: () => void;
}

export const ArchitecturePipeline: React.FC<ArchitecturePipelineProps> = ({
  compact = true,
  onOpenFullModal,
}) => {
  const forwardNodes = [
    { icon: '🤟', label: 'GESTURE', detail: 'Sign language input' },
    { icon: '📷', label: 'CAMERA', detail: 'Optical vision ingest' },
    { icon: '✋', label: 'TRACKING', detail: '21-point hand keypoints' },
    { icon: '🧠', label: 'RECOGNITION', detail: 'Neural gesture inference' },
    { icon: '✓', label: 'CONFIDENCE', detail: 'Safety gate (≥75%)' },
    { icon: '📝', label: 'CONTEXT', detail: 'Natural grammar builder' },
    { icon: '💬', label: 'PHRASE', detail: 'Complete phrase' },
    { icon: '🔊', label: 'VOICE', detail: 'Speech synthesis' },
  ];

  const reverseNodes = [
    { icon: '🎤', label: 'VOICE', detail: 'Spoken language input' },
    { icon: '🎙', label: 'MIC', detail: 'Acoustic audio ingest' },
    { icon: '🧠', label: 'RECOGNITION', detail: 'Speech-to-text engine' },
    { icon: '📝', label: 'TEXT', detail: 'Natural text transcription' },
    { icon: '👁', label: 'DISPLAY', detail: 'High-contrast visual text' },
  ];

  if (compact) {
    return (
      <div className="p-3.5 rounded-2xl bg-brand-card border border-brand-border select-none">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-brand-gold font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-brand-gold fill-brand-gold" />
            <span>HOW SIGNIFY WORKS</span>
          </div>
          {onOpenFullModal && (
            <button
              onClick={onOpenFullModal}
              className="text-[10px] font-mono font-bold text-brand-gold hover:underline flex items-center gap-0.5"
            >
              <span>EXPLORE ARCHITECTURE</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* FORWARD PIPELINE PREVIEW */}
        <div className="space-y-2">
          <div className="text-[9px] font-mono text-slate-400 font-semibold uppercase">
            FORWARD: GESTURE → VOICE
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] font-mono font-bold scrollbar-none">
            {forwardNodes.slice(0, 5).map((node, i) => (
              <React.Fragment key={node.label}>
                <div className="px-2 py-1 rounded-lg bg-brand-dark border border-brand-border flex items-center gap-1 whitespace-nowrap text-slate-200">
                  <span>{node.icon}</span>
                  <span>{node.label}</span>
                </div>
                {i < 4 && <span className="text-brand-gold">→</span>}
              </React.Fragment>
            ))}
            <span className="text-brand-gold">→</span>
            <div className="px-2 py-1 rounded-lg bg-brand-gold/15 border border-brand-gold text-brand-gold font-black flex items-center gap-1 whitespace-nowrap">
              <span>🔊</span>
              <span>VOICE</span>
            </div>
          </div>
        </div>

        {/* REVERSE PIPELINE PREVIEW */}
        <div className="space-y-1.5 mt-2.5 pt-2 border-t border-brand-border/60">
          <div className="text-[9px] font-mono text-slate-400 font-semibold uppercase">
            REVERSE: VOICE → TEXT
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] font-mono font-bold scrollbar-none">
            {reverseNodes.map((node, i) => (
              <React.Fragment key={node.label}>
                <div className="px-2 py-1 rounded-lg bg-brand-dark border border-brand-border flex items-center gap-1 whitespace-nowrap text-slate-200">
                  <span>{node.icon}</span>
                  <span>{node.label}</span>
                </div>
                {i < reverseNodes.length - 1 && <span className="text-brand-gold">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Full Expanded Architecture Modal / Page
  return (
    <div className="space-y-6 text-slate-200 select-none">
      {/* FORWARD DIRECTION */}
      <div className="p-4 rounded-2xl bg-brand-card border border-brand-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤟</span>
            <div>
              <div className="font-mono text-xs font-bold text-brand-gold uppercase tracking-wider">
                FORWARD PIPELINE
              </div>
              <div className="font-sans text-sm font-extrabold text-white">
                GESTURE → VOICE
              </div>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/30 font-bold">
            REAL-TIME
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {forwardNodes.map((node, idx) => (
            <div
              key={node.label}
              className="p-2.5 rounded-xl bg-brand-dark border border-brand-border hover:border-brand-gold/50 transition-colors relative"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-base">{node.icon}</span>
                <span className="font-mono text-[9px] text-brand-gold font-bold">0{idx + 1}</span>
              </div>
              <div className="font-mono text-[11px] font-black text-white">{node.label}</div>
              <div className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">{node.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REVERSE DIRECTION */}
      <div className="p-4 rounded-2xl bg-brand-card border border-brand-border space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎤</span>
            <div>
              <div className="font-mono text-xs font-bold text-brand-gold uppercase tracking-wider">
                REVERSE PIPELINE
              </div>
              <div className="font-sans text-sm font-extrabold text-white">
                VOICE → TEXT
              </div>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/30 font-bold">
            ZERO LATENCY
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {reverseNodes.map((node, idx) => (
            <div
              key={node.label}
              className="p-2.5 rounded-xl bg-brand-dark border border-brand-border hover:border-brand-gold/50 transition-colors relative"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-base">{node.icon}</span>
                <span className="font-mono text-[9px] text-brand-gold font-bold">0{idx + 1}</span>
              </div>
              <div className="font-mono text-[11px] font-black text-white">{node.label}</div>
              <div className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">{node.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-brand-dark rounded-xl border border-brand-border text-center text-xs text-slate-400 font-sans">
        Signify bridges both communication directions on-device without cloud latency.
      </div>
    </div>
  );
};
