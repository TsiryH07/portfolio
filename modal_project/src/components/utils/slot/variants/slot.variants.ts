/**
 * Variantes "d'exemple" pour illustrer Slot dans Button asChild.
 * (Slot lui-même n'a pas de variants, mais on garde ce dossier pour cohérence projet.)
 */
export const slotDemoVariants = {
  buttonBase:
    "inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
  size: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  },
  tone: {
    neutral: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    brand: "bg-slate-900 text-white hover:bg-slate-800",
    danger: "bg-rose-600 text-white hover:bg-rose-500",
  },
  disabled: "opacity-50 pointer-events-none",
} as const;
