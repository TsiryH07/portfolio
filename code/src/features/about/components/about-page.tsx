import Image from "next/image";

import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {getRevealStyle} from "@/components/utils";
import {Link} from "@/lib/i18n/navigation";

import {getAboutPageViewModel} from "../server/get-about-page-view-model";

export async function AboutPage() {
  const {
    heroTitle,
    heroSubtitle,
    focusTags,
    stats,
    highlights,
    profile,
    timeline,
    ctaTitle,
    ctaDescription,
  } = await getAboutPageViewModel();

  const {
    name,
    role,
    summary,
    highlights: profileHighlights,
    imageSrc,
    imageAlt,
  } = profile;

  return (
    <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/20 blur-[170px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="space-y-12 py-12 lg:py-20">
          <section className="glass-section relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-[110px]" />
            <div className="absolute -bottom-16 -left-6 h-44 w-44 rounded-full bg-emerald-400/15 blur-[120px]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
                  A propos
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
                    href="/skills"
                    className={buttonVariants({size: "lg", variant: "outline"})}
                  >
                    Voir les competences
                  </Link>
                </div>
              </div>
              <div
                className="relative"
                data-reveal data-reveal-visible="false"
                data-reveal-delay={140}
                style={getRevealStyle({delay: 140})}
              >
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-br from-primary/25 via-transparent to-emerald-400/25 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative rounded-3xl border border-border/70 bg-surface/80 p-6 shadow-soft-lg">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border/70 bg-surface">
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                        Profil
                      </p>
                      <p className="text-2xl font-semibold">{name}</p>
                      <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {profileHighlights.map((item, index) => (
                      <div
                        key={`${item.label ?? item.value ?? index}`}
                        className="rounded-2xl border border-border/70 bg-surface/70 p-4 shadow-soft"
                      >
                        <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-border/70 bg-surface/70 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                      Objectif
                    </p>
                    <p className="mt-2 text-sm text-foreground/70">
                      {summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const revealDelay = index * 90;

              return (
              <Card
                key={`${stat.label ?? stat.value ?? index}`}
                className="relative overflow-hidden border-border/70 bg-surface/80"
                data-reveal data-reveal-visible="false"
                data-reveal-delay={revealDelay}
                style={getRevealStyle({delay: revealDelay})}
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-primary/15 blur-2xl"
                  aria-hidden="true"
                />
                <p className="text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
              );
            })}
          </section>

          <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div
              className="space-y-6"
              data-reveal data-reveal-visible="false"
              data-reveal-offset={16}
              style={getRevealStyle({offset: 16})}
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Methode
                </p>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Un process simple pour des resultats rapides.
                </h2>
                <p className="text-sm text-muted-foreground">
                  On part de votre probleme, on clarifie l&apos;offre, on ajuste la
                  page, puis on livre une version qui convertit mieux.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <Card
                    key={item.title}
                    className="border-border/70 bg-surface/80"
                  >
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </Card>
                ))}
              </div>
              <div className="rounded-3xl border border-border/70 bg-surface/80 p-6 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">Disponible maintenant</p>
                    <p className="text-sm text-muted-foreground">
                      Premiere mission possible cette semaine.
                    </p>
                  </div>
                  <Badge variant="outline" tone="success">
                    Ouvert
                  </Badge>
                </div>
              </div>
            </div>
            <div className="glass-section relative overflow-hidden p-8 sm:p-10">
              <div className="absolute -right-10 -top-20 h-32 w-32 rounded-full bg-sky-400/20 blur-[100px]" />
            <div
              className="space-y-6"
              data-reveal data-reveal-visible="false"
              data-reveal-delay={120}
              style={getRevealStyle({delay: 120})}
            >
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Parcours
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Pourquoi travailler ensemble.
                  </h2>
                </div>
                <div className="space-y-5">
                  {timeline.map((item, index) => (
                    <div
                      key={`${item.role ?? item.period ?? index}`}
                      className="relative pl-6 before:absolute before:left-1 before:top-2 before:h-full before:w-px before:bg-border/70"
                    >
                      <span className="absolute left-0 top-2 h-3 w-3 rounded-full border border-border/70 bg-surface shadow-soft" />
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        {item.period}
                      </p>
                      <p className="text-base font-semibold">{item.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="glass-card flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between"
            data-reveal data-reveal-visible="false"
            data-reveal-delay={180}
            style={getRevealStyle({delay: 180})}
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight">
                {ctaTitle}
              </h3>
              <p className="text-sm text-muted-foreground">{ctaDescription}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className={buttonVariants({size: "lg"})}>
                Voir la methode
              </Link>
              <Link
                href="/story"
                className={buttonVariants({size: "lg", variant: "outline"})}
              >
                Commencer un brief
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

