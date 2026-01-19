import Image from "next/image";
import {
  BadgeCheck,
  Briefcase,
  ExternalLink,
  Folder,
  Globe,
  GraduationCap,
  Github,
  Sparkles,
  Wrench,
} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {cn, getRevealStyle} from "@/components/utils";
import {getProjects} from "@/features/projects/server";

import {getCvPageViewModel} from "../server/get-cv-page-view-model";
import {ExportCvButton} from "./export-cv-button";

const logoTones = [
  "border-primary/30 bg-primary/10 text-foreground",
  "border-emerald-400/30 bg-emerald-400/10 text-foreground",
  "border-amber-400/30 bg-amber-400/10 text-foreground",
  "border-sky-400/30 bg-sky-400/10 text-foreground",
  "border-rose-400/30 bg-rose-400/10 text-foreground",
  "border-violet-400/30 bg-violet-400/10 text-foreground",
];

const logoSizes = {
  xs: "h-6 w-6 text-[8px]",
  sm: "h-7 w-7 text-[9px]",
  md: "h-9 w-9 text-[10px]",
};

const logoImageSizes = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

const logoImageDimensions = {
  xs: 14,
  sm: 18,
  md: 22,
};

function normalizeLogoKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getLogoTone(label: string) {
  let seed = 0;
  for (let i = 0; i < label.length; i += 1) {
    seed += label.charCodeAt(i);
  }
  return logoTones[seed % logoTones.length];
}

function getLogoText(label: string) {
  const cleaned = label.replace(/[^A-Za-z0-9]/g, "");
  if (!cleaned) {
    return label.slice(0, 2).toUpperCase();
  }
  if (cleaned.length <= 2) {
    return cleaned.toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

type LogoMarkProps = {
  label: string;
  size?: keyof typeof logoSizes;
  logoSrc?: string;
  logoAlt?: string;
};

function LogoMark({label, size = "sm", logoSrc, logoAlt}: LogoMarkProps) {
  const imageDimension = logoImageDimensions[size];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full border font-semibold uppercase tracking-[0.2em]",
        logoSizes[size],
        getLogoTone(label),
      )}
      aria-hidden="true"
    >
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={logoAlt ?? ""}
          width={imageDimension}
          height={imageDimension}
          className={cn("object-contain", logoImageSizes[size])}
          unoptimized
        />
      ) : (
        getLogoText(label)
      )}
    </span>
  );
}

type LogoItemProps = {
  label: string;
  variant?: "tile" | "chip";
  logoSrc?: string;
  logoAlt?: string;
};

type LinkItem = {
  label: string;
  href: string;
  display: string;
};

function LogoItem({label, variant = "tile", logoSrc, logoAlt}: LogoItemProps) {
  if (variant === "chip") {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-surface px-3 py-2">
        <LogoMark label={label} logoSrc={logoSrc} logoAlt={logoAlt} />
        <span className="text-xs font-semibold text-foreground">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-surface px-3 py-3 text-center">
      <LogoMark label={label} size="md" logoSrc={logoSrc} logoAlt={logoAlt} />
      <span className="text-[11px] font-semibold text-foreground">{label}</span>
    </div>
  );
}

