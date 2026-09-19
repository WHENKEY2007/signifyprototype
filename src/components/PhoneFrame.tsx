import React, { useEffect, useState } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children
}) => {
  const [currentTime, setCurrentTime] = useState<string>('09:41');

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
    <div className="w-full flex justify-center items-center relative py-4 lg:py-6">
      {/* 
        3D Floating Ambient Light Halo behind the phone (Desktop Only)
      */}
      <div className="hidden md:block absolute -inset-10 iqoo-ambient-halo pointer-events-none -z-10" />

      {/* 
        Responsive container:
        - On mobile (<md / <768px): No physical outer phone frame, fills 100% viewport natively with black background.
        - On desktop (>=md): Displays floating 3D iQOO 15 flagship device chassis with levitation physics.
      */}
      <div className="w-full md:w-auto flex flex-col items-center">
        {/* DESKTOP iQOO 15 3D FLOATING CHASSIS WRAPPER */}
        <div className="relative w-full md:w-[416px] md:h-[864px] flex-shrink-0 transition-all duration-300 md:animate-float-phone">
          
          {/* Subtle 3D Floating HUD Markers */}
          <div className="hidden md:flex absolute -left-12 top-1/4 flex-col gap-1 text-[8px] font-mono text-neutral-500 uppercase select-none pointer-events-none">
            <span className="text-brand-yellow font-black">ALT: +14mm</span>
            <span className="w-8 h-[1px] bg-neutral-700" />
            <span>3D LEVITATION</span>
          </div>

          <div className="hidden md:flex absolute -right-12 top-1/3 flex-col items-end gap-1 text-[8px] font-mono text-neutral-500 uppercase select-none pointer-events-none">
            <span className="text-white font-bold">iQOO 15</span>
            <span className="w-8 h-[1px] bg-brand-yellow/60" />
            <span className="text-brand-yellow">FLAGSHIP CHASSIS</span>
          </div>

          {/* Physical Side Buttons on iQOO 15 chassis (hidden on mobile) */}
          <div className="hidden md:block absolute -right-[5px] top-[180px] w-[5px] h-[52px] bg-neutral-700 rounded-r-sm border-l border-neutral-600 shadow-md" title="Volume Up / Down" />
          <div className="hidden md:block absolute -right-[5px] top-[256px] w-[5px] h-[36px] bg-brand-yellow rounded-r-sm border-l border-neutral-900 shadow-md" title="iQOO 15 Power Button (Textured Yellow Accent)" />
          
          {/* Outer Phone Shell (Bezel & Metallic Edge with 3D Bevel) */}
          <div className="w-full h-full min-h-screen md:min-h-0 bg-black md:iqoo-metallic-bezel md:p-[11px] md:rounded-[50px] relative overflow-hidden flex flex-col transition-shadow">
            
            {/* Specular Rim Light Reflection (Top Left to Bottom Right) */}
            <div className="hidden md:block absolute inset-0 rounded-[50px] pointer-events-none border border-white/20 shadow-inner" />

            {/* Inner Phone Screen Display */}
            <div className="relative w-full h-full min-h-screen md:min-h-0 bg-black text-white md:rounded-[40px] overflow-hidden flex flex-col border border-neutral-800 md:border-none shadow-2xl">
              
              {/* Top Speaker Ear Slit (Desktop Only) */}
              <div className="hidden md:flex absolute top-2.5 inset-x-0 justify-center z-50 pointer-events-none">
                <div className="w-16 h-1 bg-neutral-800 rounded-full border border-neutral-700/60 shadow-inner" />
              </div>

              {/* Status Bar */}
              <div className="w-full h-11 bg-black/95 backdrop-blur-sm border-b border-neutral-800/80 flex items-center justify-between px-6 z-40 select-none flex-shrink-0">
                {/* Time */}
                <div className="font-mono text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>{currentTime}</span>
                  <span className="text-[9px] px-1 bg-brand-yellow text-black font-black uppercase hidden sm:inline">
                    5G+
                  </span>
                </div>

                {/* iQOO 15 Centered Punch-Hole Selfie Camera with Realistic Optical Ring */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2.5 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center shadow-inner border border-neutral-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 ring-1 ring-blue-900/50 shadow-sm" />
                  </div>
                </div>

                {/* System Icons: Wi-Fi, VoLTE, Battery */}
                <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-300 font-semibold">
                  <span className="text-[8px] text-neutral-500 hidden xs:inline">VoLTE</span>
                  <svg className="w-3.5 h-3.5 text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.2c3.7 0 7.07 1.44 9.6 3.82L12 18.59 2.4 11.02C4.93 8.64 8.3 7.2 12 7.2z" />
                  </svg>
                  {/* Battery Pill */}
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-2.5 border border-neutral-500 rounded-[2px] p-[1px] flex items-center">
                      <div className="h-full w-full bg-brand-yellow" />
                    </div>
                    <span className="text-[9px] text-white font-bold">98%</span>
                  </div>
                </div>
              </div>

              {/* Main Phone Viewport Content (Scrollable & Responsive) */}
              <main className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col relative bg-black text-white">
                {children}
              </main>

              {/* Phone Bottom Gesture Bar (Android 15 / iQOO style) */}
              <div className="w-full h-5 bg-black flex items-center justify-center select-none flex-shrink-0 border-t border-neutral-900">
                <div className="w-28 h-1 bg-neutral-700 rounded-full hover:bg-neutral-500 transition-colors" />
              </div>

            </div>
          </div>
        </div>

        {/* 
          3D Floating Ground Shadow below the phone (Desktop Only)
          Expands and contracts in sync with the levitation keyframe
        */}
        <div className="hidden md:block w-72 h-7 bg-black/90 rounded-[100%] filter blur-md mt-4 md:animate-float-shadow shadow-[0_0_50px_20px_rgba(0,0,0,0.95)]" />

        {/* iQOO 15 Subtle Bottom Device Label */}
        <div className="hidden md:flex items-center justify-between w-full max-w-[400px] mt-2 px-2 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
            <span>[iQOO 15 // FLAGSHIP HARDWARE]</span>
          </span>
          <span className="text-neutral-400">HERO DEVICE</span>
        </div>
      </div>
    </div>
  );
};
