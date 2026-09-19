import React from 'react';
import { ArrowRight, Activity, AlertTriangle, MessageSquare } from 'lucide-react';
import { DEMO_SCENARIOS, DemoScenario } from '../data/demoScenarios';
import { TechLabel, CornerBrackets, YellowCornerBracket } from '../components/TechnicalDecoration';

interface DemoModeProps {
  onSelectScenario: (scenarioId: string) => void;
}

export const DemoMode: React.FC<DemoModeProps> = ({ onSelectScenario }) => {
  const scenarios: DemoScenario[] = Object.values(DEMO_SCENARIOS);

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'hospital':
        return <Activity className="w-4 h-4" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4" />;
      case 'daily':
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between p-5 select-none relative">
      <div className="absolute inset-0 bg-dots-tech opacity-15 pointer-events-none" />

      {/* Top Heading */}
      <div className="relative z-10 border-b border-neutral-800 pb-3">
        <TechLabel number="02" text="DEMO MODE" yellowDot />
        <h1 className="font-display font-black text-3xl sm:text-4xl leading-none text-white uppercase mt-1">
          DEMO SCENARIOS
        </h1>
        <p className="font-mono text-[10px] text-neutral-400 mt-1">
          // CHOOSE A REAL-WORLD SITUATION
        </p>
      </div>

      {/* 3 Scenario Cards */}
      <div className="relative z-10 my-auto space-y-3 py-2">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelectScenario(scenario.id)}
            className="w-full text-left p-4 border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition-all relative group hover:border-brand-yellow hover:translate-x-1"
          >
            <YellowCornerBracket position="top-right" />
            <CornerBrackets size="w-2 h-2" />

            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-brand-yellow px-1">
                  {scenario.number}
                </span>
                <span className="px-1.5 py-0.2 bg-brand-yellow text-black text-[9px] font-mono font-black uppercase">
                  {scenario.categoryBadge}
                </span>
              </div>
              <div className="w-7 h-7 border border-neutral-700 bg-neutral-900 text-white flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                {getScenarioIcon(scenario.id)}
              </div>
            </div>

            <h2 className="font-display font-black text-xl text-white uppercase tracking-wide">
              {scenario.title}
            </h2>

            <p className="font-sans text-xs text-neutral-400 mb-2.5">
              {scenario.tagline}
            </p>

            {/* Vocabulary Pills Preview */}
            <div className="flex flex-wrap gap-1 mb-2.5">
              {scenario.vocabulary.slice(0, 4).map((word) => (
                <span
                  key={word}
                  className="px-1.5 py-0.5 border border-neutral-700 bg-neutral-900 font-mono text-[8px] font-semibold text-neutral-200"
                >
                  {word}
                </span>
              ))}
              {scenario.vocabulary.length > 4 && (
                <span className="font-mono text-[8px] text-neutral-500 self-center">
                  +{scenario.vocabulary.length - 4} more
                </span>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between font-mono text-[9px] pt-1.5 border-t border-neutral-800">
              <span className="text-neutral-500">DETERMINISTIC SEQUENCE</span>
              <div className="flex items-center gap-1 font-bold text-brand-yellow">
                <span>LAUNCH</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom info */}
      <div className="relative z-10 pt-2 border-t border-neutral-800 flex items-center justify-between text-[9px] font-mono text-neutral-500">
        <span>PREDICTABLE BENCHMARK DATA</span>
        <span className="text-brand-yellow font-bold">iQOO 15 READY</span>
      </div>
    </div>
  );
};
