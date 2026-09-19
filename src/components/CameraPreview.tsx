import React, { useState } from 'react';
import { CornerBrackets } from './TechnicalDecoration';

interface CameraPreviewProps {
  currentSign?: string;
  confidence?: number;
  isScanning?: boolean;
  statusText?: string;
  handPoseType?: 'open-palm' | 'fist-thumb' | 'index-point' | 'two-finger' | 'crossed-palms' | 'wave';
  onSimulateGestureClick?: () => void;
  className?: string;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  currentSign = 'HELP',
  confidence = 96,
  isScanning = false,
  statusText = 'RECOGNIZING GESTURE...',
  handPoseType = 'fist-thumb',
  className = ''
}) => {
  const [lensView, setLensView] = useState<'front' | 'rear'>('front');

  // MediaPipe-style 21 keypoints mapped across 300x260 coordinate space
  // Variations based on hand pose type
  const getHandKeypoints = () => {
    switch (handPoseType) {
      case 'open-palm':
        return [
          { id: 0, x: 150, y: 220 }, // wrist
          // Thumb
          { id: 1, x: 125, y: 195 }, { id: 2, x: 105, y: 170 }, { id: 3, x: 90, y: 145 }, { id: 4, x: 80, y: 125 },
          // Index
          { id: 5, x: 125, y: 140 }, { id: 6, x: 120, y: 105 }, { id: 7, x: 118, y: 75 }, { id: 8, x: 115, y: 50 },
          // Middle
          { id: 9, x: 150, y: 135 }, { id: 10, x: 150, y: 98 }, { id: 11, x: 150, y: 68 }, { id: 12, x: 150, y: 42 },
          // Ring
          { id: 13, x: 175, y: 142 }, { id: 14, x: 178, y: 108 }, { id: 15, x: 180, y: 78 }, { id: 16, x: 182, y: 55 },
          // Pinky
          { id: 17, x: 198, y: 155 }, { id: 18, x: 205, y: 128 }, { id: 19, x: 210, y: 105 }, { id: 20, x: 215, y: 85 },
        ];
      case 'index-point':
        return [
          { id: 0, x: 150, y: 220 }, // wrist
          // Thumb curled
          { id: 1, x: 132, y: 198 }, { id: 2, x: 122, y: 180 }, { id: 3, x: 128, y: 162 }, { id: 4, x: 138, y: 152 },
          // Index pointing high
          { id: 5, x: 140, y: 140 }, { id: 6, x: 138, y: 102 }, { id: 7, x: 136, y: 72 }, { id: 8, x: 135, y: 45 },
          // Middle curled
          { id: 9, x: 155, y: 145 }, { id: 10, x: 160, y: 162 }, { id: 11, x: 162, y: 175 }, { id: 12, x: 158, y: 185 },
          // Ring curled
          { id: 13, x: 172, y: 152 }, { id: 14, x: 178, y: 168 }, { id: 15, x: 178, y: 180 }, { id: 16, x: 172, y: 188 },
          // Pinky curled
          { id: 17, x: 188, y: 165 }, { id: 18, x: 192, y: 178 }, { id: 19, x: 190, y: 188 }, { id: 20, x: 185, y: 195 },
        ];
      case 'two-finger':
        return [
          { id: 0, x: 150, y: 220 }, // wrist
          // Thumb
          { id: 1, x: 128, y: 195 }, { id: 2, x: 118, y: 175 }, { id: 3, x: 124, y: 158 }, { id: 4, x: 134, y: 148 },
          // Index extended
          { id: 5, x: 136, y: 140 }, { id: 6, x: 132, y: 102 }, { id: 7, x: 128, y: 72 }, { id: 8, x: 125, y: 48 },
          // Middle extended
          { id: 9, x: 156, y: 138 }, { id: 10, x: 156, y: 100 }, { id: 11, x: 156, y: 70 }, { id: 12, x: 156, y: 46 },
          // Ring curled
          { id: 13, x: 175, y: 148 }, { id: 14, x: 178, y: 168 }, { id: 15, x: 178, y: 180 }, { id: 16, x: 172, y: 188 },
          // Pinky curled
          { id: 17, x: 192, y: 162 }, { id: 18, x: 194, y: 178 }, { id: 19, x: 190, y: 188 }, { id: 20, x: 185, y: 195 },
        ];
      case 'fist-thumb':
      default:
        return [
          { id: 0, x: 150, y: 220 }, // wrist
          // Thumb erect
          { id: 1, x: 125, y: 190 }, { id: 2, x: 105, y: 160 }, { id: 3, x: 96, y: 130 }, { id: 4, x: 92, y: 102 },
          // Index folded
          { id: 5, x: 135, y: 150 }, { id: 6, x: 140, y: 165 }, { id: 7, x: 145, y: 178 }, { id: 8, x: 142, y: 188 },
          // Middle folded
          { id: 9, x: 154, y: 150 }, { id: 10, x: 158, y: 166 }, { id: 11, x: 162, y: 180 }, { id: 12, x: 158, y: 190 },
          // Ring folded
          { id: 13, x: 172, y: 155 }, { id: 14, x: 176, y: 170 }, { id: 15, x: 178, y: 182 }, { id: 16, x: 172, y: 192 },
          // Pinky folded
          { id: 17, x: 190, y: 165 }, { id: 18, x: 192, y: 178 }, { id: 19, x: 190, y: 188 }, { id: 20, x: 184, y: 195 },
        ];
    }
  };

  const keypoints = getHandKeypoints();

  // Skeleton connections (bones)
  const connections: [number, number][] = [
    // Palm base
    [0, 1], [0, 5], [5, 9], [9, 13], [13, 17], [0, 17],
    // Thumb
    [1, 2], [2, 3], [3, 4],
    // Index
    [5, 6], [6, 7], [7, 8],
    // Middle
    [9, 10], [10, 11], [11, 12],
    // Ring
    [13, 14], [14, 15], [15, 16],
    // Pinky
    [17, 18], [18, 19], [19, 20],
  ];

  return (
    <div className={`relative w-full bg-brand-darker border-2 border-brand-black overflow-hidden select-none font-mono ${className}`}>
      {/* Subtle Camera Background Grain / Grid */}
      <div className="absolute inset-0 opacity-20 bg-dots-tech pointer-events-none" />

      {/* Top Camera Status Bar */}
      <div className="relative z-20 flex items-center justify-between px-3 py-2 bg-brand-black/85 text-brand-bg text-[10px] border-b border-brand-yellow/30">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-bold tracking-widest text-brand-yellow">● CAMERA ACTIVE</span>
        </div>
        <div className="flex items-center gap-3 text-brand-gray-muted text-[9px]">
          <span>60 FPS</span>
          <span className="text-brand-bg font-bold">1080P // ON-DEVICE</span>
          <button
            onClick={() => setLensView(lensView === 'front' ? 'rear' : 'front')}
            className="px-1.5 py-0.5 bg-brand-dark hover:bg-brand-yellow hover:text-brand-black transition-colors text-[9px] text-brand-bg border border-brand-gray-muted"
            title="Toggle Front/Rear Camera"
          >
            {lensView === 'front' ? 'CAM: FRONT' : 'CAM: REAR'}
          </button>
        </div>
      </div>

      {/* Viewport Area with Crosshairs and Hand Tracking */}
      <div className="relative h-64 sm:h-72 w-full flex items-center justify-center bg-gradient-to-b from-brand-dark/95 to-brand-darker">
        {/* Optical Rule-of-Thirds Grid Lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-15">
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-white" />
          <div className="border-r border-white" />
          <div />
        </div>

        {/* Framing Corner Markers */}
        <div className="absolute inset-4 pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-yellow" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-yellow" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-yellow" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-yellow" />
        </div>

        {/* Yellow Laser Scanning Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent shadow-[0_0_12px_#FFD000] z-20 animate-scan pointer-events-none" />
        )}

        {/* Hand Landmark Overlay (SVG Skeleton & Keypoints) */}
        <div className="relative w-64 h-60 flex items-center justify-center">
          {/* Hand Bounding Box */}
          <div className="absolute inset-2 border border-brand-yellow/70 bg-brand-yellow/[0.03] z-10 pointer-events-none">
            <div className="absolute -top-3 left-2 px-1 bg-brand-yellow text-brand-black text-[8px] font-bold">
              ROI: HAND_01 [TRACKED]
            </div>
            <div className="absolute -bottom-3 right-2 px-1 bg-brand-black text-brand-yellow border border-brand-yellow/50 text-[8px]">
              CONF: {confidence}%
            </div>
            <CornerBrackets size="w-2.5 h-2.5" className="border-brand-yellow" />
          </div>

          <svg
            className="w-full h-full filter drop-shadow-[0_0_6px_rgba(255,208,0,0.6)]"
            viewBox="0 0 300 260"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hand Skeleton Bones */}
            {connections.map(([start, end], idx) => {
              const p1 = keypoints.find((k) => k.id === start);
              const p2 = keypoints.find((k) => k.id === end);
              if (!p1 || !p2) return null;
              return (
                <line
                  key={idx}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#FFD000"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              );
            })}

            {/* Hand Landmarks (21 Joints) */}
            {keypoints.map((pt) => {
              const isFingertip = [4, 8, 12, 16, 20].includes(pt.id);
              return (
                <g key={pt.id}>
                  {/* Outer joint halo */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isFingertip ? 5 : 3.5}
                    fill={isFingertip ? '#FFFFFF' : '#FFD000'}
                    stroke="#000000"
                    strokeWidth="1.2"
                  />
                  {isFingertip && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="7"
                      fill="none"
                      stroke="#FFD000"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                      className="animate-spin origin-center"
                      style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Center Crosshair Target */}
        <div className="absolute center pointer-events-none opacity-30">
          <div className="w-8 h-[1px] bg-brand-yellow" />
          <div className="h-8 w-[1px] bg-brand-yellow -mt-4 ml-[15px]" />
        </div>

        {/* Bottom Floating Info Pill Inside Camera */}
        <div className="absolute bottom-2 inset-x-3 flex items-center justify-between pointer-events-none z-20">
          <div className="px-2 py-1 bg-brand-black/90 border border-brand-yellow/40 text-brand-yellow text-[10px] flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-ping" />
            {statusText}
          </div>
          <div className="px-2 py-1 bg-brand-black/90 text-brand-bg text-[9px]">
            SIGN: <span className="text-brand-yellow font-bold">{currentSign}</span>
          </div>
        </div>
      </div>

      {/* Honest Prototype Label Bar */}
      <div className="px-3 py-1.5 bg-brand-black text-brand-gray text-[9px] flex items-center justify-between border-t border-brand-dark">
        <span className="text-brand-yellow font-bold tracking-wider uppercase">
          DEMO RECOGNITION // PROTOTYPE MODE
        </span>
        <span className="text-brand-gray-muted hidden sm:inline">
          DETERMINISTIC SIMULATION FOR JUDGING
        </span>
      </div>
    </div>
  );
};
