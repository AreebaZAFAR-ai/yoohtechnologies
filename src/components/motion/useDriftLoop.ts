"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Infinite carousel that drifts continuously from left to right (content moves right).
 *
 * Markup: attach `track` to the horizontal scroller, whose FIRST child is the list of
 * items. Render the items COPIES (3) times; the middle copy is the real one and the outer
 * copies let the loop wrap invisibly. Keeps moving on hover and click; arrows (`nudge`)
 * push it along without stopping it. Rests only off-screen, in a hidden tab, during a
 * manual swipe, and never moves for reduced motion.
 *
 * Smoothness: browsers round `scrollLeft` to whole pixels, so a slow drift on a 90/120 Hz
 * screen would move 1px, 0px, 1px… and judder. The drift therefore scrolls by whole pixels
 * and slides the list by the leftover fraction with a GPU transform. Speed also eases in
 * whenever the drift (re)starts, instead of jumping from rest to full speed.
 *
 * `pausedUntil` lets a caller hold the drift (e.g. until an entrance animation finishes).
 */
export const COPIES = 3;

export function useDriftLoop(n: number, speed = 60) {
  const DRIFT_PX_PER_S = speed;
  const track = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const pausedUntil = useRef(0);
  /** Distance still to travel from arrow clicks, eased in on top of the drift. */
  const pending = useRef(0);
  /** Set when something other than the drift moved the scroller, so it re-reads the position. */
  const resync = useRef(true);
  /** Cached width of one full set of items (measured on mount and resize, not per frame). */
  const width = useRef(0);

  const items = useCallback(() => track.current?.firstElementChild?.children, []);

  /** Width of one full set of cards (distance between copy 0 and copy 1). */
  const measure = useCallback(() => {
    const list = items();
    if (!list || list.length < n * 2) return (width.current = 0);
    return (width.current = (list[n] as HTMLElement).offsetLeft - (list[0] as HTMLElement).offsetLeft);
  }, [n, items]);

  /** If we've moved into an outer copy, jump (instantly, invisibly) back to the middle one. */
  const recenter = useCallback(() => {
    const el = track.current;
    const w = width.current || measure();
    if (!el || !w) return;
    if (el.scrollLeft < w * 0.5) el.scrollLeft += w;
    else if (el.scrollLeft > w * 1.5) el.scrollLeft -= w;
    else return;
    resync.current = true;
  }, [measure]);

  // Start on the middle copy; keep position sensible when card sizes change.
  useEffect(() => {
    const el = track.current;
    const list = el?.firstElementChild;
    if (!el || !list) return;
    el.scrollLeft = measure();
    resync.current = true;
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) return void (first = false); // initial callback: already placed above
      const old = width.current;
      const w = measure();
      if (w && old) el.scrollLeft = w + ((el.scrollLeft % old) / old) * w;
      resync.current = true;
    });
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  // Wrap once a manual scroll settles (scrollend where supported, debounce elsewhere).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(recenter, 160);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", recenter);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", recenter);
    };
  }, [recenter]);

  /** Width of one card plus the gap: one arrow click moves this far. */
  const stepSize = useCallback(() => {
    const el = track.current;
    const list = el?.firstElementChild;
    if (!el || !list) return 0;
    const card = list.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    return card ? card.offsetWidth + gap : el.clientWidth * 0.8;
  }, []);

  /** Arrows: with motion, add to the drift (it never stops); without, scroll one card. */
  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollBy({ left: dir * stepSize(), behavior: "smooth" });
      return;
    }
    pending.current += dir * stepSize();
  };

  // Autoplay: a slow, continuous drift from left to right (content moves right) that never
  // stops for hover, clicks or page scrolling. Only an active finger drag or a sideways
  // trackpad swipe takes over briefly, so the visitor can still browse by hand.
  useEffect(() => {
    const el = track.current;
    const list = el?.firstElementChild as HTMLElement | null | undefined;
    if (!el || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Snapping would fight the per-frame scroll updates.
    el.style.scrollSnapType = "none";
    list.style.willChange = "transform";

    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0 });
    io.observe(el);

    let dragging = false;
    const onTouchStart = () => {
      dragging = true;
      clearFraction();
    };
    const onTouchEnd = () => {
      dragging = false;
      pausedUntil.current = Math.max(pausedUntil.current, Date.now() + 600); // let momentum settle
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        pausedUntil.current = Date.now() + 600;
        clearFraction();
      }
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft; // exact (fractional) position
    let vel = 0; // current drift speed, eased towards DRIFT_PX_PER_S
    let frac = 0; // sub-pixel part currently applied as a transform

    function clearFraction() {
      if (frac !== 0) {
        frac = 0;
        list!.style.transform = "";
      }
      resync.current = true;
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64); // avoid a jump after a background tab
      last = now;
      const running = visible.current && !document.hidden && !dragging && Date.now() >= pausedUntil.current;

      if (running) {
        if (resync.current) {
          pos = el.scrollLeft + frac; // something else moved it (swipe, resize, recenter)
          resync.current = false;
        }
        // Ease the speed in (~0.8s to full speed) rather than starting abruptly.
        vel += (DRIFT_PX_PER_S - vel) * (1 - Math.exp(-dt / 280));
        // Ease any arrow nudge in on top of the steady drift.
        const take = pending.current * (1 - Math.exp(-dt / 140));
        pending.current -= take;
        pos += take - (vel * dt) / 1000;

        const w = width.current;
        if (w) {
          if (pos < w * 0.5) pos += w;
          else if (pos > w * 1.5) pos -= w;
        }
        const whole = Math.floor(pos);
        if (el.scrollLeft !== whole) el.scrollLeft = whole;
        const f = pos - whole;
        if (Math.abs(f - frac) > 0.001) {
          frac = f;
          list.style.transform = `translate3d(${-f}px,0,0)`;
        }
      } else {
        pending.current = 0;
        vel = 0;
        if (frac !== 0) clearFraction();
        resync.current = true;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.style.scrollSnapType = "";
      list.style.transform = "";
      list.style.willChange = "";
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, [DRIFT_PX_PER_S]);

  return { track, nudge, pausedUntil };
}
