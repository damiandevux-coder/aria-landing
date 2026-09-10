# Motion

Motion spec for the Aria landing page, derived from a teardown of cerebrium.ai (September 2026). Part 1 records exactly how Cerebrium does it, with the real numbers pulled from their shipped bundles. Part 2 is what Aria adopts, adapted to this stack (Next 14, Tailwind 4, framer-motion, Figtree). DESIGN.md owns the visual tokens; this file owns timing, easing, and choreography.

---

## Part 1. How Cerebrium does it

### Stack

| Concern | Library | Notes |
|---|---|---|
| Tweens, timelines, tickers | GSAP 3.14.2 + ScrambleText + SplitText | Every JS-driven animation |
| Smooth scroll | Lenis via a Locomotive Scroll v5 wrapper | `smoothWheel` on desktop only, off on touch |
| Page transitions | Swup 4.8.2 | `animationSelector: ".transition-fade"`, 0.3s fade |
| 3D background | Three.js + custom GLB models + bloom + fisheye pass | 1.2 MB bundle, single fixed canvas behind the whole page |
| Carousel | Swiper | Case-study tiles |
| Loader | Lottie light + CSS keyframes | Logo bars only |
| Components | Vanilla custom elements (`c-*`) | Each section is a `HTMLElement` with connect/disconnect lifecycle |

### Global timing tokens

```css
--ease:                       cubic-bezier(.645,.045,.355,1);   /* the house curve, ease-in-out cubic */
--ease-in-out:                cubic-bezier(.4,0,.2,1);
--ease-out:                   cubic-bezier(0,0,.2,1);
--ease-bounce:                cubic-bezier(.175,.885,.32,1.275);
--transition-duration-fast:   .2s;    /* hovers */
--transition-duration:        .3s;    /* dropdowns, labels */
--transition-duration-slow:   .6s;
--transition-duration-slower: .8s;    /* hero reveal */
--transition-duration-slowest: 1s;    /* rule lines */
--transition-page-duration:   .3s;    /* swup fade */
```

### Readiness gate

Nothing reveals until `<html>` has `is-ready`. That class is added on the first of two events: the WebGL scene finishes compiling (`webgpu-is-ready` event), or a 1000 ms fallback timer. While waiting, `is-initial-loading` shows a full-screen charcoal loader with the logo bars sliding 5px back and forth on a 1s ease-in-out loop. The logo icon enters with `overlay-anim-in` (25px rise, 0.3s) and exits with `overlay-anim-out` (25px lift, 0.3s).

Everything below keys off `html.is-ready`, so the whole page reveals as one orchestrated event instead of piecemeal.

### Hero reveal (once `is-ready`)

Two systems run in parallel.

**Split title** (`c-split-title`, GSAP SplitText by words):

```
delay 0.35s
words: opacity 0 -> 1, duration 0.10s, stagger 0.032s from "random", power2.out
then all words: opacity 1 -> 0.1, duration 0.03s, power1.in   (a flicker)
then all words: opacity 0.1 -> 1, duration 0.03s, power1.out
```

Words fade in in random order over roughly 0.4s, then the whole line blinks once. No translate. It only fires when the element is in view, so lower headings do the same thing on scroll.

**Supporting copy** (CSS class `anim-transform-opacity`): `translateY(40px)` and `opacity 0` to rest, 0.8s on `--ease`. Siblings stagger with `-delay-1` to `-delay-4` at 0.1s steps. The hairline under the hero (`.animated-line`) scales from `scaleX(0)` to 1 over 1s from the left.

### Custom cursor and click-and-hold

Desktop only (`hover: hover` and `pointer: fine`). A fixed 150px SVG ring follows the pointer via `gsap.quickSetter` with a lerp of 0.2 per tick. Ring scale animates through CSS: hidden 0.72, visible 1 (0.1s delay), hovering interactive elements 0.82, holding 0.75. All 0.35s on `--ease-in-out`.

