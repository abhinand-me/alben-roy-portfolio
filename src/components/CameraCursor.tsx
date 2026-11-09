'use client';

import React, { useEffect, useState } from 'react';

export const CameraCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check for touch / mobile devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const photoEl = target.closest('[data-photo-item], [data-cursor-view]');
        setIsHoveringPhoto(Boolean(photoEl));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {isHoveringPhoto ? (
        // Expanded Camera Focus Brackets with "VIEW" label
        <div
          className={`relative w-20 h-20 transition-all duration-300 flex items-center justify-center ${
            isClicking ? 'scale-75 rotate-45' : 'scale-100 rotate-0'
          }`}
        >
          {/* Top Left Bracket */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-ivory" />
          {/* Top Right Bracket */}
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-ivory" />
          {/* Bottom Left Bracket */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-ivory" />
          {/* Bottom Right Bracket */}
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-ivory" />

          {/* Center AF Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />

          {/* View text badge */}
          <span className="absolute -bottom-5 text-[9px] tracking-widest uppercase font-mono text-ivory/90 bg-charcoal-950/80 px-1.5 py-0.5 rounded border border-ivory/20 shadow-md">
            VIEW
          </span>
        </div>
      ) : (
        // Minimal Camera Focus Crosshair Reticle
        <div
          className={`relative w-6 h-6 flex items-center justify-center transition-all duration-200 ${
            isClicking ? 'scale-75' : 'scale-100'
          }`}
        >
          {/* Center Dot */}
          <div className="w-1 h-1 rounded-full bg-ivory/90" />
          {/* Outer Ring with 4 Crosshair Notches */}
          <div className="absolute inset-0 rounded-full border border-ivory/30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-ivory/60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-ivory/60" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1 bg-ivory/60" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1 bg-ivory/60" />
        </div>
      )}
    </div>
  );
};

