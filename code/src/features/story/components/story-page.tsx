import Image from "next/image";

import {Badge} from "@/components/ui/badge";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {getRevealStyle} from "@/components/utils";

import {ProjectsJournal} from "@/features/projects/components/projects-journal";

import {getStoryPageViewModel} from "../server/get-story-page-view-model";

export async function StoryPage() {
  const {heroTitle, heroSubtitle, moments} = await getStoryPageViewModel();
  const fallbackImage = "/home-story.svg";

  return (
    <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.14),_transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-emerald-400/20 blur-[160px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="space-y-12 py-12 lg:py-20">
          <section className="glass-section relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute -right-10 -top-16 h-36 w-36 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-emerald-400/20 blur-[110px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div
                className="space-y-6"
                data-reveal data-reveal-visible="false"
                data-reveal-offset={18}
                style={getRevealStyle({offset: 18})}
              >
                <Badge
                  variant="outline"
                  className="w-fit border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.3em] text-primary"
                >
                  Story
                </Badge>
                <div className="space-y-4">
                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {heroTitle}
                  </h1>
                  <p className="text-base text-foreground/70 sm:text-lg">
                    {heroSubtitle}
                  </p>
                </div>
              </div>
              <div
                className="grid gap-4 sm:grid-cols-2"
                data-reveal data-reveal-visible="false"
                data-reveal-delay={120}
                style={getRevealStyle({delay: 120})}
              >
                {moments.slice(0, 2).map((moment, index) => {
                  const imageUrl = moment.image?.asset?.url ?? fallbackImage;
                  const imageAlt = moment.image?.alt ?? moment.title ?? "Story moment";
                  const blurDataURL = moment.image?.asset?.metadata?.lqip;

                  return (
                    <Card
                      key={`${moment.title ?? moment.year ?? "moment"}-${index}`}
                      padding="none"
                      className="relative overflow-hidden border-border/70 bg-surface/80"
                    >
                      <div className="p-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-surface-muted/70">
                          <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            sizes="(min-width: 1024px) 220px, 40vw"
                            className="object-cover"
                            unoptimized
                            placeholder={blurDataURL ? "blur" : "empty"}
                            blurDataURL={blurDataURL}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div
              className="space-y-6"
              data-reveal data-reveal-visible="false"
              data-reveal-offset={16}
              style={getRevealStyle({offset: 16})}
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Moments
                </p>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Une chronologie claire, utile, et inspiree.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Chaque etape affine ma facon de livrer vite, avec un design
                  precis et un build solide.
                </p>
              </div>
              <div className="rounded-3xl border border-border/70 bg-surface/80 p-6 shadow-soft">
                <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                  Focus actuel
                </p>
                <p className="mt-2 text-sm text-foreground/80">
                  Design editorial + experience motion en Next.js.
                </p>
              </div>
            </div>
            <div
              className="glass-section relative overflow-hidden p-8 sm:p-10"
              data-reveal data-reveal-visible="false"
              data-reveal-delay={140}
              style={getRevealStyle({delay: 140})}
            >
              <div className="absolute -right-12 -top-16 h-32 w-32 rounded-full bg-primary/20 blur-[100px]" />
              <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-[120px]" />
              <div className="relative space-y-6 pl-8">
                <div
                  className="pointer-events-none absolute left-3 top-3 h-full w-px bg-border/70"
                  aria-hidden="true"
                />
                {moments.map((moment, index) => {
                  const imageUrl = moment.image?.asset?.url ?? fallbackImage;
                  const imageAlt =
                    moment.image?.alt ?? moment.title ?? "Story moment";
                  const blurDataURL = moment.image?.asset?.metadata?.lqip;
                  const revealDelay = index * 90;

                  return (
                    <div
                      key={`${moment.year ?? "moment"}-${moment.title ?? "story"}-${index}`}
                      className="relative"
                      data-reveal
                      data-reveal-visible="false"
                      data-reveal-delay={revealDelay}
                      style={getRevealStyle({delay: revealDelay})}
                    >
                      <span className="absolute left-3 top-6 h-3 w-3 -translate-x-1/2 rounded-full border border-border/70 bg-surface shadow-soft" />
                      <Card className="border-border/70 bg-surface/80 shadow-soft">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="space-y-2">
                            {moment.year ? (
                              <Badge variant="secondary">{moment.year}</Badge>
                            ) : null}
                            <CardTitle className="text-lg">
                              {moment.title}
                            </CardTitle>
                            <CardDescription>
                              {moment.description}
                            </CardDescription>
                          </div>
                          {moment.image ? (
                            <div className="relative h-20 w-28 overflow-hidden rounded-2xl border border-border/70 bg-surface-muted/70">
                              <Image
                                src={imageUrl}
                                alt={imageAlt}
                                fill
                                sizes="112px"
                                className="object-cover"
                                unoptimized
                                placeholder={blurDataURL ? "blur" : "empty"}
                                blurDataURL={blurDataURL}
                              />
                            </div>
                          ) : null}
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <ProjectsJournal />
        </div>
      </div>
    </section>
  );
}
