'use client';

import React from 'react';
import { ArrowUp, Camera, Instagram, Mail } from 'lucide-react';
import { PHOTOGRAPHER_INFO } from '@/data/photos';
import { soundService } from '@/utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundService.playShutterClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-charcoal-950 text-ivory py-16 px-6 md:px-12 border-t border-ivory/10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-12 border-b border-ivory/10">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-serif text-3xl md:text-4xl tracking-widest font-normal text-white">
                ALBEN ROY
              </span>
              <div className="w-2 h-2 rounded-full bg-gold" />
            </div>
            <p className="font-mono text-xs tracking-widest text-ivory/50 uppercase">
              PHOTOGRAPHER · KERALA, INDIA
            </p>
          </div>

          {/* SOCIAL & CONTACT LINKS */}
          <div className="flex flex-wrap items-center gap-8 font-mono text-xs tracking-mega uppercase text-ivory/70">
            <a
              href={PHOTOGRAPHER_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-2"
            >
              <Instagram size={14} />
              <span>Instagram</span>
            </a>

            <a
              href={`mailto:${PHOTOGRAPHER_INFO.socials.email}`}
              className="hover:text-gold transition-colors flex items-center gap-2"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>

          {/* BACK TO TOP CAMERA BUTTON */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-4 py-2 rounded-full border border-ivory/20 hover:border-gold text-ivory text-xs font-mono tracking-widest hover:text-gold transition-all"
            title="Return to top of page"
          >
            <Camera size={13} className="text-gold group-hover:rotate-45 transition-transform" />
            <span>TOP OF FRAME</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* COPYRIGHT & TECHNICAL SPECS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-ivory/40 tracking-wider gap-4">
          <div>
            © {new Date().getFullYear()} ALBEN ROY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>NATURAL LIGHT PORTRAITURE</span>
            <span>·</span>
            <span>SONY G MASTER</span>
            <span>·</span>
            <span className="text-gold/60">KOCHI / KERALA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

