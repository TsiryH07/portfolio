/**
 * Variants (curation) : regrouper des combos fréquents de types.
 * Ici, c'est surtout pour la doc/consistance (un util de types n'a pas de "variants" UI).
 */

import type { WithAsChild, WithChildren, WithClassName, Prettify } from "../types";

export type BaseUiProps = Prettify<WithClassName<WithChildren<{}>>>;

export type BaseAsChildProps = Prettify<WithAsChild<BaseUiProps>>;
