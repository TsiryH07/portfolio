import {defineField, defineType} from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({name: "heroTitle", title: "Hero title", type: "string"}),
    defineField({name: "heroSubtitle", title: "Hero subtitle", type: "text"}),
    defineField({
      name: "focusTagsRef",
      title: "Focus tags source",
      type: "reference",
      to: [{type: "focusTagsGroup"}],
      description: "Use a shared focus tags group to reuse data.",
    }),
    defineField({
      name: "focusTags",
      title: "Focus tags",
      type: "array",
      of: [{type: "string"}],
      description: "Optional override when no shared group is selected.",
    }),
    defineField({
      name: "statsRef",
      title: "Stats source",
      type: "reference",
      to: [{type: "statsGroup"}],
      description: "Use a shared stats group to reuse data.",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      description: "Optional override when no shared group is selected.",
    }),
    defineField({
      name: "profile",
      title: "Profile",
      type: "object",
      fields: [
        defineField({name: "name", title: "Name", type: "string"}),
        defineField({name: "role", title: "Role", type: "string"}),
        defineField({
          name: "summary",
          title: "Summary",
          type: "text",
        }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [
            {
              type: "object",
              name: "profileHighlight",
              fields: [
                defineField({name: "label", title: "Label", type: "string"}),
                defineField({name: "value", title: "Value", type: "string"}),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "method",
      title: "Method blocks",
      type: "array",
      of: [
        {
          type: "object",
          name: "methodBlock",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [
        {
          type: "object",
          name: "timelineItem",
          fields: [
            defineField({name: "period", title: "Period", type: "string"}),
            defineField({name: "role", title: "Role", type: "string"}),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({name: "ctaTitle", title: "CTA title", type: "string"}),
    defineField({name: "ctaDescription", title: "CTA description", type: "text"}),
  ],
  preview: {
    select: {
      title: "heroTitle",
      subtitle: "profile.role",
    },
  },
});

