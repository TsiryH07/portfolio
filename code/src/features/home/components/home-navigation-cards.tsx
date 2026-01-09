import type {ReactNode} from "react";
import Image from "next/image";

import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {cn, getRevealStyle} from "@/components/utils";
import {Link} from "@/lib/i18n/navigation";

import type {HomeNavigationCard} from "../types";

type HomeNavigationCardsProps = {
  title: string;
  subtitle: string;
  cards: {
    about: HomeNavigationCard;
    projects: HomeNavigationCard;
    skills: HomeNavigationCard;
    story: HomeNavigationCard;
  };
};

export function HomeNavigationCards({
  title,
  subtitle,
  cards,
}: HomeNavigationCardsProps) {
  return (
    <section className="w-full pb-16 pt-8">
      <div className="space-y-8">
        <div className="space-y-3" data-reveal data-reveal-visible="false">
          <p className="inline-flex w-fit items-center rounded-full border border-border/70 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
            {title}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {subtitle}
          </h2>
        </div>
        <div className="rounded-[32px] p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div data-reveal data-reveal-visible="false">
              <HomeNavAboutCard card={cards.about} />
            </div>
            <div
              data-reveal data-reveal-visible="false"
              data-reveal-delay={120}
              style={getRevealStyle({delay: 120})}
            >
              <HomeNavConnectionsCard card={cards.projects} />
            </div>
            <div
              data-reveal data-reveal-visible="false"
              data-reveal-delay={200}
              style={getRevealStyle({delay: 200})}
            >
              <HomeNavSkillsCard card={cards.skills} />
            </div>
            <div
              data-reveal data-reveal-visible="false"
              data-reveal-delay={280}
              style={getRevealStyle({delay: 280})}
            >
              <HomeNavStoryCard card={cards.story} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type HomeNavCardProps = {
  card: HomeNavigationCard;
};

function HomeNavCardShell({
  card,
  className,
  children,
}: HomeNavCardProps & {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={card.href}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        interactive
        padding="none"
        className={cn(
          "relative h-full w-full overflow-hidden rounded-3xl border border-border/70 bg-surface/90 shadow-soft transition-all duration-300 ease-[var(--transition-smooth)] group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-soft-lg",
          "aspect-[5/3] before:pointer-events-none before:absolute before:inset-2 before:rounded-[24px] before:border before:border-border/60 before:bg-surface/70 before:content-[''] after:pointer-events-none after:absolute after:inset-x-6 after:top-3 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/70 after:to-transparent",
          className,
        )}
      >
        <div className="relative h-full w-full">{children}</div>
      </Card>
    </Link>
  );
}

function HomeNavAboutCard({card}: HomeNavCardProps) {
  return (
    <HomeNavCardShell card={card}>
      <div className="relative z-10 flex h-full items-center justify-between gap-4 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            <span className="h-px w-10 bg-border/70" />
          </div>
          <CardTitle className="text-xl font-semibold sm:text-2xl">
            {card.title}
          </CardTitle>
          <CardDescription className="text-sm leading-snug text-muted-foreground">
            {card.description}
          </CardDescription>
        </div>
        <div className="relative h-24 w-20 shrink-0 sm:h-28 sm:w-24">
          <div className="absolute inset-0 rounded-[22px] border border-border/70 bg-gradient-to-br from-white to-blue-50 shadow-soft" />
          <div className="absolute -bottom-4 -right-4 h-14 w-14 rounded-full bg-primary/15 blur-2xl" />
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            width={96}
            height={112}
            className="relative h-full w-full rounded-[22px] object-contain rotate-2"
            unoptimized
          />
        </div>
      </div>
    </HomeNavCardShell>
  );
}

function HomeNavConnectionsCard({card}: HomeNavCardProps) {
  const circles = Array.from({length: 5}, (_, index) => ({
    id: `connections-${index}`,
    isActive: index === 2,
  }));

  return (
    <HomeNavCardShell card={card}>
      <div className="relative z-10 flex h-full flex-col justify-between gap-4 p-5 text-center sm:p-6">
        <div className="relative flex items-center justify-center gap-3">
          <div
            className="pointer-events-none absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-border/70"
            aria-hidden="true"
          />
          {circles.map((circle) => (
            <div
              key={circle.id}
              className={cn(
                "relative grid h-12 w-12 place-items-center rounded-full border border-border/70 bg-surface shadow-soft",
                circle.isActive && "h-16 w-16 border-primary/40",
              )}
            >
              {circle.isActive ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/70 bg-surface-muted">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full border border-border/70 bg-surface-muted" />
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold sm:text-2xl">
            {card.title}
          </CardTitle>
          <CardDescription className="text-sm leading-snug text-muted-foreground">
            {card.description}
          </CardDescription>
        </div>
      </div>
    </HomeNavCardShell>
  );
}

function HomeNavSkillsCard({card}: HomeNavCardProps) {
  return (
    <HomeNavCardShell card={card}>
      <div className="relative z-10 flex h-full flex-col justify-between gap-4 p-5 sm:p-6">
        <div className="space-y-2 text-center">
          <CardTitle className="text-xl font-semibold sm:text-2xl">
            {card.title}
          </CardTitle>
          <CardDescription className="text-sm leading-snug text-muted-foreground">
            {card.description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-center gap-3">
          {[0, 1, 2].map((index) => (
            <div
              key={`tool-${index}`}
              className="grid h-14 w-14 place-items-center rounded-2xl border border-border/70 bg-white shadow-soft transition-transform duration-300 group-hover:-translate-y-1"
            >
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </HomeNavCardShell>
  );
}

function HomeNavStoryCard({card}: HomeNavCardProps) {
  const days = Array.from({length: 12}, (_, index) => index);

  return (
    <HomeNavCardShell card={card}>
      <div className="relative z-10 grid h-full grid-cols-[1.05fr_0.95fr] gap-4 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <div className="absolute inset-0 rounded-2xl border border-border/70 bg-surface shadow-soft" />
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                width={40}
                height={40}
                className="relative h-10 w-10 rounded-2xl object-contain"
                unoptimized
              />
            </div>
            <div className="h-px flex-1 bg-border/70" aria-hidden="true" />
          </div>
          <CardTitle className="text-xl font-semibold sm:text-2xl">
            {card.title}
          </CardTitle>
          <CardDescription className="text-sm leading-snug text-muted-foreground">
            {card.description}
          </CardDescription>
        </div>
        <div className="rounded-2xl border border-border/70 bg-surface/80 p-3 shadow-soft">
          <div className="grid grid-cols-4 gap-2">
            {days.map((day) => (
              <div
                key={`day-${day}`}
                className="h-6 w-6 rounded-lg border border-border/60 bg-surface-muted"
              />
            ))}
          </div>
        </div>
      </div>
    </HomeNavCardShell>
  );
}

