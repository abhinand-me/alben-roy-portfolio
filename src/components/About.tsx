'use client';

import React from 'react';
import Image from 'next/image';
import { PHOTOGRAPHER_INFO } from '@/data/photos';
import { Camera, Instagram, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundService } from '@/utils/sound';

interface AboutProps {
  onContactClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="w-full bg-ivory py-28 px-6 md:px-12 border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Authentic Personal Portrait of Alben Roy */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-charcoal-900 shadow-2xl border-4 border-white">
              <Image
                src={PHOTOGRAPHER_INFO.avatar}
                alt="Alben Roy Portrait Photographer"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />

              {/* Viewfinder Overlay Frame */}
              <div className="absolute inset-0 border border-white/20 pointer-events-none rounded-xl m-3" />
              <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-gold" />

              {/* Verified badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-charcoal-950/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-ivory/15 flex items-center justify-between text-ivory">
                <div>
                  <div className="font-serif text-sm font-semibold tracking-wide flex items-center gap-1.5">
                    <span>Alben Roy</span>
                    <CheckCircle2 size={13} className="text-blue-400" />
                  </div>
                  <div className="font-mono text-[10px] text-ivory/60 tracking-widest">
                    @albenroy
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Quick stats row under photo */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-6">
              {PHOTOGRAPHER_INFO.stats.slice(0, 2).map((s) => (
                <div
                  key={s.label}
                  className="bg-beige/40 border border-charcoal/10 rounded-xl p-3 text-center"
                >
                  <div className="font-serif text-xl font-bold text-charcoal">{s.value}</div>
                  <div className="font-mono text-[10px] text-charcoal/60 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Bio & Creative Philosophy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-charcoal/15 bg-beige/30 text-[10px] font-mono tracking-widest text-charcoal/70 mb-4">
              <Sparkles size={11} className="text-gold" />
              <span>THE PHOTOGRAPHER'S EYE</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal tracking-tight mb-6">
              "Capturing people, light & moments."
            </h2>

            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed mb-6">
              {PHOTOGRAPHER_INFO.bio}
            </p>

            <div className="w-full border-l-2 border-gold pl-6 py-2 my-4 bg-beige/20 rounded-r-xl">
              <p className="font-serif text-lg italic text-charcoal/90 leading-relaxed">
                {PHOTOGRAPHER_INFO.philosophy}
              </p>
            </div>

            {/* 3 Creative Approaches */}
            <div className="w-full my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {PHOTOGRAPHER_INFO.approach.map((item, idx) => (
                <div key={item.title} className="flex flex-col">
                  <span className="font-mono text-[10px] text-gold tracking-widest uppercase mb-1">
                    0{idx + 1} · PRINCIPLE
                  </span>
                  <h4 className="font-serif text-base font-semibold text-charcoal mb-2">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-charcoal/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Links and Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-charcoal/10 w-full">
              <button
                onClick={() => {
                  soundService.playShutterClick();
                  onContactClick();
                }}
                className="px-6 py-3 bg-charcoal text-ivory rounded-full text-xs font-mono tracking-widest hover:bg-gold hover:text-charcoal transition-all shadow-md flex items-center gap-2"
              >
                <Camera size={14} className="text-gold" />
                <span>COMMISSION A SESSION</span>
              </button>

              <a
                href={PHOTOGRAPHER_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundService.playShutterClick()}
                className="px-5 py-3 border border-charcoal/20 hover:border-charcoal text-charcoal rounded-full text-xs font-mono tracking-widest transition-colors flex items-center gap-2"
              >
                <Instagram size={14} />
                <span>INSTAGRAM @ALBENROY</span>
              </a>

              <a
                href={`mailto:${PHOTOGRAPHER_INFO.socials.email}`}
                className="px-5 py-3 text-charcoal/70 hover:text-charcoal rounded-full text-xs font-mono tracking-widest transition-colors flex items-center gap-2"
              >
                <Mail size={14} />
                <span>EMAIL</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

