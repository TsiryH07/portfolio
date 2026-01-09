"use client";

import {useEffect} from "react";

import {buttonVariants} from "@/components/ui/button";
import {Link} from "@/lib/i18n/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Une erreur est arrivee
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Oups, quelque chose a casse.
        </h1>
        <p className="text-sm text-muted-foreground">
          Reessayez ou revenez a l&apos;accueil.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className={buttonVariants({size: "lg"})}
        >
          Reessayer
        </button>
        <Link
          href="/"
          className={buttonVariants({size: "lg", variant: "outline"})}
        >
          Retour accueil
        </Link>
      </div>
    </section>
  );
}

