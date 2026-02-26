import type { CollectionConfig } from "payload";

export const RunwayShows: CollectionConfig = {
  slug: "runway-shows",
  labels: {
    singular: "Runway Show",
    plural: "Runway Shows",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "year", "date"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier (e.g., dark, paris)",
      },
    },
    {
      name: "date",
      type: "text",
      required: true,
      admin: {
        description: "Display date (e.g., September 15, 2024)",
      },
    },
    {
      name: "year",
      type: "number",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "themes",
      type: "array",
      label: "Themes",
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          admin: {
            description: "Theme name (e.g., Dune, Classic)",
          },
        },
        {
          name: "photos",
          type: "array",
          label: "Photos",
          admin: {
            description: "Add photos and set each one as horizontal or vertical",
          },
          fields: [
            {
              name: "photo",
              type: "relationship",
              relationTo: "media",
              required: true,
            },
            {
              name: "orientation",
              type: "select",
              defaultValue: "vertical",
              options: [
                { label: "Vertical (Portrait)", value: "vertical" },
                { label: "Horizontal (Landscape)", value: "horizontal" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
