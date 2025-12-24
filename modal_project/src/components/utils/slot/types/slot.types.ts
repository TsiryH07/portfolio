import type * as React from "react";

/**
 * SlotProps
 * - On cible HTMLElement pour rester générique (button, a, div, etc.)
 * - On accepte n'importe quelles props HTML, elles seront merge sur l'enfant.
 */
export type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};
