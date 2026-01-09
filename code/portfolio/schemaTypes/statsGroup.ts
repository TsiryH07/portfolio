import {defineField, defineType} from "sanity";

export default defineType({
  name: "statsGroup",
  title: "Stats group",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string"}),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "statItem",
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
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "items.0.label",
    },
  },
});
