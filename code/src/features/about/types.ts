export type AboutStat = {
  value: string;
  label: string;
};

export type AboutHighlight = {
  title: string;
  description: string;
};

export type AboutProfileHighlight = {
  label: string;
  value: string;
};

export type AboutProfile = {
  name: string;
  role: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  highlights: AboutProfileHighlight[];
};

export type AboutTimelineItem = {
  period: string;
  role: string;
  description: string;
};

export type AboutPageViewModel = {
  heroTitle: string;
  heroSubtitle: string;
  focusTags: string[];
  stats: AboutStat[];
  highlights: AboutHighlight[];
  profile: AboutProfile;
  timeline: AboutTimelineItem[];
  ctaTitle: string;
  ctaDescription: string;
};
