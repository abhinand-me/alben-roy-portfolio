'use client';

import React, { useEffect, useState } from 'react';
import { soundService } from '@/utils/sound';

interface CameraIntroProps {
  onComplete: () => void;
}

export const CameraIntro: React.FC<CameraIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'viewfinder' | 'locking' | 'shutter' | 'finished'>('viewfinder');
  const [evValue, setEvValue] = useState('-1.3');

  useEffect(() => {
    // Stage 1: EV meter balances and focus locks
    const timer1 = setTimeout(() => {
      setEvValue('0.0');
      setPhase('locking');
      soundService.playFocusLock();
    }, 900);

    // Stage 2: Shutter snap
    const timer2 = setTimeout(() => {
      setPhase('shutter');
      soundService.playShutterClick();
    }, 1800);

    // Stage 3: Complete transition to hero
    const timer3 = setTimeout(() => {
      setPhase('finished');
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    soundService.playShutterClick();
    setPhase('finished');
    onComplete();
  };

  if (phase === 'finished') return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-charcoal-950 flex flex-col justify-between p-6 md:p-12 transition-opacity duration-700 select-none ${
        phase === 'shutter' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Shutter Blade Flash Overlay */}
      {phase === 'shutter' && (
        <div className="absolute inset-0 bg-ivory z-50 animate-[ping_0.3s_cubic-bezier(0,0,0.2,1)_1]" />
      )}

      {/* TOP STATUS BAR (Camera Viewfinder HUD) */}
      <div className="flex items-center justify-between text-[11px] md:text-xs font-mono text-ivory/70 tracking-widest uppercase">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-rec-blink" />
            <span className="font-semibold text-ivory">REC</span>
            <span className="text-ivory/50">00:00:01</span>
          </div>
          <span className="hidden sm:inline border-l border-ivory/20 pl-4 text-ivory/60">
            4K UHD · 24P
          </span>
          <span className="hidden md:inline border-l border-ivory/20 pl-4 text-ivory/60">
            RAW UNCOMPRESSED
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-3 py-1.5 rounded border border-ivory/20 hover:border-ivory/60 transition-colors text-[10px] tracking-mega text-ivory/80 hover:text-ivory bg-charcoal-900/60 backdrop-blur-sm"
        >
          <span>SKIP INTRO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover:scale-125 transition-transform" />
        </button>
      </div>

      {/* CENTER VIEWFINDER RETICLE & FOCUS BRACKETS */}
      <div className="relative flex-1 flex items-center justify-center my-4">
        {/* Subtle Lens Focus Ring Rotating */}
        <div
          className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-ivory/15 transition-all duration-1000 ${
            phase === 'locking' ? 'rotate-90 scale-95 border-gold/40' : 'rotate-0 scale-100'
          }`}
        />

        {/* Outer Circular Aperture Guide */}
        <div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-ivory/10 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-ivory/20 animate-pulse" />
        </div>

        {/* Central Focus Brackets Box */}
        <div
          className={`relative w-36 h-36 md:w-48 md:h-48 transition-all duration-500 flex items-center justify-center ${
            phase === 'locking'
              ? 'scale-90 border-gold'
              : 'scale-110 border-ivory/40'
          }`}
        >
          {/* 4 Corner Brackets */}
          <div
            className={`absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 transition-colors duration-300 ${
              phase === 'locking' ? 'border-gold shadow-[0_0_8px_rgba(197,168,128,0.5)]' : 'border-ivory/60'
            }`}
          />
          <div
            className={`absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 transition-colors duration-300 ${
              phase === 'locking' ? 'border-gold shadow-[0_0_8px_rgba(197,168,128,0.5)]' : 'border-ivory/60'
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 transition-colors duration-300 ${
              phase === 'locking' ? 'border-gold shadow-[0_0_8px_rgba(197,168,128,0.5)]' : 'border-ivory/60'
            }`}
          />
          <div
            className={`absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 transition-colors duration-300 ${
              phase === 'locking' ? 'border-gold shadow-[0_0_8px_rgba(197,168,128,0.5)]' : 'border-ivory/60'
            }`}
          />

          {/* Central Target Crosshair */}
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gold transition-transform duration-300 scale-100" />
            <div className="absolute w-8 h-[1px] bg-gold/50" />
            <div className="absolute h-8 w-[1px] bg-gold/50" />
          </div>

          {/* Focus Lock Label */}
          <span
            className={`absolute -bottom-8 font-mono text-[10px] tracking-widest px-2 py-0.5 rounded transition-all duration-300 ${
              phase === 'locking'
                ? 'text-gold bg-charcoal-900 border border-gold/40 opacity-100'
                : 'text-ivory/40 opacity-70'
            }`}
          >
            {phase === 'locking' ? '● AF-LOCK [CONFIRMED]' : 'AF-C [SEARCHING]'}
          </span>
        </div>

        {/* Thirds Grid lines (Subtle Camera Framing Rule of Thirds) */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-ivory" />
          <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-ivory" />
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-ivory" />
          <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-ivory" />
        </div>
      </div>

      {/* BOTTOM TELEMETRY BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ivory/80 tracking-widest uppercase border-t border-ivory/15 pt-4">
        {/* Exposure scale */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-ivory/50">EXP</span>
          <div className="flex items-center gap-1.5 bg-charcoal-900/80 px-2.5 py-1 rounded border border-ivory/10">
            <span className="text-ivory/40">-2</span>
            <span className="text-ivory/40">-1</span>
            <span
              className={`font-bold transition-colors duration-300 ${
                phase === 'locking' ? 'text-gold' : 'text-ivory'
              }`}
            >
              [ 0 ]
            </span>
            <span className="text-ivory/40">+1</span>
            <span className="text-ivory/40">+2</span>
          </div>
          <span className="text-[11px] text-gold font-bold">{evValue} EV</span>
        </div>

        {/* Camera specs */}
        <div className="flex items-center gap-4 text-[11px] md:text-xs">
          <div className="bg-charcoal-900/80 px-2 py-1 rounded border border-ivory/10">
            <span className="text-ivory/40 mr-1.5">SS</span>
            <span className="font-semibold text-ivory">1/640s</span>
          </div>
          <div className="bg-charcoal-900/80 px-2 py-1 rounded border border-ivory/10">
            <span className="text-ivory/40 mr-1.5">F</span>
            <span className="font-semibold text-gold">f/1.4</span>
          </div>
          <div className="bg-charcoal-900/80 px-2 py-1 rounded border border-ivory/10">
            <span className="text-ivory/40 mr-1.5">ISO</span>
            <span className="font-semibold text-ivory">100</span>
          </div>
          <div className="hidden sm:block bg-charcoal-900/80 px-2 py-1 rounded border border-ivory/10">
            <span className="font-semibold text-ivory">85mm GM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

