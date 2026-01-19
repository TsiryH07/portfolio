import {getSkillsPage} from "@/lib/sanity/content";

import type {
  Deliverable,
  SkillBlock,
  SkillsMetric,
  SkillsPageViewModel,
  ToolGridItem,
  ToolHighlight,
} from "../types";

const defaultFocusTags = [
  "UX audit",
  "Landing page",
  "SaaS",
  "E-commerce",
  "Mobile",
  "No-code + dev",
];

const defaultMetrics: SkillsMetric[] = [
  {value: "48h", label: "feedback initial"},
  {value: "3-5", label: "ecrans cles"},
  {value: "1", label: "systeme visuel"},
  {value: "100%", label: "focus resultat"},
];

const defaultSkillBlocks: SkillBlock[] = [
  {
    title: "UX & conversion",
    description:
      "Je clarifie votre offre et j'organise le parcours pour vendre.",
    level: 90,
  },
  {
    title: "UI moderne",
    description:
      "Des interfaces propres, lisibles, qui inspirent confiance.",
    level: 88,
  },
  {
    title: "Prototype rapide",
    description:
      "Wireframes et maquettes interactives pour valider vite.",
    level: 84,
  },
  {
    title: "Integration front",
    description:
      "Handoff clair ou integration directe en Next.js.",
    level: 76,
  },
];

const normalizeToolKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const toolLogoFallbacks = new Map<string, {src: string; alt: string}>([
  [normalizeToolKey("HTML/CSS"), {src: "/logos/logo-htmlcss.svg", alt: "HTML/CSS logo"}],
  [normalizeToolKey("JavaScript"), {src: "/logos/logo-javascript.svg", alt: "JavaScript logo"}],
  [normalizeToolKey("React"), {src: "/logos/logo-react.svg", alt: "React logo"}],
  [normalizeToolKey("Next.js"), {src: "/logos/logo-nextjs.svg", alt: "Next.js logo"}],
  [normalizeToolKey("Node.js"), {src: "/logos/logo-nodejs.svg", alt: "Node.js logo"}],
  [normalizeToolKey("Java"), {src: "/logos/logo-java.svg", alt: "Java logo"}],
  [normalizeToolKey("Spring Boot"), {src: "/logos/logo-springboot.svg", alt: "Spring Boot logo"}],
  [normalizeToolKey("PHP"), {src: "/logos/logo-php.svg", alt: "PHP logo"}],
  [normalizeToolKey("Laravel"), {src: "/logos/logo-laravel.svg", alt: "Laravel logo"}],
  [normalizeToolKey("Python"), {src: "/logos/logo-python.svg", alt: "Python logo"}],
  [normalizeToolKey("PostgreSQL"), {src: "/logos/logo-postgresql.svg", alt: "PostgreSQL logo"}],
  [normalizeToolKey("MySQL"), {src: "/logos/logo-mysql.svg", alt: "MySQL logo"}],
  [normalizeToolKey("Oracle"), {src: "/logos/logo-oracle.svg", alt: "Oracle logo"}],
  [normalizeToolKey("Supabase"), {src: "/logos/logo-supabase.svg", alt: "Supabase logo"}],
  [normalizeToolKey("Vercel"), {src: "/logos/logo-vercel.svg", alt: "Vercel logo"}],
  [normalizeToolKey("Tailwind"), {src: "/logos/logo-tailwindcss.svg", alt: "Tailwind logo"}],
  [normalizeToolKey("Tailwind CSS"), {src: "/logos/logo-tailwindcss.svg", alt: "Tailwind logo"}],
  [normalizeToolKey("MUI"), {src: "/logos/logo-mui.svg", alt: "MUI logo"}],
  [normalizeToolKey("shadcn/ui"), {src: "/logos/logo-shadcnui.svg", alt: "shadcn/ui logo"}],
  [normalizeToolKey("Git"), {src: "/logos/logo-git.svg", alt: "Git logo"}],
  [normalizeToolKey("GitHub"), {src: "/logos/logo-github.svg", alt: "GitHub logo"}],
  [normalizeToolKey("VS Code"), {src: "/logos/logo-vscode.svg", alt: "VS Code logo"}],
  [normalizeToolKey("n8n"), {src: "/logos/logo-n8n.svg", alt: "n8n logo"}],
]);

