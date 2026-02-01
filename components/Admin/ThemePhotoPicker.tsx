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
  _key?: string;
  sizes?: {
    thumbnail?: { url: string; _key?: string };
  };
};

type ThemePhotoPickerProps = {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

// Helper to get the correct URL (UploadThing cloud or fallback)
function getImageUrl(item: { url?: string; _key?: string }): string {
  if (item._key) {
    return `https://utfs.io/f/${item._key}`;
  }
  if (item.url && !item.url.includes("localhost")) {
    return item.url;
  }
  return item.url || "";
}

export function ThemePhotoPicker({ selectedIds, onChange }: ThemePhotoPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [localSelection, setLocalSelection] = useState<string[]>(selectedIds);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const draggedItemRef = useRef<string | null>(null);

  // Fetch all media for the picker modal
  async function fetchMedia() {
    setLoading(true);
    try {
      const res = await fetch("/api/media?limit=100&sort=-createdAt");
      const data = await res.json();
      setMedia(data.docs || []);
    } catch {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  }

  // Fetch only selected media for preview (on mount and when selectedIds change)
  async function fetchSelectedMedia() {
    if (selectedIds.length === 0) {
      setSelectedMedia([]);
      return;
    }
    setPreviewLoading(true);
    try {
      const res = await fetch("/api/media?limit=100&sort=-createdAt");
      const data = await res.json();
      const allMedia = data.docs || [];
      // Filter and sort by selectedIds order
      const filtered = selectedIds
        .map((id) => allMedia.find((m: MediaItem) => m.id === id))
        .filter(Boolean) as MediaItem[];
      setSelectedMedia(filtered);
    } catch {
      // Silently fail for preview
    } finally {
      setPreviewLoading(false);
    }
  }

  // Fetch selected media on mount and when selectedIds change
  useEffect(() => {
    fetchSelectedMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds.join(",")]);

  // Fetch all media when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchMedia();
      setLocalSelection(selectedIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function toggleSelection(id: string) {
    setLocalSelection((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function handleConfirm() {
    onChange(localSelection);
    setIsOpen(false);
  }

  // Drag and drop handlers
  function handleDragStart(e: React.DragEvent, index: number, id: string) {
    setDraggedIndex(index);
    draggedItemRef.current = id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex !== index) {
      setDragOverIndex(index);
    }
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

    // Reorder the selectedIds array
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

  return (
    <>
      {/* Selected Photos Preview with Drag & Drop */}
      <div className="flex flex-wrap gap-2">
        {previewLoading && selectedIds.length > 0 && selectedMedia.length === 0 ? (
          <div className="flex h-16 w-16 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-900" />
          </div>
        ) : (
          selectedMedia.map((item, index) => (
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
              } ${
                dragOverIndex === index
                  ? "ring-2 ring-red-900 ring-offset-2"
                  : ""
              }`}
            >
              <img
                src={getImageUrl(item.sizes?.thumbnail || item)}
                alt={item.alt || ""}
                className="h-full w-full rounded object-cover"
              />
              {/* Drag handle indicator */}
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
              {/* Position indicator */}
              <span className="absolute bottom-0 left-0 rounded-tr bg-black/60 px-1 text-xs text-white">
                {index + 1}
              </span>
            </div>
          ))
        )}
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
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white dark:bg-gray-900">
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

            {/* Media Grid */}
            <div className="max-h-96 overflow-y-auto p-4">
              {loading ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-900" />
                </div>
              ) : media.length === 0 ? (
                <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No images in library. Upload images in Media Library first.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-5">
                  {media.map((item) => {
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
