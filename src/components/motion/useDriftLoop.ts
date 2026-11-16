"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Infinite carousel that drifts continuously from left to right (content moves right).
 *
 * Render the items COPIES (3) times in the track; the middle copy is the real one and the
 * outer copies let the loop wrap invisibly. Keeps moving on hover and click; arrows (`nudge`)
 * push it along without stopping it. Rests only off-screen, in a hidden tab, during a manual
 * swipe, and never moves for reduced motion.
 *
 * `pausedUntil` lets a caller hold the drift (e.g. until an entrance animation finishes).
 */
export const COPIES = 3;

export function useDriftLoop(n: number, speed = 60) {
  const DRIFT_PX_PER_S = speed;
  const track = useRef<HTMLUListElement>(null);
  const visible = useRef(false);
  const pausedUntil = useRef(0);
  /** Distance still to travel from arrow clicks, eased in on top of the drift. */
  const pending = useRef(0);

  /** Width of one full set of cards (distance between copy 0 and copy 1). */
  const setWidth = useCallback(() => {
    const items = track.current?.children;
    if (!items || items.length < n * 2) return 0;
    return (items[n] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft;
  }, [n]);

  /** If we've drifted into an outer copy, jump (instantly, invisibly) back to the middle one. */
  const recenter = useCallback(() => {
    const el = track.current;
    const w = setWidth();
    if (!el || !w) return;
    if (el.scrollLeft < w * 0.5) el.scrollLeft += w;
    else if (el.scrollLeft > w * 1.5) el.scrollLeft -= w;
  }, [setWidth]);

  // Start on the middle copy; keep position sensible on resize.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = setWidth();
    const onResize = () => {
      const w = setWidth();
      if (w) el.scrollLeft = w + (el.scrollLeft % w);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setWidth]);

  // Wrap once scrolling settles (scrollend where supported, debounce elsewhere).
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
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("li");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card ? card.offsetWidth + gap : el.clientWidth * 0.8;
  }, []);

  /** Arrows: with motion, add to the drift (it never stops); without, scroll one card. */
  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollBy({ left: dir * stepSize() });
      return;
    }
    pending.current += dir * stepSize();
  };

  // Autoplay: a slow, continuous drift from left to right (content moves right) that never
  // stops for hover, clicks or page scrolling. Only an active finger drag or a sideways
  // trackpad swipe takes over briefly, so the visitor can still browse by hand.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Snapping would fight the per-frame scroll updates.
    el.style.scrollSnapType = "none";

    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0 });
    io.observe(el);

    let dragging = false;
    const onTouchStart = () => (dragging = true);
    const onTouchEnd = () => {
      dragging = false;
      pausedUntil.current = Math.max(pausedUntil.current, Date.now() + 600); // let momentum settle
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) pausedUntil.current = Date.now() + 600;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft; // float accumulator; scrollLeft may round
    let wasRunning = false;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64); // avoid a jump after a background tab
      last = now;
      const running = visible.current && !document.hidden && !dragging && Date.now() >= pausedUntil.current;

      if (running) {
        if (!wasRunning) pos = el.scrollLeft; // resync after a swipe moved it
        // Ease any arrow nudge in on top of the steady drift.
        const take = pending.current * (1 - Math.exp(-dt / 140));
        pending.current -= take;
        pos += take - (DRIFT_PX_PER_S * dt) / 1000;
        const w = setWidth();
        if (w) {
          if (pos < w * 0.5) pos += w;
          else if (pos > w * 1.5) pos -= w;
        }
        el.scrollLeft = pos;
      } else {
        pending.current = 0;
      }
      wasRunning = running;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.style.scrollSnapType = "";
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, [setWidth, DRIFT_PX_PER_S]);

  return { track, nudge, pausedUntil };
}
