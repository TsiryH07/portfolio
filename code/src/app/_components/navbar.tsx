"use client";

import * as React from "react";

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ThemeToggle} from "@/components/ui/theme-toggle";
import {Link, usePathname} from "@/lib/i18n/navigation";

const NAV_ITEMS = [
  {value: "home", label: "Home", href: "/"},
  {value: "about", label: "About", href: "/about"},
  {value: "skills", label: "Skills", href: "/skills"},
  {value: "projects", label: "Projects", href: "/projects"},
  {value: "cv", label: "CV", href: "/cv"},
  {value: "story", label: "Story", href: "/story"},
];

const NAV_SEGMENTS = NAV_ITEMS.reduce<Record<string, string>>((acc, item) => {
  const segment = item.href.replace("/", "");
  if (segment) {
    acc[segment] = item.value;
  }
  return acc;
}, {});

const getActiveValue = (pathname: string | null) => {
  if (!pathname) return "home";
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "";
  const second = segments[1] ?? "";

  return NAV_SEGMENTS[first] ?? NAV_SEGMENTS[second] ?? "home";
};

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeValue = React.useMemo(
    () => (mounted ? getActiveValue(pathname) : undefined),
    [mounted, pathname],
  );

  return (
    <nav className="w-full py-3">
      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="hidden sm:block" />
        <Tabs value={activeValue}>
          <TabsList className="mx-auto">
            {NAV_ITEMS.map((item) => (
              <TabsTrigger key={item.value} value={item.value} asChild>
                <Link href={item.href}>{item.label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex justify-center sm:justify-end">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

