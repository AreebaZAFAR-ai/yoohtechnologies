"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { refreshScrollTrigger } from "@/lib/scroll-trigger";
import { getLenis, setLenis } from "@/lib/lenis";

/**
 * Lenis smooth scrolling. Lenis drives the real window scroll, so ScrollTrigger (when a page
 * loads it) follows via native scroll events — no GSAP needed here.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -80 }, autoRaf: true });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Reset scroll on navigation (or jump to hash target), then re-measure.
  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target) {
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -80, immediate: true, force: true });
        else (target as HTMLElement).scrollIntoView();
      });
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    const id = window.setTimeout(refreshScrollTrigger, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