export async function CvPage() {
  const [cvViewModel, projects] = await Promise.all([
    getCvPageViewModel(),
    getProjects(),
  ]);

  const {
    heroTitle,
    heroSubtitle,
    summary,
    highlights,
    experience,
    education,
    certifications,
    languages,
    skillGroups,
    tools,
    toolLogos,
    contact,
    profile,
    socialLinks,
    cvLinks,
    featuredProjects,
  } = cvViewModel;

  const contactItems = [
    {label: "Telephone", value: contact.phone, href: `tel:${contact.phone}`},
    {label: "Localisation", value: contact.location},
    {label: "Email", value: contact.email, href: `mailto:${contact.email}`},
  ];

  const totalSkills = skillGroups.reduce(
    (total, group) => total + (group.items?.length ?? 0),
    0,
  );

  const quickStats = [
    {label: "Missions", value: experience.length},
    {label: "Skills", value: totalSkills},
    {label: "Certifs", value: certifications.length},
    {label: "Langues", value: languages.length},
  ];

  const logoByKey = new Map(
    toolLogos.map((logo) => [normalizeLogoKey(logo.name), logo]),
  );

  const getLogoForLabel = (label: string) => {
    const key = normalizeLogoKey(label);
    if (!key) return null;
    const logo = logoByKey.get(key);
    if (!logo) return null;
    return {src: logo.logoSrc, alt: logo.logoAlt || label};
  };

  const linkItems: LinkItem[] = cvLinks.length
    ? cvLinks.map((link) => ({
        label: link.label,
        href: link.url,
        display: link.url,
      }))
    : socialLinks.length
      ? socialLinks.map((link) => ({
          label: link.label,
          href: link.url,
          display: link.url,
        }))
      : [
          contact.email
            ? {
                label: "Email",
                href: `mailto:${contact.email}`,
                display: contact.email,
              }
            : null,
          contact.phone
            ? {
                label: "Telephone",
                href: `tel:${contact.phone}`,
                display: contact.phone,
              }
            : null,
          contact.resumeUrl
            ? {
                label: "CV",
                href: contact.resumeUrl,
                display: contact.resumeUrl,
              }
            : null,
        ].filter((item): item is LinkItem => Boolean(item));

  const projectsSource = featuredProjects.length ? featuredProjects : projects;
  const projectItems = projectsSource.slice(0, 3);
  const projectTotal = featuredProjects.length
    ? featuredProjects.length
    : projects.length;

  return (
    <section className="cv-full-bleed cv-professional relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.08),_transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="space-y-12 py-12 lg:py-20">
          <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-8 shadow-soft sm:p-9 lg:p-10">
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div
                className="space-y-6"
                data-reveal
                data-reveal-offset={18}
                style={getRevealStyle({offset: 18})}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/5 text-[10px] uppercase tracking-[0.2em] text-primary/90"
                  >
                    CV
                  </Badge>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {heroTitle}
                  </span>
                  <Badge
                    variant="outline"
                    tone="success"
                    className="text-[10px] uppercase tracking-[0.16em]"
                  >
                    {contact.availability}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    {profile.name}
                  </h1>
                  <p className="text-base font-semibold text-foreground/80 sm:text-lg">
                    {profile.role}
                  </p>
                </div>
                <p className="text-base text-foreground/80 sm:text-lg leading-relaxed">
                  {heroSubtitle}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((item, index) => (
                    <Badge
                      key={`highlight-${item}-${index}`}
                      variant="muted"
                      className="text-xs"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {quickStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-border/70 bg-surface px-4 py-3 text-center"
                    >
                      <p className="text-xl font-semibold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {contact.resumeUrl ? (
                    <a
                      href={contact.resumeUrl}
                      className={buttonVariants({
                        size: "default",
                        variant: "outline",
                      })}
                    >
                      Telecharger le CV
                    </a>
                  ) : null}
                </div>
              </div>
              <div
                className="grid gap-4"
                data-reveal
                data-reveal-delay={120}
                style={getRevealStyle({delay: 120})}
              >
                <Card className="border-border/70 bg-card print-avoid-break backdrop-blur-none">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border/70 bg-surface">
                      <Image
                        src={profile.avatarSrc}
                        alt={profile.avatarAlt}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Profil
                      </p>
                      <p className="text-2xl font-semibold">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {contactItems.map((item) => (
                      <div
                        key={item.label}
                        className={`flex min-w-0 flex-col rounded-2xl border border-border/70 bg-surface p-4 ${
                          item.label === "Email" ? "sm:col-span-2" : ""
                        }`}
                      >
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className={`mt-2 break-words font-semibold text-foreground underline-offset-4 hover:underline ${
                              item.label === "Email" ? "text-base" : "text-sm"
                            }`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-2 break-words text-sm font-semibold text-foreground">
                            {item.value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="border-border/70 bg-card print-avoid-break backdrop-blur-none">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">Focus immediat</CardTitle>
                      <CardDescription className="text-sm">
                        Objectif: missions rapides et impact mesurable.
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {experience.length} missions
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {highlights.slice(0, 3).map((item, index) => (
                      <div
                        key={`focus-${item}-${index}`}
                        className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface px-4 py-3"
                      >
                        <span className="text-sm font-semibold text-foreground">
                          {item}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          priorite
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section className="relative space-y-8">
            <div
              className="space-y-3"
              data-reveal
              data-reveal-offset={16}
              style={getRevealStyle({offset: 16})}
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                  <Briefcase className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Experience
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Missions avec progression visuelle.
                  </h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Chaque mission est resume avec une barre de charge.
              </p>
            </div>

            <div className="grid gap-6">
              {experience.map((item, index) => {
                const revealDelay = index * 120;
                const progress = Math.max(58, 100 - index * 12);
                return (
                  <Card
                    key={`${item.company}-${item.role}-${index}`}
                    className="relative overflow-hidden border-border/70 bg-card print-avoid-break backdrop-blur-none"
                    data-reveal
                    data-reveal-delay={revealDelay}
                    style={getRevealStyle({delay: revealDelay})}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <LogoMark
                          label={item.company || item.role}
                          size="md"
                        />
                        <div className="min-w-0 space-y-1">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                            Mission {String(index + 1).padStart(2, "0")}
                          </p>
                          <CardTitle className="text-lg sm:text-xl">
                            {item.role}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {item.company}
                            {item.location ? ` | ${item.location}` : ""}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase tracking-[0.2em]"
                      >
                        {item.period}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                      {item.summary}
                    </p>
                    <div className="mt-5 rounded-2xl border border-border/70 bg-surface p-4">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        <span>Delivery</span>
                        <span>{item.achievements.length} points clefs</span>
                      </div>
                      <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                        <div
                          className="relative h-full rounded-full bg-[linear-gradient(90deg,_hsl(var(--primary)/0.9),_hsl(var(--chart-2)/0.8))]"
                          style={{width: `${progress}%`}}
                        />
                      </div>
                    </div>
                    {item.achievements.length > 0 ? (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {item.achievements.map((achievement, index) => (
                          <div
                            key={`achievement-${achievement}-${index}`}
                            className="flex items-start gap-2 rounded-2xl border border-border/70 bg-surface px-3 py-2 text-xs text-foreground/80"
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/70" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {item.stack.length > 0 ? (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {item.stack.map((tech, index) => {
                          const logo = getLogoForLabel(tech);
                          return (
                            <LogoItem
                              key={`stack-${tech}-${index}`}
                              label={tech}
                              variant="chip"
                              logoSrc={logo?.src}
                              logoAlt={logo?.alt}
                            />
                          );
                        })}
                      </div>
                    ) : null}
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-4">
              <Card
                padding="sm"
                className="border-border/70 bg-card print-avoid-break backdrop-blur-none"
                data-reveal
                data-reveal-delay={60}
                style={getRevealStyle({delay: 60})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </span>
                    <CardTitle className="text-sm">Skills essentiels</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {totalSkills} items
                  </Badge>
                </div>
                <div className="mt-4 space-y-4">
                  {skillGroups.map((group, groupIndex) => (
                    <div
                      key={`skill-group-${group.title ?? "group"}-${groupIndex}`}
                      className="space-y-2"
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {group.title}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {group.items.map((item, itemIndex) => {
                          const logo = getLogoForLabel(item);
                          return (
                            <LogoItem
                              key={`skill-${group.title ?? "group"}-${item}-${itemIndex}`}
                              label={item}
                              logoSrc={logo?.src}
                              logoAlt={logo?.alt}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                padding="sm"
                className="border-border/70 bg-card print-avoid-break backdrop-blur-none"
                data-reveal
                data-reveal-delay={120}
                style={getRevealStyle({delay: 120})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                      <Wrench className="h-4 w-4 text-primary" />
                    </span>
                    <CardTitle className="text-sm">Outils & workflow</CardTitle>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {tools.map((tool, index) => {
                    const logo = getLogoForLabel(tool);
                    return (
                      <LogoItem
                        key={`tool-${tool}-${index}`}
                        label={tool}
                        logoSrc={logo?.src}
                        logoAlt={logo?.alt}
                      />
                    );
                  })}
                </div>
              </Card>

              <Card
                padding="sm"
                className="border-border/70 bg-card print-avoid-break backdrop-blur-none"
                data-reveal
                data-reveal-delay={180}
                style={getRevealStyle({delay: 180})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                      <Globe className="h-4 w-4 text-primary" />
                    </span>
                    <CardTitle className="text-sm">Langues</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {languages.length} items
                  </Badge>
                </div>
                <div className="mt-4 grid gap-4">
                  {languages.map((language) => {
                    const levelLabel = language.level ?? "";
                    const normalizedLevel = levelLabel.toLowerCase();
                    const levelValue = normalizedLevel.includes("natif") ||
                      normalizedLevel.includes("biling")
                      ? 100
                      : normalizedLevel.includes("profession")
                      ? 82
                      : normalizedLevel.includes("inter")
                      ? 68
                      : 55;

                    return (
                      <div key={language.name} className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <LogoMark label={language.name} />
                            <span className="font-semibold">{language.name}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {language.level}
                          </span>
                        </div>
                        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,_hsl(var(--primary)/0.8),_hsl(var(--chart-3)/0.7))]"
                            style={{width: `${levelValue}%`}}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card
                padding="sm"
                className="border-border/70 bg-card print-avoid-break backdrop-blur-none"
                data-reveal
                data-reveal-delay={240}
                style={getRevealStyle({delay: 240})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                      <Folder className="h-4 w-4 text-primary" />
                    </span>
                    <CardTitle className="text-sm">Projets</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {projectTotal} items
                  </Badge>
                </div>
                <div className="mt-4 grid gap-4">
                  {projectItems.map((project) => {
                    const imageUrl = project.coverImage?.asset?.url;
                    const imageAlt = project.coverImage?.alt ?? project.title;
                    const blurDataURL = project.coverImage?.asset?.metadata?.lqip;
                    const stackItems = project.stack ?? [];

                    return (
                      <div
                        key={project._id}
                        className="grid gap-3 rounded-2xl border border-border/70 bg-surface p-3 sm:grid-cols-[96px_1fr]"
                      >
                        <div className="relative h-20 w-full overflow-hidden rounded-xl border border-border/70 bg-surface-muted">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={imageAlt}
                              fill
                              sizes="96px"
                              className="object-cover"
                              unoptimized
                              placeholder={blurDataURL ? "blur" : "empty"}
                              blurDataURL={blurDataURL}
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center">
                              <LogoMark label={project.title} size="md" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground">
                                {project.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {project.role ?? "Projet"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {project.links?.live ? (
                                <a
                                  href={project.links.live}
                                  aria-label={`Voir ${project.title}`}
                                  className="grid h-8 w-8 place-items-center rounded-full border border-border/70 bg-background text-foreground/80 transition-colors hover:text-foreground"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              ) : null}
                              {project.links?.github ? (
                                <a
                                  href={project.links.github}
                                  aria-label={`Github ${project.title}`}
                                  className="grid h-8 w-8 place-items-center rounded-full border border-border/70 bg-background text-foreground/80 transition-colors hover:text-foreground"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              ) : null}
                            </div>
                          </div>
                          {project.summary ? (
                            <p className="text-[11px] text-foreground/70">
                              {project.summary}
                            </p>
                          ) : null}
                          {stackItems.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {stackItems.slice(0, 4).map((tech, index) => {
                                const logo = getLogoForLabel(tech);
                                return (
                                  <LogoMark
                                    key={`${project._id}-${tech}-${index}`}
                                    label={tech}
                                    size="xs"
                                    logoSrc={logo?.src}
                                    logoAlt={logo?.alt}
                                  />
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                  {projectItems.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Ajouter des projets pour afficher ici.
                    </p>
                  ) : null}
                </div>
              </Card>

              <Card
                padding="sm"
                className="border-border/70 bg-card print-avoid-break backdrop-blur-none"
                data-reveal
                data-reveal-delay={300}
                style={getRevealStyle({delay: 300})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </span>
                    <CardTitle className="text-sm">Formations</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {education.length} items
                  </Badge>
                </div>
                <div className="mt-4 grid gap-3">
                  {education.map((item, index) => (
                    <div
                      key={`${item.school}-${index}`}
                      className="rounded-2xl border border-border/70 bg-surface px-3 py-3"
                    >
                      <p className="text-xs font-semibold text-foreground">
                        {item.degree}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.school}
                      </p>
                      <Badge variant="outline" className="mt-2 text-[10px]">
                        {item.period}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                padding="sm"
                className="border-border/70 bg-card print-avoid-break backdrop-blur-none"
                data-reveal
                data-reveal-delay={360}
                style={getRevealStyle({delay: 360})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-2xl border border-border/70 bg-surface">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    </span>
                    <CardTitle className="text-sm">Certifications</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {certifications.length} items
                  </Badge>
                </div>
                <div className="mt-4 grid gap-3">
                  {certifications.map((item) => (
                    <div
                      key={`${item.title}-${item.issuer}`}
                      className="rounded-2xl border border-border/70 bg-surface px-3 py-3"
                    >
                      <p className="text-xs font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.issuer}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        {item.year}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
          <div className="space-y-4">
            {linkItems.length > 0 ? (
              <div className="grid gap-2 text-xs text-foreground sm:grid-cols-2">
                {linkItems.map((link) => (
                  <div
                    key={link.label}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/70 bg-surface px-4 py-2"
                  >
                    <span className="font-semibold">{link.label}</span>
                    <a
                      href={link.href}
                      className="break-all font-semibold text-foreground/80 underline"
                    >
                      {link.display}
                    </a>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="flex justify-center print-hidden">
              <ExportCvButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
