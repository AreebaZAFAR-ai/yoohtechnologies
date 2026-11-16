"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ArrowShift } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

type Theme = "green" | "dark" | "concrete" | "paper";

const themeBg: Record<Theme, string> = {
  green: "bg-green",
  dark: "bg-ink",
  concrete: "bg-concrete",
  paper: "bg-paper",
};

export function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("paper");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // "Scrolled" state: a cheap scrollY read, throttled to one update per frame.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Which themed section is under the header? An IntersectionObserver watching a 1px line
  // 36px from the top replaces measuring every section on every scroll frame.
  useEffect(() => {
    const probe = 36;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    const active = new Set<HTMLElement>();
    let io: IntersectionObserver | null = null;

    const pick = () => {
      // First match in document order, so an outer section wins over a nested themed block.
      const hit = sections.find((s) => active.has(s));
      if (hit) setTheme((hit.dataset.theme as Theme) ?? "paper");
    };
    const observe = () => {
      io?.disconnect();
      active.clear();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) active.add(e.target as HTMLElement);
            else active.delete(e.target as HTMLElement);
          }
          pick();
        },
        { rootMargin: `-${probe}px 0px -${Math.max(0, window.innerHeight - probe - 1)}px 0px` },
      );
      sections.forEach((s) => io!.observe(s));
    };

    observe();
    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(observe, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      io?.disconnect();
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  const dark = open || theme === "green" || theme === "dark";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color] duration-500 ease-[var(--ease-expo)]",
          scrolled && !open ? themeBg[theme] : "bg-transparent",
          dark ? "text-paper" : "text-ink",
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo light={dark} onClick={() => setOpen(false)} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group ui relative flex items-center gap-2 px-3 py-2 text-nav"
                  >
                    <span className="relative overflow-hidden">
                      <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0"
                      >
                        {item.label}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-0.5 left-3 right-3 h-[2px] origin-left transition-transform duration-500 ease-[var(--ease-expo)]",
                        dark ? "bg-lime" : "bg-ink",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                "group ui hidden min-h-11 items-center gap-3 border px-4 text-btn transition-colors duration-300 sm:inline-flex",
                "border-ink bg-lime text-ink hover:bg-ink hover:text-lime",
              )}
            >
              Let&apos;s Talk <ArrowShift />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "ui relative z-[70] flex min-h-11 min-w-11 items-center justify-center gap-3 px-3 text-btn lg:hidden",
                open ? "text-lime" : "",
              )}
            >
              <span className="hidden xs:inline">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)]",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)]",
                    open && "-translate-y-[5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
