import {sanityClient} from "@/lib/sanity/client";
import {projectsQuery} from "@/lib/sanity/queries";

import type {Project} from "../types";

const revalidate = {next: {revalidate: 60}};

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(projectsQuery, {}, revalidate);
}
