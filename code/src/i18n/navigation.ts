import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Ces wrappers gardent automatiquement /fr ou /en dans tes liens et navigations
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

// (Optionnel) Type pratique si tu veux typer tes locales ailleurs
export type Locale = (typeof routing.locales)[number];
