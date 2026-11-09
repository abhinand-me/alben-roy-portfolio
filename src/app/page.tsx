'use client';

import React, { useState } from 'react';
import { CameraIntro } from '@/components/CameraIntro';
import { CameraCursor } from '@/components/CameraCursor';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Gallery } from '@/components/Gallery';
import { FeaturedStories } from '@/components/FeaturedStories';
import { About } from '@/components/About';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';
import { Lightbox } from '@/components/Lightbox';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-ivory text-charcoal">
      {/* 01 — Cinematic Camera Viewfinder Opening Experience */}
      {!introFinished && (
        <CameraIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* 04 — Camera Focus Reticle Custom Cursor (Desktop) */}
      <CameraCursor />

      {/* Navigation Header */}
      <Navigation onNavigate={handleNavigate} />

      {/* 02 — Hero Experience */}
      <Hero
        onExploreWork={() => handleNavigate('work')}
        onOpenPhoto={(id) => setActivePhotoId(id)}
      />

      {/* 03 — Selected Photography Gallery */}
      <Gallery onOpenPhoto={(id) => setActivePhotoId(id)} />

      {/* 05 — Featured Photo Stories */}
      <FeaturedStories onOpenPhoto={(id) => setActivePhotoId(id)} />

      {/* 06 — About Alben Roy */}
      <About onContactClick={() => handleNavigate('contact')} />

      {/* 07 — Book a Photoshoot */}
      <Booking />

      {/* 08 — Footer */}
      <Footer />

      {/* Fullscreen Cinematic Lightbox */}
      {activePhotoId && (
        <Lightbox
          photoId={activePhotoId}
          onClose={() => setActivePhotoId(null)}
          onSelectPhoto={(id) => setActivePhotoId(id)}
        />
      )}
    </main>
  );
}

