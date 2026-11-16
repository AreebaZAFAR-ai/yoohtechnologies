"use client";

import { gsap } from "@/lib/gsap";

type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
let loading: Promise<ST> | null = null;

/**
 * Loads and registers ScrollTrigger on first use, so pages without scrubbed
 * (scroll-linked) animations never download or initialise it.
 */
export function loadScrollTrigger(): Promise<ST> {
  loading ??= import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  });
  return loading;
}

/** Re-measure scrubbed triggers (e.g. after navigation) — a no-op if ScrollTrigger was never loaded. */
export function refreshScrollTrigger() {
  loading?.then((ST) => ST.refresh());
}