const getFallbackLogo = (name?: string) => {
  if (!name) return null;
  return toolLogoFallbacks.get(normalizeToolKey(name)) ?? null;
};

const defaultToolHighlights: ToolHighlight[] = [
  {name: "HTML/CSS", logoSrc: "/logos/logo-htmlcss.svg", logoAlt: "HTML/CSS logo"},
  {name: "JavaScript", logoSrc: "/logos/logo-javascript.svg", logoAlt: "JavaScript logo"},
  {name: "React", logoSrc: "/logos/logo-react.svg", logoAlt: "React logo"},
  {name: "Next.js", logoSrc: "/logos/logo-nextjs.svg", logoAlt: "Next.js logo"},
  {name: "Node.js", logoSrc: "/logos/logo-nodejs.svg", logoAlt: "Node.js logo"},
  {name: "Tailwind", logoSrc: "/logos/logo-tailwindcss.svg", logoAlt: "Tailwind logo"},
];

const defaultToolGrid: ToolGridItem[] = [
  {name: "HTML/CSS", note: "Base UI", logoSrc: "/logos/logo-htmlcss.svg", logoAlt: "HTML/CSS logo"},
  {name: "JavaScript", note: "Interactions", logoSrc: "/logos/logo-javascript.svg", logoAlt: "JavaScript logo"},
  {name: "React", note: "Composants", logoSrc: "/logos/logo-react.svg", logoAlt: "React logo"},
  {name: "Next.js", note: "Framework", logoSrc: "/logos/logo-nextjs.svg", logoAlt: "Next.js logo"},
  {name: "Node.js", note: "API", logoSrc: "/logos/logo-nodejs.svg", logoAlt: "Node.js logo"},
  {name: "Java", note: "Back-end", logoSrc: "/logos/logo-java.svg", logoAlt: "Java logo"},
  {name: "Spring Boot", note: "API", logoSrc: "/logos/logo-springboot.svg", logoAlt: "Spring Boot logo"},
  {name: "PHP", note: "Back-end", logoSrc: "/logos/logo-php.svg", logoAlt: "PHP logo"},
  {name: "Laravel", note: "Framework", logoSrc: "/logos/logo-laravel.svg", logoAlt: "Laravel logo"},
  {name: "Python", note: "Automations", logoSrc: "/logos/logo-python.svg", logoAlt: "Python logo"},
  {name: "PostgreSQL", note: "BDD", logoSrc: "/logos/logo-postgresql.svg", logoAlt: "PostgreSQL logo"},
  {name: "MySQL", note: "BDD", logoSrc: "/logos/logo-mysql.svg", logoAlt: "MySQL logo"},
  {name: "Oracle", note: "BDD", logoSrc: "/logos/logo-oracle.svg", logoAlt: "Oracle logo"},
  {name: "Supabase", note: "Backend", logoSrc: "/logos/logo-supabase.svg", logoAlt: "Supabase logo"},
  {name: "Vercel", note: "Hosting", logoSrc: "/logos/logo-vercel.svg", logoAlt: "Vercel logo"},
  {name: "Tailwind", note: "Styles", logoSrc: "/logos/logo-tailwindcss.svg", logoAlt: "Tailwind logo"},
  {name: "MUI", note: "UI kit", logoSrc: "/logos/logo-mui.svg", logoAlt: "MUI logo"},
  {name: "shadcn/ui", note: "UI kit", logoSrc: "/logos/logo-shadcnui.svg", logoAlt: "shadcn/ui logo"},
  {name: "Git", note: "Versioning", logoSrc: "/logos/logo-git.svg", logoAlt: "Git logo"},
  {name: "GitHub", note: "Repo", logoSrc: "/logos/logo-github.svg", logoAlt: "GitHub logo"},
  {name: "VS Code", note: "Dev", logoSrc: "/logos/logo-vscode.svg", logoAlt: "VS Code logo"},
  {name: "n8n", note: "Workflow", logoSrc: "/logos/logo-n8n.svg", logoAlt: "n8n logo"},
];

