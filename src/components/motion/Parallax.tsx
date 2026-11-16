"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK, onView } from "@/lib/gsap";
import { loadScrollTrigger } from "@/lib/scroll-trigger";
import { cn } from "@/lib/cn";

/**
 * Clips its content and moves the inner layer on scroll for a subtle
 * parallax. The inner layer is oversized so edges never show.
 */
export function Parallax({
  children,
  className,
  amount = 10,
  reveal = false,
}: {
  children: ReactNode;
  className?: string;
  /** percentage of travel */
  amount?: number;
  /** wipe the image in when it enters the viewport */
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>("[data-parallax-inner]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (reveal) {
          const wipe = gsap.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", paused: true });
          onView(el, () => wipe.play());
        }
        if (!inner) return;
        // Place the layer where the scrubbed tween will put it, so nothing jumps when
        // ScrollTrigger arrives (matters for on-screen images such as the home hero).
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = gsap.utils.clamp(0, 1, (vh - r.top) / (vh + r.height));
        gsap.set(inner, { yPercent: -amount / 2 + amount * progress });
        // Scroll-linked movement needs ScrollTrigger — load it only now, and only near the screen.
        let alive = true;
        let tween: gsap.core.Tween | null = null;
        const stop = onView(
          el,
          () => {
            loadScrollTrigger().then(
              contextSafe!(() => {
                if (!alive) return;
                tween = gsap.fromTo(
                  inner,
                  { yPercent: -amount / 2 },
                  {
                    yPercent: amount / 2,
                    ease: "none",
                    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                  },
                );
              }),
            );
          },
          { ahead: 0.5 },
        );
        return () => {
          alive = false;
          stop();
          tween?.scrollTrigger?.kill();
          tween?.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      <div
        data-parallax-inner
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${amount / 2 + 1}%`, bottom: `-${amount / 2 + 1}%` }}
      >
        {children}
      </div>
    </div>
  );
}
