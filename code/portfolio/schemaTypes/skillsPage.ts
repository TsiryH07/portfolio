import {defineField, defineType} from "sanity";

export default defineType({
  name: "skillsPage",
  title: "Skills page",
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
      name: "metricsRef",
      title: "Metrics source",
      type: "reference",
      to: [{type: "statsGroup"}],
      description: "Use a shared stats group to reuse data.",
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          name: "metric",
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
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          name: "skillBlock",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "level",
              title: "Level",
              type: "number",
              validation: (rule) => rule.min(0).max(100),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "tools",
      title: "Tools grid",
      type: "array",
      of: [
        {
          type: "object",
          name: "toolItem",
          fields: [
            defineField({name: "name", title: "Name", type: "string"}),
            defineField({name: "note", title: "Note", type: "string"}),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: {hotspot: true},
              fields: [
                defineField({name: "alt", title: "Alt", type: "string"}),
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [
        {
          type: "object",
          name: "deliverable",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {hotspot: true},
              fields: [
                defineField({name: "alt", title: "Alt", type: "string"}),
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
    },
  },
});

