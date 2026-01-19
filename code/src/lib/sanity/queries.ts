// src/lib/sanity/queries.ts
import { groq } from "next-sanity";

const imageFields = `
  alt,
  asset->{
    url,
    metadata {
      lqip
    }
  }
`;

// Liste de projets (ex: tri + filtrage)
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    featured,
    order,
    stack,
    role,
    summary,
    problem,
    solution,
    results,
    links,
    coverImage { ${imageFields} },
  }
`;

// Un projet par slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    featured,
    order,
    stack,
    role,
    summary,
    problem,
    solution,
    results,
    links,
    coverImage { ${imageFields} },
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    name,
    role,
    description,
    email,
    phone,
    location,
    availability,
    avatar { ${imageFields} },
    resume,
    socials[] {
      label,
      url
    },
    seo {
      title,
      description,
      ogImage { ${imageFields} }
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero {
      badge,
      name,
      role,
      description,
      image { ${imageFields} }
    },
    cards {
      title,
      subtitle,
      items[] {
        title,
        description,
        href,
        image { ${imageFields} }
      }
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroTitle,
    heroSubtitle,
    focusTagsRef->{
      tags
    },
    focusTags,
    statsRef->{
      items[] {
        value,
        label
      }
    },
    stats,
    profile,
    method,
    timeline,
    ctaTitle,
    ctaDescription
  }
`;

export const skillsPageQuery = groq`
  *[_type == "skillsPage"][0] {
    heroTitle,
    heroSubtitle,
    focusTagsRef->{
      tags
    },
    focusTags,
    metricsRef->{
      items[] {
        value,
        label
      }
    },
    metrics,
    skills,
    tools[] {
      name,
      note,
      logo { ${imageFields} }
    },
    deliverables[] {
      title,
      description,
      image { ${imageFields} }
    }
  }
`;

export const projectsPageQuery = groq`
  *[_type == "projectsPage"][0] {
    heroTitle,
    heroSubtitle,
    sectionTitle,
    sectionSubtitle
  }
`;

export const cvPageQuery = groq`
  *[_type == "cvPage"][0] {
    heroTitle,
    heroSubtitle,
    summary,
    highlights,
    experience[] {
      role,
      company,
      location,
      period,
      summary,
      achievements,
      stack
    },
    education[] {
      degree,
      school,
      period
    },
    certifications[] {
      title,
      issuer,
      year
    },
    languages[] {
      name,
      level
    },
    skillGroups[] {
      title,
      items
    },
    tools,
    links,
    featuredProjects[]-> {
      _id,
      title,
      "slug": slug.current,
      role,
      summary,
      stack,
      links,
      coverImage { ${imageFields} }
    }
  }
`;

export const storyPageQuery = groq`
  *[_type == "storyPage"][0] {
    heroTitle,
    heroSubtitle,
    moments[] {
      year,
      title,
      description,
      image { ${imageFields} }
    }
  }
`;
