import {defineField, defineType} from "sanity";

export default defineType({
  name: "projectsPage",
  title: "Projects page",
  type: "document",
  fields: [
    defineField({name: "heroTitle", title: "Hero title", type: "string"}),
    defineField({name: "heroSubtitle", title: "Hero subtitle", type: "text"}),
    defineField({name: "sectionTitle", title: "Section title", type: "string"}),
    defineField({
      name: "sectionSubtitle",
      title: "Section subtitle",
      type: "text",
    }),
  ],
  preview: {
    select: {title: "heroTitle"},
  },
});

