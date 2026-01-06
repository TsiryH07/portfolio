# my_template_1
Voici un template nextJs 

Voici un test pour la phase 0
Selon les documents TODO/structure fournis dans ce chat, voilà un **README.md “source de vérité”** pensé pour qu’un dev externe comprenne l’architecture en <3 minutes.

```md
# Portfolio (Next.js App Router)

Portfolio multi-pages orienté “D2C / e-commerce”, design premium, performance-first, prêt pour un setup international (FR/EN).:contentReference[oaicite:2]{index=2}

## Pages (MVP)
- Home
- About
- Skills
- Projects:contentReference[oaicite:3]{index=3}

> Le footer sert de “Contact” (liens sociaux + email) sur toutes les pages (via layout).:contentReference[oaicite:4]{index=4}

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui
- i18n: `next-intl` (routing `app/[locale]` à venir/standard)
- CMS: Sanity
- Analytics: PostHog
- Déploiement: Vercel:contentReference[oaicite:5]{index=5}

---

## Règle d’or (architecture)
**`app/` = routing + composition (pages courtes)**  
**`features/` = UI métier + data + logique**:contentReference[oaicite:6]{index=6}:contentReference[oaicite:7]{index=7}

Concrètement :
- Une page dans `app/` ne fait (presque) que rendre une “View” exportée depuis `features/*`.
- Aucun “métier” dans `app/` (pas de logique lourde).:contentReference[oaicite:8]{index=8}

---

## Structure du projet (où est quoi)
> Objectif : savoir **instantanément** où ajouter un fichier.:contentReference[oaicite:9]{index=9}

```

src/
app/                       # routing Next (pages/layouts)
components/
ui/                      # shadcn uniquement
common/                  # UI maison générique (Navbar, Footer, Section, etc.)
index.ts                 # public API components
features/                  # “produit” par feature (projects, skills, about, ...) <feature>/
components/            # UI métier (Views, sections, cards spécifiques)
server/                # logique server (queries, actions, fetch, etc.)
services/              # services isolés (si besoin)
model/                 # types/mapper/domain de la feature (si besoin)
index.ts               # public API feature
lib/                       # clients & infra partagés (sanity, posthog, env…)
i18n/                      # messages + helpers i18n
styles/                    # globals + tokens + classes (glass, theme)
types/                     # types transverses (si nécessaire)

````

### Règles d’or de placement
- `src/components/ui/*` = **shadcn only**.:contentReference[oaicite:12]{index=12}
- `src/components/common/*` = composants UI “maison” **réutilisables** (layout, sections, wrappers).:contentReference[oaicite:13]{index=13}
- `src/features/<feature>/*` = UI métier + data + logique de cette feature.:contentReference[oaicite:14]{index=14}
- `src/lib/*` = clients partagés (Sanity/PostHog/env) et infra transversale.:contentReference[oaicite:15]{index=15}

---

## Imports (alias) + “Public API”
### Alias
On utilise l’alias `@/*` → `src/*` pour éviter `../../../` partout.:contentReference[oaicite:16]{index=16}

Exemples :
```ts
import { Button } from "@/components/ui";
import { ProjectsView } from "@/features/projects";
import { sanityClient } from "@/lib/sanity";
````



### Public API (obligatoire)

Chaque “module” expose un `index.ts` :

* `components/index.ts`
* `features/<feature>/index.ts`
* `lib/index.ts` (ou exports ciblés)

👉 On évite les “deep imports” du style `@/features/projects/components/x`.

---

## Conventions

### Nommage

* Dossiers : `kebab-case`
* Fichiers : `kebab-case.ts(x)` (ou `dot-style.ts` si choisi, mais rester cohérent)
* Composants React : `PascalCase` dans le code, fichier `kebab-case.tsx`

### Commits

On suit une convention simple :

* `feat: ...`
* `fix: ...`
* `chore: ...`
* `refactor: ...`

---

## Démarrage rapide

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```



## Scripts (attendus)

* `pnpm dev`
* `pnpm build`
* `pnpm start`
* `pnpm lint`
* `pnpm format`
* (optionnel) `pnpm typecheck`

---

## Où mettre quoi ? (raccourci)

* Route / page / layout → `src/app/**`
* UI générique réutilisable → `src/components/common/**`
* UI shadcn → `src/components/ui/**`
* UI métier + logique d’une page → `src/features/<feature>/**`
* Clients / infra partagée → `src/lib/**`
* Tokens / thème / globals → `src/styles/**`

```

