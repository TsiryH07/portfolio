# Definition of Done

## Quality
- [ ] Lint passes (`npm run lint`).
- [ ] Typecheck passes (`npm run typecheck`).
- [ ] Unit tests pass (`npm run test:run`).
- [ ] Build passes (`npm run build`).

## Performance
- [ ] No unnecessary `use client` on server components.
- [ ] Data fetching in `features/*/server` or `lib/*` only.
- [ ] Images use `next/image` where possible.
- [ ] Bundle impact reviewed for new deps.

## Accessibility
- [ ] All interactive elements are reachable by keyboard.
- [ ] Focus states visible and consistent.
- [ ] Color contrast checked for text and controls.
- [ ] Headings follow a logical hierarchy.

## Stability
- [ ] Error/loading/not-found states covered for new routes.
- [ ] Feature exports are controlled via `index.ts`.
- [ ] No direct DB/API access from `app/`.

## i18n
- [ ] New copy has translations in `messages/`.
- [ ] Links use locale-aware navigation.
