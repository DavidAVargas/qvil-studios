"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MediaPicker } from "./MediaPicker";

type PhotoEntry = {
  photoId: string;
  photoUrl: string;
  caption: string;
};

type AboutFormProps = {
  initialData: {
    heading: string;
    tagline: string;
    journeyParagraphs: string[];
    philosophyQuote: string;
    philosophyTagline: string;
    photos: PhotoEntry[];
  };
};

export function AboutForm({ initialData }: AboutFormProps) {
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState(initialData.heading);
  const [tagline, setTagline] = useState(initialData.tagline);
  const [paragraphs, setParagraphs] = useState<string[]>(
    initialData.journeyParagraphs.length > 0 ? initialData.journeyParagraphs : [""]
  );
  const [philosophyQuote, setPhilosophyQuote] = useState(initialData.philosophyQuote);
  const [philosophyTagline, setPhilosophyTagline] = useState(initialData.philosophyTagline);
  const [photos, setPhotos] = useState<PhotoEntry[]>(
    initialData.photos.length > 0
      ? initialData.photos
      : [{ photoId: "", photoUrl: "", caption: "" }]
  );

  function updateParagraph(index: number, value: string) {
    setParagraphs((prev) => prev.map((p, i) => (i === index ? value : p)));
  }

  function addParagraph() {
    setParagraphs((prev) => [...prev, ""]);
  }

  function removeParagraph(index: number) {
    setParagraphs((prev) => prev.filter((_, i) => i !== index));
  }

  function updatePhoto(index: number, field: keyof PhotoEntry, value: string) {
    setPhotos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  function addPhoto() {
    if (photos.length >= 3) return;
    setPhotos((prev) => [...prev, { photoId: "", photoUrl: "", caption: "" }]);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const body = {
      heading,
      tagline,
      journeyParagraphs: paragraphs
        .filter((p) => p.trim())
        .map((text) => ({ text })),
      philosophyQuote,
      philosophyTagline,
      photos: photos
        .filter((p) => p.photoId)
        .map((p) => ({ photo: p.photoId, caption: p.caption })),
    };

    try {
      const res = await fetch("/api/globals/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.errors?.[0]?.message || "Save failed");
      }

      toast.success("About page updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Hero */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hero</h3>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Heading
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Journey */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">The Journey</h3>
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                rows={3}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder={`Paragraph ${i + 1}`}
              />
              {paragraphs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParagraph(i)}
                  className="self-start rounded px-2 py-1 text-sm text-gray-500 hover:text-red-900 dark:text-gray-400"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addParagraph}
          className="text-sm text-red-900 hover:underline dark:text-red-400"
        >
          + Add paragraph
        </button>
      </div>

      {/* Philosophy */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Philosophy</h3>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quote
          </label>
          <textarea
            value={philosophyQuote}
            onChange={(e) => setPhilosophyQuote(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tagline
          </label>
          <input
            type="text"
            value={philosophyTagline}
            onChange={(e) => setPhilosophyTagline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Photos */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Photos{" "}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            (up to 3)
          </span>
        </h3>
        <div className="space-y-6">
          {photos.map((p, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Photo {i + 1}
                </span>
                {photos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="text-sm text-gray-500 hover:text-red-900 dark:text-gray-400"
                  >
                    Remove
                  </button>
                )}
              </div>
              <MediaPicker
                value={p.photoUrl}
                mediaId={p.photoId}
                onChange={(url, id) => {
                  updatePhoto(i, "photoId", id);
                  updatePhoto(i, "photoUrl", url);
                }}
              />
              <div className="mt-3">
                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={p.caption}
                  onChange={(e) => updatePhoto(i, "caption", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Optional caption"
                />
              </div>
            </div>
          ))}
        </div>
        {photos.length < 3 && (
          <button
            type="button"
            onClick={addPhoto}
            className="text-sm text-red-900 hover:underline dark:text-red-400"
          >
            + Add photo
          </button>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-800">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-red-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save About Page"}
        </button>
      </div>
    </form>
  );
}
