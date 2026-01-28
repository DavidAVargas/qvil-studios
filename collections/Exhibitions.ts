import type { CollectionConfig } from "payload";

export const Exhibitions: CollectionConfig = {
  slug: "exhibitions",
  labels: {
    singular: "Exhibition",
    plural: "Exhibitions",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "year", "isUpcoming", "date"],
  },
  access: {
    read: () => true,
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
        description: "URL-friendly identifier (e.g., nyc-fashion-week-2025)",
      },
    },
    {
      name: "date",
      type: "text",
      required: true,
      admin: {
        description: "Display date (e.g., February 14, 2025)",
      },
    },
    {
      name: "time",
      type: "text",
      required: true,
      admin: {
        description: "Event time with timezone (e.g., 8:00 PM EST)",
      },
    },
    {
      name: "year",
      type: "number",
      required: true,
    },
    {
      name: "venue",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "address",
          type: "text",
          required: true,
        },
        {
          name: "city",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
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
      name: "isUpcoming",
      type: "checkbox",
      label: "Is Upcoming Event",
      defaultValue: false,
      admin: {
        description: "Check if this is an upcoming event (only one should be checked)",
      },
    },
  ],
};
