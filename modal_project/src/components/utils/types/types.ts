/**
 * types — utilitaires TypeScript réutilisables (DX)
 *
 * Objectif : centraliser des types courants (WithClassName, WithChildren, Nullable<T>, Prettify<T>, ...)
 * pour éviter les duplications dans 20 fichiers.
 */

import type * as React from "react";

/** Ajoute un `className?: string` à des props. */
export type WithClassName<T = {}> = T & { className?: string };

/** Ajoute `children?: React.ReactNode` à des props. */
export type WithChildren<T = {}> = T & { children?: React.ReactNode };

/** Rend le type nullable. */
export type Nullable<T> = T | null;

/** Rend le type optional (souvent utile pour APIs/patch). */
export type Optional<T> = T | undefined;

/** Rend tout nullable récursivement (pratique pour DTO partiels). */
export type DeepNullable<T> =
  T extends Function ? T :
  T extends Array<infer U> ? Array<DeepNullable<U>> :
  T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepNullable<U>> :
  T extends object ? { [K in keyof T]: DeepNullable<T[K]> } :
  T | null;

/** Rend toutes les propriétés optionnelles récursivement. */
export type DeepPartial<T> =
  T extends Function ? T :
  T extends Array<infer U> ? Array<DeepPartial<U>> :
  T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } :
  T;

/**
 * Prettify — "aplatit" un type d'intersection pour améliorer la lisibilité dans l'IDE.
 * (ne change pas le runtime)
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** Remplace un sous-ensemble de propriétés par d'autres (utile en composant). */
export type Override<T, U> = Prettify<Omit<T, keyof U> & U>;

/** Marque des clés comme requises. */
export type RequireKeys<T, K extends keyof T> = Prettify<T & Required<Pick<T, K>>>;

/** Marque des clés comme optionnelles. */
export type OptionalKeys<T, K extends keyof T> = Prettify<Omit<T, K> & Partial<Pick<T, K>>>;

/** Extrait la valeur d'une Promise. */
export type AwaitedValue<T> = T extends Promise<infer U> ? U : T;

/** Un helper de props commun pour patterns "asChild". */
export type WithAsChild<T = {}> = T & { asChild?: boolean };
