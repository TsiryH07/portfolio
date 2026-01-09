import {defineField, defineType} from "sanity";

export default defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({name: "badge", title: "Badge", type: "string"}),
        defineField({
          name: "name",
          title: "Name",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({name: "role", title: "Role", type: "string"}),
        defineField({name: "description", title: "Description", type: "text"}),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: {hotspot: true},
          fields: [defineField({name: "alt", title: "Alt", type: "string"})],
        }),
      ],
    }),
    defineField({
      name: "cards",
      title: "Navigation cards",
      type: "object",
      fields: [
        defineField({name: "title", title: "Title", type: "string"}),
        defineField({name: "subtitle", title: "Subtitle", type: "string"}),
        defineField({
          name: "items",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "navCard",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                }),
                defineField({name: "href", title: "Href", type: "string"}),
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
    }),
  ],
  preview: {
    select: {title: "hero.name", subtitle: "hero.role"},
  },
});

