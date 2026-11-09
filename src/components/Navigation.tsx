'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Camera, Menu, X } from 'lucide-react';
import { soundService } from '@/utils/sound';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundOn(soundService.isEnabled());
    const unsub = soundService.subscribe((enabled) => setSoundOn(enabled));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSoundToggle = () => {
    soundService.toggle();
  };

  const navItems = [
    { label: 'WORK', id: 'work' },
    { label: 'STORIES', id: 'stories' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleClickItem = (id: string) => {
    soundService.playShutterClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/85 backdrop-blur-md border-b border-charcoal/10 py-3.5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => handleClickItem('hero')}
          className="group flex flex-col items-start text-left focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl tracking-widest font-semibold text-charcoal group-hover:text-gold transition-colors">
              ALBEN ROY
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-80" />
          </div>
          <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-charcoal/60 uppercase">
            Portrait & Editorial
          </span>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-10 font-sans text-xs font-medium tracking-mega text-charcoal/80">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClickItem(item.id)}
              className="relative py-1 group transition-colors hover:text-charcoal focus:outline-none"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-charcoal group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* CONTROLS (Sound Toggle + Book CTA) */}
        <div className="hidden md:flex items-center gap-5">
          {/* Sound mechanical click toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label="Toggle camera mechanical sound"
            title={soundOn ? 'Sound On (Mechanical Click Active)' : 'Sound Off (Click to Enable Shutter Audio)'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-widest transition-all ${
              soundOn
                ? 'border-gold bg-gold/10 text-charcoal font-semibold shadow-sm'
                : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/40 hover:text-charcoal'
            }`}
          >
            {soundOn ? <Volume2 size={13} className="text-gold" /> : <VolumeX size={13} />}
            <span>{soundOn ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => handleClickItem('contact')}
            className="group flex items-center gap-2.5 px-4 py-2 bg-charcoal text-ivory rounded-full text-xs font-mono tracking-wider hover:bg-charcoal-700 transition-all shadow-sm"
          >
            <Camera
              size={14}
              className="group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300 text-gold"
            />
            <span>INQUIRE</span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={handleSoundToggle}
            className="p-2 text-charcoal/70 hover:text-charcoal"
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 size={16} className="text-gold" /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory border-b border-charcoal/15 px-6 py-8 shadow-xl">
          <div className="flex flex-col gap-6 font-sans text-sm tracking-mega text-charcoal">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClickItem(item.id)}
                className="text-left font-serif text-2xl tracking-widest py-2 border-b border-charcoal/5 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-charcoal/40">0{navItems.indexOf(item) + 1}</span>
              </button>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => handleClickItem('contact')}
                className="w-full py-3 bg-charcoal text-ivory rounded-full text-xs font-mono tracking-widest flex items-center justify-center gap-2"
              >
                <Camera size={15} className="text-gold" />
                <span>BOOK A SHOOT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

