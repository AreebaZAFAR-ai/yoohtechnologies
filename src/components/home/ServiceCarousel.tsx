"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/cn";
import { ArrowShift } from "@/components/ui/Button";
import { gsap, useGSAP, MOTION_OK, onView } from "@/lib/gsap";
import { COPIES, useDriftLoop } from "@/components/motion/useDriftLoop";

type Card = Pick<
  Service,
  "slug" | "number" | "title" | "summary" | "cardSummary" | "highlights" | "image" | "card"
>;


/**
 * Infinite service carousel that drifts continuously from left to right.
 * It keeps moving on hover and click; arrows push it along without stopping it.
 * Rests only off-screen, in a hidden tab, during a manual swipe, and never moves for reduced motion.
 */
export function ServiceCarousel({ services }: { services: Card[] }) {
  const root = useRef<HTMLDivElement>(null);
  const { track, nudge, pausedUntil } = useDriftLoop(services.length);

  // Entrance: when the section scrolls into view, the cards slide in from the left, one after another.
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = el.querySelectorAll<HTMLElement>("[data-card]");
        const nav = el.querySelectorAll<HTMLElement>("[data-nav]");
        const tl = gsap.timeline({
          paused: true,
          onStart: () => {
            // Hold autoplay until the entrance has finished.
            pausedUntil.current = Date.now() + tl.duration() * 1000 + 500;
          },
        });
        // Gentle ease (expo starts with a sharp jolt); shorter travel on narrow screens.
        const dist = Math.min(120, window.innerWidth * 0.18);
        tl.from(cards, { x: -dist, autoAlpha: 0, duration: 1.1, stagger: 0.1, ease: "power3.out", force3D: true });
        tl.from(nav, { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=0.8");
        return onView(el, () => tl.play(), { at: 0.8 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const loop = Array.from({ length: COPIES }, (_, copy) => services.map((s) => ({ s, copy }))).flat();

  return (
    <div ref={root}>
      <div
        ref={track}
        className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scroll-padding-inline:clamp(16px,3vw,44px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul aria-label="Services" className="flex w-max gap-5 px-[clamp(16px,3vw,44px)] pb-2 md:gap-6">
          {loop.map(({ s, copy }) => {
            // A dedicated `card` image is a wide title banner: show it whole on paper.
            const img = s.card ?? s.image;
            const banner = Boolean(s.card);
            const clone = copy !== 1; // outer copies exist only for the seamless loop
            return (
              <li
                key={`${copy}-${s.slug}`}
                data-card={clone ? undefined : ""}
                aria-hidden={clone || undefined}
                className="flex w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[clamp(280px,26vw,400px)]"
              >
                {/* Whole card is the link: hover lifts it and slides the "Learn more" arrow. */}
                <Link
                  href={`/services/${s.slug}`}
                  tabIndex={clone ? -1 : undefined} // clones stay clickable, just not tabbable
                  className="group flex w-full flex-col overflow-hidden rounded-xl bg-paper text-ink transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1.5"
                >
                  {/* No texture overlay here: it would darken the card and frame the banner's own paper. */}
                  <div className={cn("relative aspect-[9/4] overflow-hidden", banner ? "bg-paper" : "bg-ink")}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 26vw, (min-width: 640px) 44vw, 78vw"
                      className={cn(
                        "transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105",
                        banner ? "object-contain px-4" : "object-cover",
                      )}
                    />
                  </div>

                  <div className="flex flex-1 flex-col border-t border-ink/10 p-5 md:p-6">
                    <span className="label text-green/70">{s.number}</span>
                    <h3 className="heading mt-2 text-h3 leading-tight text-green">{s.title}</h3>
                    <p className="mt-3 text-small leading-relaxed text-ink/75">{s.cardSummary ?? s.summary}</p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-small text-ink/70">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span aria-hidden className="text-ink/35">—</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <span className="ui mt-auto flex items-center gap-3 pt-5 text-btn text-ink transition-colors duration-300 group-hover:text-green">
                      Learn more
                      <ArrowShift />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10 flex justify-center gap-3">
        <NavButton label="Previous services" onClick={() => nudge(-1)}>
          <ArrowLeft className="size-5" />
        </NavButton>
        <NavButton label="Next services" onClick={() => nudge(1)}>
          <ArrowRight className="size-5" />
        </NavButton>
      </div>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-nav
      aria-label={label}
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        "grid size-14 place-items-center rounded-full border border-paper/50 text-paper transition-colors duration-300",
        "hover:border-paper hover:bg-paper hover:text-green",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      {children}
    </button>
  );
}
