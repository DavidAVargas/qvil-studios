import { getPayload } from "payload";
import config from "@payload-config";
import type { RunwayShow, RunwayPhoto, RunwayTheme } from "./runway-data";
import type { Exhibition } from "./exhibition-data";

// Helper to get media URL
function getMediaUrl(media: unknown): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null && "url" in media) {
    return (media as { url: string }).url;
  }
  return "";
}

// Helper to convert id to string
function toStringId(id: string | number): string {
  return String(id);
}

// Runway Shows
export async function getRunwayShowsFromPayload(): Promise<RunwayShow[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "runway-shows",
      sort: "-year",
      depth: 3,
    });

    return result.docs.map((doc) => ({
      id: toStringId(doc.id),
      slug: doc.slug as string,
      title: doc.title as string,
      date: doc.date as string,
      year: doc.year as number,
      description: doc.description as string,
      coverImage: getMediaUrl(doc.coverImage),
      themes: ((doc.themes as Array<{ name?: string; photos?: unknown[] }>) || []).map(
        (theme, index): RunwayTheme => ({
          id: `${doc.slug}-theme-${index}`,
          name: theme.name || "",
          photos: ((theme.photos as Array<{
            id?: string | number;
            image?: unknown;
            alt?: string;
            width?: number;
            height?: number;
          }>) || []).map((photo, photoIndex): RunwayPhoto => {
            const photoDoc = typeof photo === "object" ? photo : null;
            return {
              id: photoDoc?.id ? toStringId(photoDoc.id) : `${doc.slug}-photo-${photoIndex}`,
              src: photoDoc ? getMediaUrl(photoDoc.image) : "",
              alt: (photoDoc?.alt as string) || `Photo ${photoIndex + 1}`,
              width: (photoDoc?.width as number) || 3,
              height: (photoDoc?.height as number) || 4,
            };
          }),
        })
      ),
    }));
  } catch (error) {
    console.error("Error fetching runway shows from Payload:", error);
    return [];
  }
}

export async function getRunwayShowFromPayload(
  slug: string
): Promise<RunwayShow | null> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "runway-shows",
      where: {
        slug: { equals: slug },
      },
      depth: 3,
      limit: 1,
    });

    if (result.docs.length === 0) return null;

    const doc = result.docs[0];
    return {
      id: toStringId(doc.id),
      slug: doc.slug as string,
      title: doc.title as string,
      date: doc.date as string,
      year: doc.year as number,
      description: doc.description as string,
      coverImage: getMediaUrl(doc.coverImage),
      themes: ((doc.themes as Array<{ name?: string; photos?: unknown[] }>) || []).map(
        (theme, index): RunwayTheme => ({
          id: `${doc.slug}-theme-${index}`,
          name: theme.name || "",
          photos: ((theme.photos as Array<{
            id?: string | number;
            image?: unknown;
            alt?: string;
            width?: number;
            height?: number;
          }>) || []).map((photo, photoIndex): RunwayPhoto => {
            const photoDoc = typeof photo === "object" ? photo : null;
            return {
              id: photoDoc?.id ? toStringId(photoDoc.id) : `${doc.slug}-photo-${photoIndex}`,
              src: photoDoc ? getMediaUrl(photoDoc.image) : "",
              alt: (photoDoc?.alt as string) || `Photo ${photoIndex + 1}`,
              width: (photoDoc?.width as number) || 3,
              height: (photoDoc?.height as number) || 4,
            };
          }),
        })
      ),
    };
  } catch (error) {
    console.error("Error fetching runway show from Payload:", error);
    return null;
  }
}

export async function getRunwayShowSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "runway-shows",
      limit: 100,
    });

    return result.docs.map((doc) => doc.slug as string);
  } catch (error) {
    console.error("Error fetching runway show slugs:", error);
    return [];
  }
}

