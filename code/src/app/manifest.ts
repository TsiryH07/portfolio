import type {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfolio",
    short_name: "Portfolio",
    description: "Portfolio de services design et front-end.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
