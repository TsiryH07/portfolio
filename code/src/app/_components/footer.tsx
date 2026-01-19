import type {ComponentProps} from "react";

import {Facebook, Instagram, Linkedin} from "lucide-react";

import {cn} from "@/components/utils";

const SOCIAL_LINKS = [
  {label: "Instagram", href: "#", Icon: Instagram},
  {label: "Facebook", href: "#", Icon: Facebook},
  {label: "LinkedIn", href: "#", Icon: Linkedin},
  {label: "WhatsApp", href: "#", Icon: WhatsappIcon},
  {label: "X", href: "#", Icon: XIcon},
];

type SocialIconProps = ComponentProps<"svg">;

function WhatsappIcon({className, ...props}: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.2 8.8c.3-.4.7-.4 1-.1l1 .9c.3.3.3.6.1.9l-.3.6c.5.8 1.2 1.6 2 2.1l.7-.3c.3-.2.7-.1.9.2l.7 1c.2.3.1.6-.2.9-.4.3-.9.5-1.4.5-1.2 0-2.7-.8-4-2.1-1.2-1.2-2-2.7-2-3.9 0-.6.2-1.1.5-1.6z" />
    </svg>
  );
}

function XIcon({className, ...props}: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-8 sm:px-6">
        <div className="flex items-center gap-4 rounded-full border border-border/60 bg-surface/70 px-4 py-3 shadow-soft">
          {SOCIAL_LINKS.map(({label, href, Icon}) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/70 text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
