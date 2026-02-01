"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MediaPicker } from "./MediaPicker";
import { ThemePhotoPicker } from "./ThemePhotoPicker";

type RunwayShowFormProps = {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    date: string;
    year: number;
    description: string;
    coverImage: { id: string; url: string } | string;
    themes?: Array<{
      name: string;
      photos?: Array<{ id: string } | string>;
    }>;
  };
};

export function RunwayShowForm({ initialData }: RunwayShowFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    date: string;
    year: number;
    description: string;
    coverImage: string;
    themes: Array<{ name: string; photos: string[] }>;
  }>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    date: initialData?.date || "",
    year: initialData?.year || new Date().getFullYear(),
    description: initialData?.description || "",
    coverImage:
      typeof initialData?.coverImage === "object"
        ? initialData.coverImage.id
        : initialData?.coverImage || "",
    themes: (initialData?.themes || [{ name: "", photos: [] }]).map((t) => ({
      name: t.name,
      photos: (t.photos || []).map((p) => (typeof p === "object" ? p.id : p)),
    })),
  });

  const [coverImageUrl, setCoverImageUrl] = useState(
    typeof initialData?.coverImage === "object"
      ? initialData.coverImage.url
      : ""
  );

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(title: string) {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  }

  function addTheme() {
    setFormData((prev) => ({
      ...prev,
      themes: [...prev.themes, { name: "", photos: [] as string[] }],
    }));
  }

  function removeTheme(index: number) {
    setFormData((prev) => ({
      ...prev,
      themes: prev.themes.filter((_, i) => i !== index),
    }));
  }

  function updateTheme(index: number, name: string) {
    setFormData((prev) => ({
      ...prev,
      themes: prev.themes.map((theme, i) =>
        i === index ? { ...theme, name } : theme
      ),
    }));
  }

  function updateThemePhotos(index: number, photoIds: string[]) {
    setFormData((prev) => ({
      ...prev,
      themes: prev.themes.map((theme, i) =>
        i === index ? { ...theme, photos: photoIds } : theme
      ),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData
        ? `/api/runway-shows/${initialData.id}`
        : "/api/runway-shows";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.errors?.[0]?.message || "Save failed");
      }

      toast.success(initialData ? "Show updated" : "Show created");
      router.push("/admin/runway-shows");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Basic Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="e.g., DARK"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="e.g., dark"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date *
          </label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="e.g., September 15, 2024"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Year *
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                year: parseInt(e.target.value) || new Date().getFullYear(),
              }))
            }
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder="A brief description of the collection..."
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cover Image *
        </label>
        <MediaPicker
          value={coverImageUrl}
          mediaId={formData.coverImage}
          onChange={(url, id) => {
            setCoverImageUrl(url);
            setFormData((prev) => ({ ...prev, coverImage: id }));
          }}
        />
      </div>

      {/* Themes */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Themes
          </label>
          <button
            type="button"
            onClick={addTheme}
            className="text-sm font-medium text-red-900 hover:text-red-800"
          >
            + Add Theme
          </button>
        </div>

        <div className="space-y-6">
          {formData.themes.map((theme, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="mb-4 flex items-center gap-4">
                <input
                  type="text"
                  value={theme.name}
                  onChange={(e) => updateTheme(index, e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Theme name (e.g., Dune)"
                />
                {formData.themes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTheme(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Theme Photos */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Photos for this theme
                </label>
                <ThemePhotoPicker
                  selectedIds={theme.photos}
                  onChange={(ids) => updateThemePhotos(index, ids)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-800">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Show" : "Create Show"}
        </button>
      </div>
    </form>
  );
}
