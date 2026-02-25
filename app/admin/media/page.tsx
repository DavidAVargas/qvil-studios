"use client";

import { useState, useEffect } from "react";
/* eslint-disable @next/next/no-img-element */
import { Upload, Trash2, X, Images } from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

type MediaItem = {
  id: string;
  alt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  _key?: string;
  sizes?: {
    thumbnail?: { url: string; _key?: string };
    card?: { url: string; _key?: string };
    hero?: { url: string; _key?: string };
  };
};

const QUARTER_LABELS = ["Jan – Mar", "Apr – Jun", "Jul – Sep", "Oct – Dec"];

function getQuarter(date: Date): string {
  return QUARTER_LABELS[Math.floor(date.getMonth() / 3)];
}

type GroupedMedia = Record<string, Record<string, MediaItem[]>>;

function groupByYearQuarter(items: MediaItem[]): GroupedMedia {
  const groups: GroupedMedia = {};
  for (const item of items) {
    const date = new Date(item.createdAt);
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

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("");
  const [gridPage, setGridPage] = useState(1);
  const PAGE_SIZE = 50;

  useEffect(() => {
    fetchMedia();
  }, []);

  // Auto-select most recent year + quarter once media loads
  useEffect(() => {
    if (media.length === 0) return;
    const grouped = groupByYearQuarter(media);
    const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
    const latestYear = years[0];
    const quarters = QUARTER_LABELS.filter((q) => grouped[latestYear]?.[q]?.length > 0);
    const latestQuarter = quarters[quarters.length - 1]; // most recent quarter
    if (!selectedYear) setSelectedYear(latestYear);
    if (!selectedQuarter) setSelectedQuarter(latestQuarter);
  }, [media]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchMedia() {
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
    } catch {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    let totalSaved = 0;

    const compressionOptions = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 2000,
      useWebWorker: true,
      fileType: "image/webp" as const,
      initialQuality: 0.85,
    };

    for (const file of Array.from(files)) {
      try {
        toast.info(`Compressing ${file.name}...`);
        const originalSize = file.size;

        const compressedFile = await imageCompression(file, compressionOptions);
        const compressedSize = compressedFile.size;
        totalSaved += originalSize - compressedSize;

        const newFileName = file.name.replace(/\.[^/.]+$/, ".webp");
        const finalFile = new File([compressedFile], newFileName, { type: "image/webp" });

        const formData = new FormData();
        formData.append("file", finalFile);
        formData.append("_payload", JSON.stringify({ alt: file.name.replace(/\.[^/.]+$/, "") }));

        const res = await fetch("/api/media", { method: "POST", body: formData });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Upload error:", errorData);
          throw new Error("Upload failed");
        }

        const savings = Math.round((1 - compressedSize / originalSize) * 100);
        toast.success(`Uploaded ${file.name} (${savings}% smaller)`);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (files.length > 1) {
      const savedMB = (totalSaved / 1024 / 1024).toFixed(2);
      toast.success(`Total saved: ${savedMB}MB across ${files.length} images`);
    }

    setUploading(false);
    fetchMedia();
    e.target.value = "";
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Image deleted");
      setSelectedMedia(null);
      fetchMedia();
    } catch {
      toast.error("Failed to delete image");
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const grouped = groupByYearQuarter(media);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const quartersForYear = selectedYear
    ? QUARTER_LABELS.filter((q) => grouped[selectedYear]?.[q]?.length > 0)
    : [];
  const visibleItems =
    selectedYear && selectedQuarter ? (grouped[selectedYear]?.[selectedQuarter] ?? []) : [];
  const totalInYear = selectedYear
    ? Object.values(grouped[selectedYear] ?? {}).reduce((s, a) => s + a.length, 0)
    : 0;
  const pageCount = Math.ceil(visibleItems.length / PAGE_SIZE);
  const pagedItems = visibleItems.slice((gridPage - 1) * PAGE_SIZE, gridPage * PAGE_SIZE);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Media Library
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {media.length > 0 ? `${media.length} photos total` : "Manage your uploaded images"}
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-60">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload Images"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-900" />
        </div>
      ) : media.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center dark:border-gray-700 dark:bg-gray-900">
          <Images className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
          <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            No images uploaded yet
          </p>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800">
            <Upload className="h-4 w-4" />
            Upload your first image
            <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          </label>
        </div>
      ) : (
        <div>
          {/* Year tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {years.map((year) => {
              const count = Object.values(grouped[year]).reduce((s, a) => s + a.length, 0);
              const active = year === selectedYear;
              return (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    const qs = QUARTER_LABELS.filter((q) => grouped[year]?.[q]?.length > 0);
                    setSelectedQuarter(qs[qs.length - 1] ?? "");
                    setGridPage(1);
                  }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-red-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {year}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quarter tabs */}
          {quartersForYear.length > 0 && (
            <div className="mt-3 flex items-center gap-2 border-b border-gray-200 pb-3 dark:border-gray-800">
              {quartersForYear.map((quarter) => {
                const count = grouped[selectedYear]?.[quarter]?.length ?? 0;
                const active = quarter === selectedQuarter;
                return (
                  <button
                    key={quarter}
                    onClick={() => { setSelectedQuarter(quarter); setGridPage(1); }}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1 text-sm transition-colors ${
                      active
                        ? "bg-gray-900 font-medium text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {quarter}
                    <span
                      className={`text-xs ${
                        active ? "opacity-70" : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
              <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                {totalInYear} in {selectedYear}
              </span>
            </div>
          )}

          {/* Grid */}
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {pagedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <img
                  src={getImageUrl(item.sizes?.thumbnail || item)}
                  alt={item.alt || ""}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
              </button>
            ))}
          </div>

          {visibleItems.length === 0 && (
            <div className="mt-8 text-center text-sm text-gray-400 dark:text-gray-600">
              No photos in this period
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(gridPage - 1) * PAGE_SIZE + 1}–{Math.min(gridPage * PAGE_SIZE, visibleItems.length)} of {visibleItems.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setGridPage((p) => Math.max(1, p - 1))}
                  disabled={gridPage === 1}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  ← Prev
                </button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setGridPage(p)}
                    className={`min-w-[2rem] rounded-lg border px-2 py-1.5 text-sm font-medium transition-colors ${
                      p === gridPage
                        ? "border-red-900 bg-red-900 text-white"
                        : "border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setGridPage((p) => Math.min(pageCount, p + 1))}
                  disabled={gridPage === pageCount}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800">
              <img
                src={getImageUrl(selectedMedia)}
                alt={selectedMedia.alt || ""}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>

            <div className="p-6">
              <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                {selectedMedia.filename}
              </h3>
              {selectedMedia.alt && (
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{selectedMedia.alt}</p>
              )}

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Dimensions", `${selectedMedia.width} × ${selectedMedia.height}`],
                  ["Size", formatFileSize(selectedMedia.filesize)],
                  ["Type", selectedMedia.mimeType],
                  ["Uploaded", new Date(selectedMedia.createdAt).toLocaleDateString()],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                    <dt className="text-xs text-gray-400 dark:text-gray-500">{label}</dt>
                    <dd className="mt-0.5 font-medium text-gray-900 dark:text-white">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getImageUrl(selectedMedia));
                    toast.success("URL copied to clipboard");
                  }}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Copy URL
                </button>
                <button
                  onClick={() => handleDelete(selectedMedia.id)}
                  className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
