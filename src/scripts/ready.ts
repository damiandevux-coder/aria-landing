/**
 * Readiness gate. The page reveals as one event when fonts are loaded and the
 * hero demo island has mounted, or after 1000 ms, whichever comes first.
 * Islands announce themselves with `window.dispatchEvent(new Event("aria:ready"))`.
 */
export const READY_EVENT = "aria:ready";
const CEILING_MS = 1000;

export function initReady(): Promise<void> {
  const html = document.documentElement;
  if (html.classList.contains("is-ready")) return Promise.resolve();

  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      html.classList.remove("is-loading");
      html.classList.add("is-ready");
      resolve();
    };

    const heroReady = new Promise<void>((r) => {
      if ((window as unknown as { __ariaReady?: boolean }).__ariaReady) r();
      else window.addEventListener(READY_EVENT, () => r(), { once: true });
    });
    const fontsReady = "fonts" in document ? document.fonts.ready.then(() => undefined) : Promise.resolve();

    Promise.all([heroReady, fontsReady]).then(finish);
    window.setTimeout(finish, CEILING_MS);
  });
}

export function onReady(cb: () => void) {
  const html = document.documentElement;
  if (html.classList.contains("is-ready")) {
    cb();
    return;
  }
  const mo = new MutationObserver(() => {
    if (html.classList.contains("is-ready")) {
      mo.disconnect();
      cb();
    }
  });
  mo.observe(html, { attributes: true, attributeFilter: ["class"] });
}