Holding the mouse down anywhere on the hero:

- The progress ring draws over 9 seconds (`strokeDashoffset` to 0, linear).
- The UI hides (`[data-hero-hold-hide]` to opacity 0) and three words appear in sequence at 1.0s, 3.75s, 6.0s: "Quickly", "Scale", "Globally". Each word is split into letters. Letters fade in with 0.12s duration and 0.03s stagger from the start, flicker to 0.12 opacity and back with random stagger, dwell 0.75s, then fade out with random 0.03s stagger.
- The 3D scene plays its baked camera animation at 1.3x, fog ranges shift through six keyed stages, particles fade out over 10s, and mesh lines fade to 0.15 opacity over 1.5s.
- On release: the animation scrubs back 1.5s with power4.out, a chromatic fisheye post-process pass sweeps in (radius 0 to 1 over 1.75s after a 0.3s delay), then everything resets.

### Scroll behaviour

- Lenis smooth scroll drives a single RAF loop. Every component reads scroll velocity and direction from a shared store rather than attaching its own listeners.
- Elements with `data-scroll` get `is-inview` toggled by a shared IntersectionObserver manager. CSS handles the reveal.
- `data-scroll-event-progress="onHeroHomeScrollProgress"` dispatches a 0 to 1 progress event that the 3D scene consumes for camera parallax (rotation `progress * PI * -0.05`, easing 0.12 per frame). Above 200px scrolled and scrolling up, `has-header-fixed-visible` shows the fixed header.
- Section stacking: the hero's hold layer is `position: sticky; top: 0`. Following light sections use negative margins (`-mt-7.5 md:-mt-15`) and `rounded-t` corners on a `bg-white` wrapper so they visually slide over the dark hero. The footer does the same with `-mt-(--radius-xl)`.
- Parallax images: `c-inner-parallax` with `data-speed="-0.1"`. The image is 12em taller than its frame and offset by -6em, so it can drift without exposing edges.

### Logo rail

`c-rail` clones its pattern enough times to cover `innerWidth + 1`, then translates on GSAP's ticker. Base speed 0.35px per frame (0.5 in the hero). Scroll velocity adds to it: `speed = idle + |velocity| * 0.5 * idle * 0.6`, and scroll direction flips the rail direction. So the rail speeds up and reverses with the user's scroll.

### Interactive dots

A CSS grid of 100 cells (20 columns desktop, 24 cells and 6 columns under 700px). Each cell has a pink square (`scale(0)` to 1, 0.2s, `mix-blend-mode: screen`, opacity 0.85) and a 2px white centre dot. Moving the mouse across cells lights them as a trail: max 45 lit at once, each expiring after 2.4s with a 0.4s scale-out. After 1.8s idle, a random 1 to 5 cells blink on every 0.8 to 1.5s.

### Nav and buttons

- Nav link hover: a `::before` background at 15% opacity scales from `(0.9, 0.7)` to 1 in 0.2s.
- Dropdown: `clip-path: inset(10% round 7px)` to `inset(0)`, plus opacity, 0.3s. Items translate from `(10px, 10px)` with 75ms stagger. The whole page behind blurs 10px (`transition-blur`).
- Every button label is a `c-scramble-text`. `mouseenter` scrambles to the hover text over 0.5s, `mouseleave` scrambles back. Uses GSAP ScrambleText. Disabled on touch.
- Button background: a `::before` span with `transition-[transform,opacity] duration-200`.
- Feature list rows: label slides 15px right and icon 15px left on hover, 0.2s. The divider under the hovered row and the one two rows up fade out and shrink to `scaleX(.95)`.
- Labels (`c-label`): the coloured square wipes in via `clip-path: inset(100%)` to `inset(0)` after a 0.3s delay, text slides in from 10px right.

### In-card loops

