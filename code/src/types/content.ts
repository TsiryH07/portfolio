export type SanityImage = {
  alt?: string;
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
    };
  };
};

export type HomePageData = {
  hero?: {
    badge?: string;
    name?: string;
    role?: string;
    description?: string;
    image?: SanityImage;
  };
  cards?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      title?: string;
      description?: string;
      href?: string;
      image?: SanityImage;
    }>;
  };
} | null;

export type AboutPageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  focusTagsRef?: {
    tags?: string[];
  };
  focusTags?: string[];
  statsRef?: {
    items?: Array<{value?: string; label?: string}>;
  };
  stats?: Array<{value?: string; label?: string}>;
  profile?: {
    name?: string;
    role?: string;
    summary?: string;
    highlights?: Array<{label?: string; value?: string}>;
  };
  method?: Array<{title?: string; description?: string}>;
  timeline?: Array<{period?: string; role?: string; description?: string}>;
  ctaTitle?: string;
  ctaDescription?: string;
} | null;

export type SkillsPageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  focusTagsRef?: {
    tags?: string[];
  };
  focusTags?: string[];
  metricsRef?: {
    items?: Array<{value?: string; label?: string}>;
  };
  metrics?: Array<{value?: string; label?: string}>;
  skills?: Array<{title?: string; description?: string; level?: number}>;
  tools?: Array<{name?: string; note?: string; logo?: SanityImage}>;
  deliverables?: Array<{
    title?: string;
    description?: string;
    image?: SanityImage;
  }>;
} | null;

export type ProjectsPageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
} | null;

export type StoryPageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  moments?: Array<{
    year?: string;
    title?: string;
    description?: string;
    image?: SanityImage;
  }>;
} | null;

export type SiteSettingsData = {
  title?: string;
  tagline?: string;
  name?: string;
  role?: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  availability?: string;
  avatar?: SanityImage;
  resume?: {asset?: {url?: string}};
  socials?: Array<{label?: string; url?: string; icon?: string}>;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
} | null;
