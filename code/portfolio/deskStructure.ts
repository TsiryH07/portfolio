import type {StructureBuilder} from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Home page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('About page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Skills page')
        .id('skillsPage')
        .child(S.document().schemaType('skillsPage').documentId('skillsPage')),
      S.listItem()
        .title('Projects page')
        .id('projectsPage')
        .child(S.document().schemaType('projectsPage').documentId('projectsPage')),
      S.listItem()
        .title('Story page')
        .id('storyPage')
        .child(S.document().schemaType('storyPage').documentId('storyPage')),
      S.divider(),
      S.listItem()
        .title('Shared content')
        .child(
          S.list()
            .title('Shared content')
            .items([
              S.documentTypeListItem('focusTagsGroup').title('Focus tags groups'),
              S.documentTypeListItem('statsGroup').title('Stats groups'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
    ])
