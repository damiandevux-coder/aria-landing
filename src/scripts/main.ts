/**
 * Page motion entry. Order matters: the store and observers exist before any
 * custom element connects, and the readiness gate starts last so islands have
 * had a chance to mount.
 */
import { initScroll } from "./scroll";
import { initReveals } from "./inview";
import { initReady } from "./ready";
import { initNav } from "./nav";
import { defineWords } from "./words";
import { defineScramble } from "./scramble";
import { defineRail } from "./rail";
import { defineDots } from "./dots";
import { defineAccordion } from "./accordion";

initScroll();
initReveals();
initNav();
defineWords();
defineScramble();
defineRail();
defineDots();
defineAccordion();
initReady();
