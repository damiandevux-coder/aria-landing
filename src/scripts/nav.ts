import gsap from "gsap";
import { reduceMotion } from "./store";

/** Mobile menu toggle. The scrolled state is set by scroll.ts on <html>. */
export function initNav() {
  const html = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-nav-menu]");
  if (!toggle || !menu) return;

  const iconOpen = toggle.querySelector<HTMLElement>("[data-icon-open]");
  const iconClose = toggle.querySelector<HTMLElement>("[data-icon-close]");
  let open = false;

  const setOpen = (next: boolean) => {
    open = next;
    html.classList.toggle("has-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (iconOpen) iconOpen.hidden = open;
    if (iconClose) iconClose.hidden = !open;
    gsap.killTweensOf(menu);
    if (reduceMotion()) {
      menu.hidden = !open;
      return;
    }
    if (open) {
      menu.hidden = false;
      gsap.fromTo(
        menu,
        { height: 0, autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.3, ease: "power3.inOut", clearProps: "height" },
      );
    } else {
      gsap.to(menu, {
        height: 0,
        autoAlpha: 0,
        duration: 0.25,
        ease: "power3.inOut",
        onComplete: () => {
          menu.hidden = true;
          gsap.set(menu, { clearProps: "height,opacity,visibility" });
        },
      });
    }
  };

  toggle.addEventListener("click", () => setOpen(!open));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) setOpen(false);
  });
}
