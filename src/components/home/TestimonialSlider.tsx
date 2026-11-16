"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Phones: the testimonial cards become a swipeable, snapping slider with dots and arrows.
 * From `sm` up it's the normal 3-column grid and the controls are hidden.
 * Each child should be an <li>.
 */
export function TestimonialSlider({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Active slide = the card whose centre is closest to the track's centre.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const li = c as HTMLElement;
          const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid);
          if (d < dist) {
            dist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
    };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const li = el?.children[Math.max(0, Math.min(count - 1, i))] as
      HTMLElement | undefined;
    if (!el || !li) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      left: li.offsetLeft - (el.clientWidth - li.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <>
      <ul
        ref={track}
        aria-label="Client testimonials"
        data-lenis-prevent-touch
        className={cn(
          // Phones: one card centred with the neighbours peeking in at the edges.
          "-mx-[clamp(16px,3vw,44px)] flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[12vw] pb-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>li]:w-[76vw] [&>li]:max-w-[17rem] [&>li]:shrink-0 [&>li]:snap-center",
          // Tablet and up: the original grid.
          "sm:mx-auto sm:grid sm:max-w-none sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:[&>li]:w-auto sm:[&>li]:max-w-none lg:max-w-3xl lg:gap-8",
        )}
      >
        {children}
      </ul>

      <div className="mt-8 flex items-center justify-center gap-5 sm:hidden">
        <SlideButton
          label="Previous testimonial"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        >
          <ArrowLeft className="size-4" />
        </SlideButton>
        <div className="flex gap-2">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${count}`}
              aria-current={i === active || undefined}
              onClick={() => goTo(i)}
              className="grid size-6 place-items-center"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-300",
                  i === active ? "w-6 bg-paper" : "w-2 bg-paper/35",
                )}
              />
            </button>
          ))}
        </div>
        <SlideButton
          label="Next testimonial"
          disabled={active === count - 1}
          onClick={() => goTo(active + 1)}
        >
          <ArrowRight className="size-4" />
        </SlideButton>
      </div>
    </>
  );
}

function SlideButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full ring-1 ring-paper/40 transition-colors hover:bg-paper hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-paper"
    >
      {children}
    </button>
  );
}
