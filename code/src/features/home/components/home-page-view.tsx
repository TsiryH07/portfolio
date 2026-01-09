import {HomeHero} from "./home-hero";
import {HomeNavigationCards} from "./home-navigation-cards";

import type {HomePageViewModel} from "../types";

type HomePageViewProps = HomePageViewModel;

export function HomePageView({hero, cards}: HomePageViewProps) {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent/45 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[160px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <HomeHero
          name={hero.name}
          role={hero.role}
          description={hero.description}
          badge={hero.badge}
          imageSrc={hero.imageSrc}
        />
        <HomeNavigationCards
          title={cards.title}
          subtitle={cards.subtitle}
          cards={cards.items}
        />
      </div>
    </section>
  );
}
