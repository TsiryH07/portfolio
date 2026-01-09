import {defineField, defineType} from "sanity";

export default defineType({
  name: "focusTagsGroup",
  title: "Focus tags group",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string"}),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{type: "string"}],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tags.0",
    },
  },
});
