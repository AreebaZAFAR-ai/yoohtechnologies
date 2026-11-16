"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, onView } from "@/lib/gsap";

type Principle = { title: string; text: string };

/**
 * Principles as a pipeline: a simple line (horizontal on desktop, vertical on mobile)
 * with one node per principle sitting on it.
 * On scroll the line draws left to right and each node pops in as the line reaches it.
 */
export function PrinciplesPipeline({ items }: { items: readonly Principle[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const fill = 1.4;
        const tl = gsap.timeline({ paused: true });
        tl.from("[data-pipe]", {
          [isDesktop ? "scaleX" : "scaleY"]: 0,
          transformOrigin: isDesktop ? "left center" : "center top",
          duration: fill,
          ease: "power2.inOut",
        });
        const n = items.length;
        gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((stage, i) => {
          const at = (i / Math.max(n - 1, 1)) * (fill - 0.2);
          tl.from(stage.querySelector("[data-node]"), { scale: 0, duration: 0.5, ease: "back.out(2.5)" }, at);
          tl.from(stage.querySelector("[data-copy]"), { y: 20, autoAlpha: 0, duration: 0.7 }, at + 0.1);
        });
        return onView(ref.current!, () => tl.play(), { at: 0.8 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative grid lg:grid-cols-4">
      {/* The pipe: a simple line joining the nodes */}
      <span
        aria-hidden
        data-pipe
        className="absolute bottom-6 left-[22px] top-6 w-0.5 bg-paper/50 lg:bottom-auto lg:left-6 lg:right-6 lg:top-[22px] lg:h-0.5 lg:w-auto"
      />

      {items.map((p, i) => (
        <li
          key={p.title}
          data-stage
          className="relative grid grid-cols-[46px_1fr] gap-x-5 pb-7 last:pb-0 lg:block lg:pb-0 lg:pr-6"
        >
          <span
            data-node
            className="display relative z-10 grid size-[46px] place-items-center rounded-full bg-paper text-lg text-ink ring-1 ring-ink"
          >
            0{i + 1}
          </span>
          <div data-copy className="pt-2 lg:pt-5">
            <h3 className="heading text-h3 leading-tight">
              {p.title}
            </h3>
            <p className="mt-2 max-w-[17rem] text-small leading-relaxed text-paper/75">{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
