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

const defaultToolHighlights: ToolHighlight[] = [
  {name: "Figma", logoSrc: "/logos/logo-figma.svg", logoAlt: "Figma logo"},
  {name: "Framer", logoSrc: "/logos/logo-framer.svg", logoAlt: "Framer logo"},
  {name: "Notion", logoSrc: "/logos/logo-notion.svg", logoAlt: "Notion logo"},
  {name: "Webflow", logoSrc: "/logos/logo-webflow.svg", logoAlt: "Webflow logo"},
  {name: "Next.js", logoSrc: "/logos/logo-nextjs.svg", logoAlt: "Next.js logo"},
  {name: "Slack", logoSrc: "/logos/logo-slack.svg", logoAlt: "Slack logo"},
];

const defaultToolGrid: ToolGridItem[] = [
  {name: "Raycast", note: "Recherche rapide", logoSrc: "/logos/logo-raycast.svg", logoAlt: "Raycast logo"},
  {name: "Arc", note: "Navigation propre", logoSrc: "/logos/logo-arc.svg", logoAlt: "Arc logo"},
  {name: "VSCode", note: "Dev rapide", logoSrc: "/logos/logo-vscode.svg", logoAlt: "VSCode logo"},
  {name: "Mymind", note: "Ideas & moodboard", logoSrc: "/logos/logo-mymind.svg", logoAlt: "Mymind logo"},
  {name: "Obsidian", note: "Notes claires", logoSrc: "/logos/logo-obsidian.svg", logoAlt: "Obsidian logo"},
  {name: "Notion", note: "Specs & suivi", logoSrc: "/logos/logo-notion.svg", logoAlt: "Notion logo"},
  {name: "Tana", note: "Structuration", logoSrc: "/logos/logo-tana.svg", logoAlt: "Tana logo"},
  {name: "Spotify", note: "Focus music", logoSrc: "/logos/logo-spotify.svg", logoAlt: "Spotify logo"},
  {name: "Figma", note: "Design & prototypage", logoSrc: "/logos/logo-figma.svg", logoAlt: "Figma logo"},
  {name: "Things", note: "Taches claires", logoSrc: "/logos/logo-things.svg", logoAlt: "Things logo"},
  {name: "Fantastical", note: "Planning", logoSrc: "/logos/logo-fantastical.svg", logoAlt: "Fantastical logo"},
  {name: "1Password", note: "Securite", logoSrc: "/logos/logo-1password.svg", logoAlt: "1Password logo"},
  {name: "Framer", note: "Landing pages", logoSrc: "/logos/logo-framer.svg", logoAlt: "Framer logo"},
  {name: "Cleanshot", note: "Capture", logoSrc: "/logos/logo-cleanshot.svg", logoAlt: "Cleanshot logo"},
  {name: "PixelSnap", note: "Mesures", logoSrc: "/logos/logo-pixelsnap.svg", logoAlt: "PixelSnap logo"},
  {name: "Linear", note: "Roadmap", logoSrc: "/logos/logo-linear.svg", logoAlt: "Linear logo"},
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
    ? skillsPage.tools.map((tool) => ({
        name: tool.name ?? "Tool",
        note: tool.note ?? "",
        logoSrc: tool.logo?.asset?.url ?? "/logos/logo-figma.svg",
        logoAlt: tool.logo?.alt ?? tool.name ?? "Tool logo",
      }))
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
