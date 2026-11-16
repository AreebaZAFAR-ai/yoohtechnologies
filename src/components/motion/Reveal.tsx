"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK, onView } from "@/lib/gsap";

/**
 * Fades/slides children marked with `data-reveal` (or the wrapper itself)
 * into view on scroll. Also draws `[data-line]` rules and spins `[data-mark]`.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  y = 48,
  stagger = 0.08,
  at = 0.85,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  /** Viewport fraction where the element's top triggers the reveal (0.85 = "top 85%"). */
  at?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
        const targets = items.length ? Array.from(items) : [el];
        // Paused timeline: `from` renders the hidden state now, plays when scrolled into view.
        const tl = gsap.timeline({ paused: true });
        tl.from(targets, { y, autoAlpha: 0, duration: 1.1, stagger });

        const lines = el.querySelectorAll("[data-line]");
        if (lines.length)
          tl.from(
            lines,
            { scaleX: 0, transformOrigin: "left center", duration: 1.4, stagger: 0.1 },
            0,
          );

        const marks = el.querySelectorAll("[data-mark]");
        if (marks.length)
          tl.from(marks, { rotate: -90, scale: 0, duration: 1.2, stagger: 0.06 }, 0.1);

        return onView(el, () => tl.play(), { at });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
