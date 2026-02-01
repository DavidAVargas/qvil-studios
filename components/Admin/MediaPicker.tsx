"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { Upload, X, Check } from "lucide-react";
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

type MediaPickerProps = {
  value?: string;
  mediaId?: string;
  onChange: (url: string, id: string) => void;
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

export function MediaPicker({ value, mediaId, onChange }: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("_payload", JSON.stringify({ alt: file.name.replace(/\.[^/.]+$/, "") }));

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const url = data.doc._key
        ? `https://utfs.io/f/${data.doc._key}`
        : data.doc.url;

      onChange(url, data.doc.id);
      setIsOpen(false);
      toast.success("Image uploaded");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleSelect(item: MediaItem) {
    const url = getImageUrl(item);
    onChange(url, item.id);
    setIsOpen(false);
  }

  // Show selected image
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
      {/* Trigger Button */}
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

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Image
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Upload New */}
            <div className="border-b border-gray-200 p-4 dark:border-gray-800">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload New Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Media Grid */}
            <div className="max-h-96 overflow-y-auto p-4">
              {loading ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-900" />
                </div>
              ) : media.length === 0 ? (
                <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No images in library. Upload one above.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {media.map((item) => (
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
