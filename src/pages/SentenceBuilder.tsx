import React from 'react';
import { Volume2, Plus, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CornerBrackets, YellowCornerBracket, TechLabel } from '../components/TechnicalDecoration';
import { DEMO_SCENARIOS } from '../data/demoScenarios';

interface SentenceBuilderProps {
  scenarioId: string;
  collectedSigns: string[];
  onAddMoreSigns: () => void;
  onClearSigns: () => void;
  onSpeakMessage: (sentence: string) => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  scenarioId,
  collectedSigns,
  onAddMoreSigns,
  onClearSigns,
  onSpeakMessage
}) => {
  const scenario = DEMO_SCENARIOS[scenarioId] || DEMO_SCENARIOS.hospital;

  // Derive dynamic sentence from collected signs
  const getDynamicSentence = (): string => {
    if (collectedSigns.length === 0) {
      return 'Waiting for detected gestures...';
    }

    if (scenarioId === 'hospital') {
      if (collectedSigns.includes('PAIN')) return "I need a doctor. I'm in pain.";
      if (collectedSigns.includes('DOCTOR')) return 'I need a doctor.';
      if (collectedSigns.includes('HELP')) return 'I need help.';
      return `${collectedSigns.join(' ')}.`;
    }

    if (scenarioId === 'emergency') {
      if (collectedSigns.includes('DANGER')) return 'Please call an ambulance. I need help.';
      if (collectedSigns.includes('AMBULANCE')) return 'Please call an ambulance.';
      if (collectedSigns.includes('HELP')) return 'I need emergency help.';
      return `${collectedSigns.join(' ')}.`;
    }

    if (scenarioId === 'daily') {
      if (collectedSigns.includes('THANK YOU')) return 'Hello, thank you.';
      if (collectedSigns.includes('HELLO')) return 'Hello.';
      return `${collectedSigns.join(' ')}.`;
    }

    return scenario.finalSentence;
  };

  const dynamicSentence = getDynamicSentence();

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <div className="flex items-center justify-between mb-1">
          <TechLabel number="04" text="CONTEXT BUILDER" yellowDot />
          <span className="px-2 py-0.5 bg-brand-yellow text-black text-[9px] font-mono font-black uppercase">
            AI ASSISTED
          </span>
        </div>
        <h1 className="font-display font-black text-3xl leading-none text-white uppercase">
          COMMUNICATION<br />BUILDER
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // SYNTACTIC PARSER & PHRASE SYNTHESIS
        </p>
      </div>

      {/* Center Sentence Box & Detected Tokens */}
      <div className="relative z-10 my-auto space-y-4 py-2">
        {/* Token Chips */}
        <div>
          <div className="text-[10px] font-mono text-neutral-400 uppercase mb-1.5 flex items-center justify-between">
            <span>DETECTED SIGNS CHRONOLOGY</span>
            <span className="text-brand-yellow font-bold">{collectedSigns.length} SIGNS GATED</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {collectedSigns.map((sign, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1 bg-neutral-900 text-brand-yellow border border-brand-yellow/40 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <span className="text-[9px] opacity-60">#{idx + 1}</span>
                <span>{sign}</span>
                <CheckCircle2 className="w-3 h-3 text-brand-yellow" />
              </div>
            ))}

            {collectedSigns.length === 0 && (
              <div className="text-xs font-mono text-neutral-500 italic">
                No signs collected yet.
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Contextual Output Card */}
        <div className="border border-neutral-800 bg-neutral-950 p-5 relative shadow-lg">
          <YellowCornerBracket position="top-right" />
          <CornerBrackets size="w-3 h-3" />

          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
              NATURAL LANGUAGE EXPANSION
            </span>
            <span className="px-1.5 py-0.2 bg-neutral-900 text-brand-yellow border border-brand-yellow/30 font-mono text-[9px] font-bold">
              HIGH CONFIDENCE
            </span>
          </div>

          <div className="min-h-[70px] flex items-center">
            <p className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide leading-tight uppercase">
              "{dynamicSentence}"
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between font-mono text-[9px] text-neutral-400">
            <span>GRAMMAR MAPPING: COMPLETE</span>
            <span className="text-brand-yellow font-bold">READY TO VOCALIZE</span>
          </div>
        </div>

        {/* Secondary Utility Controls */}
        <div className="flex items-center justify-between gap-2 pt-1 font-mono text-xs">
          <button
            onClick={onAddMoreSigns}
            className="flex-1 py-2 px-3 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-brand-yellow" />
            <span>+ ADD SIGN</span>
          </button>

          <button
            onClick={onClearSigns}
            className="py-2 px-3 border border-neutral-700 bg-neutral-900 hover:bg-red-950/40 text-neutral-400 hover:text-red-300 font-bold flex items-center justify-center gap-1 transition-colors"
            title="Clear all tokens"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[10px]">CLEAR</span>
          </button>
        </div>
      </div>

      {/* Bottom Primary Speak CTA */}
      <div className="relative z-10 pt-2">
        <button
          onClick={() => onSpeakMessage(dynamicSentence)}
          disabled={collectedSigns.length === 0}
          className="w-full group bg-brand-yellow hover:bg-yellow-400 disabled:opacity-40 text-black font-display text-xl tracking-wider py-4 px-6 flex items-center justify-between border-2 border-brand-yellow transition-all shadow-card-sharp active:translate-x-0.5 active:translate-y-0.5"
        >
          <span className="flex items-center gap-2 font-black">
            <Volume2 className="w-5 h-5 text-black" />
            <span>SPEAK MESSAGE</span>
          </span>
          <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-neutral-500">
          <span>SPEECH SYNTHESIS ENGINE</span>
          <span className="text-brand-yellow font-bold">iQOO DUAL SPEAKER</span>
        </div>
      </div>
    </div>
  );
};
