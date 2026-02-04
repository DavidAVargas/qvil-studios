import { getPayload } from "payload";
import config from "@payload-config";
import type { RunwayShow, RunwayPhoto, RunwayTheme } from "./runway-data";
import type { Exhibition } from "./exhibition-data";

// Helper to get media URL - handles UploadThing cloud storage
function getMediaUrl(media: unknown): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    const mediaObj = media as { url?: string; filename?: string; _key?: string };
    // If we have an UploadThing key, construct the cloud URL
    if (mediaObj._key) {
      return `https://utfs.io/f/${mediaObj._key}`;
    }
    // If we have a URL that's not localhost, use it
    if (mediaObj.url && !mediaObj.url.includes("localhost")) {
      return mediaObj.url;
    }
    // Fallback: construct URL from filename (for local dev)
    if (mediaObj.filename) {
      return `/media/${mediaObj.filename}`;
    }
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
          photos: ((theme.photos || []) as unknown[]).map((photo, photoIndex): RunwayPhoto => {
            // Photos are now direct media relationships
            const photoUrl = getMediaUrl(photo);
            const photoId = typeof photo === "object" && photo !== null
              ? (photo as { id?: string | number }).id
              : null;
            const photoAlt = typeof photo === "object" && photo !== null
              ? (photo as { alt?: string }).alt
              : null;
            return {
              id: photoId ? toStringId(photoId) : `${doc.slug}-photo-${photoIndex}`,
              src: photoUrl,
              alt: photoAlt || `Photo ${photoIndex + 1}`,
              width: 3,
              height: 4,
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
    console.log("[getRunwayShowFromPayload] Querying for slug:", slug);
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "runway-shows",
      where: {
        slug: { equals: slug },
      },
      depth: 3,
      limit: 1,
    });

    console.log("[getRunwayShowFromPayload] Found docs:", result.docs.length);
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
          photos: ((theme.photos || []) as unknown[]).map((photo, photoIndex): RunwayPhoto => {
            // Photos are now direct media relationships
            const photoUrl = getMediaUrl(photo);
            const photoId = typeof photo === "object" && photo !== null
              ? (photo as { id?: string | number }).id
              : null;
            const photoAlt = typeof photo === "object" && photo !== null
              ? (photo as { alt?: string }).alt
              : null;
            return {
              id: photoId ? toStringId(photoId) : `${doc.slug}-photo-${photoIndex}`,
              src: photoUrl,
              alt: photoAlt || `Photo ${photoIndex + 1}`,
              width: 3,
              height: 4,
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
        link: ((doc.venue as { link?: string })?.link as string) || "",
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
        link: ((doc.venue as { link?: string })?.link as string) || "",
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
        link: ((doc.venue as { link?: string })?.link as string) || "",
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
  // Decode URL-encoded slug (e.g., "dark%20emo" -> "dark emo")
  const decodedSlug = decodeURIComponent(slug);
  console.log("[getRunwayShow] Looking for slug:", decodedSlug);
  const show = await getRunwayShowFromPayload(decodedSlug);
  console.log("[getRunwayShow] Payload result:", show ? "found" : "not found");
  if (show) return show;
  // Fallback to mock data
  const mockShow = getMockRunwayShow(decodedSlug);
  console.log("[getRunwayShow] Mock result:", mockShow ? "found" : "not found");
  return mockShow;
}

export async function getUpcomingExhibition(): Promise<Exhibition | undefined> {
  // First check if there are ANY exhibitions in the CMS
  const allExhibitions = await getExhibitionsFromPayload();
  if (allExhibitions.length > 0) {
    // CMS has exhibitions - only return upcoming from CMS (may be undefined)
    const exhibition = await getUpcomingExhibitionFromPayload();
    return exhibition || undefined;
  }
  // No exhibitions in CMS - fallback to mock data
  return getMockUpcomingExhibition();
}

export async function getPastExhibitions(): Promise<Exhibition[]> {
  // First check if there are ANY exhibitions in the CMS
  const allExhibitions = await getExhibitionsFromPayload();
  if (allExhibitions.length > 0) {
    // CMS has exhibitions - return past from CMS
    return getPastExhibitionsFromPayload();
  }
  // No exhibitions in CMS - fallback to mock data
  return getMockPastExhibitions();
}
