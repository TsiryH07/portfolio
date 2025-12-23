import type { ClassValue } from "clsx";

/**
 * Petites variantes "exemples" utiles en docs/tests.
 * (Pas obligatoire, mais pratique pour standardiser des cas de merge.)
 */
export const cnVariants = {
  padding: {
    compact: "px-3 py-1.5",
    comfy: "px-4 py-2.5",
  },
  tone: {
    neutral: "bg-white text-slate-900 border border-slate-200",
    brand: "bg-slate-900 text-white",
    danger: "bg-rose-600 text-white",
  },
  state: {
    default: "",
    disabled: "opacity-50 pointer-events-none",
    focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
  },
} as const satisfies Record<string, Record<string, ClassValue>>;
