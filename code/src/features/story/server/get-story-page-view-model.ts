import {getStoryPage} from "@/lib/sanity/content";

import type {StoryMoment, StoryPageViewModel} from "../types";

const defaultMoments: StoryMoment[] = [
  {
    year: "2024",
    title: "Freelance focus",
    description: "Accompagnement de clients sur des lancements rapides.",
  },
  {
    year: "2022",
    title: "Design system",
    description: "Creation de bibliotheques UI claires et reutilisables.",
  },
  {
    year: "2019",
    title: "UX research",
    description: "Tests utilisateurs pour des parcours plus fluides.",
  },
];

export async function getStoryPageViewModel(): Promise<StoryPageViewModel> {
  const story = await getStoryPage();

  const momentsSource = story?.moments?.length ? story.moments : defaultMoments;
  const moments = momentsSource.map((moment, index) => ({
    year: moment?.year ?? defaultMoments[index]?.year ?? "",
    title: moment?.title ?? defaultMoments[index]?.title ?? "",
    description: moment?.description ?? defaultMoments[index]?.description ?? "",
    image: moment?.image ?? defaultMoments[index]?.image,
  }));

  return {
    heroTitle: story?.heroTitle ?? "Story",
    heroSubtitle:
      story?.heroSubtitle ??
      "Quelques moments clefs qui montrent comment je travaille et pourquoi mes decisions sont utiles.",
    moments,
  };
}
