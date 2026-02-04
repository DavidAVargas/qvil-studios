"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MediaPicker } from "./MediaPicker";

type ExhibitionFormProps = {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    date: string;
    time: string;
    year: number;
    venue: {
      name: string;
      address: string;
      city: string;
      description: string;
      link?: string;
    };
    description: string;
    coverImage: { id: string; url: string } | string;
    isUpcoming: boolean;
  };
};

export function ExhibitionForm({ initialData }: ExhibitionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    year: initialData?.year || new Date().getFullYear(),
    venue: initialData?.venue || {
      name: "",
      address: "",
      city: "",
      description: "",
      link: "",
    },
    description: initialData?.description || "",
    coverImage:
      typeof initialData?.coverImage === "object"
        ? initialData.coverImage.id
        : initialData?.coverImage || "",
    isUpcoming: initialData?.isUpcoming || false,
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
      slug:
        prev.slug ||
        generateSlug(title) + "-" + (prev.year || new Date().getFullYear()),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData
        ? `/api/exhibitions/${initialData.id}`
        : "/api/exhibitions";
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

      toast.success(initialData ? "Exhibition updated" : "Exhibition created");
      router.push("/admin/exhibitions");
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
            placeholder="e.g., NYC FASHION WEEK"
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
            placeholder="e.g., nyc-fashion-week-2025"
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
            placeholder="e.g., February 14, 2025"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Time *
          </label>
          <input
            type="text"
            value={formData.time}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, time: e.target.value }))
            }
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="e.g., 8:00 PM EST"
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

        <div className="flex items-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isUpcoming}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isUpcoming: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-red-900 focus:ring-red-900"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upcoming Event
            </span>
          </label>
        </div>
      </div>

      {/* Venue Info */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Venue Information
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Venue Name *
            </label>
            <input
              type="text"
              value={formData.venue.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  venue: { ...prev.venue, name: e.target.value },
                }))
              }
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g., The Glasshouse"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              City *
            </label>
            <input
              type="text"
              value={formData.venue.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  venue: { ...prev.venue, city: e.target.value },
                }))
              }
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g., New York, NY"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address *
            </label>
            <input
              type="text"
              value={formData.venue.address}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  venue: { ...prev.venue, address: e.target.value },
                }))
              }
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g., 660 12th Avenue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Venue Description *
            </label>
            <textarea
              value={formData.venue.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  venue: { ...prev.venue, description: e.target.value },
                }))
              }
              required
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Describe the venue..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Venue Website
            </label>
            <input
              type="url"
              value={formData.venue.link || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  venue: { ...prev.venue, link: e.target.value },
                }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g., https://theglasshouse.com"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Event Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-900 focus:ring-red-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder="Describe the event..."
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
          {loading
            ? "Saving..."
            : initialData
              ? "Update Exhibition"
              : "Create Exhibition"}
        </button>
      </div>
    </form>
  );
}