| Card | Behaviour |
|---|---|
| Range chart | Bars grow to `--value` width. Duration scales with value: 250 ms for the smallest, 4000 ms for the largest. Replays after a 4 s gap while in view. Resets instantly when out of view. |
| Terminal | Lines appear one every 80 ms (`transition-delay: calc(var(--line-index) * 80ms)`). Holds 3.5 s, clears, repeats. |
| Line chart | SVG paths drawn via `strokeDashoffset` over 1.7 s, power2.out, 0.2 s stagger, 0.3 s initial delay, repeats with a 1 s gap. |
| Segmented tabs | Outgoing panel slides 5% in the travel direction and fades, incoming enters from the opposite 5%. 0.25 s, power2.inOut. Container height animates with GSAP Flip. |
| Feature cards nav | Left column titles highlight for whichever card has the largest intersection ratio, observed with `rootMargin: 0px 0px -30% 0px`. |

### 3D background, briefly

Not reproducible without the assets. Five artist-made GLB models (ribbon parts, circles, cubes, globe, sound). A `data-scene` attribute on `<html>` picks the scene per page. The home scene: fov 11.1, clear colour `#050003`, base material colour `rgb(0.23, 0, 0.12)` with a hash-noise darkening shader, a path-light shader that pulses bright bands along UV.y at random intervals (the light streak in the recording), 1000 drifting particles at 0.05 opacity, 250 GPU mesh lines, four lights with a slow sine flicker, bloom strength 0.3 threshold 0.43. Mouse parallax moves the camera parent by 0.025 rad per unit with 0.01 easing. The render loop only runs while an element with `data-background-canvas-inview` is on screen.

---

## Part 2. What Aria adopts

Aria's authored moment is already decided: the hero Slack thread. Cerebrium's lesson is not the 3D scene, it is the discipline around it. Everything below is chosen to raise the perceived quality of the whole page without competing with the thread.

### Principles taken from Cerebrium

1. **One readiness gate.** Nothing reveals until fonts and the hero demo are ready, with a 1s ceiling. Then the page reveals as one choreographed event.
2. **One curve, few durations.** Keep DESIGN.md's `cubic-bezier(0.16, 1, 0.3, 1)` as the house ease. Add exactly these durations: 200ms hover, 300ms UI, 800ms reveal, 1000ms rules.
3. **Shared observers, not per-component listeners.** One IntersectionObserver hook and one scroll store. Components read, never subscribe.
4. **CSS for state, JS for sequences.** Hover, focus, in-view: CSS classes. Staggered timelines and loops: framer-motion.
5. **Scroll velocity as an input.** At least one element should respond to how fast the user scrolls, not just where they are.
6. **Every loop pauses out of view** and resets on re-entry.

### Aria motion tokens

Add to `app/globals.css` under `@theme`:

```css
--ease-house:        cubic-bezier(0.16, 1, 0.3, 1);
--ease-io:           cubic-bezier(0.645, 0.045, 0.355, 1);   /* for symmetric moves such as tab slides */
--dur-fast:          200ms;
--dur-ui:            300ms;
--dur-reveal:        800ms;
--dur-rule:          1000ms;
--stagger:           100ms;
```

### Page load

1. `<html>` starts with `is-loading`. Body ground is `ink`. No spinner, no logo loader. A blank ink frame for under a second reads as intentional on a dark page.
2. Set `is-ready` on the earlier of `document.fonts.ready` plus hero demo mount, or 1000ms.
3. On `is-ready`, in this order:
   - Nav: opacity 0 to 1, 300ms.
   - Headline: word-level fade in random order, 100ms per word, 32ms stagger, after a 350ms delay. Keep Cerebrium's single flicker, it is what makes it feel electronic rather than soft. Implement with framer-motion `staggerChildren` and a custom order array, no SplitText needed.
   - Subhead, CTA row, and demo frame: `translateY(40px)` and opacity, 800ms, 100ms apart.
   - Hairline rules: `scaleX(0)` to 1 from the left, 1000ms.
   - Hero thread demo starts playing 600ms after the frame lands.

### Section reveals

