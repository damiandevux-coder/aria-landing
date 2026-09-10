# Design

Visual system for the Aria landing page. Tokens live in `src/styles/global.css` under `@theme`; this file records the decisions behind them.

## Direction

Persuade-mode B2B landing. The product's one provable claim is that a task runs to completion inside a Slack thread, so the page demonstrates that instead of describing it. The hero is a working thread component (`src/islands/HeroDemo.tsx`) that plays a request through tool activity to a delivered file. Every other section reuses the same thread primitives (`src/islands/slack.tsx`) rather than screenshots.

Dials: variance 7, motion 6, density 4.

## Theme

Dark only, locked at the page level (HyperCLI brand). No light mode.

| Token | Value | Use |
|---|---|---|
| `ink` | `#10151f` | page ground |
| `ink-2` | `#0b0f17` | recessed surfaces, alternate section bands |
| `ink-3` / `ink-4` | `#151b27` / `#1b2230` | raised cards, chips |
| `fg` / `fg-2` / `fg-3` | `#e8edf4` / `#a3adbf` / `#76829a` | text: primary, body, captions (all pass 4.5:1 on ink) |
| `blue` | `#4f7cff` | brand accent: icons, marks |
| `blue-2` | `#7d9dff` | accent as text on dark |
| `blue-fill` | `#3d6bf5` | button fill (white label passes 4.5:1) |
| `teal` | `#6ce8c4` | semantic only: done, live, passing. Never decorative |

One accent (blue). Teal is not a second accent; it means state.

## Type

Figtree (brand) via `next/font`, weights 400 to 700. Geist Mono for code, costs, durations, timestamps. Headings use `tracking -0.03em` and `text-wrap: balance`. Display max 4.25rem in the hero, 3rem elsewhere.

## Shape

Buttons 10px (`rounded-btn`), cards and frames 16px (`rounded-card`), chips 6px (`rounded-chip`). No pills.

## Motion

Timing, easing and choreography live in MOTION.md. House ease `cubic-bezier(0.16, 1, 0.3, 1)`; symmetric moves use `cubic-bezier(0.645, 0.045, 0.355, 1)`. One authored moment: the hero thread. Everything else follows the readiness gate, the word-level heading reveal, slide-up reveals with 100 ms staggers, and loops that pause off screen. Everything checks `prefers-reduced-motion` and degrades to a static finished state.

## Copy rules

- One CTA label page-wide: "Add Aria to Slack". Secondary intent is always "How it works".
- No em-dashes or en-dashes anywhere.
- No fabricated proof: no testimonials, customer counts, or compliance claims until real ones exist. Example threads are labelled "Example task, example data".
- Middle dot at most once per line.
