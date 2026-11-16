"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, useGSAP, MOTION_OK, onView } from "@/lib/gsap";

if (typeof window !== "undefined") gsap.registerPlugin(SplitText);

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Split into lines (default) or characters. */
  type?: "lines" | "chars";
  delay?: number;
  stagger?: number;
  /** Animate immediately on mount instead of when scrolled into view. */
  immediate?: boolean;
  id?: string;
};

/**
 * Masked headline reveal using GSAP SplitText. Lines/characters slide up
 * from behind a clip mask. Fully static when reduced motion is requested.
 *
 * Performance: below-the-fold headings are only split when they come within half a
 * viewport of the screen, so page load doesn't pay for splitting every heading at once.
 */
export function RevealText({
  as: Tag = "h2",
  children,
  className,
  type = "lines",
  delay = 0,
  stagger,
  immediate = false,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let split: SplitText | null = null;
        let played = immediate;
        let anim: gsap.core.Tween | null = null;
        const cleanups: Array<() => void> = [];

        const prepare = () => {
          if (split) return;
          gsap.set(el, { opacity: 1 });
          // innerText respects <br>, so the accessible name keeps word breaks.
          el.setAttribute("aria-label", el.innerText.replace(/\s+/g, " ").trim());
          split = SplitText.create(el, {
            type: type === "chars" ? "lines,chars" : "lines",
            linesClass: "split-line",
            mask: "lines",
            aria: "hidden",
            autoSplit: true,
            // Re-runs after font loads / resizes; SplitText carries progress over.
            onSplit(self) {
              const targets = type === "chars" ? self.chars : self.lines;
              anim = gsap.from(targets, {
                yPercent: 115,
                rotate: type === "chars" ? 4 : 0,
                duration: 1.25,
                delay,
                stagger: stagger ?? (type === "chars" ? 0.028 : 0.1),
                paused: !played,
              });
              return anim;
            },
          });
        };

        if (immediate) {
          prepare();
        } else {
          cleanups.push(onView(el, prepare, { ahead: 0.5 }));
          cleanups.push(
            onView(
              el,
              () => {
                played = true;
                if (!split) prepare();
                anim?.play();
              },
              { at: 0.88 },
            ),
          );
        }

        return () => {
          cleanups.forEach((c) => c());
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-hero-hide={immediate ? "" : undefined}>
      {children}
    </Tag>
  );
}
