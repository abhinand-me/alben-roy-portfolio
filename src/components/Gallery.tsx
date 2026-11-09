'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { PHOTOGRAPHS } from '@/data/photos';
import { PhotographyCategory, Photograph } from '@/types';
import { soundService } from '@/utils/sound';
import { SlidersHorizontal, Eye } from 'lucide-react';

interface GalleryProps {
  onOpenPhoto: (photoId: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<PhotographyCategory>('All');

  const categories: PhotographyCategory[] = [
    'All',
    'Portraits',
    'Outdoor Portraits',
    'Editorial',
    'Creative Sessions',
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return PHOTOGRAPHS;
    return PHOTOGRAPHS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (cat: PhotographyCategory) => {
    soundService.playShutterClick();
    setSelectedCategory(cat);
  };

  const handlePhotoClick = (id: string) => {
    soundService.playShutterClick();
    onOpenPhoto(id);
  };

  return (
    <section id="work" className="w-full bg-ivory py-24 px-6 md:px-12 border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-gold uppercase mb-3">
              <span className="w-6 h-[1px] bg-gold" />
              <span>SELECTED PHOTOGRAPHY ARCHIVE</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tight font-normal">
              Portraits in Light & Stillness
            </h2>
          </div>

          <p className="font-sans text-xs md:text-sm text-charcoal/70 max-w-sm font-light leading-relaxed">
            Every frame is captured on prime cinema and portrait lenses using available ambient light. Natural skin tonalities, organic textiles, and atmospheric South Indian landscapes.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-charcoal/15">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                    active
                      ? 'bg-charcoal text-ivory font-semibold shadow-sm'
                      : 'bg-beige/40 text-charcoal/70 hover:text-charcoal hover:bg-beige/80 border border-charcoal/10'
                  }`}
                >
                  <span>{cat}</span>
                  {active && <span className="ml-2 text-gold">[{filteredPhotos.length}]</span>}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-charcoal/50">
            <SlidersHorizontal size={14} />
            <span>AUTHENTIC FILM ARCHIVE</span>
          </div>
        </div>

        {/* ASYMMETRIC EDITORIAL PHOTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPhotos.map((photo, index) => {
            // Apply editorial asymmetric layout styling
            const isTall = photo.editorialWidth === 'tall' || index % 3 === 0;

            return (
              <div
                key={photo.id}
                data-photo-item
                onClick={() => handlePhotoClick(photo.id)}
                className={`group cursor-pointer flex flex-col transition-all duration-500 ${
                  isTall ? 'md:row-span-2' : ''
                }`}
              >
                {/* Image Card Container */}
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-charcoal-900 shadow-md border border-charcoal/10 group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                  {/* Corner Focus Brackets that highlight on hover */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/50 group-hover:border-gold group-hover:w-4 group-hover:h-4 transition-all duration-300" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/50 group-hover:border-gold group-hover:w-4 group-hover:h-4 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/50 group-hover:border-gold group-hover:w-4 group-hover:h-4 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/50 group-hover:border-gold group-hover:w-4 group-hover:h-4 transition-all duration-300" />

                  {/* Film Frame Numbering Badge */}
                  <div className="absolute top-4 left-4 bg-charcoal-950/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-ivory/80 tracking-widest border border-white/10">
                    FRM {photo.number}
                  </div>

                  {/* Lens telemetry on top-right */}
                  <div className="absolute top-4 right-4 bg-charcoal-950/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-gold tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.camera.focalLength} · {photo.camera.aperture}
                  </div>

                  {/* Hover Center Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full border border-ivory/80 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm shadow-xl">
                      <Eye size={18} className="text-ivory" />
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-ivory">
                    <div className="text-[10px] font-mono tracking-widest text-gold uppercase mb-1">
                      {photo.category}
                    </div>
                    <h3 className="font-serif text-xl font-normal text-white group-hover:text-gold transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs font-mono text-ivory/60 mt-1">
                      {photo.location}
                    </p>
                  </div>
                </div>

                {/* Minimalist Under-Card Metadata */}
                <div className="flex items-center justify-between pt-3 px-1 text-xs font-mono text-charcoal/60">
                  <span>{photo.camera.lens}</span>
                  <span className="text-charcoal/40 tracking-widest">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1} / 09
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

