"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Page transition. Skipped on the very first load (so content is never
 * hidden behind JS), then plays a green/paper panel wipe on every client-side
 * navigation.
 */
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  const overlay = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    hasNavigated = true;
    if (!animate || !overlay.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = overlay.current.querySelectorAll("[data-panel]");
    const tl = gsap.timeline({
      onComplete: () => {
        if (overlay.current) overlay.current.style.display = "none";
      },
    });
    if (reduce) {
      tl.set(overlay.current, { autoAlpha: 0 });
    } else {
      tl.to(panels, {
        yPercent: -100,
        duration: 0.95,
        ease: "expo.inOut",
        stagger: { each: 0.09, from: "end" },
      }).from(
        content.current,
        { y: 60, duration: 1.1, ease: "expo.out", clearProps: "transform" },
        0.35,
      );
    }
    return () => {
      tl.kill();
    };
  }, [animate]);

  return (
    <>
      {animate && (
        <div ref={overlay} aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
          <div data-panel className="tex-paper absolute inset-0 bg-paper" />
          <div data-panel className="tex-felt absolute inset-0 flex items-center justify-center bg-green">
            <span className="display text-[18vw] text-lime">YOOH</span>
          </div>
        </div>
      )}
      <div ref={content}>{children}</div>
    </>
  );
}
