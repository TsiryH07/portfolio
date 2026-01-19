export type CvExperience = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
};

export type CvEducation = {
  degree: string;
  school: string;
  period: string;
};

export type CvCertification = {
  title: string;
  issuer: string;
  year: string;
};

export type CvLanguage = {
  name: string;
  level: string;
};

export type CvSkillGroup = {
  title: string;
  items: string[];
};

export type CvLogo = {
  name: string;
  logoSrc: string;
  logoAlt: string;
};

export type CvProject = {
  _id: string;
  title: string;
  slug?: string;
  role?: string;
  summary?: string;
  stack?: string[];
  links?: {
    live?: string;
    github?: string;
  };
  coverImage?: {
    alt?: string;
    asset?: {
      url?: string;
      metadata?: {
        lqip?: string;
      };
    };
  };
};

export type CvContact = {
  email: string;
  phone: string;
  location: string;
  availability: string;
  resumeUrl?: string;
};

export type CvProfile = {
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt: string;
};

export type CvSocialLink = {
  label: string;
  url: string;
};

export type CvPageViewModel = {
  heroTitle: string;
  heroSubtitle: string;
  summary: string;
  highlights: string[];
  experience: CvExperience[];
  education: CvEducation[];
  certifications: CvCertification[];
  languages: CvLanguage[];
  skillGroups: CvSkillGroup[];
  tools: string[];
  toolLogos: CvLogo[];
  contact: CvContact;
  profile: CvProfile;
  socialLinks: CvSocialLink[];
  cvLinks: CvSocialLink[];
  featuredProjects: CvProject[];
};