Replace the current blur-and-rise in `Reveal.tsx` with two classes:

- `.reveal`: `translateY(40px)`, opacity 0, 800ms house ease. Add `.is-inview` from the shared observer with `rootMargin: 0px 0px -20% 0px`.
- `.reveal-line`: `scaleX(0)` from left, 1000ms.

Section headings get the same word fade as the hero. Section eyebrow labels get the label treatment: 6px square wipes in with `clip-path`, text slides 10px from the right, both 300ms after a 300ms delay.

### Section stacking

Alternate `ink` and `ink-2` bands. Each band after the hero uses `-mt-8 md:-mt-16 rounded-t-card` and sits at a higher z-index than the previous, so it slides over the one before as the user scrolls. The hero demo frame stays `sticky top-0` under it for the height of the hero only. Do not make the whole hero sticky.

### Task marquee

Upgrade `TaskMarquee.tsx` to the rail behaviour: base speed 0.35px per frame, add `|scrollVelocity| * 0.3 * base`, and flip direction with scroll direction. Read velocity from the scroll store. Pause when out of view. This is the cheapest "the page is alive" signal on the list and nobody else in the category does it.

### Buttons and links

- Primary button: background `::before` scales from `(0.9, 0.7)` to 1 on hover, 200ms. No colour change on the label.
- Nav links: same scaled background at 15% white.
- Text scramble on button labels: adopt it, 400ms, only on `pointer: fine`. Write a 40-line hook rather than adding GSAP: swap random characters from a mono glyph set, resolve left to right. Use it on the five primary CTAs only, not on every link.
- List rows (FAQ, pricing features): label 12px right, icon 12px left, 200ms. Divider under the hovered row fades.

### Tabs (Transparency, Pricing)

Outgoing panel: `x: -5%` opacity 0. Incoming: from `x: 5%` to 0. 250ms, `--ease-io`. Animate container height with framer-motion `layout`. Indicator pill moves with `layoutId`.

### In-card loops

Aria already has thread primitives. Give the secondary cards the same loop discipline:

- Any list of steps or log lines: appear at 80ms intervals, hold 3.5s, clear, repeat, only while in view.
- Any bar or progress: duration proportional to value, 250ms to 4000ms range, 4s replay gap.
- Any SVG path: draw with `pathLength` 0 to 1 over 1.7s, 0.2s stagger.

### Pointer effects

Adopt one, not three. The interactive dot grid is the best fit for Aria's "agent working in the background" story: place a 20 by 5 grid behind the How It Works section in `blue` at 60% opacity with `mix-blend-mode: screen`, trail of 45, 2.4s expiry, idle blink of 1 to 5 dots every 0.8 to 1.5s. Skip the custom cursor and the click-and-hold: they belong to a full-screen 3D hero, which Aria does not have.

### Smooth scroll

Add Lenis on desktop only (`smoothWheel` off on touch). It is 4 KB and it is what makes the stacking and the marquee velocity feel continuous. Expose `scroll`, `velocity`, `direction`, `progress` from one store, updated in Lenis's RAF callback.

### Reduced motion

`prefers-reduced-motion: reduce` sets all durations to 0ms, disables Lenis, disables the scramble and dot trail, and shows every loop in its finished state. The hero thread shows its final delivered frame.

### Not adopting

- The Three.js background. It is a bespoke 1.2 MB scene built on artist-made models and a custom post-process chain. Without those assets, any imitation reads as a template. Aria's equivalent signature is the working thread.
- Swup page transitions. Aria is a single page.
- The logo loader. A brand mark bouncing for a second adds nothing on a page that can be ready in under that.

### Build order

1. Tokens, scroll store, Lenis, shared in-view hook.
2. Readiness gate and hero choreography.
3. Section reveals and stacking bands.
4. Marquee velocity coupling.
5. Buttons, scramble hook, tab slides.
6. Dot grid.
7. Reduced-motion audit, then record a Playwright video and compare frame grids against the Cerebrium recording.
