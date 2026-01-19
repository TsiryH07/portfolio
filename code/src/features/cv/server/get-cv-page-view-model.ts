import {
  getAboutPage,
  getCvPage,
  getSiteSettings,
  getSkillsPage,
} from "@/lib/sanity/content";

import type {
  CvCertification,
  CvEducation,
  CvExperience,
  CvLanguage,
  CvLogo,
  CvPageViewModel,
  CvProject,
  CvSkillGroup,
  CvSocialLink,
} from "../types";

const defaultHighlights = [
  "Next.js App Router",
  "Design system scalable",
  "SEO + performance",
  "CMS headless",
  "UI oriente conversion",
];

const defaultExperience: CvExperience[] = [
  {
    role: "Lead Frontend",
    company: "Agence digitale",
    location: "Paris, FR",
    period: "2022 - Aujourd'hui",
    summary:
      "Pilotage des refontes, design system, et delivery rapide pour des startups.",
    achievements: [
      "Reductions du temps de build et des bundles",
      "Process de livraison en sprints courts",
      "Collaboration produit + design fluide",
    ],
    stack: ["Next.js", "TypeScript", "Sanity", "Tailwind"],
  },
  {
    role: "UI Designer / Integrateur",
    company: "Freelance",
    location: "Remote",
    period: "2019 - 2022",
    summary:
      "Creation d'interfaces modernes et integration front pour des equipes produit.",
    achievements: [
      "Parcours utilisateur simplifies",
      "Pages qui convertissent mieux",
      "Design tokens reutilisables",
    ],
    stack: ["React", "Figma", "Framer", "CSS"],
  },
];

const defaultEducation: CvEducation[] = [
  {
    degree: "Master Design & Tech",
    school: "Ecole de design",
    period: "2017 - 2019",
  },
];

const defaultCertifications: CvCertification[] = [
  {title: "Next.js Advanced", issuer: "Vercel", year: "2023"},
  {title: "Design Systems", issuer: "Designlab", year: "2022"},
];

const defaultLanguages: CvLanguage[] = [
  {name: "Francais", level: "Natif"},
  {name: "Anglais", level: "Professionnel"},
];

const defaultSkillGroups: CvSkillGroup[] = [
  {title: "Frontend", items: ["Next.js", "React", "TypeScript", "CSS"]},
  {title: "Backend", items: ["Sanity", "Node.js", "API REST", "Auth"]},
  {title: "Design", items: ["Figma", "Wireframes", "Design tokens"]},
  {title: "Delivery", items: ["CI/CD", "Perf", "A11y", "SEO"]},
];

const defaultTools = [
  "HTML/CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Spring Boot",
  "PHP",
  "Laravel",
  "Python",
  "PostgreSQL",
  "MySQL",
  "Oracle",
  "Supabase",
  "Vercel",
  "Tailwind",
  "MUI",
  "shadcn/ui",
  "Git",
  "GitHub",
  "VS Code",
  "n8n",
];

const normalizeLogoKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const defaultToolLogos: CvLogo[] = [
  {name: "HTML/CSS", logoSrc: "/logos/logo-htmlcss.svg", logoAlt: "HTML/CSS logo"},
  {name: "JavaScript", logoSrc: "/logos/logo-javascript.svg", logoAlt: "JavaScript logo"},
  {name: "React", logoSrc: "/logos/logo-react.svg", logoAlt: "React logo"},
  {name: "Next.js", logoSrc: "/logos/logo-nextjs.svg", logoAlt: "Next.js logo"},
  {name: "Node.js", logoSrc: "/logos/logo-nodejs.svg", logoAlt: "Node.js logo"},
  {name: "Java", logoSrc: "/logos/logo-java.svg", logoAlt: "Java logo"},
  {name: "Spring Boot", logoSrc: "/logos/logo-springboot.svg", logoAlt: "Spring Boot logo"},
  {name: "PHP", logoSrc: "/logos/logo-php.svg", logoAlt: "PHP logo"},
  {name: "Laravel", logoSrc: "/logos/logo-laravel.svg", logoAlt: "Laravel logo"},
  {name: "Python", logoSrc: "/logos/logo-python.svg", logoAlt: "Python logo"},
  {name: "PostgreSQL", logoSrc: "/logos/logo-postgresql.svg", logoAlt: "PostgreSQL logo"},
  {name: "MySQL", logoSrc: "/logos/logo-mysql.svg", logoAlt: "MySQL logo"},
  {name: "Oracle", logoSrc: "/logos/logo-oracle.svg", logoAlt: "Oracle logo"},
  {name: "Supabase", logoSrc: "/logos/logo-supabase.svg", logoAlt: "Supabase logo"},
  {name: "Vercel", logoSrc: "/logos/logo-vercel.svg", logoAlt: "Vercel logo"},
  {name: "Tailwind", logoSrc: "/logos/logo-tailwindcss.svg", logoAlt: "Tailwind logo"},
  {name: "MUI", logoSrc: "/logos/logo-mui.svg", logoAlt: "MUI logo"},
  {name: "shadcn/ui", logoSrc: "/logos/logo-shadcnui.svg", logoAlt: "shadcn/ui logo"},
  {name: "Git", logoSrc: "/logos/logo-git.svg", logoAlt: "Git logo"},
  {name: "GitHub", logoSrc: "/logos/logo-github.svg", logoAlt: "GitHub logo"},
  {name: "VS Code", logoSrc: "/logos/logo-vscode.svg", logoAlt: "VS Code logo"},
  {name: "n8n", logoSrc: "/logos/logo-n8n.svg", logoAlt: "n8n logo"},
];

