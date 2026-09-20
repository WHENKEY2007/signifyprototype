import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

export interface CameraPreviewProps {
  currentSign?: string;
  confidence?: number;
  isScanning?: boolean;
  statusText?: string;
  handPoseType?: string;
  className?: string;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  currentSign,
  confidence,
  isScanning = false,
  statusText = 'SHOW YOUR SIGN',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraPermissionFailed, setCameraPermissionFailed] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  // Attempt real camera access
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraActive(false);
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
          setCameraActive(true);
          setCameraPermissionFailed(false);
        }
      } catch {
        setCameraActive(false);
        setCameraPermissionFailed(true);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return (
    <div
      className={`relative w-full rounded-2xl bg-black border-2 border-brand-gold/60 overflow-hidden select-none shadow-[0_0_20px_rgba(255,208,0,0.15)] ${className}`}
    >
      {/* Video Element for Real Camera Feed */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          cameraActive ? 'opacity-90' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}
      />

      {/* Fallback Animated Stage when camera is simulated / denied */}
      {!cameraActive && (
        <div className="w-full h-full min-h-[280px] sm:min-h-[340px] flex flex-col items-center justify-center bg-gradient-to-b from-neutral-950 via-black to-neutral-950 text-neutral-300 p-6 relative">
          {/* Subtle Ambient Hand Silhouette Guide */}
          <div className="relative w-44 h-52 flex items-center justify-center">
            {/* Soft pulsing gold halo */}
            <div
              className={`absolute inset-0 rounded-full bg-brand-gold/15 blur-xl transition-transform duration-700 ${
                isScanning ? 'scale-110 opacity-70 animate-pulse' : 'scale-95 opacity-30'
              }`}
            />

            {/* Hand Contour Guide (Vector SVG) */}
            <svg
              className={`w-36 h-44 transition-all duration-300 ${
                isScanning
                  ? 'text-brand-gold stroke-brand-gold'
                  : currentSign
                  ? 'text-brand-gold stroke-brand-gold drop-shadow-[0_0_8px_rgba(255,208,0,0.6)]'
                  : 'text-neutral-600 stroke-neutral-600'
              }`}
              viewBox="0 0 100 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stylized Hand Silhouette */}
              <path
                d="M36 45V15C36 12 39 10 42 10C45 10 48 12 48 15V40M48 40V12C48 9 51 7 54 7C57 7 60 9 60 12V40M60 40V18C60 15 63 13 66 13C69 13 72 15 72 18V45M72 45V28C72 25 75 23 78 23C81 23 84 25 84 28V68C84 88 74 105 52 105C35 105 24 93 24 76V52C24 48 28 45 32 47C35 49 36 52 36 56V65M24 76C24 60 18 52 23 45C26 40 31 40 36 45"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={isScanning ? '4 3' : 'none'}
                className={isScanning ? 'animate-pulse' : ''}
              />
            </svg>
          </div>

          <p className="font-mono text-[10px] text-neutral-400 text-center mt-2 max-w-[220px] uppercase tracking-wider">
            {cameraPermissionFailed
              ? 'SIMULATED RECOGNITION ACTIVE'
              : 'POSITION HAND INSIDE FRAME TO SIGN'}
          </p>
        </div>
      )}

      {/* Gold Hand Framing Corners Overlay */}
      <div className="absolute inset-4 pointer-events-none flex items-center justify-center">
        <div className="w-56 h-64 border border-dashed border-brand-gold/30 rounded-3xl relative flex items-center justify-center">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-brand-gold rounded-tl-lg shadow-[0_0_8px_#FFD000]" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-brand-gold rounded-tr-lg shadow-[0_0_8px_#FFD000]" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-brand-gold rounded-bl-lg shadow-[0_0_8px_#FFD000]" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-brand-gold rounded-br-lg shadow-[0_0_8px_#FFD000]" />
        </div>
      </div>

      {/* Top Floating Controls */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto z-20 font-mono text-[10px]">
        <div className="px-2.5 py-1 bg-black/85 backdrop-blur-md rounded-full text-brand-gold flex items-center gap-1.5 border border-brand-gold/40 font-bold">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              cameraActive ? 'bg-brand-gold' : 'bg-brand-gold animate-pulse'
            }`}
          />
          <span>{cameraActive ? 'CAMERA: ACTIVE' : 'DEMO MODE'}</span>
        </div>

        {cameraActive && (
          <button
            onClick={toggleCameraFacing}
            className="p-1.5 bg-black/85 backdrop-blur-md rounded-full text-neutral-300 hover:text-brand-gold transition-colors border border-neutral-700"
            title="Flip Camera"
            aria-label="Flip Camera"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Bottom Status Pill inside Camera */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-center pointer-events-none z-20">
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 shadow-lg backdrop-blur-md transition-all uppercase tracking-wider ${
            isScanning
              ? 'bg-black/90 text-brand-gold border border-brand-gold animate-pulse'
              : currentSign
              ? 'bg-brand-gold text-black border border-brand-gold shadow-[0_0_12px_rgba(255,208,0,0.5)]'
              : 'bg-black/90 text-white border border-neutral-800'
          }`}
        >
          {isScanning && (
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
          )}
          <span>{statusText}</span>
          {confidence !== undefined && (
            <span className="opacity-90 font-black">({confidence}%)</span>
          )}
        </div>
      </div>
    </div>
  );
};
