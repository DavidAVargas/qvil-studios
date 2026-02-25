"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { Upload, X, Check } from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

type MediaItem = {
  id: string;
  alt: string;
  url: string;
  filename: string;
  _key?: string;
  sizes?: {
    thumbnail?: { url: string; _key?: string };
  };
};

type MediaPickerProps = {
  value?: string;
  mediaId?: string;
  onChange: (url: string, id: string) => void;
};

const QUARTER_LABELS = ["Jan – Mar", "Apr – Jun", "Jul – Sep", "Oct – Dec"];

function getQuarter(date: Date): string {
  return QUARTER_LABELS[Math.floor(date.getMonth() / 3)];
}

type Grouped = Record<string, Record<string, MediaItem[]>>;

function groupByYearQuarter(items: MediaItem[]): Grouped {
  const groups: Grouped = {};
  for (const item of items) {
    const date = new Date((item as unknown as { createdAt?: string }).createdAt ?? "");
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

export function MediaPicker({ value, mediaId, onChange }: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");

  async function fetchMedia() {
    setLoading(true);
    try {
      const allDocs: MediaItem[] = [];
      let page = 1;
      let hasMore = true;
      while (hasMore) {
        const res = await fetch(`/api/media?limit=100&sort=-createdAt&page=${page}`);
        const data = await res.json();
        allDocs.push(...(data.docs || []));
        hasMore = data.hasNextPage ?? false;
        page++;
      }
      setMedia(allDocs);
      // Auto-select most recent year + quarter
      const grouped = groupByYearQuarter(allDocs);
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
    if (isOpen) fetchMedia();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const originalSize = file.size;
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
        fileType: "image/webp" as const,
        initialQuality: 0.85,
      };
      toast.info("Compressing image...");
      const compressedFile = await imageCompression(file, options);
      const compressedSize = compressedFile.size;
      const savings = Math.round((1 - compressedSize / originalSize) * 100);
      const newFileName = file.name.replace(/\.[^/.]+$/, ".webp");
      const finalFile = new File([compressedFile], newFileName, { type: "image/webp" });
      const formData = new FormData();
      formData.append("file", finalFile);
      formData.append("_payload", JSON.stringify({ alt: file.name.replace(/\.[^/.]+$/, "") }));
      const res = await fetch("/api/media", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const url = data.doc._key ? `https://utfs.io/f/${data.doc._key}` : data.doc.url;
      onChange(url, data.doc.id);
      setIsOpen(false);
      const originalMB = (originalSize / 1024 / 1024).toFixed(2);
      const compressedKB = (compressedSize / 1024).toFixed(0);
      toast.success(`Uploaded! ${originalMB}MB → ${compressedKB}KB (${savings}% smaller)`);
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleSelect(item: MediaItem) {
    onChange(getImageUrl(item), item.id);
    setIsOpen(false);
  }

  const grouped = groupByYearQuarter(media);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const quartersForYear = selectedYear
    ? QUARTER_LABELS.filter((q) => grouped[selectedYear]?.[q]?.length > 0)
    : [];
  const visibleItems =
    selectedYear && selectedQuarter ? (grouped[selectedYear]?.[selectedQuarter] ?? []) : [];

  if (value) {
    return (
      <div className="relative inline-block">
        <div className="relative h-48 w-72 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <img src={value} alt="Selected" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <button
          type="button"
          onClick={() => onChange("", "")}
          className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white shadow-lg transition-colors hover:bg-red-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-48 w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-red-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-red-900 dark:hover:bg-gray-700"
      >
        <Upload className="h-8 w-8 text-gray-400" />
        <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Choose from Media Library
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Image</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Upload + Year tabs */}
            <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <div className="flex items-center justify-between gap-4">
                <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload New"}
                  <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
                </label>
                {/* Year tabs */}
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
              </div>

              {/* Quarter tabs */}
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
                  {media.length === 0 ? "No images in library. Upload one above." : "No photos in this period."}
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                  {visibleItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        mediaId === item.id
                          ? "border-red-900 ring-2 ring-red-900"
                          : "border-gray-200 hover:border-red-900 dark:border-gray-700"
                      }`}
                    >
                      <img
                        src={getImageUrl(item.sizes?.thumbnail || item)}
                        alt={item.alt || ""}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      {mediaId === item.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
