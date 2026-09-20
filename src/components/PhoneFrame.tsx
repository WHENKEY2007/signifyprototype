import React, { useEffect, useState } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState<string>('15:58');

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

  return (
    <div className="w-full flex justify-center items-center relative py-2 md:py-6">
      {/* Mobile: 100% viewport | Desktop: Centered flagship phone chassis */}
      <div className="w-full md:w-[400px] md:h-[844px] flex-shrink-0 transition-all">
        {/* Outer Phone Shell */}
        <div className="w-full h-full min-h-screen md:min-h-0 bg-black md:p-[10px] md:rounded-[48px] md:shadow-2xl md:border-2 md:border-neutral-800 relative flex flex-col overflow-hidden">
          
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

              {/* System Icons: Wi-Fi, Battery */}
              <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
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
