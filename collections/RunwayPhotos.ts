import type { CollectionConfig } from "payload";

export const RunwayPhotos: CollectionConfig = {
  slug: "runway-photos",
  labels: {
    singular: "Runway Photo",
    plural: "Runway Photos",
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "width", "height"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Alternative text for accessibility",
      },
    },
    {
      name: "width",
      type: "number",
      required: true,
      admin: {
        description: "Aspect ratio width (e.g., 3 for 3:4)",
      },
    },
    {
      name: "height",
      type: "number",
      required: true,
      admin: {
        description: "Aspect ratio height (e.g., 4 for 3:4)",
      },
    },
  ],
};
