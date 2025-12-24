import * as React from "react";
import type { SlotProps } from "./types/slot.types";
import { cn } from "../cn";

/**
 * Slot
 * Permet à un composant de "déléguer" son élément racine à son enfant,
 * tout en appliquant les props/styles/handlers du parent.
 *
 * Cas d'usage typique (Radix/shadcn) :
 *   <Button asChild>
 *     <Link href="/pricing">Pricing</Link>
 *   </Button>
 *
 * Ici, Button n'est plus un <button>, mais un <a> (ou <Link>) tout en gardant
 * les classes/ARIA/handlers du Button.
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, ...slotProps },
  forwardedRef,
) {
  if (!React.isValidElement(children)) return null;

  // Radix propose aussi un pattern <Slottable>, on l'inclut en option.
  const child = getSlottableChild(children) ?? children;

  if (!React.isValidElement(child)) return null;

  const mergedProps = mergeProps(slotProps, child.props);

  // Important : on attache les refs (child.ref + forwardedRef).
  const ref = composeRefs(forwardedRef, getElementRef(child));

  return React.cloneElement(child, {
    ...mergedProps,
    ref,
  });
});

Slot.displayName = "Slot";

/**
 * Slottable — wrapper optionnel pour contrôler quel enfant devient la racine.
 * Utile quand tu passes des structures plus complexes :
 *   <Slot>
 *     <Slottable><Link ... /></Slottable>
 *     <span> (reste un enfant normal)</span>
 *   </Slot>
 */
export const Slottable: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
Slottable.displayName = "Slottable";

function isSlottable(element: React.ReactNode): element is React.ReactElement {
  return React.isValidElement(element) && element.type === Slottable;
}

function getSlottableChild(children: React.ReactElement) {
  // Si on reçoit <Slot><Slottable>...</Slottable></Slot>, on slote son enfant.
  if (isSlottable(children)) {
    const slottableChildren = children.props.children;
    return React.isValidElement(slottableChildren) ? slottableChildren : null;
  }
  return null;
}

type AnyProps = Record<string, unknown>;

/**
 * Merge de props parent -> enfant (avec règles "UI kit" pratiques)
 * - className : merge Tailwind-safe via cn (parent en dernier => il gagne)
 * - style : merge shallow (parent en dernier => il gagne)
 * - handlers : compose (enfant d'abord; si defaultPrevented, parent ignoré)
 */
function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  const overrideProps: AnyProps = { ...childProps, ...slotProps };

  for (const propName in childProps) {
    const childValue = childProps[propName];
    const slotValue = slotProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler && typeof childValue === "function" && typeof slotValue === "function") {
      overrideProps[propName] = composeEventHandlers(childValue, slotValue);
      continue;
    }

    if (propName === "className") {
      // parent en dernier => ses styles gagnent, et les conflits Tailwind se résolvent
      overrideProps.className = cn(String(childValue ?? ""), String(slotValue ?? ""));
      continue;
    }

    if (propName === "style" && isPlainObject(childValue) && isPlainObject(slotValue)) {
      overrideProps.style = { ...(childValue as object), ...(slotValue as object) };
      continue;
    }
  }

  return overrideProps;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && (value as any).constructor === Object;
}

/**
 * Compose 2 handlers.
 * Si le premier (souvent l'enfant) fait preventDefault(),
 * on n'exécute pas le second (souvent le parent).
 */
function composeEventHandlers<E>(
  theirs: (event: E) => void,
  ours: (event: E) => void,
  options: { checkForDefaultPrevented?: boolean } = { checkForDefaultPrevented: true },
) {
  return (event: E) => {
    theirs(event);
    if (options.checkForDefaultPrevented && (event as any)?.defaultPrevented) return;
    ours(event);
  };
}

/**
 * composeRefs — supporte ref callback + ref object.
 */
function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

/**
 * getElementRef — récupère la ref d'un ReactElement de façon compatible
 * avec différents builds/versions.
 */
function getElementRef(element: React.ReactElement) {
  return (element as any).ref as React.Ref<HTMLElement> | undefined;
}
