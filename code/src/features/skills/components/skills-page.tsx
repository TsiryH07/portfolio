import Image from "next/image";

import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {getRevealStyle} from "@/components/utils";
import {Link} from "@/lib/i18n/navigation";

import {getSkillsPageViewModel} from "../server/get-skills-page-view-model";

const heroImages = [
  {src: "/home-skills.svg", alt: "Illustration competences"},
  {src: "/home-projects.svg", alt: "Illustration projets"},
  {src: "/home-about.svg", alt: "Illustration profil"},
];

export async function SkillsPage() {
  const {
    heroTitle,
    heroSubtitle,
    focusTags,
    metrics,
    skillBlocks,
    toolGrid,
    toolHighlights,
    deliverables,
  } = await getSkillsPageViewModel();

  return (
    <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.14),_transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 top-16 h-72 w-72 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[160px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="space-y-12 py-12 lg:py-20">
          <section className="glass-section relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-[90px]" />
            <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-emerald-400/20 blur-[100px]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div
                className="space-y-6"
                data-reveal
                data-reveal-offset={18}
                style={getRevealStyle({offset: 18})}
              >
                <Badge
                  variant="outline"
                  className="w-fit border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.3em] text-primary"
                >
                  Competences
                </Badge>
                <div className="space-y-4">
                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {heroTitle}
                  </h1>
                  <p className="text-base text-foreground/70 sm:text-lg">
                    {heroSubtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {focusTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/70 bg-surface/80 px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/projects"
                    className={buttonVariants({size: "lg"})}
                  >
                    Voir les projets
                  </Link>
                  <Link
                    href="/about"
                    className={buttonVariants({size: "lg", variant: "outline"})}
                  >
                    Mon approche
                  </Link>
                </div>
              </div>
              <div
                className="space-y-4"
                data-reveal
                data-reveal-delay={120}
                style={getRevealStyle({delay: 120})}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card
                    padding="none"
                    className="relative col-span-2 overflow-hidden border-border/70 bg-surface/80"
                  >
                    <div className="p-4">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-white/80">
                        <Image
                          src={heroImages[0].src}
                          alt={heroImages[0].alt}
                          fill
                          sizes="(min-width: 1024px) 420px, 80vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </Card>
                  {heroImages.slice(1).map((image) => (
                    <Card
                      key={image.alt}
                      padding="none"
                      className="relative overflow-hidden border-border/70 bg-surface/80"
                    >
                      <div className="p-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-white/80">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 1024px) 200px, 40vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {toolHighlights.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-white shadow-soft"
                    >
                      <Image
                        src={tool.logoSrc}
                        alt={tool.logoAlt}
                        width={36}
                        height={36}
                        className="h-8 w-8 object-contain"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => {
              const revealDelay = index * 90;

              return (
                <Card
                  key={`${metric.label ?? metric.value ?? index}`}
                  className="relative overflow-hidden border-border/70 bg-surface/80"
                  data-reveal
                  data-reveal-delay={revealDelay}
                  style={getRevealStyle({delay: revealDelay})}
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-8 h-16 w-16 rounded-full bg-primary/15 blur-2xl"
                    aria-hidden="true"
                  />
                  <p className="text-3xl font-semibold text-foreground">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </Card>
              );
            })}
          </section>

          <section
            className="space-y-6"
            data-reveal
            data-reveal-offset={16}
            style={getRevealStyle({offset: 16})}
          >
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Expertises
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Les skills qui font avancer votre projet.
              </h2>
              <p className="text-sm text-muted-foreground">
                Un mix de strategie, design et execution pour obtenir des
                ecrans qui marchent vraiment.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {skillBlocks.map((skill, index) => (
                <Card
                  key={`${skill.title ?? "skill"}-${index}`}
                  className="border-border/70 bg-surface/80"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-lg">{skill.title}</CardTitle>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <CardDescription>{skill.description}</CardDescription>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary via-sky-500 to-emerald-400"
                        style={{width: `${skill.level}%`}}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="glass-section relative overflow-hidden p-8 sm:p-10">
            <div className="absolute -right-8 -top-16 h-28 w-28 rounded-full bg-sky-400/20 blur-[90px]" />
            <div
              className="space-y-6"
              data-reveal
              data-reveal-delay={140}
              style={getRevealStyle({delay: 140})}
            >
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Stack
                </p>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Outils modernes, workflow rapide.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Une selection d&apos;outils que j&apos;utilise tous les jours.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {toolGrid.map((tool, index) => (
                  <Card
                    key={`${tool.name ?? "tool"}-${index}`}
                    padding="none"
                    className="group border-border/70 bg-surface/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
                  >
                    <div className="p-4">
                      <div className="rounded-2xl border border-border/70 bg-surface-muted/60 p-5 shadow-inner">
                        <div className="flex items-center justify-center">
                          <Image
                            src={tool.logoSrc}
                            alt={tool.logoAlt}
                            width={56}
                            height={56}
                            className="h-14 w-14 object-contain"
                            unoptimized
                          />
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 text-center">
                        <p className="text-sm font-semibold">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {tool.note}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="rounded-2xl border border-border/70 bg-surface/80 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                  Collaboration
                </p>
                <p className="mt-2 text-sm text-foreground/70">
                  Feedback court, validations rapides, decisions nettes.
                </p>
              </div>
            </div>
          </section>

          <section
            className="space-y-6"
            data-reveal
            data-reveal-delay={180}
            style={getRevealStyle({delay: 180})}
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Livrables
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ce que vous recevez a la fin.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deliverables.map((item, index) => (
                <Card
                  key={`${item.title ?? "deliverable"}-${index}`}
                  className="border-border/70 bg-surface/80"
                >
                  <div className="space-y-3">
                    <div className="relative h-12 w-12">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                        unoptimized
                      />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

