'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PHOTOGRAPHS } from '@/data/photos';
import { soundService } from '@/utils/sound';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Maximize2, Minimize2 } from 'lucide-react';

interface LightboxProps {
  photoId: string | null;
  onClose: () => void;
  onSelectPhoto: (photoId: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ photoId, onClose, onSelectPhoto }) => {
  const [isApertureClosing, setIsApertureClosing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentIndex = PHOTOGRAPHS.findIndex((p) => p.id === photoId);
  const currentPhoto = currentIndex !== -1 ? PHOTOGRAPHS[currentIndex] : null;

  useEffect(() => {
    if (!photoId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photoId, currentIndex]);

  const handleNext = () => {
    if (currentIndex === -1) return;
    setIsApertureClosing(true);
    soundService.playShutterClick();
    const nextIndex = (currentIndex + 1) % PHOTOGRAPHS.length;
    setTimeout(() => {
      onSelectPhoto(PHOTOGRAPHS[nextIndex].id);
      setIsApertureClosing(false);
    }, 150);
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    setIsApertureClosing(true);
    soundService.playShutterClick();
    const prevIndex = (currentIndex - 1 + PHOTOGRAPHS.length) % PHOTOGRAPHS.length;
    setTimeout(() => {
      onSelectPhoto(PHOTOGRAPHS[prevIndex].id);
      setIsApertureClosing(false);
    }, 150);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!currentPhoto) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-charcoal-950/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 select-none animate-fadeIn">
      {/* SHUTTER APERTURE BLADE TRANSITION OVERLAY */}
      <div
        className={`absolute inset-0 z-50 pointer-events-none bg-black transition-opacity duration-150 ${
          isApertureClosing ? 'opacity-90' : 'opacity-0'
        }`}
      />

      {/* TOP HEADER CONTROLS */}
      <div className="flex items-center justify-between z-40 text-ivory/80 font-mono text-xs tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <Camera size={14} className="text-gold" />
          <span className="font-semibold text-white">FRM {currentPhoto.number}</span>
          <span className="text-ivory/40">/ 09</span>
          <span className="hidden sm:inline border-l border-ivory/20 pl-3 text-ivory/60">
            {currentPhoto.category}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full hover:bg-white/10 text-ivory/70 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={() => {
              soundService.playShutterClick();
              onClose();
            }}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-ivory/30 hover:border-gold hover:text-gold text-ivory transition-all text-xs"
          >
            <span>CLOSE</span>
            <X size={14} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* CENTER PHOTOGRAPH STAGE */}
      <div className="relative flex-1 flex items-center justify-center my-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="absolute left-2 md:left-6 z-40 w-12 h-12 rounded-full bg-charcoal-900/80 border border-ivory/15 text-ivory flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all shadow-xl"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Center Frame */}
        <div className="relative max-h-[75vh] w-full max-w-4xl aspect-[3/4] flex items-center justify-center">
          <div className="relative w-full h-full max-h-[75vh] rounded-xl overflow-hidden shadow-2xl border-2 border-ivory/20 bg-charcoal-900">
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              priority
              sizes="90vw"
              className="object-contain object-center"
            />

            {/* Corner Viewfinder Focus Reticles */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-gold/70" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-gold/70" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-gold/70" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-gold/70" />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next photograph"
          className="absolute right-2 md:right-6 z-40 w-12 h-12 rounded-full bg-charcoal-900/80 border border-ivory/15 text-ivory flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all shadow-xl"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* BOTTOM METADATA BAR (Exposure + Story) */}
      <div className="z-40 max-w-4xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-3 border-t border-ivory/15 text-xs text-ivory">
        {/* Left: Title & Story */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-lg text-white font-normal">
              {currentPhoto.title}
            </h3>
            <span className="text-gold font-mono text-xs">·</span>
            <div className="flex items-center gap-1 font-mono text-[11px] text-ivory/60">
              <MapPin size={11} className="text-gold" />
              <span>{currentPhoto.location}</span>
            </div>
          </div>
          <p className="font-sans text-[11px] text-ivory/70 font-light line-clamp-2 leading-relaxed">
            {currentPhoto.story}
          </p>
        </div>

        {/* Right: Camera Technical Specs */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-ivory/80 bg-charcoal-900/90 px-4 py-2 rounded-xl border border-ivory/15 shadow-md">
          <div>
            <span className="text-ivory/40 block text-[9px]">LENS</span>
            <span className="text-white font-semibold">{currentPhoto.camera.focalLength}</span>
          </div>
          <span className="text-ivory/20">|</span>
          <div>
            <span className="text-ivory/40 block text-[9px]">IRIS</span>
            <span className="text-gold font-semibold">{currentPhoto.camera.aperture}</span>
          </div>
          <span className="text-ivory/20">|</span>
          <div>
            <span className="text-ivory/40 block text-[9px]">SHUTTER</span>
            <span className="text-white font-semibold">{currentPhoto.camera.shutter}</span>
          </div>
          <span className="text-ivory/20">|</span>
          <div>
            <span className="text-ivory/40 block text-[9px]">ISO</span>
            <span className="text-white font-semibold">{currentPhoto.camera.iso}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

