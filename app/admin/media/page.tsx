"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2, X } from "lucide-react";
import { toast } from "sonner";

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
  sizes?: {
    thumbnail?: { url: string };
    card?: { url: string };
    hero?: { url: string };
  };
};

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
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

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", file.name.replace(/\.[^/.]+$/, ""));

      try {
        const res = await fetch("/api/media", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        toast.success(`Uploaded ${file.name}`);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    fetchMedia();
    e.target.value = "";
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      });

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

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Media Library
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your uploaded images
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800">
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
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            No images uploaded yet
          </p>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-red-900 hover:text-red-800">
            <Upload className="h-4 w-4" />
            Upload your first image
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
            >
              <Image
                src={item.sizes?.thumbnail?.url || item.url}
                alt={item.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          ))}
        </div>
      )}

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white dark:bg-gray-900">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800">
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.alt}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedMedia.filename}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {selectedMedia.alt}
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">
                    Dimensions
                  </dt>
                  <dd className="text-gray-900 dark:text-white">
                    {selectedMedia.width} x {selectedMedia.height}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Size</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {formatFileSize(selectedMedia.filesize)}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Type</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {selectedMedia.mimeType}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Uploaded</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {new Date(selectedMedia.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMedia.url);
                    toast.success("URL copied to clipboard");
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Copy URL
                </button>
                <button
                  onClick={() => handleDelete(selectedMedia.id)}
                  className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
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