export async function getCvPageViewModel(): Promise<CvPageViewModel> {
  const [cv, settings, skillsPage, aboutPage] = await Promise.all([
    getCvPage(),
    getSiteSettings(),
    getSkillsPage(),
    getAboutPage(),
  ]);

  const heroTitle =
    cv?.heroTitle ??
    aboutPage?.heroTitle ??
    "Mon CV";
  const heroSubtitle =
    cv?.heroSubtitle ??
    aboutPage?.heroSubtitle ??
    "Une vision claire de mon parcours, mes expertises et mes livrables.";
  const summary =
    cv?.summary ??
    aboutPage?.profile?.summary ??
    settings?.description ??
    "Je combine design et execution front pour livrer vite des experiences solides.";

  const skillsFocusTags = skillsPage?.focusTagsRef?.tags?.length
    ? skillsPage.focusTagsRef.tags
    : skillsPage?.focusTags?.length
      ? skillsPage.focusTags
      : [];

  const highlights = cv?.highlights?.length
    ? cv.highlights
    : skillsFocusTags.length
      ? skillsFocusTags
      : defaultHighlights;

  const timelineSource = aboutPage?.timeline?.length ? aboutPage.timeline : [];
  const experienceSource = cv?.experience?.length
    ? cv.experience
    : timelineSource.length
      ? timelineSource.map((item) => ({
          role: item?.role,
          company: "",
          location: "",
          period: item?.period,
          summary: item?.description,
          achievements: [],
          stack: [],
        }))
      : defaultExperience;
  const experience = experienceSource.map((item, index) => {
    const fallback = defaultExperience[index];
    return {
      role: item?.role ?? fallback?.role ?? "",
      company: item?.company ?? fallback?.company ?? "",
      location: item?.location ?? fallback?.location ?? "",
      period: item?.period ?? fallback?.period ?? "",
      summary: item?.summary ?? fallback?.summary ?? "",
      achievements:
        item?.achievements?.length ? item.achievements : fallback?.achievements ?? [],
      stack: item?.stack?.length ? item.stack : fallback?.stack ?? [],
    };
  });

  const educationSource =
    cv?.education?.length ? cv.education : defaultEducation;
  const education = educationSource.map((item, index) => {
    const fallback = defaultEducation[index];
    return {
      degree: item?.degree ?? fallback?.degree ?? "",
      school: item?.school ?? fallback?.school ?? "",
      period: item?.period ?? fallback?.period ?? "",
    };
  });

  const certificationsSource =
    cv?.certifications?.length ? cv.certifications : defaultCertifications;
  const certifications = certificationsSource.map((item, index) => {
    const fallback = defaultCertifications[index];
    return {
      title: item?.title ?? fallback?.title ?? "",
      issuer: item?.issuer ?? fallback?.issuer ?? "",
      year: item?.year ?? fallback?.year ?? "",
    };
  });

  const languagesSource =
    cv?.languages?.length ? cv.languages : defaultLanguages;
  const languages = languagesSource.map((item, index) => {
    const fallback = defaultLanguages[index];
    return {
      name: item?.name ?? fallback?.name ?? "",
      level: item?.level ?? fallback?.level ?? "",
    };
  });

  const skillBlocks = skillsPage?.skills?.length ? skillsPage.skills : [];
  const derivedSkillGroups = [
    skillBlocks.length
      ? {
          title: "Competences",
          items: skillBlocks
            .map((skill) => skill?.title ?? "")
            .filter(Boolean),
        }
      : null,
    skillsFocusTags.length
      ? {
          title: "Focus",
          items: skillsFocusTags,
        }
      : null,
  ].filter((group): group is CvSkillGroup => Boolean(group));

  const skillGroupsSource =
    cv?.skillGroups?.length
      ? cv.skillGroups
      : derivedSkillGroups.length
        ? derivedSkillGroups
        : defaultSkillGroups;
  const skillGroups = skillGroupsSource.map((item, index) => {
    const fallback = defaultSkillGroups[index];
    return {
      title: item?.title ?? fallback?.title ?? "",
      items: item?.items?.length ? item.items : fallback?.items ?? [],
    };
  });

  const skillsTools = skillsPage?.tools?.length
    ? skillsPage.tools.map((tool) => tool.name ?? "").filter(Boolean)
    : [];
  const tools = cv?.tools?.length
    ? cv.tools
    : skillsTools.length
      ? skillsTools
      : defaultTools;

  const fallbackLogoByKey = new Map(
    defaultToolLogos.map((logo) => [normalizeLogoKey(logo.name), logo]),
  );
  const tailwindAlias = fallbackLogoByKey.get(normalizeLogoKey("Tailwind"));
  if (tailwindAlias) {
    fallbackLogoByKey.set(normalizeLogoKey("Tailwind CSS"), tailwindAlias);
  }

  const toolLogos: CvLogo[] = skillsPage?.tools?.length
    ? skillsPage.tools
        .map((tool) => {
          const name = tool?.name ?? "";
          if (!name) return null;
          const fallbackLogo = fallbackLogoByKey.get(normalizeLogoKey(name));
          const logoSrc = tool?.logo?.asset?.url ?? fallbackLogo?.logoSrc ?? "";
          if (!logoSrc) return null;
          return {
            name,
            logoSrc,
            logoAlt: tool?.logo?.alt ?? fallbackLogo?.logoAlt ?? name,
          };
        })
        .filter((tool): tool is CvLogo => Boolean(tool))
    : defaultToolLogos;

  const profileName =
    aboutPage?.profile?.name ?? settings?.name ?? "Votre Nom";
  const profileRole =
    aboutPage?.profile?.role ?? settings?.role ?? "Product & UI Designer";
  const profileAvatar =
    settings?.avatar?.asset?.url ?? "/avatar-placeholder.svg";
  const profileAvatarAlt = settings?.avatar?.alt ?? profileName;

  const contact = {
    email: settings?.email ?? "hello@exemple.com",
    phone: settings?.phone ?? "+33 6 00 00 00 00",
    location: settings?.location ?? "Paris, FR",
    availability: settings?.availability ?? "Disponible",
    resumeUrl: settings?.resume?.asset?.url ?? undefined,
  };

  const socialLinks: CvSocialLink[] =
    settings?.socials
      ?.map((item) => ({
        label: item?.label ?? "",
        url: item?.url ?? "",
      }))
      .filter((item) => item.label && item.url) ?? [];

  const cvLinks: CvSocialLink[] =
    cv?.links
      ?.map((item) => ({
        label: item?.label ?? "",
        url: item?.url ?? "",
      }))
      .filter((item) => item.label && item.url) ?? [];

  const featuredProjects: CvProject[] =
    cv?.featuredProjects
      ?.map((project) => ({
        _id: project?._id ?? "",
        title: project?.title ?? "",
        slug: project?.slug ?? undefined,
        role: project?.role ?? undefined,
        summary: project?.summary ?? undefined,
        stack: project?.stack ?? undefined,
        links: project?.links ?? undefined,
        coverImage: project?.coverImage ?? undefined,
      }))
      .filter((project) => project._id && project.title) ?? [];

  return {
    heroTitle,
    heroSubtitle,
    summary,
    highlights,
    experience,
    education,
    certifications,
    languages,
    skillGroups,
    tools,
    toolLogos,
    contact,
    socialLinks,
    cvLinks,
    featuredProjects,
    profile: {
      name: profileName,
      role: profileRole,
      avatarSrc: profileAvatar,
      avatarAlt: profileAvatarAlt,
    },
  };
}
