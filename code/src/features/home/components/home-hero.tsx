import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {getRevealStyle} from "@/components/utils";

type HomeHeroProps = {
  name: string;
  role: string;
  description: string;
  badge?: string;
  imageSrc: string;
};

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function HomeHero({
  name,
  role,
  description,
  badge,
  imageSrc,
}: HomeHeroProps) {
  const initials = getInitials(name) || "ME";

  return (
    <section className="relative">
      <div className="py-16 lg:py-24">
        <div className="glass-section relative grid gap-12 border border-border/60 bg-background/40 p-8 sm:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div
            className="relative flex items-center justify-center"
            data-reveal
            data-reveal-offset={24}
            style={getRevealStyle({offset: 24})}
          >
            <div
              className="absolute -inset-10 rounded-full bg-primary/15 blur-3xl"
              aria-hidden="true"
            />
            <Avatar className="h-56 w-56 border-4 border-background shadow-ring sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <AvatarImage src={imageSrc} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div
            className="space-y-6"
            data-reveal
            data-reveal-delay={150}
            style={getRevealStyle({delay: 150})}
          >
            {badge ? (
              <Badge
                variant="outline"
                className="w-fit border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.2em] text-primary shadow-soft"
              >
                {badge}
              </Badge>
            ) : null}
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-foreground">{name}</span>
                <span className="block bg-gradient-to-r from-primary via-sky-500 to-emerald-400 bg-clip-text text-transparent">
                  {role}
                </span>
              </h1>
              <p className="text-base text-foreground/70 sm:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
