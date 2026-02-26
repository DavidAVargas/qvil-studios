"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef, useMemo } from "react";
import { Plus, X, Check, GripVertical } from "lucide-react";
import { toast } from "sonner";

type ThemePhoto = { id: string; orientation: "horizontal" | "vertical" };

type MediaItem = {
  id: string;
  alt: string;
  url: string;
  filename: string;
  createdAt?: string;
  _key?: string;
  sizes?: {
    thumbnail?: { url: string; _key?: string };
  };
};

type ThemePhotoPickerProps = {
  selectedPhotos: ThemePhoto[];
  onChange: (photos: ThemePhoto[]) => void;
};

const QUARTER_LABELS = ["Jan – Mar", "Apr – Jun", "Jul – Sep", "Oct – Dec"];

function getQuarter(date: Date): string {
  return QUARTER_LABELS[Math.floor(date.getMonth() / 3)];
}

type Grouped = Record<string, Record<string, MediaItem[]>>;

function groupByYearQuarter(items: MediaItem[]): Grouped {
  const groups: Grouped = {};
  for (const item of items) {
    const date = new Date(item.createdAt ?? "");
    const year = String(date.getFullYear());
    const quarter = getQuarter(date);
    if (!groups[year]) groups[year] = {};
    if (!groups[year][quarter]) groups[year][quarter] = [];
    groups[year][quarter].push(item);
  }
  return groups;
}

function getImageUrl(item: { url?: string; _key?: string }): string {
  if (item._key) return `https://utfs.io/f/${item._key}`;
  if (item.url && !item.url.includes("localhost")) return item.url;
  return item.url || "";
}

