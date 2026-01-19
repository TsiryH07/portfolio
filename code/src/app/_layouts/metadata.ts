import type {Metadata} from "next";

import {getSiteSettings} from "@/lib/sanity/content";
import {getBaseUrl} from "@/lib/site-url";

const fallbackTitle = "Portfolio";
const fallbackDescription =
  "Portfolio de services design et front-end avec une approche agence.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: fallbackTitle,
    template: `%s | ${fallbackTitle}`,
  },
  description: fallbackDescription,
  alternates: {
    canonical: "/",
  },
};

export async function getSiteMetadata(): Promise<Metadata> {
  let settings = null;

  try {
    settings = await getSiteSettings();
  } catch {
    settings = null;
  }
  const baseUrl = getBaseUrl();

  const siteTitle = settings?.seo?.title ?? settings?.title ?? fallbackTitle;
  const description =
    settings?.seo?.description ?? settings?.description ?? fallbackDescription;
  const ogImage =
    settings?.seo?.ogImage?.asset?.url ?? settings?.avatar?.asset?.url;

  const metadata: Metadata = {
    ...baseMetadata,
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description,
    openGraph: {
      type: "website",
      url: baseUrl,
      title: siteTitle,
      description,
      images: ogImage ? [{url: ogImage}] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: siteTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };

  return metadata;
}
