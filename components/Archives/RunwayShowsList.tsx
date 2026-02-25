"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import { Move } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { AdminEditButton } from "@/components/Admin/AdminEditButton";
import { FocalPointEditor } from "@/components/Admin/FocalPointEditor";
import type { RunwayShow } from "@/lib/runway-data";

type FocalState = { x: number; y: number };

export function RunwayShowsList({ shows }: { shows: RunwayShow[] }) {
  const { isSignedIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingShow, setEditingShow] = useState<RunwayShow | null>(null);
  // Local focal overrides so the card updates immediately after saving
  const [focalOverrides, setFocalOverrides] = useState<Record<string, FocalState>>({});

  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/check-admin")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch(() => setIsAdmin(false));
  }, [isSignedIn]);

  function getFocal(show: RunwayShow): FocalState {
    return focalOverrides[show.id] ?? {
      x: show.coverImageFocalX ?? 50,
      y: show.coverImageFocalY ?? 50,
    };
  }

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {shows.map((show, index) => {
          const focal = getFocal(show);
          return (
            <div key={show.id} className="group relative">
              <Link href={`/archives/${show.slug}`} className="block">
                <div
                  className={`relative flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} bg-gray-50 dark:bg-black border border-gray-200 dark:border-red-900/20 overflow-hidden`}
                >
                  {/* Image Side */}
                  <div className="relative w-full lg:w-[70%] aspect-[3/2] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                    <img
                      src={show.coverImage}
                      alt={show.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: `${focal.x}% ${focal.y}%` }}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>

                  {/* Content Side */}
                  <div className="relative w-full lg:w-[30%] p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white tracking-wide mb-1">
                      {show.title}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-5 sm:mb-6">
                      {show.date}
                    </p>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <span className="text-xs uppercase tracking-widest border-b border-gray-400 dark:border-gray-600 pb-1 group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                        View
                      </span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-5 right-5 w-10 h-px bg-gray-900 dark:bg-red-700" />
                      <div className="absolute bottom-5 right-5 w-px h-10 bg-gray-900 dark:bg-red-700" />
                    </div>
                    <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute top-5 left-5 w-10 h-px bg-gray-900 dark:bg-red-700" />
                      <div className="absolute top-5 left-5 w-px h-10 bg-gray-900 dark:bg-red-700" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Admin buttons */}
              {isAdmin && (
                <>
                  <AdminEditButton
                    href={`/admin/runway-shows/${show.id}`}
                    className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {show.coverImageId && (
                    <button
                      onClick={() => setEditingShow(show)}
                      className="absolute top-4 right-24 z-10 rounded-full bg-black/60 p-2.5 text-white shadow-lg opacity-0 transition-all group-hover:opacity-100 hover:bg-black/85"
                      title="Set focal point"
                    >
                      <Move className="h-4 w-4" />
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Focal point editor modal */}
      {editingShow?.coverImageId && (
        <FocalPointEditor
          mediaId={editingShow.coverImageId}
          imageUrl={editingShow.coverImage}
          initialX={getFocal(editingShow).x}
          initialY={getFocal(editingShow).y}
          onClose={() => setEditingShow(null)}
          onSave={(x, y) => {
            setFocalOverrides((prev) => ({ ...prev, [editingShow.id]: { x, y } }));
            setEditingShow(null);
          }}
        />
      )}
    </>
  );
}
