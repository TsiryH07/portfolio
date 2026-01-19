// src/lib/sanity/image.ts
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityConfig } from "./client";

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
