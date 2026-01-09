import type {SanityImage} from "@/types/content";

export type StoryMoment = {
  year: string;
  title: string;
  description: string;
  image?: SanityImage;
};

export type StoryPageViewModel = {
  heroTitle: string;
  heroSubtitle: string;
  moments: StoryMoment[];
};
