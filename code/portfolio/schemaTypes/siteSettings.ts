import {defineField, defineType} from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({name: "role", title: "Role", type: "string"}),
    defineField({name: "description", title: "Description", type: "text"}),
    defineField({name: "email", title: "Email", type: "string"}),
    defineField({name: "phone", title: "Phone", type: "string"}),
    defineField({name: "location", title: "Location", type: "string"}),
    defineField({name: "availability", title: "Availability", type: "string"}),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {hotspot: true},
      fields: [defineField({name: "alt", title: "Alt", type: "string"})],
    }),
    defineField({name: "resume", title: "Resume file", type: "file"}),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({name: "url", title: "URL", type: "url"}),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({name: "title", title: "Title", type: "string"}),
        defineField({name: "description", title: "Description", type: "text"}),
        defineField({
          name: "ogImage",
          title: "OG image",
          type: "image",
          options: {hotspot: true},
          fields: [defineField({name: "alt", title: "Alt", type: "string"})],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "role",
    },
  },
});

