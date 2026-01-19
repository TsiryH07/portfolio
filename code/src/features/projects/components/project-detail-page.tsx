import Image from "next/image";
import {notFound} from "next/navigation";

import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {getRevealStyle} from "@/components/utils";
import {Link} from "@/lib/i18n/navigation";

import {getProjectBySlug} from "../server/get-project-by-slug";

export async function ProjectDetailPage({slug}: {slug: string}) {
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const fallbackImage = "/home-projects.svg";
  const imageUrl = project.coverImage?.asset?.url ?? fallbackImage;
  const imageAlt = project.coverImage?.alt ?? project.title;
  const blurDataURL = project.coverImage?.asset?.metadata?.lqip;
  const descriptionBlocks = [
    {title: "Resume", value: project.summary},
    {title: "Contexte", value: project.problem},
    {title: "Solution", value: project.solution},
    {title: "Resultats", value: project.results},
  ].filter((item) => item.value);

  return (
    <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[160px]"
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
                data-reveal
                data-reveal-offset={18}
                style={getRevealStyle({offset: 18})}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.3em] text-primary"
                  >
                    Projet
                  </Badge>
                  {project.featured ? (
                    <Badge variant="secondary">Featured</Badge>
                  ) : null}
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {project.title}
                  </h1>
                  {project.role ? (
                    <p className="text-sm text-muted-foreground">
                      {project.role}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Integrations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.stack ?? []).length > 0 ? (
                      project.stack?.map((item) => (
                        <Badge key={`${project._id}-${item}`} variant="outline">
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="muted">A definir</Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/projects"
                    className={buttonVariants({size: "sm", variant: "outline"})}
                  >
                    Retour aux projets
                  </Link>
                  {project.links?.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({size: "sm"})}
                    >
                      Live
                    </a>
                  ) : null}
                  {project.links?.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({size: "sm", variant: "outline"})}
                    >
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
              <div
                className="relative"
                data-reveal
                data-reveal-delay={120}
                style={getRevealStyle({delay: 120})}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70 bg-surface-muted/70 shadow-soft-lg">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1024px) 440px, 90vw"
                    className="object-cover"
                    unoptimized
                    placeholder={blurDataURL ? "blur" : "empty"}
                    blurDataURL={blurDataURL}
                  />
                </div>
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
                Description
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Une vision claire du projet.
              </h2>
            </div>
            {descriptionBlocks.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {descriptionBlocks.map((block) => (
                  <Card
                    key={block.title}
                    className="border-border/70 bg-surface/80"
                  >
                    <CardTitle className="text-lg">{block.title}</CardTitle>
                    <CardDescription>{block.value}</CardDescription>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border/70 bg-surface/80">
                <CardTitle className="text-lg">Description en cours</CardTitle>
                <CardDescription>
                  Ajoute le contexte, la solution et les resultats dans Sanity.
                </CardDescription>
              </Card>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

