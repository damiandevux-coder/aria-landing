import gsap from "gsap";
import { observe, unobserve } from "./inview";
import { onReady } from "./ready";
import { reduceMotion } from "./store";

/**
 * <a-words> splits the heading inside it into word spans and fades them in
 * in random order once the page is ready and the element is in view, then
 * blinks the whole line once. Numbers from MOTION.md.
 */
const DELAY = 0.35;
const WORD_DUR = 0.1;
const STAGGER = 0.032;
const FLICKER = 0.06;

function splitWords(root: HTMLElement): HTMLSpanElement[] {
  const out: HTMLSpanElement[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text.trim()) return;
      const frag = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.className = "word";
          span.textContent = part;
          frag.appendChild(span);
          out.push(span);
        }
      }
      node.parentNode?.replaceChild(frag, node);
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if ((node as Element).tagName === "BR") return;
      Array.from(node.childNodes).forEach(walk);
    }
  };
  walk(root);
  return out;
}

class Words extends HTMLElement {
  private words: HTMLSpanElement[] = [];
  private started = false;
  private inView = false;
  private ready = false;

  connectedCallback() {
    if (reduceMotion()) return;
    const target = this.querySelector<HTMLElement>("h1, h2, h3, p") ?? this;
    const label = target.textContent?.trim() ?? "";
    this.words = splitWords(target);
    if (!this.words.length) return;
    target.setAttribute("aria-label", label);
    this.words.forEach((w) => w.setAttribute("aria-hidden", "true"));
    this.classList.add("is-split");

    onReady(() => {
      this.ready = true;
      this.tryStart();
    });
    observe(
      this,
      (_, inView) => {
        this.inView = inView;
        this.tryStart();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
  }

  disconnectedCallback() {
    unobserve(this);
    gsap.killTweensOf(this.words);
  }

  private tryStart() {
    if (this.started || !this.ready || !this.inView) return;
    this.started = true;
    unobserve(this);
    gsap
      .timeline({ delay: DELAY, onComplete: () => this.classList.add("is-done") })
      .to(this.words, {
        opacity: 1,
        duration: WORD_DUR,
        stagger: { each: STAGGER, from: "random" },
        ease: "power2.out",
      })
      .to(this.words, { opacity: 0.1, duration: FLICKER / 2, ease: "power1.in" }, "+=0.02")
      .to(this.words, { opacity: 1, duration: FLICKER / 2, ease: "power1.out" });
  }
}

export function defineWords() {
  if (!customElements.get("a-words")) customElements.define("a-words", Words);
}
