import {getTranslations} from "next-intl/server";

import {getHomePage, getSiteSettings} from "@/lib/sanity/content";

import type {HomeNavigationCard, HomePageViewModel} from "../types";

const fallbackOrder = ["about", "projects", "skills", "story"] as const;

type CardKey = (typeof fallbackOrder)[number];

type HomeCardsMap = Record<CardKey, HomeNavigationCard>;

export async function getHomePageViewModel(): Promise<HomePageViewModel> {
  const [t, home, settings] = await Promise.all([
    getTranslations("HomePage"),
    getHomePage(),
    getSiteSettings(),
  ]);

  const hero = home?.hero;
  const heroImage =
    hero?.image?.asset?.url ??
    settings?.avatar?.asset?.url ??
    "/avatar-placeholder.svg";

  const defaultCards: HomeCardsMap = {
    about: {
      href: "/about",
      title: t("cards.about.title"),
      description: t("cards.about.description"),
      imageSrc: "/home-about.svg",
      imageAlt: t("cards.about.imageAlt"),
    },
    projects: {
      href: "/projects",
      title: t("cards.projects.title"),
      description: t("cards.projects.description"),
      imageSrc: "/home-projects.svg",
      imageAlt: t("cards.projects.imageAlt"),
    },
    skills: {
      href: "/skills",
      title: t("cards.skills.title"),
      description: t("cards.skills.description"),
      imageSrc: "/home-skills.svg",
      imageAlt: t("cards.skills.imageAlt"),
    },
    story: {
      href: "/story",
      title: t("cards.story.title"),
      description: t("cards.story.description"),
      imageSrc: "/home-story.svg",
      imageAlt: t("cards.story.imageAlt"),
    },
  };

  const cards: HomeCardsMap = {...defaultCards};
  const cardItems = home?.cards?.items ?? [];

  cardItems.forEach((item, index) => {
    const href = item?.href ?? "";
    const key: CardKey | undefined =
      href === "/about"
        ? "about"
        : href === "/projects"
          ? "projects"
          : href === "/skills"
            ? "skills"
            : href === "/story"
              ? "story"
              : fallbackOrder[index];

    if (!key) return;

    cards[key] = {
      href: item?.href ?? cards[key].href,
      title: item?.title ?? cards[key].title,
      description: item?.description ?? cards[key].description,
      imageSrc: item?.image?.asset?.url ?? cards[key].imageSrc,
      imageAlt: item?.image?.alt ?? cards[key].imageAlt,
    };
  });

  return {
    hero: {
      name: hero?.name ?? settings?.name ?? t("name"),
      role: hero?.role ?? settings?.role ?? t("role"),
      description:
        hero?.description ?? settings?.description ?? t("description"),
      badge: hero?.badge ?? t("badge"),
      imageSrc: heroImage,
    },
    cards: {
      title: home?.cards?.title ?? t("cards.title"),
      subtitle: home?.cards?.subtitle ?? t("cards.subtitle"),
      items: cards,
    },
  };
}
