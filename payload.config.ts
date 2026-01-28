import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
// import { uploadthingStorage } from "@payloadcms/storage-uploadthing";

import { Media } from "./collections/Media";
import { RunwayShows } from "./collections/RunwayShows";
import { RunwayPhotos } from "./collections/RunwayPhotos";
import { Exhibitions } from "./collections/Exhibitions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Disable the built-in Payload admin UI since we're using custom admin with Clerk
    disable: true,
  },
  collections: [Media, RunwayShows, RunwayPhotos, Exhibitions],
  secret: process.env.PAYLOAD_SECRET || "your-secret-key",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  editor: lexicalEditor(),
  plugins: [
    // TODO: Fix UploadThing integration
    // uploadthingStorage({
    //   collections: {
    //     media: true,
    //   },
    //   options: {
    //     token: process.env.UPLOADTHING_TOKEN,
    //     acl: "public-read",
    //   },
    // }),
  ],
});
