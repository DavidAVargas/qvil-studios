import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { ExhibitionForm } from "@/components/Admin/ExhibitionForm";

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

async function getExhibition(id: string) {
  const payload = await getPayload({ config });

  try {
    const exhibition = await payload.findByID({
      collection: "exhibitions",
      id,
      depth: 2,
    });

    // Transform to the expected type
    const coverImage = getMediaInfo(exhibition.coverImage);
    const venue = exhibition.venue as {
      name?: string;
      address?: string;
      city?: string;
      description?: string;
    } | null;

    return {
      id: String(exhibition.id),
      title: exhibition.title as string,
      slug: exhibition.slug as string,
      date: exhibition.date as string,
      time: exhibition.time as string,
      year: exhibition.year as number,
      venue: {
        name: venue?.name || "",
        address: venue?.address || "",
        city: venue?.city || "",
        description: venue?.description || "",
      },
      description: exhibition.description as string,
      coverImage: coverImage.url ? coverImage : coverImage.id,
      isUpcoming: (exhibition.isUpcoming as boolean) || false,
    };
  } catch {
    return null;
  }
}

export default async function EditExhibitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exhibition = await getExhibition(id);

  if (!exhibition) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Edit Exhibition
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update {exhibition.title}
        </p>
      </div>

      <ExhibitionForm initialData={exhibition} />
    </div>
  );
}
