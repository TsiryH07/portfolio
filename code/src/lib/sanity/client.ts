// src/lib/sanity/client.ts
import "server-only";
import { createClient } from "next-sanity";

const envFallbacks = {
  SANITY_PROJECT_ID: "flvnz8c6",
  SANITY_DATASET: "production",
  SANITY_API_VERSION: "2026-01-07",
} as const;

type EnvKey = keyof typeof envFallbacks;

function requiredEnv(name: EnvKey): string {
  const v = process.env[name] ?? envFallbacks[name];
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
