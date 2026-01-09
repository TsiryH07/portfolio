import {Card} from "@/components/ui/card";
import {getRevealStyle} from "@/components/utils";
import {Link} from "@/lib/i18n/navigation";

type JournalItem = {
  text: string;
  href?: string;
  hrefLabel?: string;
};

type JournalEntry = {
  id: string;
  weekLabel: string;
  date: string;
  title: string;
  items: JournalItem[];
};

const journalEntries: JournalEntry[] = [
  {
    id: "jan-10-2022",
    weekLabel: "Semaine du",
    date: "10 Janvier 2022",
    title: "Side projects",
    items: [
      {
        text: "Published Building a Raycast Extension",
        href: "/projects",
        hrefLabel: "Lien",
      },
      {
        text: "Raycast extension approved on the Raycast Store",
        href: "/projects",
        hrefLabel: "Lien",
      },
    ],
  },
  {
    id: "jun-07-2021",
    weekLabel: "Semaine du",
    date: "7 Juin 2021",
    title: "Interesting things",
    items: [
      {
        text: "Generate easing gradients for a more natural looking aesthetic",
        href: "/projects",
        hrefLabel: "Lien",
      },
    ],
  },
  {
    id: "may-31-2021",
    weekLabel: "Semaine du",
    date: "31 Mai 2021",
    title: "Work",
    items: [
      {
        text: "We received our Summer Swag Pack at Wistia so I made an unboxing video",
        href: "/projects",
        hrefLabel: "Lien",
      },
    ],
  },
  {
    id: "may-24-2021",
    weekLabel: "Semaine du",
    date: "24 Mai 2021",
    title: "Interesting things",
    items: [
      {
        text: "Making blobs with CSS",
        href: "/projects",
        hrefLabel: "Lien",
      },
      {
        text: "Using base layers for fast layouts",
        href: "/projects",
        hrefLabel: "Lien",
      },
    ],
  },
];

export function ProjectsJournal() {
  return (
    <section
      className="glass-section relative overflow-hidden p-8 sm:p-10"
      data-reveal
      data-reveal-visible="false"
      data-reveal-delay={220}
      style={getRevealStyle({delay: 220})}
    >
      <div className="absolute -right-16 -top-20 h-32 w-32 rounded-full bg-primary/15 blur-[110px]" />
      <div className="absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-emerald-400/15 blur-[130px]" />
      <div className="relative space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Journal
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Work journal
          </h2>
          <p className="text-sm text-muted-foreground">
            Un suivi hebdo des idees, tests, et livraisons.
          </p>
        </div>
        <div className="relative pl-8 sm:pl-10">
          <div
            className="pointer-events-none absolute left-4 top-0 h-full w-px bg-border/70"
            aria-hidden="true"
          />
          <div className="space-y-6">
            {journalEntries.map((entry, index) => {
              const revealDelay = index * 90;
              return (
                <div
                  key={entry.id}
                  className="relative grid gap-4 lg:grid-cols-[190px_1fr] lg:items-start"
                  data-reveal
                  data-reveal-visible="false"
                  data-reveal-delay={revealDelay}
                  style={getRevealStyle({delay: revealDelay})}
                >
                  <span className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full border border-border/70 bg-surface shadow-soft" />
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {entry.weekLabel}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {entry.date}
                    </p>
                  </div>
                  <Card className="border-border/70 bg-surface/80 shadow-soft">
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                        {entry.title}
                      </p>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        {entry.items.map((item, itemIndex) => (
                          <li
                            key={`${entry.id}-${item.text}-${itemIndex}`}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                            <div className="flex flex-wrap items-center gap-2">
                              <span>{item.text}</span>
                              {item.href ? (
                                <Link
                                  href={item.href}
                                  className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                                >
                                  {item.hrefLabel ?? "Lien"}
                                </Link>
                              ) : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
