import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { RunwayShowForm } from "@/components/Admin/RunwayShowForm";

// Helper to get media URL and ID (handles UploadThing _key)
function getMediaInfo(media: unknown): { id: string; url: string } {
  if (!media) return { id: "", url: "" };
  if (typeof media === "string") return { id: media, url: "" };
  if (typeof media === "object" && media !== null) {
    const m = media as { id?: string | number; url?: string; _key?: string };
    // Construct UploadThing URL from _key if available
    let url = "";
    if (m._key) {
      url = `https://utfs.io/f/${m._key}`;
    } else if (m.url && !m.url.includes("localhost")) {
      url = m.url;
    }
    return {
      id: String(m.id || ""),
      url,
    };
  }
  return { id: "", url: "" };
}

async function getRunwayShow(id: string) {
  const payload = await getPayload({ config });

  try {
    const show = await payload.findByID({
      collection: "runway-shows",
      id,
      depth: 2,
    });

    // Transform to the expected type
    const coverImage = getMediaInfo(show.coverImage);

    return {
      id: String(show.id),
      title: show.title as string,
      slug: show.slug as string,
      date: show.date as string,
      year: show.year as number,
      description: show.description as string,
      coverImage: coverImage.url ? coverImage : coverImage.id,
      themes: ((show.themes as Array<{ name?: string; photos?: unknown[] }>) || []).map(
        (theme) => ({
          name: theme.name || "",
          photos: ((theme.photos as Array<{ photo?: { id?: string | number }; id?: string | number; orientation?: string }>) || [])
            .map((p) => {
              // Handle both new format {photo, orientation} and old format {id}
              const id = p?.photo?.id ?? p?.id;
              return { id: String(id || ""), orientation: (p?.orientation as "horizontal" | "vertical") || "vertical" };
            })
            .filter((p) => p.id),
        })
      ),
    };
  } catch {
    return null;
  }
}

export default async function EditRunwayShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await getRunwayShow(id);

  if (!show) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Edit Runway Show
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update {show.title}
        </p>
      </div>

      <RunwayShowForm initialData={show} />
    </div>
  );
}
