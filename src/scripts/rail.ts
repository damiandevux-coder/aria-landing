import gsap from "gsap";
import { observe, unobserve } from "./inview";
import { reduceMotion, scrollStore } from "./store";

/**
 * <a-rail> is a marquee that couples to scroll. Base speed 0.35px per frame,
 * scroll velocity adds to it, and scroll direction flips the travel direction.
 * The pattern is cloned until it covers the viewport plus one repeat.
 */
const BASE = 0.35;

class Rail extends HTMLElement {
  private track: HTMLElement | null = null;
  private pattern: HTMLElement | null = null;
  private x = 0;
  private playing = false;
  private repeats = 0;
  private travel = 1;
  private base = BASE;

  connectedCallback() {
    this.track = this.querySelector<HTMLElement>(".rail-track");
    this.pattern = this.querySelector<HTMLElement>(".rail-pattern");
    if (!this.track || !this.pattern) return;
    this.travel = Number(this.dataset.direction) || 1;
    this.base = Number(this.dataset.velocity) || BASE;
    this.fill();
    window.addEventListener("resize", this.fill, { passive: true });
    if (reduceMotion()) return;
    observe(this, (_, inView) => (inView ? this.start() : this.stop()));
  }

  disconnectedCallback() {
    this.stop();
    unobserve(this);
    window.removeEventListener("resize", this.fill);
  }

  private fill = () => {
    if (!this.track || !this.pattern) return;
    const width = this.pattern.offsetWidth || 1;
    const needed = Math.ceil(window.innerWidth / width) + 1;
    if (needed === this.repeats) return;
    this.repeats = needed;
    this.track.querySelectorAll("[data-clone]").forEach((n) => n.remove());
    for (let i = 0; i < needed; i++) {
      const clone = this.pattern.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-clone", "");
      clone.setAttribute("aria-hidden", "true");
      this.track.appendChild(clone);
    }
    this.x = this.travel === 1 ? -width : 0;
  };

  private tick = () => {
    if (!this.track || !this.pattern) return;
    const width = this.pattern.offsetWidth;
    const { velocity, direction } = scrollStore.get();
    const scrollDir = direction === 0 ? 1 : direction;
    const speed = this.base + Math.abs(velocity) * 0.3 * this.base;
    this.x += speed * this.travel * scrollDir;
    if (this.x <= -width) this.x += width;
    else if (this.x >= 0) this.x -= width;
    this.track.style.transform = `translate3d(${this.x}px,0,0)`;
  };

  private start() {
    if (this.playing) return;
    this.playing = true;
    gsap.ticker.add(this.tick);
  }

  private stop() {
    if (!this.playing) return;
    this.playing = false;
    gsap.ticker.remove(this.tick);
  }
}

export function defineRail() {
  if (!customElements.get("a-rail")) customElements.define("a-rail", Rail);
}
