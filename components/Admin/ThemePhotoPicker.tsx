"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { Plus, X, Check, GripVertical } from "lucide-react";
import { toast } from "sonner";

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
  selectedIds: string[];
  onChange: (ids: string[]) => void;
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

export function ThemePhotoPicker({ selectedIds, onChange }: ThemePhotoPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [localSelection, setLocalSelection] = useState<string[]>(selectedIds);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const draggedItemRef = useRef<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");

  async function fetchAllMedia() {
    setLoading(true);
    try {
      const docs: MediaItem[] = [];
      let page = 1;
      let hasMore = true;
      while (hasMore) {
        const res = await fetch(`/api/media?limit=100&sort=-createdAt&page=${page}`);
        const data = await res.json();
        docs.push(...(data.docs || []));
        hasMore = data.hasNextPage ?? false;
        page++;
      }
      setAllMedia(docs);
      // Auto-select most recent year + quarter
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

  // Fetch all media on mount so preview thumbnails are always available
  useEffect(() => {
    fetchAllMedia();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync local selection when modal opens
  useEffect(() => {
    if (isOpen) setLocalSelection(selectedIds);
  }, [isOpen, selectedIds]);

  // Derive selected media from allMedia (preserving selectedIds order)
  const selectedMedia = selectedIds
    .map((id) => allMedia.find((m) => m.id === id))
    .filter(Boolean) as MediaItem[];

  function toggleSelection(id: string) {
    setLocalSelection((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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
    const newOrder = [...selectedIds];
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

  const grouped = groupByYearQuarter(allMedia);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const quartersForYear = selectedYear
    ? QUARTER_LABELS.filter((q) => grouped[selectedYear]?.[q]?.length > 0)
    : [];
  const visibleItems =
    selectedYear && selectedQuarter ? (grouped[selectedYear]?.[selectedQuarter] ?? []) : [];

  return (
    <>
      {/* Selected Photos Preview with Drag & Drop */}
      <div className="flex flex-wrap gap-2">
        {selectedMedia.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index, item.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`group relative h-16 w-16 cursor-grab active:cursor-grabbing ${
              draggedIndex === index ? "opacity-50" : ""
            } ${dragOverIndex === index ? "ring-2 ring-red-900 ring-offset-2" : ""}`}
          >
            <img
              src={getImageUrl(item.sizes?.thumbnail || item)}
              alt={item.alt || ""}
              className="h-full w-full rounded object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded bg-black/0 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
              <GripVertical className="h-5 w-5 text-white drop-shadow-lg" />
            </div>
            <button
              type="button"
              onClick={() => onChange(selectedIds.filter((id) => id !== item.id))}
              className="absolute -right-1 -top-1 z-10 rounded-full bg-red-600 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
            <span className="absolute bottom-0 left-0 rounded-tr bg-black/60 px-1 text-xs text-white">
              {index + 1}
            </span>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-red-900 hover:text-red-900 dark:border-gray-700"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

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
                    const isSelected = localSelection.includes(item.id);
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