// Exhibitions
export async function getExhibitionsFromPayload(): Promise<Exhibition[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "exhibitions",
      sort: "-year",
      depth: 2,
    });

    return result.docs.map((doc) => ({
      id: toStringId(doc.id),
      slug: doc.slug as string,
      title: doc.title as string,
      date: doc.date as string,
      time: doc.time as string,
      year: doc.year as number,
      venue: {
        name: ((doc.venue as { name?: string })?.name as string) || "",
        address: ((doc.venue as { address?: string })?.address as string) || "",
        city: ((doc.venue as { city?: string })?.city as string) || "",
        description: ((doc.venue as { description?: string })?.description as string) || "",
      },
      description: doc.description as string,
      coverImage: getMediaUrl(doc.coverImage),
      isUpcoming: (doc.isUpcoming as boolean) || false,
    }));
  } catch (error) {
    console.error("Error fetching exhibitions from Payload:", error);
    return [];
  }
}

export async function getUpcomingExhibitionFromPayload(): Promise<Exhibition | null> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "exhibitions",
      where: {
        isUpcoming: { equals: true },
      },
      depth: 2,
      limit: 1,
    });

    if (result.docs.length === 0) return null;

    const doc = result.docs[0];
    return {
      id: toStringId(doc.id),
      slug: doc.slug as string,
      title: doc.title as string,
      date: doc.date as string,
      time: doc.time as string,
      year: doc.year as number,
      venue: {
        name: ((doc.venue as { name?: string })?.name as string) || "",
        address: ((doc.venue as { address?: string })?.address as string) || "",
        city: ((doc.venue as { city?: string })?.city as string) || "",
        description: ((doc.venue as { description?: string })?.description as string) || "",
      },
      description: doc.description as string,
      coverImage: getMediaUrl(doc.coverImage),
      isUpcoming: true,
    };
  } catch (error) {
    console.error("Error fetching upcoming exhibition:", error);
    return null;
  }
}

export async function getPastExhibitionsFromPayload(): Promise<Exhibition[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "exhibitions",
      where: {
        isUpcoming: { equals: false },
      },
      sort: "-year",
      depth: 2,
    });

    return result.docs.map((doc) => ({
      id: toStringId(doc.id),
      slug: doc.slug as string,
      title: doc.title as string,
      date: doc.date as string,
      time: doc.time as string,
      year: doc.year as number,
      venue: {
        name: ((doc.venue as { name?: string })?.name as string) || "",
        address: ((doc.venue as { address?: string })?.address as string) || "",
        city: ((doc.venue as { city?: string })?.city as string) || "",
        description: ((doc.venue as { description?: string })?.description as string) || "",
      },
      description: doc.description as string,
      coverImage: getMediaUrl(doc.coverImage),
      isUpcoming: false,
    }));
  } catch (error) {
    console.error("Error fetching past exhibitions:", error);
    return [];
  }
}

// Hybrid functions that fallback to mock data
import {
  runwayShows as mockRunwayShows,
  getRunwayShow as getMockRunwayShow,
} from "./runway-data";
import {
  getUpcomingExhibition as getMockUpcomingExhibition,
  getPastExhibitions as getMockPastExhibitions,
} from "./exhibition-data";

export async function getRunwayShows(): Promise<RunwayShow[]> {
  const shows = await getRunwayShowsFromPayload();
  if (shows.length > 0) return shows;
  // Fallback to mock data
  return mockRunwayShows;
}

export async function getRunwayShow(
  slug: string
): Promise<RunwayShow | undefined> {
  const show = await getRunwayShowFromPayload(slug);
  if (show) return show;
  // Fallback to mock data
  return getMockRunwayShow(slug);
}

export async function getUpcomingExhibition(): Promise<Exhibition | undefined> {
  const exhibition = await getUpcomingExhibitionFromPayload();
  if (exhibition) return exhibition;
  // Fallback to mock data
  return getMockUpcomingExhibition();
}

export async function getPastExhibitions(): Promise<Exhibition[]> {
  const exhibitions = await getPastExhibitionsFromPayload();
  if (exhibitions.length > 0) return exhibitions;
  // Fallback to mock data
  return getMockPastExhibitions();
}
