import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles, Info, Wifi, WifiOff } from 'lucide-react';
import { recognitionService } from '../services/recognitionService';
import { KAGGLE_MODEL_SPECS, KAGGLE_CONFIDENCE_THRESHOLD } from '../data/modelVocabulary';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentMode, setCurrentMode] = useState<'live' | 'demo'>(recognitionService.getMode());
  const [serverOnline, setServerOnline] = useState<boolean>(recognitionService.isKaggleConnected());

  useEffect(() => {
    recognitionService.checkServerHealth().then((online) => {
      setServerOnline(online);
    });
  }, []);

  const handleToggleMode = () => {
    const next = currentMode === 'live' ? 'demo' : 'live';
    recognitionService.setMode(next);
    setCurrentMode(next);
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
          <h1 className="font-sans font-black text-base text-white leading-none uppercase tracking-wide">
            SETTINGS & AI SPECS
          </h1>
        </div>
      </div>

      {/* Main Settings List */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 z-10 font-mono">
        
        {/* AI TRANSPARENCY & VERIFIED MODEL SPECS (Phase 12 & 17) */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-brand-gold/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase">
              <Info className="w-4 h-4 text-brand-gold" />
              <span>AI TRANSPARENCY & MODEL SPECS</span>
            </div>
            <span className="text-[8px] px-2 py-0.5 bg-brand-gold text-black font-black uppercase rounded">
              VERIFIED
            </span>
          </div>

          <div className="space-y-2 text-[10px]">
            <div className="flex justify-between py-0.5 border-b border-neutral-900">
              <span className="text-neutral-500">Foundation Model:</span>
              <span className="text-white font-bold">Kaggle ASL ISLR (Google Competition)</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-900">
              <span className="text-neutral-500">Classes Count:</span>
              <span className="text-brand-gold font-bold">{KAGGLE_MODEL_SPECS.classesCount} Classes</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-900">
              <span className="text-neutral-500">Input Landmarks:</span>
              <span className="text-white font-bold">543 Keypoints (x, y, z)</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-900">
              <span className="text-neutral-500">Model Format:</span>
              <span className="text-white">TFLite Signature Runner</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-900">
              <span className="text-neutral-500">Confidence Gate:</span>
              <span className="text-brand-gold font-bold">{KAGGLE_CONFIDENCE_THRESHOLD}% Acceptance Threshold</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-900">
              <span className="text-neutral-500">Current Runtime:</span>
              <span className="text-neutral-300">FastAPI REST Bridge / HF Spaces</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-neutral-900">
              <span className="text-neutral-500">Snapdragon NPU:</span>
              <span className="text-brand-gold font-bold">REQUIRED HARDWARE (Hexagon DSP / QNN)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">Sentence Builder:</span>
              <span className="text-neutral-300">Context Grammar Engine (Not LLM)</span>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 divide-y divide-neutral-900 overflow-hidden">
          
          {/* Mode Switcher */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 text-brand-gold flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-white uppercase">RECOGNITION MODE</div>
                <div className="text-[10px] text-neutral-400">
                  {currentMode === 'live' ? '● LIVE KAGGLE MODEL' : '◆ DEMO WALKTHROUGH'}
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleMode}
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-colors ${
                currentMode === 'live'
                  ? 'bg-brand-gold text-black shadow-sm'
                  : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              {currentMode === 'live' ? 'LIVE' : 'DEMO'}
            </button>
          </div>

          {/* Voice Broadcast Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 text-brand-gold flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-white uppercase">VOICE SYNTHESIS</div>
                <div className="text-[10px] text-neutral-400">WEB SPEECH API AUDIO BROADCAST</div>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                soundEnabled ? 'bg-brand-gold' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black shadow-sm transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Backend Status Card */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase text-[10px]">KAGGLE ASL BRIDGE STATUS</span>
            <div className="flex items-center gap-1">
              {serverOnline ? (
                <span className="text-green-400 font-bold flex items-center gap-1 text-[10px]">
                  <Wifi className="w-3 h-3" />
                  ONLINE
                </span>
              ) : (
                <span className="text-amber-400 font-bold flex items-center gap-1 text-[10px]">
                  <WifiOff className="w-3 h-3" />
                  OFFLINE
                </span>
              )}
            </div>
          </div>
          <p className="font-sans text-[11px] text-neutral-400 leading-relaxed">
            {serverOnline
              ? `Connected to ${recognitionService.getServerUrl()}`
              : 'Backend is currently offline or unreachable. Signify automatically supports offline demo walkthroughs without pretending fake predictions.'}
          </p>
        </div>

      </div>

      {/* Return Button */}
      <div className="p-4 bg-black border-t border-neutral-800 flex-shrink-0 z-20">
        <button
          onClick={onBack}
          className="w-full py-3 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(255,208,0,0.3)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO SIGNIFY</span>
        </button>
      </div>

    </div>
  );
};
