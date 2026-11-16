"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, onView } from "@/lib/gsap";
import { stats } from "@/lib/site";

/**
 * Stat bar under the hero. Final numbers are server-rendered (readable without JS);
 * when motion is allowed they count up from 0 the first time the bar scrolls into view.
 */
export function StatsBar() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const nums = gsap.utils.toArray<HTMLElement>("[data-count]", root.current);
        const tweens = nums.map((el) => {
          const end = Number(el.dataset.count);
          const counter = { v: 0 };
          el.textContent = "0";
          return gsap.to(counter, {
            v: end,
            duration: 2,
            ease: "power2.out",
            paused: true,
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
          });
        });
        const stop = onView(root.current!, () => tweens.forEach((t) => t.play()));
        // Reduced-motion / cleanup: restore the final values.
        return () => {
          stop();
          nums.forEach((el) => (el.textContent = el.dataset.count ?? ""));
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-theme="paper"
      aria-label="YOOH Technologies in numbers"
      className="tex-paper relative bg-paper py-16 text-ink md:py-24"
    >
      <dl className="container-x grid grid-cols-2 gap-x-6 gap-y-12 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <dt className="order-2 mt-3 text-lead text-ink/70">{s.label}</dt>
            <dd className="heading order-1 text-[clamp(3rem,2rem+5vw,6.5rem)] font-normal leading-none tracking-tight text-green tabular-nums">
              <span data-count={s.value}>{s.value}</span>
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
