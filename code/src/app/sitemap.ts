import type {MetadataRoute} from "next";

import {routing} from "@/lib/i18n/routing";
import {getBaseUrl} from "@/lib/site-url";

const routes = ["", "/about", "/skills", "/projects", "/cv", "/story"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return routing.locales.flatMap((locale) =>
    routes.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
