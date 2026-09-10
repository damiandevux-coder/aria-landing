import { observe, unobserve } from "./inview";
import { finePointer, reduceMotion } from "./store";

/**
 * <a-dots> is a grid of cells that light up in a trail behind the pointer
 * and blink at random when idle. Numbers from MOTION.md.
 */
const DESKTOP = { cols: 30, count: 90 };
const MOBILE = { cols: 10, count: 30 };
const TRAIL_MAX = 45;
const TRAIL_TTL = 2400;
const IDLE_AFTER = 1800;
const IDLE_MIN = 800;
const IDLE_MAX = 1500;

const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

class Dots extends HTMLElement {
  private cfg = { cols: 0, count: 0 };
  private queue: HTMLElement[] = [];
  private timers = new Set<number>();
  private idleTimeout = 0;
  private idleTick = 0;
  private idle = true;

  connectedCallback() {
    this.layout();
    window.addEventListener("resize", this.layout, { passive: true });
    if (reduceMotion()) return;
    if (finePointer()) window.addEventListener("pointermove", this.onMove, { passive: true });
    observe(this, (_, inView) => {
      if (inView) this.scheduleIdle();
      else this.stopAll();
    });
  }

  disconnectedCallback() {
    this.stopAll();
    unobserve(this);
    window.removeEventListener("resize", this.layout);
    window.removeEventListener("pointermove", this.onMove);
  }

  private get dots() {
    return Array.from(this.querySelectorAll<HTMLElement>(".dot"));
  }

  private layout = () => {
    const cfg = window.innerWidth < 700 ? MOBILE : DESKTOP;
    if (cfg.cols === this.cfg.cols) return;
    this.cfg = cfg;
    this.style.setProperty("--cols", String(cfg.cols));
    const have = this.dots.length;
    for (let i = have; i < cfg.count; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      this.appendChild(d);
    }
    for (let i = have - 1; i >= cfg.count; i--) this.dots[i]?.remove();
  };

  private onMove = (e: PointerEvent) => {
    const r = this.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
    this.scheduleIdle();
    const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>(".dot");
    if (!hit || !this.contains(hit) || this.queue[this.queue.length - 1] === hit) return;
    while (this.queue.length >= TRAIL_MAX) this.queue.shift()?.classList.remove("is-active", "is-trail");
    this.queue.push(hit);
    hit.classList.add("is-active", "is-trail");
    const t = window.setTimeout(() => {
      this.timers.delete(t);
      const i = this.queue.indexOf(hit);
      if (i !== -1) this.queue.splice(i, 1);
      hit.classList.remove("is-active", "is-trail");
    }, TRAIL_TTL);
    this.timers.add(t);
  };

  private scheduleIdle() {
    this.idle = false;
    window.clearTimeout(this.idleTimeout);
    window.clearTimeout(this.idleTick);
    this.idleTimeout = window.setTimeout(() => {
      this.idle = true;
      this.blink();
    }, IDLE_AFTER);
  }

  private blink() {
    if (!this.idle || !this.isConnected) return;
    const dots = this.dots;
    dots.forEach((d) => {
      if (!d.classList.contains("is-trail")) d.classList.remove("is-active");
    });
    const n = Math.min(rand(1, 5), dots.length);
    for (let i = 0; i < n; i++) dots[rand(0, dots.length - 1)]?.classList.add("is-active");
    this.idleTick = window.setTimeout(() => this.blink(), rand(IDLE_MIN, IDLE_MAX));
  }

  private stopAll() {
    this.idle = false;
    window.clearTimeout(this.idleTimeout);
    window.clearTimeout(this.idleTick);
    this.timers.forEach((t) => window.clearTimeout(t));
    this.timers.clear();
    this.queue = [];
    this.dots.forEach((d) => d.classList.remove("is-active", "is-trail"));
  }
}

export function defineDots() {
  if (!customElements.get("a-dots")) customElements.define("a-dots", Dots);
}
