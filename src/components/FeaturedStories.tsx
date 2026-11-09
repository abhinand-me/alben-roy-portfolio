'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FEATURED_STORIES } from '@/data/photos';
import { soundService } from '@/utils/sound';
import { Camera, MapPin, Calendar, Quote, ChevronRight } from 'lucide-react';

interface FeaturedStoriesProps {
  onOpenPhoto: (photoId: string) => void;
}

export const FeaturedStories: React.FC<FeaturedStoriesProps> = ({ onOpenPhoto }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const activeStory = FEATURED_STORIES[activeStoryIndex];

  const handleSelectStory = (index: number) => {
    soundService.playShutterClick();
    setActiveStoryIndex(index);
  };

  return (
    <section id="stories" className="w-full bg-charcoal-950 text-ivory py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle Film Grain Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-ivory/15 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-gold uppercase mb-3">
              <Camera size={14} />
              <span>EDITORIAL PHOTO ESSAYS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory tracking-tight font-normal">
              Featured Stories
            </h2>
          </div>

          {/* STORY SELECTOR TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {FEATURED_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => handleSelectStory(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  activeStoryIndex === idx
                    ? 'bg-gold text-charcoal font-bold shadow-lg'
                    : 'bg-charcoal-900 text-ivory/60 hover:text-ivory hover:bg-charcoal-800 border border-ivory/10'
                }`}
              >
                <span>{story.number}</span>
                <span className="hidden sm:inline ml-2 text-[10px] opacity-80">{story.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE STORY EDITORIAL SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* LEFT: Cover Hero Portrait */}
          <div className="lg:col-span-7">
            <div
              data-photo-item
              onClick={() => onOpenPhoto(activeStory.photos[0].id)}
              className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-ivory/15 bg-charcoal-900"
            >
              <Image
                src={activeStory.coverImage}
                alt={activeStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" />

              {/* Viewfinder brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-ivory/70 group-hover:border-gold transition-colors" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-ivory/70 group-hover:border-gold transition-colors" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-ivory/70 group-hover:border-gold transition-colors" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-ivory/70 group-hover:border-gold transition-colors" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-gold tracking-widest uppercase block mb-1">
                  MAIN COVER FRAME
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-normal mb-2">
                  {activeStory.title}
                </h3>
                <p className="text-sm font-sans text-ivory/80 font-light max-w-lg">
                  {activeStory.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Narrative & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-xs font-mono text-ivory/50 uppercase tracking-widest mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-gold" />
                  <span>{activeStory.location}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-gold" />
                  <span>{activeStory.date}</span>
                </div>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight mb-6">
                {activeStory.title}
              </h3>

              <p className="font-sans text-sm md:text-base text-ivory/75 font-light leading-relaxed mb-8">
                {activeStory.description}
              </p>

              {/* Pull quote */}
              <div className="p-6 rounded-xl bg-charcoal-900/80 border border-ivory/10 mb-8 relative">
                <Quote size={20} className="text-gold/60 mb-2" />
                <p className="font-serif text-base italic text-ivory/90 leading-relaxed">
                  "{activeStory.quote}"
                </p>
                <span className="block mt-3 text-[11px] font-mono tracking-widest text-gold uppercase">
                  — Alben Roy
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {activeStory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-charcoal-800 text-ivory/70 border border-ivory/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onOpenPhoto(activeStory.photos[0].id)}
              className="group self-start flex items-center gap-3 px-6 py-3 rounded-full bg-ivory text-charcoal text-xs font-mono tracking-widest hover:bg-gold hover:text-charcoal transition-all font-semibold"
            >
              <span>OPEN PHOTO STORY</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* SUPPORTING IMAGE SEQUENCE TRIPTYCH */}
        <div className="mt-12">
          <div className="flex items-center justify-between text-xs font-mono text-ivory/50 uppercase tracking-widest mb-6">
            <span>STORY FRAMES SEQUENCE</span>
            <span>3 PHOTOGRAPHS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {activeStory.photos.map((photo, i) => (
              <div
                key={photo.id}
                data-photo-item
                onClick={() => onOpenPhoto(photo.id)}
                className="group relative cursor-pointer aspect-[3/4] rounded-xl overflow-hidden bg-charcoal-900 border border-ivory/10 shadow-lg hover:border-gold/60 transition-all duration-300"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 left-3 bg-charcoal-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-gold tracking-widest">
                  FRAME 0{i + 1}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-ivory">
                  <div className="font-serif text-base text-white font-normal truncate">
                    {photo.title}
                  </div>
                  <div className="text-[10px] font-mono text-ivory/60 truncate">
                    {photo.camera.focalLength} · {photo.camera.aperture}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

