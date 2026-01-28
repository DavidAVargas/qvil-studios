/**
 * Data Migration Script
 *
 * Migrates mock data from lib/runway-data.ts and lib/exhibition-data.ts
 * to the Payload CMS database.
 *
 * Usage:
 *   npx tsx scripts/migrate-data.ts
 *
 * Prerequisites:
 * - MongoDB Atlas connection string in MONGODB_URI
 * - PAYLOAD_SECRET set in environment
 *
 * Note: Images need to be manually uploaded to UploadThing before running
 * this script, then update the mediaMap below with the actual media IDs.
 */

import { getPayload } from "payload";
import config from "../payload.config";
import { runwayShows } from "../lib/runway-data";
import { exhibitions } from "../lib/exhibition-data";

// Map of local image paths to Payload media IDs
// You'll need to update these after uploading images via the admin UI
const mediaMap: Record<string, string> = {
  "/images/mock-data-1.jpg": "", // Add media ID after uploading
  "/images/mock-data-2.jpg": "", // Add media ID after uploading
  "/images/mock-runway-1.jpg": "", // Add media ID after uploading
  "/images/mock-runway-2.jpg": "", // Add media ID after uploading
};

async function migrateExhibitions(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log("\n--- Migrating Exhibitions ---\n");

  for (const exhibition of exhibitions) {
    try {
      // Check if exhibition already exists
      const existing = await payload.find({
        collection: "exhibitions",
        where: {
          slug: { equals: exhibition.slug },
        },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        console.log(`Exhibition "${exhibition.title}" already exists, skipping...`);
        continue;
      }

      const mediaId = mediaMap[exhibition.coverImage];

      if (!mediaId) {
        console.log(
          `Warning: No media ID found for "${exhibition.coverImage}". ` +
            `Upload the image first and update mediaMap.`
        );
        console.log(`Skipping exhibition "${exhibition.title}"...`);
        continue;
      }

      const result = await payload.create({
        collection: "exhibitions",
        data: {
          title: exhibition.title,
          slug: exhibition.slug,
          date: exhibition.date,
          time: exhibition.time,
          year: exhibition.year,
          venue: {
            name: exhibition.venue.name,
            address: exhibition.venue.address,
            city: exhibition.venue.city,
            description: exhibition.venue.description,
          },
          description: exhibition.description,
          coverImage: mediaId,
          isUpcoming: exhibition.isUpcoming,
        },
      });

      console.log(`Created exhibition: ${result.title} (ID: ${result.id})`);
    } catch (error) {
      console.error(`Error creating exhibition "${exhibition.title}":`, error);
    }
  }
}

async function migrateRunwayShows(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log("\n--- Migrating Runway Shows ---\n");

  for (const show of runwayShows) {
    try {
      // Check if show already exists
      const existing = await payload.find({
        collection: "runway-shows",
        where: {
          slug: { equals: show.slug },
        },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        console.log(`Runway show "${show.title}" already exists, skipping...`);
        continue;
      }

      const coverImageId = mediaMap[show.coverImage];

      if (!coverImageId) {
        console.log(
          `Warning: No media ID found for "${show.coverImage}". ` +
            `Upload the image first and update mediaMap.`
        );
        console.log(`Skipping runway show "${show.title}"...`);
        continue;
      }

      // First, create runway photos for each theme
      const themesWithPhotos: Array<{
        name: string;
        photos: string[];
      }> = [];

      for (const theme of show.themes) {
        const photoIds: string[] = [];

        for (const photo of theme.photos) {
          const photoMediaId = mediaMap[photo.src];

          if (!photoMediaId) {
            console.log(
              `Warning: No media ID for photo "${photo.src}", skipping...`
            );
            continue;
          }

          // Create runway photo
          const runwayPhoto = await payload.create({
            collection: "runway-photos",
            data: {
              image: photoMediaId,
              alt: photo.alt,
              width: photo.width,
              height: photo.height,
            },
          });

          photoIds.push(String(runwayPhoto.id));
          console.log(`  Created runway photo: ${runwayPhoto.alt}`);
        }

        themesWithPhotos.push({
          name: theme.name,
          photos: photoIds,
        });
      }

      // Create the runway show
      const result = await payload.create({
        collection: "runway-shows",
        data: {
          title: show.title,
          slug: show.slug,
          date: show.date,
          year: show.year,
          description: show.description,
          coverImage: coverImageId,
          themes: themesWithPhotos,
        },
      });

      console.log(`Created runway show: ${result.title} (ID: ${String(result.id)})`);
    } catch (error) {
      console.error(`Error creating runway show "${show.title}":`, error);
    }
  }
}

async function main() {
  console.log("=== QVIL Studios Data Migration ===\n");

  // Check if media IDs are configured
  const hasMediaIds = Object.values(mediaMap).some((id) => id !== "");

  if (!hasMediaIds) {
    console.log("IMPORTANT: Before running migration, you need to:");
    console.log("1. Start the dev server: pnpm dev");
    console.log("2. Go to /admin/media and upload the following images:");
    console.log("   - /images/mock-data-1.jpg");
    console.log("   - /images/mock-data-2.jpg");
    console.log("   - /images/mock-runway-1.jpg");
    console.log("   - /images/mock-runway-2.jpg");
    console.log("3. Get the media IDs from the URL or API response");
    console.log("4. Update the mediaMap in this script with the IDs");
    console.log("5. Run this script again\n");
    console.log("Alternatively, you can create content directly in the admin UI.");
    return;
  }

  try {
    const payload = await getPayload({ config });

    await migrateExhibitions(payload);
    await migrateRunwayShows(payload);

    console.log("\n=== Migration Complete ===\n");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