export function ThemePhotoPicker({ selectedPhotos, onChange }: ThemePhotoPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [localSelection, setLocalSelection] = useState<ThemePhoto[]>(selectedPhotos);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const draggedItemRef = useRef<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");

  // Derive selected IDs for checking selection in modal
  const selectedIds = selectedPhotos.map((p) => p.id);

  async function fetchAllMedia() {
    setLoading(true);
    try {
      const res = await fetch(`/api/media?limit=500&sort=-createdAt`);
      const data = await res.json();
      const docs: MediaItem[] = data.docs || [];
      setAllMedia(docs);
      const grouped = groupByYearQuarter(docs);
      const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
      if (years.length > 0) {
        const latestYear = years[0];
        const quarters = QUARTER_LABELS.filter((q) => grouped[latestYear]?.[q]?.length > 0);
        setSelectedYear(latestYear);
        setSelectedQuarter(quarters[quarters.length - 1] ?? "");
      }
    } catch {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isOpen && allMedia.length === 0) fetchAllMedia();
    if (isOpen) setLocalSelection(selectedPhotos);
  }, [isOpen, selectedPhotos]);

  const selectedMedia = selectedPhotos
    .map((p) => ({ ...p, media: allMedia.find((m) => m.id === p.id) }))
    .filter((p) => p.media) as Array<ThemePhoto & { media: MediaItem }>;

  function toggleSelection(id: string) {
    setLocalSelection((prev) =>
      prev.find((p) => p.id === id)
        ? prev.filter((p) => p.id !== id)
        : [...prev, { id, orientation: "vertical" }]
    );
  }

  function handleConfirm() {
    onChange(localSelection);
    setIsOpen(false);
  }

  function handleDragStart(e: React.DragEvent, index: number, id: string) {
    setDraggedIndex(index);
    draggedItemRef.current = id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex !== index) setDragOverIndex(index);
  }

  function handleDragLeave() {
    setDragOverIndex(null);
  }

  function handleDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newOrder = [...selectedPhotos];
    const [draggedItem] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);
    onChange(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
    draggedItemRef.current = null;
  }

  const grouped = useMemo(() => groupByYearQuarter(allMedia), [allMedia]);
  const years = useMemo(() => Object.keys(grouped).sort((a, b) => Number(b) - Number(a)), [grouped]);
  const quartersForYear = useMemo(
    () => selectedYear ? QUARTER_LABELS.filter((q) => grouped[selectedYear]?.[q]?.length > 0) : [],
    [grouped, selectedYear]
  );
  const visibleItems = useMemo(
    () => selectedYear && selectedQuarter ? (grouped[selectedYear]?.[selectedQuarter] ?? []) : [],
    [grouped, selectedYear, selectedQuarter]
  );

  return (
    <>
      {/* Selected Photos Preview with Drag & Drop */}
      <div className="flex flex-wrap gap-3">
        {selectedMedia.map(({ id, orientation, media }, index) => (
          <div
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, index, id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex flex-col items-center gap-1 ${
              draggedIndex === index ? "opacity-50" : ""
            } ${dragOverIndex === index ? "ring-2 ring-red-900 ring-offset-2 rounded" : ""}`}
          >
            {/* Thumbnail */}
            <div className="group relative h-20 w-16 cursor-grab active:cursor-grabbing">
              <img
                src={getImageUrl(media.sizes?.thumbnail || media)}
                alt={media.alt || ""}
                className="h-full w-full rounded object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded bg-black/0 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
                <GripVertical className="h-5 w-5 text-white drop-shadow-lg" />
              </div>
              <button
                type="button"
                onClick={() => onChange(selectedPhotos.filter((p) => p.id !== id))}
                className="absolute -right-1 -top-1 z-10 rounded-full bg-red-600 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
              <span className="absolute bottom-0 left-0 rounded-tr bg-black/60 px-1 text-[10px] text-white">
                #{index + 1}
              </span>
            </div>

            {/* Orientation toggle — clearly visible below each photo */}
            <div className="flex overflow-hidden rounded border border-gray-300 dark:border-gray-600 text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => {
                  const updated = selectedPhotos.map((p, i) =>
                    i === index ? { ...p, orientation: "horizontal" as const } : p
                  );
                  onChange(updated);
                }}
                className={`px-2 py-0.5 transition-colors ${
                  orientation === "horizontal"
                    ? "bg-red-700 text-white"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                H
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = selectedPhotos.map((p, i) =>
                    i === index ? { ...p, orientation: "vertical" as const } : p
                  );
                  onChange(updated);
                }}
                className={`px-2 py-0.5 transition-colors border-l border-gray-300 dark:border-gray-600 ${
                  orientation === "vertical"
                    ? "bg-gray-700 text-white dark:bg-gray-400 dark:text-gray-900"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                V
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-20 w-16 items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-red-900 hover:text-red-900 dark:border-gray-700"
          >
            <Plus className="h-5 w-5" />
          </button>
          <span className="text-[10px] text-gray-400">Add</span>
        </div>
      </div>

      {/* Orientation legend */}
      {selectedPhotos.length > 0 && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          <span className="font-bold text-red-700">H</span> = Horizontal (wide) &nbsp;·&nbsp;
          <span className="font-bold text-gray-600 dark:text-gray-400">V</span> = Vertical (portrait, default) &nbsp;·&nbsp;
          First photo is always the full-width hero
        </p>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Photos ({localSelection.length} selected)
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Year + Quarter tabs */}
            <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <div className="flex items-center gap-2 overflow-x-auto">
                {years.map((year) => {
                  const count = Object.values(grouped[year]).reduce((s, a) => s + a.length, 0);
                  const active = year === selectedYear;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        setSelectedYear(year);
                        const qs = QUARTER_LABELS.filter((q) => grouped[year]?.[q]?.length > 0);
                        setSelectedQuarter(qs[qs.length - 1] ?? "");
                      }}
                      className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        active
                          ? "bg-red-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {year}
                      <span className={`rounded-full px-1 text-xs ${active ? "opacity-70" : "text-gray-400"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {quartersForYear.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  {quartersForYear.map((quarter) => {
                    const count = grouped[selectedYear]?.[quarter]?.length ?? 0;
                    const active = quarter === selectedQuarter;
                    return (
                      <button
                        key={quarter}
                        type="button"
                        onClick={() => setSelectedQuarter(quarter)}
                        className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs transition-colors ${
                          active
                            ? "bg-gray-900 font-medium text-white dark:bg-white dark:text-gray-900"
                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        }`}
                      >
                        {quarter}
                        <span className={`text-xs ${active ? "opacity-70" : "text-gray-400"}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Media Grid */}
            <div className="overflow-y-auto p-4">
              {loading ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-900" />
                </div>
              ) : visibleItems.length === 0 ? (
                <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                  {allMedia.length === 0 ? "No images in library. Upload images in Media Library first." : "No photos in this period."}
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                  {visibleItems.map((item) => {
                    const isSelected = localSelection.find((p) => p.id === item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleSelection(item.id)}
                        className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-red-900 ring-2 ring-red-900"
                            : "border-gray-200 hover:border-red-900 dark:border-gray-700"
                        }`}
                      >
                        <img
                          src={getImageUrl(item.sizes?.thumbnail || item)}
                          alt={item.alt || ""}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-900/50">
                            <Check className="h-8 w-8 text-white" />
                          </div>
                        )}
                        {/* Show position number if selected */}
                        {isSelected && (
                          <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-xs text-white">
                            #{selectedIds.indexOf(item.id) + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-4 border-t border-gray-200 p-4 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
