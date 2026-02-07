import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
    },
    {
      name: "focalX",
      type: "number",
      defaultValue: 50,
      admin: {
        description: "Horizontal focal point (0-100%, 50 = center)",
      },
    },
    {
      name: "focalY",
      type: "number",
      defaultValue: 50,
      admin: {
        description: "Vertical focal point (0-100%, 50 = center)",
      },
    },
  ],
};