const defaultDeliverables: Deliverable[] = [
  {
    title: "Audit visuel",
    description: "Diagnostic rapide des blocages et des opportunites.",
    imageSrc: "/home-about.svg",
    imageAlt: "Audit visuel",
  },
  {
    title: "Wireframes",
    description: "Structure claire pour chaque ecran cle.",
    imageSrc: "/home-projects.svg",
    imageAlt: "Wireframes",
  },
  {
    title: "UI kit",
    description: "Composants et styles reutilisables.",
    imageSrc: "/home-skills.svg",
    imageAlt: "UI kit",
  },
  {
    title: "Prototype",
    description: "Parcours interactif pour tests rapides.",
    imageSrc: "/home-story.svg",
    imageAlt: "Prototype",
  },
];

export async function getSkillsPageViewModel(): Promise<SkillsPageViewModel> {
  const skillsPage = await getSkillsPage();

  const focusTags = skillsPage?.focusTagsRef?.tags?.length
    ? skillsPage.focusTagsRef.tags
    : skillsPage?.focusTags?.length
      ? skillsPage.focusTags
      : defaultFocusTags;
  const metricsSource = skillsPage?.metricsRef?.items?.length
    ? skillsPage.metricsRef.items
    : skillsPage?.metrics?.length
      ? skillsPage.metrics
      : defaultMetrics;
  const skillBlocksSource = skillsPage?.skills?.length
    ? skillsPage.skills
    : defaultSkillBlocks;

  const metrics = metricsSource.map((metric, index) => ({
    value: metric?.value ?? defaultMetrics[index]?.value ?? "",
    label: metric?.label ?? defaultMetrics[index]?.label ?? "",
  }));

  const skillBlocks = skillBlocksSource.map((skill, index) => ({
    title: skill?.title ?? defaultSkillBlocks[index]?.title ?? "",
    description: skill?.description ?? defaultSkillBlocks[index]?.description ?? "",
    level: skill?.level ?? defaultSkillBlocks[index]?.level ?? 0,
  }));

  const toolGrid = skillsPage?.tools?.length
    ? skillsPage.tools.map((tool) => {
        const name = tool.name ?? "Tool";
        const fallbackLogo = getFallbackLogo(name);
        return {
          name,
          note: tool.note ?? "",
          logoSrc: tool.logo?.asset?.url ?? fallbackLogo?.src ?? "/logos/logo-htmlcss.svg",
          logoAlt: tool.logo?.alt ?? fallbackLogo?.alt ?? `${name} logo`,
        };
      })
    : defaultToolGrid;

  const toolHighlights = toolGrid.length > 0
    ? toolGrid.slice(0, 6).map((tool) => ({
        name: tool.name,
        logoSrc: tool.logoSrc,
        logoAlt: tool.logoAlt,
      }))
    : defaultToolHighlights;

  const deliverables = skillsPage?.deliverables?.length
    ? skillsPage.deliverables.map((item, index) => ({
        title: item.title ?? `Livrable ${index + 1}`,
        description: item.description ?? "",
        imageSrc:
          item.image?.asset?.url ??
          defaultDeliverables[index]?.imageSrc ??
          "/home-skills.svg",
        imageAlt: item.image?.alt ?? item.title ?? "Livrable",
      }))
    : defaultDeliverables;

  return {
    heroTitle:
      skillsPage?.heroTitle ??
      "Un set de competences pour regler vos problemes business.",
    heroSubtitle:
      skillsPage?.heroSubtitle ??
      "Je combine strategie, UI design et execution pour livrer des ecrans qui rassurent et convertissent.",
    focusTags,
    metrics,
    skillBlocks,
    toolGrid,
    toolHighlights,
    deliverables,
  };
}
