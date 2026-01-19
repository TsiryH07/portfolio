// portfolio/schemaTypes/project.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "stack", title: "Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "problem", title: "Problem", type: "text" }),
    defineField({ name: "solution", title: "Solution", type: "text" }),
    defineField({ name: "results", title: "Results", type: "text" }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        defineField({ name: "live", title: "Live URL", type: "url" }),
        defineField({ name: "github", title: "GitHub URL", type: "url" }),
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
    }),
  ],
});
