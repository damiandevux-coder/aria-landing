import Lenis from "lenis";
import gsap from "gsap";
import { scrollStore, reduceMotion, finePointer } from "./store";

/**
 * Smooth scroll on desktop only. Touch devices keep native scrolling; the
 * store is still updated from a plain scroll listener so velocity-driven
 * components keep working there.
 */
export function initScroll() {
  const html = document.documentElement;
  const smooth = finePointer() && !reduceMotion();

  const applyHeaderState = (scroll: number) => {
    html.classList.toggle("is-scrolled", scroll > 24);
  };

  if (!smooth) {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollStore.set({
        scroll: y,
        limit,
        velocity: y - last,
        direction: y > last ? 1 : y < last ? -1 : 0,
        progress: y / limit,
      });
      applyHeaderState(y);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return null;
  }

  const lenis = new Lenis({
    smoothWheel: true,
    anchors: true,
    lerp: 0.1,
  });

  lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
    scrollStore.set({ scroll, limit, velocity, direction, progress });
    applyHeaderState(scroll);
  });

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
