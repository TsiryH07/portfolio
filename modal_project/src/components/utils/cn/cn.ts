import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merge proprement des classes (Tailwind-friendly)
 *
 * - Lisible : remplace les concat className manuelles
 * - Robuste : gère les conflits Tailwind (ex: "p-2" vs "p-4" => "p-4")
 *
 * Exemple :
 *   <button className={cn("px-3 py-2", isActive && "bg-black text-white")} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
