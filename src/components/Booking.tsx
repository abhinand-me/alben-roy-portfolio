'use client';

import React, { useState } from 'react';
import { Camera, Instagram, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { soundService } from '@/utils/sound';

export const Booking: React.FC = () => {
  const [photoshootType, setPhotoshootType] = useState('Portraits');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    date: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoshootTypes = [
    'Portraits',
    'Outdoor Portraits',
    'Editorial',
    'Creative Sessions',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playShutterClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundService.playFocusLock();
    }, 700);
  };

  return (
    <section id="contact" className="w-full bg-ivory py-28 px-6 md:px-12 border-t border-charcoal/10">
      <div className="max-w-5xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-charcoal/15 bg-beige/30 text-[10px] font-mono tracking-widest text-charcoal/70 mb-4">
            <Sparkles size={11} className="text-gold" />
            <span>COMMISSIONS & INQUIRIES</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal tracking-tight leading-tight mb-4">
            LET’S CREATE SOMETHING BEAUTIFUL.
          </h2>

          <p className="font-sans text-sm md:text-base text-charcoal/70 font-light leading-relaxed">
            Available for personal portraits, fashion editorials, and intimate creative sessions across Kerala and destination locations.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <a
              href="https://instagram.com/albenroy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundService.playShutterClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-charcoal/20 hover:border-charcoal text-xs font-mono tracking-widest text-charcoal transition-colors"
            >
              <Instagram size={14} />
              <span>@ALBENROY</span>
            </a>
          </div>
        </div>

        {/* INQUIRY FORM CONTAINER */}
        <div className="bg-beige/40 rounded-3xl p-8 md:p-12 border border-charcoal/10 shadow-xl relative overflow-hidden">
          {/* Subtle camera watermark icon */}
          <Camera
            size={240}
            className="absolute -right-16 -bottom-16 text-charcoal/[0.03] pointer-events-none"
          />

          {isSubmitted ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-charcoal text-gold flex items-center justify-center mb-6 shadow-lg animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-3xl text-charcoal font-normal mb-3">
                Inquiry Received
              </h3>
              <p className="font-sans text-sm text-charcoal/70 max-w-md mx-auto mb-8 font-light leading-relaxed">
                Thank you, {formState.name || 'friend'}. Alben Roy will review your session details and get in touch within 24 hours.
              </p>
              <button
                onClick={() => {
                  soundService.playShutterClick();
                  setIsSubmitted(false);
                  setFormState({ name: '', email: '', date: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-full border border-charcoal/30 hover:border-charcoal text-xs font-mono tracking-widest text-charcoal transition-colors"
              >
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {/* PHOTOSHOOT TYPE SELECTOR */}
              <div>
                <label className="block text-xs font-mono text-charcoal/60 uppercase tracking-widest mb-3">
                  01 · SELECT PHOTOSHOOT TYPE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {photoshootTypes.map((type) => {
                    const active = photoshootType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          soundService.playShutterClick();
                          setPhotoshootType(type);
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-mono tracking-wider transition-all border text-center ${
                          active
                            ? 'bg-charcoal text-ivory border-charcoal font-semibold shadow-md'
                            : 'bg-ivory/80 text-charcoal/80 border-charcoal/10 hover:border-charcoal/30'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TWO COLUMN INPUTS: NAME & EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-charcoal/60 uppercase tracking-widest mb-2">
                    02 · YOUR FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Varma"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-ivory border border-charcoal/15 text-charcoal text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-charcoal/60 uppercase tracking-widest mb-2">
                    03 · EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maya@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-ivory border border-charcoal/15 text-charcoal text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors"
                  />
                </div>
              </div>

              {/* PREFERRED DATE */}
              <div>
                <label className="block text-xs font-mono text-charcoal/60 uppercase tracking-widest mb-2">
                  04 · PREFERRED DATE OR TIMEFRAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next month, November 2024, or Flexible"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-ivory border border-charcoal/15 text-charcoal text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-xs font-mono text-charcoal/60 uppercase tracking-widest mb-2">
                  05 · SESSION VISION & DETAILS
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell Alben about your desired aesthetic, mood, location ideas, or wardrobe thoughts..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-ivory border border-charcoal/15 text-charcoal text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-colors resize-none"
                />
              </div>

              {/* SUBMIT BUTTON WITH CAMERA SHUTTER ICON */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-charcoal/10">
                <span className="text-[11px] font-mono text-charcoal/50">
                  ESTIMATED RESPONSE TIME: WITHIN 24 HOURS
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full sm:w-auto px-8 py-4 bg-charcoal text-ivory rounded-full text-xs font-mono tracking-widest hover:bg-gold hover:text-charcoal transition-all shadow-lg flex items-center justify-center gap-3 font-semibold"
                >
                  <Camera
                    size={16}
                    className="text-gold group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'BOOK A SHOOT'}</span>
                  <Send size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

