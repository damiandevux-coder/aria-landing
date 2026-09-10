# Aria landing page

Single static marketing page for Aria, built with Astro 7, React islands, Tailwind 4, GSAP and Lenis. Deployed as static HTML.

## Read first

- `DESIGN.md`: visual tokens and the reasoning behind them.
- `MOTION.md`: timing, easing and choreography. Part 1 is the cerebrium.ai teardown the system is derived from; Part 2 is what this page implements.
- `PRODUCT.md`: positioning, copy rules, what may and may not be claimed.

## Layout

- `src/pages/index.astro` composes the page from `src/components/*.astro`.
- `src/layouts/Base.astro` owns the head, fonts (Astro Fonts API), and loads `src/scripts/main.ts`.
- `src/islands/*.tsx` are the only React components that hydrate: the hero thread demo, the jobs tabs, and the approval flow. Everything else is static HTML.
- `src/scripts/*.ts` is the motion system: one scroll store fed by Lenis, one shared IntersectionObserver, a readiness gate, and small custom elements (`a-words`, `a-scramble`, `a-rail`, `a-dots`, `a-accordion`).

## Conventions

- Astro 7 uses a strict HTML compiler: close every non-void tag, and do not nest block elements inside `<p>`.
- `compressHTML` is set to `true` (HTML-aware) so inline spacing is preserved; do not switch it to `"jsx"` without re-checking inline text.
- Reveal elements use `data-reveal` (slide up), `data-reveal="line"` (rule draws in), or `data-reveal="mark"` (in-view class only). Stagger with `data-delay="1..6"` in 100 ms steps.
- Section bands use the `.band` class with `--z` increasing down the page so each slides over the last.
- Phosphor icons: import the `*Icon` names, aliased to the short name, to avoid the deprecated exports.
- Reduced motion is handled once in `global.css` and in `store.ts`; every new effect must check `reduceMotion()`.

## Commands

- `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm check`.
- `astro check` requires TypeScript 6.x; do not bump to 7 until Astro supports it.
- `pnpm-workspace.yaml` hoists a few of Astro's runtime dependencies to the project root so a stray `node_modules` above the repo cannot shadow them during prerender.
