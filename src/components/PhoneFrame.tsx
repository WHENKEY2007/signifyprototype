import React, { useEffect, useState } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState<string>('15:58');
  const [activeHaptic, setActiveHaptic] = useState<{ type: string; label: string } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHaptic = (e: any) => {
      if (e.detail) {
        setActiveHaptic({
          type: e.detail.type,
          label: e.detail.label
        });
        const t = setTimeout(() => {
          setActiveHaptic(null);
        }, 1400);
        return () => clearTimeout(t);
      }
    };

    window.addEventListener('signify-haptic', handleHaptic);
    return () => window.removeEventListener('signify-haptic', handleHaptic);
  }, []);

  return (
    <div className="w-full flex justify-center items-center relative py-2 md:py-6">
      {/* Mobile: 100% viewport | Desktop: Centered flagship phone chassis */}
      <div className="w-full md:w-[400px] md:h-[844px] flex-shrink-0 transition-all relative">
        
        {/* Floating Haptic Indicator Pill (Shows tactile sensation in real-time) */}
        {activeHaptic && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-brand-gold shadow-[0_0_15px_rgba(255,208,0,0.5)] font-mono text-[9.5px] font-bold text-brand-gold animate-bounce">
            <span>📳</span>
            <span>HAPTIC: {activeHaptic.label}</span>
          </div>
        )}

        {/* Outer Phone Shell with Dynamic Haptic Pulse Glow */}
        <div
          className={`w-full h-full min-h-screen md:min-h-0 bg-black md:p-[10px] md:rounded-[48px] md:shadow-2xl md:border-2 transition-all duration-300 relative flex flex-col overflow-hidden ${
            activeHaptic
              ? 'md:border-brand-gold md:shadow-[0_0_35px_rgba(255,208,0,0.4)] scale-[1.008]'
              : 'md:border-neutral-800'
          }`}
        >
          
          {/* Inner Phone Screen Display */}
          <div className="relative w-full h-full min-h-screen md:min-h-0 bg-black text-white md:rounded-[38px] overflow-hidden flex flex-col border border-neutral-900">
            
            {/* Status Bar */}
            <div className="w-full h-10 bg-black/95 border-b border-neutral-900 flex items-center justify-between px-6 z-40 select-none flex-shrink-0">
              {/* Time + 5G+ Badge */}
              <div className="font-mono text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>{currentTime}</span>
                <span className="text-[9px] px-1 py-0.2 bg-brand-gold text-black font-black uppercase rounded-sm">
                  5G+
                </span>
              </div>

              {/* Centered Camera Punch-Hole */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 flex items-center justify-center shadow-inner border border-neutral-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 ring-1 ring-brand-gold/30" />
                </div>
              </div>

              {/* System Icons: Wi-Fi, Haptic Status, Battery */}
              <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
                {/* Haptic Motor Icon */}
                <span
                  title="Haptic Silent Feedback Active"
                  className={`text-[10px] transition-colors ${
                    activeHaptic ? 'text-brand-gold animate-ping' : 'text-neutral-500'
                  }`}
                >
                  📳
                </span>

                {/* Wi-Fi Icon */}
                <svg className="w-3.5 h-3.5 fill-current text-neutral-300" viewBox="0 0 24 24">
                  <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.2c3.7 0 7.07 1.44 9.6 3.82L12 18.59 2.4 11.02C4.93 8.64 8.3 7.2 12 7.2z" />
                </svg>
                {/* Battery Pill with Gold fill */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-2.5 border border-neutral-600 rounded-[2px] p-[1px] flex items-center">
                    <div className="h-full w-full bg-brand-gold rounded-[1px]" />
                  </div>
                  <span className="text-[10px] text-white font-bold">98%</span>
                </div>
              </div>
            </div>

            {/* Main Phone Viewport Content */}
            <main className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col relative bg-black text-white">
              {children}
            </main>

            {/* Phone Bottom Gesture Bar */}
            <div className="w-full h-4 bg-black flex items-center justify-center select-none flex-shrink-0 border-t border-neutral-900">
              <div className="w-28 h-1 bg-neutral-700 hover:bg-brand-gold transition-colors rounded-full" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
