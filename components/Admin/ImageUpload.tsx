"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

type ImageUploadProps = {
  value?: string;
  onChange: (url: string, id: string) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

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
      // Construct URL from filename if url is not available
      const url = data.doc.url || `/media/${data.doc.filename}`;
      onChange(url, data.doc.id);
      toast.success("Image uploaded");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  if (value) {
    return (
      <div className="relative inline-block">
        <div className="relative h-48 w-72 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <img src={value} alt="Cover" className="absolute inset-0 h-full w-full object-cover" />
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
    <label className="flex h-48 w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-red-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-red-900 dark:hover:bg-gray-700">
      <Upload className="h-8 w-8 text-gray-400" />
      <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {uploading ? "Uploading..." : "Click to upload"}
      </span>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
}
