"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/*
 * Core GSAP only. ScrollTrigger is NOT registered here: one-shot "reveal on scroll"
 * effects use IntersectionObserver via `onView` (no layout measuring on load or scroll),
 * and the few scrubbed effects load ScrollTrigger on demand (see lib/scroll-trigger.ts).
 * SplitText is imported only by RevealText.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  gsap.config({ nullTargetWarn: false });
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Run `cb` once when `el`'s top edge reaches `at` (0–1) of the viewport height —
 * the equivalent of a ScrollTrigger `start: "top <at*100>%"` with `once: true`.
 * Elements that are already past that line (e.g. after a reload mid-page) fire at once.
 * `ahead` adds extra margin below the viewport, to prepare work before the element shows.
 * Returns a cleanup function.
 */
export function onView(el: Element, cb: () => void, { at = 0.85, ahead = 0 } = {}) {
  const bottom = Math.round((ahead > 0 ? ahead : at - 1) * 100);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        // Intersecting, or already scrolled above the trigger line.
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          io.disconnect();
          cb();
          return;
        }
      }
    },
    { rootMargin: `0px 0px ${bottom}% 0px` },
  );
  io.observe(el);
  return () => io.disconnect();
}

export { gsap, useGSAP };
