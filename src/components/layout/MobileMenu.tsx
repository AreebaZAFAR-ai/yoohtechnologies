"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Cross } from "@/components/ui/Marks";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useGSAP(
    () => {
      const el = ref.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(el, { visibility: "visible" })
        .fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0.01 : 0.9 },
        )
        .from(
          el.querySelectorAll("[data-menu-item]"),
          { yPercent: 110, duration: reduce ? 0.01 : 0.9, stagger: 0.06, ease: "expo.out" },
          reduce ? 0 : 0.35,
        )
        .from(
          el.querySelectorAll("[data-menu-fade]"),
          { autoAlpha: 0, y: 20, duration: reduce ? 0.01 : 0.6, ease: "expo.out" },
          reduce ? 0 : 0.6,
        );
    },
    { scope: ref },
  );

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const lenis = getLenis();
    if (open) {
      tl.current?.timeScale(1).play();
      lenis?.stop();
      document.body.style.overflow = "hidden";
      ref.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      tl.current?.timeScale(1.6).reverse();
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  // Close on route change and on Escape.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      className="tex-felt invisible fixed inset-0 z-40 flex flex-col overflow-y-auto bg-green text-paper lg:hidden"
    >
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 text-paper/40" />
      <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center pt-24 pb-8">
        <ul className="flex flex-col">
          {nav.map((item) => (
            <li key={item.href} className="overflow-hidden border-b border-paper/15">
              <Link
                href={item.href}
                onClick={onClose}
                data-menu-item
                aria-current={pathname === item.href ? "page" : undefined}
                className="group flex items-baseline justify-between py-2"
              >
                <span className="display text-hero text-lime transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3 group-aria-[current=page]:text-paper">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div data-menu-fade className="container-x relative flex flex-col gap-6 pb-8">
        <ButtonLink href="/contact" variant="lime" size="lg" className="w-full">
          Let&apos;s Talk
        </ButtonLink>
        <div className="flex items-end justify-between">
          <p className="label text-paper/70">
            {site.name}
            <br />
            {site.tagline}
          </p>
          <Cross className="text-lime" />
        </div>
      </div>
    </div>
  );
}
