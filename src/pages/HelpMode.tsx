import React, { useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, ShieldAlert, PhoneCall, Stethoscope, Clock, HelpCircle, MapPin, AlertTriangle } from 'lucide-react';
import { speechService } from '../services/speechService';

interface HelpModeProps {
  onBack: () => void;
}

interface HelpPhrase {
  id: string;
  phrase: string;
  category: string;
  icon: any;
}

const URGENT_PHRASES: HelpPhrase[] = [
  {
    id: 'help',
    phrase: 'I need help',
    category: 'Urgent',
    icon: AlertTriangle,
  },
  {
    id: 'wait',
    phrase: 'Please wait',
    category: 'General',
    icon: Clock,
  },
  {
    id: 'doctor',
    phrase: 'I need a doctor',
    category: 'Medical',
    icon: Stethoscope,
  },
  {
    id: 'family',
    phrase: 'Call my family',
    category: 'Contact',
    icon: PhoneCall,
  },
  {
    id: 'understand',
    phrase: "I don't understand",
    category: 'General',
    icon: HelpCircle,
  },
  {
    id: 'exit',
    phrase: 'Where is the exit?',
    category: 'Location',
    icon: MapPin,
  },
  {
    id: 'emergency',
    phrase: 'Call emergency services',
    category: 'Emergency',
    icon: ShieldAlert,
  },
];

export const HelpMode: React.FC<HelpModeProps> = ({ onBack }) => {
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSpeakPhrase = (phrase: HelpPhrase) => {
    setActivePhraseId(phrase.id);
    setIsSpeaking(true);

    speechService.speak(
      phrase.phrase,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleStopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="flex-1 w-full bg-black text-white flex flex-col justify-between select-none relative overflow-y-auto">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="w-full bg-black/95 border-b border-neutral-800 px-4 py-3 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-neutral-900 border border-neutral-800 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors"
            title="Go Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-brand-gold font-bold uppercase">
              <span>SIGNIFY</span>
              <span>•</span>
              <span>COMMUNICATION AID</span>
            </div>
            <h1 className="font-sans font-black text-base text-white leading-none uppercase tracking-wide">
              🆘 QUICK HELP
            </h1>
          </div>
        </div>

        <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-neutral-900 text-brand-gold rounded border border-brand-gold/50">
          FAST VOCALIZE
        </span>
      </div>

      {/* Phrases Grid List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2.5 z-10">
        
        {/* Notice */}
        <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl font-mono text-[10px] text-neutral-400">
          Tap any phrase to broadcast it loudly via speech in hospitals, stations, banks, or shops.
        </div>

        {URGENT_PHRASES.map((item) => {
          const Icon = item.icon;
          const isActive = activePhraseId === item.id;

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isActive
                  ? 'bg-neutral-950 border-brand-gold shadow-[0_0_15px_rgba(255,208,0,0.25)]'
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <div className="font-sans font-black text-sm text-white leading-snug">
                    "{item.phrase}"
                  </div>
                  <div className="font-mono text-[9px] text-brand-gold font-bold mt-0.5 uppercase">
                    {item.category}
                  </div>
                </div>
              </div>

              {/* Speak Button */}
              <button
                onClick={() =>
                  isActive && isSpeaking
                    ? handleStopSpeaking()
                    : handleSpeakPhrase(item)
                }
                className={`py-2 px-3 rounded-xl font-mono font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0 ${
                  isActive && isSpeaking
                    ? 'bg-neutral-800 text-brand-gold border border-brand-gold'
                    : 'bg-brand-gold hover:bg-yellow-400 text-black shadow-[0_0_10px_rgba(255,208,0,0.3)]'
                }`}
                title="Speak this phrase"
              >
                {isActive && isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>STOP</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>SPEAK</span>
                  </>
                )}
              </button>
            </div>
          );
        })}

        {/* Disclaimer */}
        <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-900 text-[9px] font-mono text-neutral-500 text-center mt-3">
          Signify is a communication aid, not an emergency response service. In critical life-threatening situations, always call emergency services directly.
        </div>

      </div>

    </div>
  );
};
