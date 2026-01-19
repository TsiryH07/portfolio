import {defineField, defineType} from "sanity";

export default defineType({
  name: "cvPage",
  title: "CV page",
  type: "document",
  fields: [
    defineField({name: "heroTitle", title: "Hero title", type: "string"}),
    defineField({name: "heroSubtitle", title: "Hero subtitle", type: "text"}),
    defineField({name: "summary", title: "Summary", type: "text"}),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{type: "string"}],
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          name: "experienceItem",
          fields: [
            defineField({name: "role", title: "Role", type: "string"}),
            defineField({name: "company", title: "Company", type: "string"}),
            defineField({name: "location", title: "Location", type: "string"}),
            defineField({name: "period", title: "Period", type: "string"}),
            defineField({name: "summary", title: "Summary", type: "text"}),
            defineField({
              name: "achievements",
              title: "Achievements",
              type: "array",
              of: [{type: "string"}],
            }),
            defineField({
              name: "stack",
              title: "Stack",
              type: "array",
              of: [{type: "string"}],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          name: "educationItem",
          fields: [
            defineField({name: "degree", title: "Degree", type: "string"}),
            defineField({name: "school", title: "School", type: "string"}),
            defineField({name: "period", title: "Period", type: "string"}),
          ],
        },
      ],
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [
        {
          type: "object",
          name: "certificationItem",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({name: "issuer", title: "Issuer", type: "string"}),
            defineField({name: "year", title: "Year", type: "string"}),
          ],
        },
      ],
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [
        {
          type: "object",
          name: "languageItem",
          fields: [
            defineField({name: "name", title: "Name", type: "string"}),
            defineField({name: "level", title: "Level", type: "string"}),
          ],
        },
      ],
    }),
    defineField({
      name: "skillGroups",
      title: "Skill groups",
      type: "array",
      of: [
        {
          type: "object",
          name: "skillGroup",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [{type: "string"}],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "tools",
      title: "Tools",
      type: "array",
      of: [{type: "string"}],
    }),
    defineField({
      name: "links",
      title: "CV links",
      type: "array",
      of: [
        {
          type: "object",
          name: "cvLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured projects",
      type: "array",
      of: [{type: "reference", to: [{type: "project"}]}],
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      subtitle: "heroSubtitle",
    },
  },
});
