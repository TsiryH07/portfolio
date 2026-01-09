import {defineField, defineType} from "sanity";

export default defineType({
  name: "storyPage",
  title: "Story page",
  type: "document",
  fields: [
    defineField({name: "heroTitle", title: "Hero title", type: "string"}),
    defineField({name: "heroSubtitle", title: "Hero subtitle", type: "text"}),
    defineField({
      name: "moments",
      title: "Moments",
      type: "array",
      of: [
        {
          type: "object",
          name: "moment",
          fields: [
            defineField({name: "year", title: "Year", type: "string"}),
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
    select: {title: "heroTitle"},
  },
});

