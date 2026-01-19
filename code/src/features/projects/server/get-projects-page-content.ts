import {getProjectsPage} from "@/lib/sanity/content";

import type {ProjectsPageContent} from "../types";

export async function getProjectsPageContent(): Promise<ProjectsPageContent> {
  const projectsPage = await getProjectsPage();

  return {
    heroTitle:
      projectsPage?.heroTitle ??
      "Des projets visuels, utiles, et faciles a comprendre.",
    heroSubtitle:
      projectsPage?.heroSubtitle ??
      "Chaque projet presente son image, son role, et les integrations mises en place pour livrer vite.",
    sectionTitle:
      projectsPage?.sectionTitle ?? "Projets et integrations.",
    sectionSubtitle: projectsPage?.sectionSubtitle ?? null,
  };
}
