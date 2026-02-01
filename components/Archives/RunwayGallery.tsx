"use client";

import { useState } from "react";
import Image from "next/image";
import type { RunwayShow, RunwayPhoto } from "@/lib/runway-data";

function PhotoCard({ photo, index, totalPhotos }: { photo: RunwayPhoto; index: number; totalPhotos: number }) {
  // Create a more dramatic, editorial layout
  // First image is hero/full width, then alternating large/small
  const isHero = index === 0;
  const isFeature = index === 1 || index === 4;
  const lookNumber = index + 1; // Use index for look number instead of photo.id

  if (isHero) {
    // Full width hero image
    return (
      <div className="col-span-2 group relative overflow-hidden bg-black">
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
            sizes="100vw"
            priority
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
          {/* Look number */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <span className="text-white/60 text-xs tracking-widest">LOOK {lookNumber}</span>
          </div>
        </div>
      </div>
    );
  }

  if (isFeature) {
    // Large feature images
    return (
      <div className="col-span-2 sm:col-span-1 group relative overflow-hidden bg-black">
        <div className="relative aspect-[3/4]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          {/* Look number */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white/80 text-xs tracking-widest">LOOK {lookNumber}</span>
          </div>
        </div>
      </div>
    );
  }

  // Standard images with elegant proportions
  return (
    <div className="col-span-1 group relative overflow-hidden bg-black">
      <div className="relative aspect-[3/4]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        {/* Look number */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white/80 text-[10px] sm:text-xs tracking-widest">LOOK {lookNumber}</span>
        </div>
      </div>
    </div>
  );
}

export function RunwayGallery({ show }: { show: RunwayShow }) {
  const [activeTheme, setActiveTheme] = useState(0);
  const currentTheme = show.themes[activeTheme];

  return (
    <>
      {/* Theme Tabs */}
      <section className="relative px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-8 sm:gap-12">
            {show.themes.map((theme, index) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(index)}
                className={`relative pb-3 text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeTheme === index
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
                }`}
              >
                {theme.name}
                {/* Active indicator */}
                {activeTheme === index && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px bg-gray-900 dark:bg-red-700" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery - Editorial Style */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {currentTheme.photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                totalPhotos={currentTheme.photos.length}
              />
            ))}
          </div>
        </div>

        {/* Collection count */}
        <div className="mt-8 sm:mt-12 text-center">
          <span className="text-xs text-gray-400 dark:text-gray-600 tracking-widest">
            {currentTheme.photos.length} LOOKS
          </span>
        </div>
      </section>
    </>
  );
}
