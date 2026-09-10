import gsap from "gsap";
import { reduceMotion } from "./store";

/**
 * <a-accordion> for the FAQ. One item open at a time. Each item is
 * <li><button aria-expanded aria-controls><span class="row-icon"/></button><div id hidden>…</div></li>
 */
class Accordion extends HTMLElement {
  connectedCallback() {
    const buttons = Array.from(this.querySelectorAll<HTMLButtonElement>("button[aria-controls]"));
    const panelFor = (b: HTMLButtonElement) => this.querySelector<HTMLElement>(`#${b.getAttribute("aria-controls")}`);

    const close = (b: HTMLButtonElement) => {
      const p = panelFor(b);
      if (!p) return;
      b.setAttribute("aria-expanded", "false");
      b.closest("li")?.classList.remove("is-open");
      gsap.killTweensOf(p);
      if (reduceMotion()) {
        p.hidden = true;
        return;
      }
      gsap.to(p, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
        onComplete: () => {
          p.hidden = true;
          gsap.set(p, { clearProps: "all" });
        },
      });
    };

    const open = (b: HTMLButtonElement) => {
      const p = panelFor(b);
      if (!p) return;
      b.setAttribute("aria-expanded", "true");
      b.closest("li")?.classList.add("is-open");
      gsap.killTweensOf(p);
      p.hidden = false;
      if (reduceMotion()) return;
      gsap.fromTo(
        p,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.inOut", clearProps: "height" },
      );
    };

    buttons.forEach((b) => {
      const p = panelFor(b);
      if (p) p.hidden = b.getAttribute("aria-expanded") !== "true";
      b.addEventListener("click", () => {
        const isOpen = b.getAttribute("aria-expanded") === "true";
        buttons.forEach((o) => o !== b && o.getAttribute("aria-expanded") === "true" && close(o));
        isOpen ? close(b) : open(b);
      });
    });
  }
}

export function defineAccordion() {
  if (!customElements.get("a-accordion")) customElements.define("a-accordion", Accordion);
}
