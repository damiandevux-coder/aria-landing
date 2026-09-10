import { finePointer, reduceMotion } from "./store";

/**
 * <a-scramble> scrambles its text on hover of the nearest link or button and
 * resolves left to right. 400 ms, fine pointers only, monospace-safe glyphs.
 */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=-";
const DURATION = 400;

class Scramble extends HTMLElement {
  private original = "";
  private raf = 0;
  private host: HTMLElement | null = null;

  connectedCallback() {
    this.original = (this.textContent ?? "").trim();
    this.textContent = this.original;
    if (!finePointer() || reduceMotion()) return;
    // Hold the resolved width so the layout never jumps mid-scramble.
    this.style.minWidth = `${Math.ceil(this.getBoundingClientRect().width)}px`;
    this.host = this.closest("a, button") ?? this;
    this.host.addEventListener("pointerenter", this.play);
    this.host.addEventListener("pointerleave", this.stop);
  }

  disconnectedCallback() {
    this.host?.removeEventListener("pointerenter", this.play);
    this.host?.removeEventListener("pointerleave", this.stop);
    cancelAnimationFrame(this.raf);
  }

  private play = () => {
    cancelAnimationFrame(this.raf);
    const text = this.dataset.hover ?? this.original;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const resolved = Math.floor(t * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i < resolved) out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      this.textContent = out;
      if (t < 1) this.raf = requestAnimationFrame(tick);
      else this.textContent = text;
    };
    this.raf = requestAnimationFrame(tick);
  };

  private stop = () => {
    cancelAnimationFrame(this.raf);
    this.textContent = this.original;
  };
}

export function defineScramble() {
  if (!customElements.get("a-scramble")) customElements.define("a-scramble", Scramble);
}
