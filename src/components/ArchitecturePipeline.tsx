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
  // 5-Step Core Innovation
  const fiveSteps = [
    {
      num: '1',
      title: 'SIGN',
      desc: 'User performs a sign.',
      icon: '🤟',
    },
    {
      num: '2',
      title: 'WORD',
      desc: 'AI recognizes the sign as a word.',
      icon: '✋',
    },
    {
      num: '3',
      title: 'CONTEXT',
      desc: 'Detected words are combined.',
      icon: '🧠',
    },
    {
      num: '4',
      title: 'SENTENCE',
      desc: 'Signify creates a natural phrase.',
      icon: '💬',
    },
    {
      num: '5',
      title: 'VOICE',
      desc: 'The phrase is spoken aloud.',
      icon: '🔊',
    },
  ];

  const forwardDetailedNodes = [
    { icon: '🤟', label: 'SIGN', detail: 'User performs a sign gesture' },
    { icon: '📷', label: 'CAMERA', detail: 'Optical vision ingest' },
    { icon: '✋', label: 'KEYPOINTS', detail: '21-point hand tracking' },
    { icon: '🧠', label: 'WORD RECOG', detail: 'On-device neural sign prediction' },
    { icon: '✓', label: 'CONFIDENCE', detail: 'Safety threshold gate (≥75%)' },
    { icon: '📝', label: 'WORD BUFFER', detail: 'Accumulates accepted words' },
    { icon: '🧠', label: 'CONTEXT', detail: 'Contextual sentence synthesis' },
    { icon: '💬', label: 'SENTENCE', detail: 'Grounded natural phrase' },
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
      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-brand-gold/40 select-none">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-brand-gold font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-brand-gold fill-brand-gold" />
            <span>HOW SIGNIFY WORKS</span>
          </div>
          {onOpenFullModal && (
            <button
              onClick={onOpenFullModal}
              className="text-[10px] font-mono font-bold text-brand-gold hover:underline flex items-center gap-0.5"
            >
              <span>EXPLORE</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* 5-Step Innovation Flow */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 text-[10px] font-mono font-bold scrollbar-none">
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

        <div className="mt-2 text-[9px] font-mono text-neutral-400 text-center">
          AI-powered sign recognition with contextual sentence formation.
        </div>
      </div>
    );
  }

  // Full Expanded Architecture Modal / Page
  return (
    <div className="space-y-6 text-neutral-200 select-none">
      {/* 5-Step Narrative Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-brand-gold/60 space-y-4">
        <div>
          <div className="font-mono text-[10px] text-brand-gold font-bold uppercase tracking-wider">
            CORE INNOVATION
          </div>
          <h3 className="font-sans font-black text-xl text-white uppercase">
            How Signify understands your message
          </h3>
          <p className="font-sans text-xs text-neutral-400 mt-1">
            AI-powered sign recognition with contextual sentence formation.
          </p>
        </div>

        <div className="space-y-3">
          {fiveSteps.map((step, idx) => (
            <div
              key={step.title}
              className="p-3 rounded-xl bg-black border border-neutral-800 hover:border-brand-gold/60 transition-all flex items-start gap-3 relative group"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-gold text-black flex items-center justify-center font-mono font-black text-sm flex-shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{step.icon}</span>
                  <h4 className="font-mono font-black text-sm text-white uppercase">
                    {step.title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-neutral-300 mt-0.5">
                  {step.desc}
                </p>
              </div>
              {idx < fiveSteps.length - 1 && (
                <div className="absolute -bottom-2.5 left-7 transform -translate-x-1/2 text-brand-gold text-xs z-10">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Pipeline Breakdown */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤟</span>
            <div>
              <div className="font-mono text-xs font-bold text-brand-gold uppercase tracking-wider">
                DETAILED PIPELINE
              </div>
              <div className="font-sans text-sm font-extrabold text-white">
                SIGN → WORD → CONTEXT → VOICE
              </div>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/40 font-bold">
            ON-DEVICE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {forwardDetailedNodes.map((node, idx) => (
            <div
              key={node.label}
              className="p-2.5 rounded-xl bg-black border border-neutral-800 hover:border-brand-gold/50 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-base">{node.icon}</span>
                <span className="font-mono text-[9px] text-brand-gold font-bold">0{idx + 1}</span>
              </div>
              <div className="font-mono text-[11px] font-black text-white">{node.label}</div>
              <div className="font-sans text-[10px] text-neutral-400 mt-0.5 leading-snug">{node.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reverse Direction (Voice -> Text) */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
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
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/40 font-bold">
            TWO-WAY
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {reverseNodes.map((node, idx) => (
            <div
              key={node.label}
              className="p-2.5 rounded-xl bg-black border border-neutral-800 hover:border-brand-gold/50 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-base">{node.icon}</span>
                <span className="font-mono text-[9px] text-brand-gold font-bold">0{idx + 1}</span>
              </div>
              <div className="font-mono text-[11px] font-black text-white">{node.label}</div>
              <div className="font-sans text-[10px] text-neutral-400 mt-0.5 leading-snug">{node.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-center text-xs text-neutral-400 font-sans">
        Signify bridges sign language and spoken conversation with clear separation between word recognition and contextual sentence formation.
      </div>
    </div>
  );
};
