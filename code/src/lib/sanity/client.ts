// src/lib/sanity/client.ts
import "server-only";
import { createClient } from "next-sanity";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const sanityConfig = {
  projectId: requiredEnv("SANITY_PROJECT_ID"),
  dataset: requiredEnv("SANITY_DATASET"),
  apiVersion: requiredEnv("SANITY_API_VERSION"),
  useCdn: true, // plus rapide en prod (lecture publique)
};

export const sanityClient = createClient(sanityConfig);
