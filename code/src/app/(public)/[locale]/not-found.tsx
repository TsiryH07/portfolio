import {buttonVariants} from "@/components/ui/button";
import {Link} from "@/lib/i18n/navigation";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Page introuvable
        </h1>
        <p className="text-sm text-muted-foreground">
          Cette page n&apos;existe pas ou a ete deplacee.
        </p>
      </div>
      <Link
        href="/"
        className={buttonVariants({size: "lg"})}
      >
        Revenir a l&apos;accueil
      </Link>
    </section>
  );
}

