'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PHOTOGRAPHS } from '@/data/photos';
import { soundService } from '@/utils/sound';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onOpenPhoto: (photoId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenPhoto }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  // Selected 3 premier hero photographs
  const heroPhotos = [
    PHOTOGRAPHS[0], // The Bougainvillea Reverie
    PHOTOGRAPHS[1], // Heritage & Crimson
    PHOTOGRAPHS[2], // Monsoon Emerald
  ];

  const currentPhoto = heroPhotos[activeHeroIndex];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroSelect = (index: number) => {
    soundService.playShutterClick();
    setActiveHeroIndex(index);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-ivory flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 overflow-hidden"
    >
      {/* BACKGROUND DECORATIVE WATERMARK */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[15vw] font-serif font-bold text-charcoal/[0.025] tracking-widest whitespace-nowrap">
        ALBEN ROY
      </div>

      {/* TOP HERO SUB-BAR */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono tracking-widest text-charcoal/50 uppercase border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
          <span>KERALA, INDIA · STUDIO & ON-LOCATION</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>APERTURE PRIORITY</span>
          <span>·</span>
          <span>NATURAL LIGHT PORTRAITURE</span>
        </div>
      </div>

      {/* CENTER EDITORIAL STAGE */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: Oversized Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center z-10">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-charcoal/15 bg-ivory/80 text-[10px] font-mono tracking-widest text-charcoal/70 mb-6">
            <Sparkles size={11} className="text-gold" />
            <span>FINE ART & EDITORIAL PORTFOLIO</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-charcoal leading-[0.95] mb-6">
            ALBEN <br />
            <span className="italic font-light text-charcoal/90">ROY</span>
          </h1>

          <div className="w-16 h-[1.5px] bg-gold mb-6" />

          <p className="font-serif text-xl sm:text-2xl text-charcoal/85 italic font-light max-w-md leading-relaxed mb-4">
            Portrait Photographer
          </p>

          <p className="font-sans text-sm sm:text-base text-charcoal/70 max-w-md font-light leading-relaxed mb-8">
            Capturing people, light & moments across South India’s coastal heritage, botanical sanctuaries, and intimate spaces.
          </p>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreWork}
              className="group px-7 py-3.5 bg-charcoal text-ivory rounded-full text-xs font-mono tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-md flex items-center gap-3"
            >
              <span>EXPLORE WORK</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => onOpenPhoto(currentPhoto.id)}
              className="px-6 py-3.5 border border-charcoal/20 hover:border-charcoal text-charcoal rounded-full text-xs font-mono tracking-widest transition-colors flex items-center gap-2"
            >
              <span>VIEW FULL FRAME</span>
              <span className="text-gold font-bold">[{currentPhoto.number}]</span>
            </button>
          </div>

          {/* Camera Telemetry Capsule */}
          <div className="mt-8 flex items-center gap-4 text-[11px] font-mono text-charcoal/60 bg-beige/40 px-4 py-2 rounded-lg border border-charcoal/10">
            <span>{currentPhoto.camera.lens}</span>
            <span>·</span>
            <span className="text-charcoal font-semibold">{currentPhoto.camera.aperture}</span>
            <span>·</span>
            <span>{currentPhoto.camera.shutter}</span>
            <span>·</span>
            <span>ISO {currentPhoto.camera.iso}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: The Primary Photograph Showcase */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div
            data-photo-item
            onClick={() => onOpenPhoto(currentPhoto.id)}
            style={{
              transform: `translateY(${scrollY * 0.05}px) scale(${1 - Math.min(scrollY * 0.0003, 0.05)})`,
            }}
            className="group relative cursor-pointer w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-700 ease-out bg-charcoal-900"
          >
            {/* Real Photograph with Next.js Image */}
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Subtle Vignette & Film Border */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-black/20 pointer-events-none" />

            {/* 4 Camera Corner Viewfinder Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/80 group-hover:border-gold transition-colors" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/80 group-hover:border-gold transition-colors" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/80 group-hover:border-gold transition-colors" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/80 group-hover:border-gold transition-colors" />

            {/* Image Captions on Card */}
            <div className="absolute bottom-6 left-6 right-6 text-ivory pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest text-gold uppercase block mb-1">
                {currentPhoto.category} · {currentPhoto.location}
              </span>
              <h3 className="font-serif text-2xl font-normal leading-tight text-white mb-1">
                {currentPhoto.title}
              </h3>
              <p className="text-xs font-sans text-ivory/80 line-clamp-1 font-light">
                {currentPhoto.story}
              </p>
            </div>

            {/* Center View Target on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-charcoal/20">
              <div className="px-4 py-2 rounded-full bg-ivory/90 backdrop-blur-md text-charcoal font-mono text-xs tracking-widest border border-ivory shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>EXPAND VIEW</span>
              </div>
            </div>
          </div>

          {/* Quick Frame Selector Carousel Dots */}
          <div className="flex items-center gap-3 mt-6">
            <span className="font-mono text-[10px] text-charcoal/40 tracking-widest">FRAMES:</span>
            {heroPhotos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => handleHeroSelect(i)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                  activeHeroIndex === i
                    ? 'bg-charcoal text-ivory font-bold shadow-sm'
                    : 'bg-beige/60 text-charcoal/60 hover:text-charcoal hover:bg-beige'
                }`}
              >
                <span>{photo.number}</span>
                <span className="hidden sm:inline text-[10px] opacity-75">{photo.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR: Camera Focus Scale */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-charcoal/10">
        <div className="flex items-center gap-3 text-[11px] font-mono text-charcoal/50 tracking-widest uppercase">
          <span>SCROLL FOR ARCHIVE</span>
          <ArrowDown size={13} className="animate-bounce text-gold" />
        </div>

        {/* Animated Camera Lens Distance Focus Scale */}
        <div className="hidden md:flex items-center gap-3 font-mono text-[10px] text-charcoal/40 tracking-widest">
          <span>FOCUS SCALE:</span>
          <span className="text-charcoal/30">0.5m</span>
          <span className="text-charcoal/40">·</span>
          <span className="text-charcoal/40">0.8m</span>
          <span className="text-charcoal/40">·</span>
          <span className="text-gold font-bold bg-gold/15 px-1.5 py-0.5 rounded">1.4m [LOCK]</span>
          <span className="text-charcoal/40">·</span>
          <span className="text-charcoal/40">2.5m</span>
          <span className="text-charcoal/40">·</span>
          <span className="text-charcoal/30">∞</span>
        </div>

        <div className="text-right font-mono text-[11px] text-charcoal/50 tracking-widest">
          FRAME 01 / 09
        </div>
      </div>
    </section>
  );
};

