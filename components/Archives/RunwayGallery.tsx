"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Move } from "lucide-react";
import type { RunwayShow, RunwayPhoto } from "@/lib/runway-data";
import { FocalPointEditor } from "@/components/Admin/FocalPointEditor";

const PAGE_SIZE = 50;

type CardProps = {
  photo: RunwayPhoto;
  lookNumber: number;
  isAdmin: boolean;
  focalOverride?: { x: number; y: number };
  onEditFocalPoint: (photo: RunwayPhoto) => void;
  priority?: boolean;
};

function HeroCard({ photo, lookNumber, isAdmin, focalOverride, onEditFocalPoint }: CardProps) {
  const focalX = focalOverride?.x ?? photo.focalX ?? 50;
  const focalY = focalOverride?.y ?? photo.focalY ?? 50;

  return (
    <div className="col-span-2 md:col-span-3 group relative overflow-hidden bg-black">
      <div className="relative aspect-[16/9] sm:aspect-[21/9]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
          style={{ objectPosition: `${focalX}% ${focalY}%` }}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <span className="text-white/60 text-xs tracking-widest">LOOK {lookNumber}</span>
        </div>
        {isAdmin && (
          <button
            onClick={() => onEditFocalPoint(photo)}
            className="absolute top-3 right-3 z-10 rounded-full bg-black/70 p-2 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/90"
            title="Set focal point"
          >
            <Move className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function HorizontalCard({ photo, lookNumber, isAdmin, focalOverride, onEditFocalPoint, priority }: CardProps) {
  const focalX = focalOverride?.x ?? photo.focalX ?? 50;
  const focalY = focalOverride?.y ?? photo.focalY ?? 50;

  return (
    <div className="col-span-2 md:col-span-2 group relative overflow-hidden bg-black">
      <div className="relative aspect-[3/4]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
          style={{ objectPosition: `${focalX}% ${focalY}%` }}
          sizes="(max-width: 640px) 100vw, 50vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white/80 text-xs tracking-widest">LOOK {lookNumber}</span>
        </div>
        {isAdmin && (
          <button
            onClick={() => onEditFocalPoint(photo)}
            className="absolute top-3 right-3 z-10 rounded-full bg-black/70 p-2 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/90"
            title="Set focal point"
          >
            <Move className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function VerticalCard({ photo, lookNumber, isAdmin, focalOverride, onEditFocalPoint, priority }: CardProps) {
  const focalX = focalOverride?.x ?? photo.focalX ?? 50;
  const focalY = focalOverride?.y ?? photo.focalY ?? 50;

  return (
    <div className="col-span-1 group relative overflow-hidden bg-black">
      <div className="relative aspect-[3/4]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
          style={{ objectPosition: `${focalX}% ${focalY}%` }}
          sizes="(max-width: 640px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white/80 text-[10px] sm:text-xs tracking-widest">LOOK {lookNumber}</span>
        </div>
        {isAdmin && (
          <button
            onClick={() => onEditFocalPoint(photo)}
            className="absolute top-3 right-3 z-10 rounded-full bg-black/70 p-2 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/90"
            title="Set focal point"
          >
            <Move className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function RunwayGallery({ show }: { show: RunwayShow }) {
  const [activeTheme, setActiveTheme] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<RunwayPhoto | null>(null);
  const [focalOverrides, setFocalOverrides] = useState<Record<string, { x: number; y: number }>>({});
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const currentTheme = show.themes[activeTheme];
  const photos = currentTheme.photos;
  const totalPages = Math.ceil(photos.length / PAGE_SIZE);
  const pagePhotos = photos.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset page when switching themes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTheme]);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/check-admin")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    } else {
      setIsAdmin(false);
    }
  }, [isSignedIn]);

  function handleFocalPointSave(x: number, y: number) {
    if (editingPhoto) {
      setFocalOverrides((prev) => ({ ...prev, [editingPhoto.id]: { x, y } }));
    }
    setEditingPhoto(null);
    router.refresh();
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
                {activeTheme === index && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px bg-gray-900 dark:bg-red-700" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {pagePhotos.map((photo, pageIndex) => {
              const globalIndex = (currentPage - 1) * PAGE_SIZE + pageIndex;
              const lookNumber = globalIndex + 1;
              const isAboveFold = pageIndex < 6;
              const commonProps = {
                photo,
                lookNumber,
                isAdmin,
                focalOverride: focalOverrides[photo.id],
                onEditFocalPoint: setEditingPhoto,
                priority: isAboveFold,
              };

              if (globalIndex === 0) {
                return <HeroCard key={photo.id} {...commonProps} />;
              }
              if (photo.orientation === "horizontal") {
                return <HorizontalCard key={photo.id} {...commonProps} />;
              }
              return <VerticalCard key={photo.id} {...commonProps} />;
            })}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs uppercase tracking-widest border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 text-xs uppercase tracking-widest border transition-colors ${
                  currentPage === page
                    ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs uppercase tracking-widest border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        )}

        {/* Count */}
        <div className="mt-6 sm:mt-8 text-center">
          <span className="text-xs text-gray-400 dark:text-gray-600 tracking-widest">
            {photos.length} LOOKS
            {totalPages > 1 && ` · PAGE ${currentPage} OF ${totalPages}`}
          </span>
        </div>
      </section>

      {/* Focal Point Editor Modal */}
      {editingPhoto && (
        <FocalPointEditor
          mediaId={editingPhoto.id}
          imageUrl={editingPhoto.src}
          initialX={editingPhoto.focalX ?? 50}
          initialY={editingPhoto.focalY ?? 50}
          onClose={() => setEditingPhoto(null)}
          onSave={handleFocalPointSave}
        />
      )}
    </>
  );
}
