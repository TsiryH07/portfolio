import Image from "next/image";

import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {getRevealStyle} from "@/components/utils";
import {Link} from "@/lib/i18n/navigation";

import {getProjects} from "../server/get-projects";
import {getProjectsPageContent} from "../server/get-projects-page-content";

export async function ProjectsPage() {
  const [pageContent, projects] = await Promise.all([
    getProjectsPageContent(),
    getProjects(),
  ]);
  const fallbackImage = "/home-projects.svg";

  return (
    <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_62%)]"
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
                data-reveal
                data-reveal-offset={18}
                style={getRevealStyle({offset: 18})}
              >
                <Badge
                  variant="outline"
                  className="w-fit border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.3em] text-primary"
                >
                  Projects
                </Badge>
                <div className="space-y-4">
                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {pageContent.heroTitle}
                  </h1>
                  <p className="text-base text-foreground/70 sm:text-lg">
                    {pageContent.heroSubtitle}
                  </p>
                </div>
              </div>
              <div
                className="grid gap-4 sm:grid-cols-2"
                data-reveal
                data-reveal-delay={120}
                style={getRevealStyle({delay: 120})}
              >
                {projects.slice(0, 4).map((project) => {
                  const imageUrl = project.coverImage?.asset?.url ?? fallbackImage;
                  const imageAlt = project.coverImage?.alt ?? project.title;
                  const blurDataURL = project.coverImage?.asset?.metadata?.lqip;
                  return (
                    <Card
                      key={project._id}
                      padding="none"
                      className="relative overflow-hidden border-border/70 bg-surface/80"
                    >
                      <div className="p-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-surface-muted/70">
                          <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            sizes="(min-width: 1024px) 240px, 40vw"
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

          <section
            className="space-y-6"
            data-reveal
            data-reveal-delay={180}
            style={getRevealStyle({delay: 180})}
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Portfolio
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {pageContent.sectionTitle}
              </h2>
              {pageContent.sectionSubtitle ? (
                <p className="text-sm text-muted-foreground">
                  {pageContent.sectionSubtitle}
                </p>
              ) : null}
            </div>
            {projects.length === 0 ? (
              <Card className="border-border/70 bg-surface/80">
                <CardTitle className="text-lg">Aucun projet pour le moment</CardTitle>
                <CardDescription>
                  Ajoute des projets dans Sanity pour les afficher ici.
                </CardDescription>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                  const imageUrl = project.coverImage?.asset?.url ?? fallbackImage;
                  const imageAlt = project.coverImage?.alt ?? project.title;
                  const blurDataURL = project.coverImage?.asset?.metadata?.lqip;
                  const projectHref = `/projects/${project.slug}`;
                  return (
                    <Link
                      key={project._id}
                      href={projectHref}
                      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Card
                        padding="none"
                        className="h-full overflow-hidden border-border/70 bg-surface/80 transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-soft-lg"
                      >
                        <div className="relative">
                          <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted/70">
                            <Image
                              src={imageUrl}
                              alt={imageAlt}
                              fill
                              sizes="(min-width: 1024px) 340px, 80vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                              unoptimized
                              placeholder={blurDataURL ? "blur" : "empty"}
                              blurDataURL={blurDataURL}
                            />
                          </div>
                          {project.featured ? (
                            <div className="absolute left-4 top-4">
                              <Badge variant="secondary">Featured</Badge>
                            </div>
                          ) : null}
                        </div>
                        <div className="space-y-4 p-5">
                          <div className="space-y-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            {project.role ? (
                              <CardDescription>{project.role}</CardDescription>
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
                          {(project.links?.live || project.links?.github) && (
                            <div className="flex flex-wrap gap-3 pt-2">
                              {project.links?.live ? (
                                <span className={buttonVariants({size: "sm"})}>
                                  Live
                                </span>
                              ) : null}
                              {project.links?.github ? (
                                <span
                                  className={buttonVariants({
                                    size: "sm",
                                    variant: "outline",
                                  })}
                                >
                                  GitHub
                                </span>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

