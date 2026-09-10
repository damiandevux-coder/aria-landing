/**
 * One scroll store for the whole page. Lenis writes to it on every frame;
 * everything else reads from it. Components never attach their own scroll
 * listeners.
 */
export type ScrollState = {
  scroll: number;
  limit: number;
  velocity: number;
  direction: -1 | 0 | 1;
  progress: number;
};

type Listener = (s: ScrollState) => void;

const state: ScrollState = { scroll: 0, limit: 1, velocity: 0, direction: 0, progress: 0 };
const listeners = new Set<Listener>();

export const scrollStore = {
  get: () => state,
  set(next: Partial<ScrollState>) {
    Object.assign(state, next);
    for (const l of listeners) l(state);
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export const reduceMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;
