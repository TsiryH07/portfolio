import type {
  AboutPageData,
  HomePageData,
  ProjectsPageData,
  SiteSettingsData,
  SkillsPageData,
  StoryPageData,
} from "@/types/content";

import {sanityClient} from "./client";
import {
  aboutPageQuery,
  homePageQuery,
  projectsPageQuery,
  siteSettingsQuery,
  skillsPageQuery,
  storyPageQuery,
} from "./queries";

const revalidate = {next: {revalidate: 60}};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  return sanityClient.fetch(siteSettingsQuery, {}, revalidate);
}

export async function getHomePage(): Promise<HomePageData> {
  return sanityClient.fetch(homePageQuery, {}, revalidate);
}

export async function getAboutPage(): Promise<AboutPageData> {
  return sanityClient.fetch(aboutPageQuery, {}, revalidate);
}

export async function getSkillsPage(): Promise<SkillsPageData> {
  return sanityClient.fetch(skillsPageQuery, {}, revalidate);
}

export async function getProjectsPage(): Promise<ProjectsPageData> {
  return sanityClient.fetch(projectsPageQuery, {}, revalidate);
}

export async function getStoryPage(): Promise<StoryPageData> {
  return sanityClient.fetch(storyPageQuery, {}, revalidate);
}
