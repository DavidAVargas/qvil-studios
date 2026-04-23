import type { GlobalConfig } from "payload";

export const About: GlobalConfig = {
  slug: "about",
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "heading",
      type: "text",
      defaultValue: "Fashion in Distortion",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Where tradition breaks and something new emerges.",
    },
    {
      name: "journeyParagraphs",
      label: "Journey Paragraphs",
      type: "array",
      fields: [
        {
          name: "text",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "philosophyQuote",
      type: "textarea",
      defaultValue:
        "Fashion isn't about perfection. It's about tension—the space between what's expected and what's possible.",
    },
    {
      name: "philosophyTagline",
      type: "text",
      defaultValue: "Each piece is a question, not an answer.",
    },
    {
      name: "photos",
      label: "Photos (up to 3)",
      type: "array",
      maxRows: 3,
      fields: [
        {
          name: "photo",
          type: "relationship",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
  ],
};
