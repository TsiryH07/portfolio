import {getAboutPage, getSiteSettings} from "@/lib/sanity/content";

import type {
  AboutHighlight,
  AboutPageViewModel,
  AboutProfileHighlight,
  AboutStat,
  AboutTimelineItem,
} from "../types";

const defaultFocusTags = [
  "Clarifier l'offre",
  "UX rapide",
  "Pages qui convertissent",
  "Prototype express",
  "UI propre",
  "Integration",
];

const defaultStats: AboutStat[] = [
  {value: "48h", label: "pour un audit clair"},
  {value: "1-2", label: "semaines pour livrer"},
  {value: "0", label: "blabla, que du concret"},
  {value: "100%", label: "focus resultats"},
];

const defaultHighlights: AboutHighlight[] = [
  {
    title: "Audit qui cible",
    description:
      "Je repere vos points de friction et ce qui bloque vos ventes.",
  },
  {
    title: "Prototype express",
    description:
      "On valide le parcours client avant d'investir sur le design final.",
  },
  {
    title: "Design qui rassure",
    description:
      "Une interface qui inspire confiance et fait passer a l'action.",
  },
  {
    title: "Mise en ligne fluide",
    description:
      "Livrables clairs ou integration front pour deployer vite.",
  },
];

const defaultProfileHighlights: AboutProfileHighlight[] = [
  {label: "Base a", value: "Paris, FR"},
  {label: "Disponibilite", value: "Immediate"},
  {label: "Contact", value: "Reponse en 24h"},
  {label: "Focus", value: "Lancement rapide"},
];

const defaultTimeline: AboutTimelineItem[] = [
  {
    period: "Focus client",
    role: "Vos problemes deviennent mon plan d'action.",
    description:
      "Je m'aligne sur vos objectifs business avant de dessiner.",
  },
  {
    period: "Vitesse",
    role: "Un plan clair, une livraison rapide.",
    description: "Brief court, proposition nette, iterations efficaces.",
  },
  {
    period: "Transparence",
    role: "Vous savez ou on va, et pourquoi.",
    description: "Pas de jargon, juste des decisions utiles.",
  },
];

export async function getAboutPageViewModel(): Promise<AboutPageViewModel> {
  const [about, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  const focusTags = about?.focusTagsRef?.tags?.length
    ? about.focusTagsRef.tags
    : about?.focusTags?.length
      ? about.focusTags
      : defaultFocusTags;
  const statsSource = about?.statsRef?.items?.length
    ? about.statsRef.items
    : about?.stats?.length
      ? about.stats
      : defaultStats;
  const highlightsSource = about?.method?.length
    ? about.method
    : defaultHighlights;
  const profile = about?.profile;
  const profileName = profile?.name ?? settings?.name ?? "Votre Nom";
  const profileRole =
    profile?.role ?? settings?.role ?? "UI Designer freelance";
  const profileSummary =
    profile?.summary ??
    settings?.description ??
    "Vous livrer un site qui attire, explique et convertit.";
  const profileImageSrc =
    settings?.avatar?.asset?.url ?? "/avatar-placeholder.svg";
  const profileImageAlt =
    settings?.avatar?.alt ?? profileName ?? "Portrait";
  const profileHighlightsSource = profile?.highlights?.length
    ? profile.highlights
    : defaultProfileHighlights;
  const timelineSource = about?.timeline?.length
    ? about.timeline
    : defaultTimeline;

  const stats = statsSource.map((stat, index) => ({
    value: stat?.value ?? defaultStats[index]?.value ?? "",
    label: stat?.label ?? defaultStats[index]?.label ?? "",
  }));

  const highlights = highlightsSource.map((item, index) => ({
    title: item?.title ?? defaultHighlights[index]?.title ?? "",
    description:
      item?.description ?? defaultHighlights[index]?.description ?? "",
  }));

  const profileHighlights = profileHighlightsSource.map((item, index) => ({
    label: item?.label ?? defaultProfileHighlights[index]?.label ?? "",
    value: item?.value ?? defaultProfileHighlights[index]?.value ?? "",
  }));

  const timeline = timelineSource.map((item, index) => ({
    period: item?.period ?? defaultTimeline[index]?.period ?? "",
    role: item?.role ?? defaultTimeline[index]?.role ?? "",
    description: item?.description ?? defaultTimeline[index]?.description ?? "",
  }));

  return {
    heroTitle:
      about?.heroTitle ??
      "Je vous aide a convertir plus de visiteurs en clients.",
    heroSubtitle:
      about?.heroSubtitle ??
      "Vous avez un site qui ne vend pas assez ou un produit qui manque de clarte. Je cree des interfaces qui expliquent votre offre, rassurent et declenchent l'action.",
    focusTags,
    stats,
    highlights,
    profile: {
      name: profileName,
      role: profileRole,
      summary: profileSummary,
      imageSrc: profileImageSrc,
      imageAlt: profileImageAlt,
      highlights: profileHighlights,
    },
    timeline,
    ctaTitle: about?.ctaTitle ?? "Parlez-moi de votre probleme.",
    ctaDescription:
      about?.ctaDescription ??
      "Je vous dis en 15 minutes si je peux vous aider et comment.",
  };
}
