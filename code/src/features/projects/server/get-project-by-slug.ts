import {sanityClient} from "@/lib/sanity/client";
import {projectBySlugQuery} from "@/lib/sanity/queries";

import type {Project} from "../types";

const revalidate = {next: {revalidate: 60}};

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityClient.fetch(projectBySlugQuery, {slug}, revalidate);
}
