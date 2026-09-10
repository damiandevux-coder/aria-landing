/**
 * Shared IntersectionObserver manager. One observer per distinct option set,
 * many elements each. Callbacks receive (entry, isIntersecting).
 */
type Callback = (entry: IntersectionObserverEntry, inView: boolean) => void;
type Options = { rootMargin?: string; threshold?: number | number[]; once?: boolean };

const observers = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, { cb: Callback; once: boolean; key: string }>();

function keyFor(o: Options) {
  return `${o.rootMargin ?? "0px"}|${Array.isArray(o.threshold) ? o.threshold.join(",") : (o.threshold ?? 0)}`;
}

function getObserver(o: Options) {
  const key = keyFor(o);
  let io = observers.get(key);
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rec = callbacks.get(entry.target);
          if (!rec) continue;
          rec.cb(entry, entry.isIntersecting);
          if (rec.once && entry.isIntersecting) unobserve(entry.target);
        }
      },
      { rootMargin: o.rootMargin ?? "0px", threshold: o.threshold ?? 0 },
    );
    observers.set(key, io);
  }
  return { io, key };
}

export function observe(el: Element, cb: Callback, options: Options = {}) {
  const { io, key } = getObserver(options);
  callbacks.set(el, { cb, once: !!options.once, key });
  io.observe(el);
}

export function unobserve(el: Element) {
  const rec = callbacks.get(el);
  if (!rec) return;
  observers.get(rec.key)?.unobserve(el);
  callbacks.delete(el);
}

/** Marks [data-reveal] elements with .is-inview once. CSS does the rest. */
export function initReveals(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
  els.forEach((el) => {
    observe(
      el,
      (_, inView) => {
        if (inView) el.classList.add("is-inview");
      },
      { rootMargin: "0px 0px -10% 0px", once: true },
    );
  });
}
