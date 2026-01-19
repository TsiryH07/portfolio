export type HomeNavigationCard = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type HomeHeroData = {
  name: string;
  role: string;
  description: string;
  badge?: string;
  imageSrc: string;
};

export type HomeCardsData = {
  title: string;
  subtitle: string;
  items: {
    about: HomeNavigationCard;
    projects: HomeNavigationCard;
    skills: HomeNavigationCard;
    story: HomeNavigationCard;
  };
};

export type HomePageViewModel = {
  hero: HomeHeroData;
  cards: HomeCardsData;
};
