import type Lenis from "lenis";

/** Tiny shared handle so any component can pause/resume smooth scroll. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;
