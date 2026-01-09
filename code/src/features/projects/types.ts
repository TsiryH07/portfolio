export type ProjectImage = {
  alt?: string;
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
    };
  };
};

export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  featured?: boolean;
  stack?: string[];
  role?: string;
  summary?: string;
  problem?: string;
  solution?: string;
  results?: string;
  links?: ProjectLinks;
  coverImage?: ProjectImage;
};

export type ProjectsPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  sectionTitle: string;
  sectionSubtitle?: string | null;
};
