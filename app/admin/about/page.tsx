import { getPayload } from "payload";
import config from "@payload-config";
import { AboutForm } from "@/components/Admin/AboutForm";

async function getAboutData() {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({ slug: "about" });
    return data;
  } catch {
    return null;
  }
}

function getImageUrl(item: { url?: string; _key?: string } | null | undefined): string {
  if (!item) return "";
  if (item._key) return `https://utfs.io/f/${item._key}`;
  if (item.url && !item.url.includes("localhost")) return item.url;
  return item.url || "";
}

export default async function AdminAboutPage() {
  const data = await getAboutData();

  const initialData = {
    heading: (data?.heading as string) || "Fashion in Distortion",
    tagline: (data?.tagline as string) || "Where tradition breaks and something new emerges.",
    journeyParagraphs: Array.isArray(data?.journeyParagraphs)
      ? (data.journeyParagraphs as Array<{ text: string }>).map((p) => p.text)
      : [],
    philosophyQuote:
      (data?.philosophyQuote as string) ||
      "Fashion isn't about perfection. It's about tension—the space between what's expected and what's possible.",
    philosophyTagline:
      (data?.philosophyTagline as string) || "Each piece is a question, not an answer.",
    photos: Array.isArray(data?.photos)
      ? (
          data.photos as Array<{
            photo: { id: string; url?: string; _key?: string } | string | null;
            caption?: string;
          }>
        )
          .filter((p) => p.photo)
          .map((p) => ({
            photoId:
              typeof p.photo === "object" && p.photo !== null
                ? (p.photo as { id: string }).id
                : (p.photo as string),
            photoUrl:
              typeof p.photo === "object" && p.photo !== null
                ? getImageUrl(p.photo as { url?: string; _key?: string })
                : "",
            caption: p.caption || "",
          }))
      : [],
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          About Page
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Edit the about page content and photos
        </p>
      </div>
      <AboutForm initialData={initialData} />
    </div>
  );
}
