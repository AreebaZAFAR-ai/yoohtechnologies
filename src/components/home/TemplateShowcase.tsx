"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, RotateCw, X } from "lucide-react";
import { CURRENCY, enquiryHref, type Template } from "@/lib/templates";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/cn";
import { COPIES, useDriftLoop } from "@/components/motion/useDriftLoop";

/**
 * Template cards in an endless strip drifting left to right (arrows + swipe too), each
 * opening a live preview popup: browser-style frame with the real demo inside, prev/next, reload, Buy and
 * Open live site.
 */
export function TemplateShowcase({ templates }: { templates: Template[] }) {
  const { track, nudge } = useDriftLoop(templates.length);
  const [open, setOpen] = useState<number | null>(null);
  const loop = Array.from({ length: COPIES }, (_, copy) => templates.map((t, i) => ({ t, i, copy }))).flat();

  return (
    <div>
      <div
        ref={track}
        className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scroll-padding-inline:clamp(16px,3vw,44px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul aria-label="Website templates" className="flex w-max gap-5 px-[clamp(16px,3vw,44px)] pb-2 md:gap-6">
          {loop.map(({ t, i, copy }) => (
            <li
              key={`${copy}-${t.slug}`}
              aria-hidden={copy !== 1 || undefined}
              /* Outer copies only exist for the seamless loop, but they're what's on screen
                 much of the time, so they must stay clickable (no `inert`); they're just kept
                 out of the Tab order and away from screen readers. */
              className="w-[82vw] shrink-0 snap-start sm:w-[48vw] lg:w-[clamp(320px,30vw,460px)]"
            >
              <article className="tex-felt group flex h-full flex-col overflow-hidden rounded-xl bg-green text-paper transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgb(5_5_5/0.45)]">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  tabIndex={copy !== 1 ? -1 : undefined}
                  aria-label={`Preview ${t.name} template`}
                  data-cursor="view"
                  className="relative m-3 mb-0 block aspect-[16/10] overflow-hidden rounded-lg bg-ink ring-1 ring-paper/15"
                >
                  {/* Full-page screenshot: on hover it scrolls slowly down through the site, and
                      glides back to the top when the cursor leaves. */}
                  {/* Optimised, lazy-loaded image; the hover scroll moves it with a GPU transform.
                      83.333% = (3375 − 900×10/16) / 3375: slides until the bottom meets the frame. */}
                  <Image
                    src={t.image.src}
                    alt={t.image.alt}
                    width={900}
                    height={3375}
                    sizes="(min-width:1024px) 440px, (min-width:640px) 46vw, 78vw"
                    className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:-translate-y-[83.333%] group-hover:duration-[7s] group-hover:ease-linear group-focus-within:-translate-y-[83.333%] group-focus-within:duration-[7s] group-focus-within:ease-linear motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-within:translate-y-0"
                  />
                  {/* Touch screens have no hover, so the badge is always shown there as the tap cue. */}
                  <span className="ui absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-btn text-paper opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                    <Eye className="size-4" /> Live preview
                  </span>
                </button>

                {/* Phones: name and category get the full width, price + Buy sit on their own row
                    below, so long names don't wrap and every card lines up the same way. */}
                <div className="flex flex-1 flex-col justify-end gap-4 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
                  <div className="min-w-0">
                    <h3 className="heading text-h3 uppercase leading-tight">{t.name}</h3>
                    <p className="mt-1 text-small text-paper/65">{t.category}</p>
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-3 border-t border-paper/15 pt-4 sm:border-0 sm:pt-0">
                    <span className="heading text-lg">
                      {CURRENCY}
                      {t.price}
                    </span>
                    <Link
                      href={enquiryHref(`the ${t.name} template`)}
                      tabIndex={copy !== 1 ? -1 : undefined}
                      className="ui rounded-full bg-paper px-4 py-2 text-btn text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                    >
                      Buy
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <RoundButton label="Previous templates" onClick={() => nudge(-1)}>
          <ArrowLeft className="size-5" />
        </RoundButton>
        <RoundButton label="Next templates" onClick={() => nudge(1)}>
          <ArrowRight className="size-5" />
        </RoundButton>
      </div>

      {/* Portalled to <body>: inside the section, the site header and the next section's
          torn edge would sit on top of it and hide the top and bottom of the preview. */}
      {open !== null &&
        createPortal(
          <PreviewModal templates={templates} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />,
          document.body,
        )}
    </div>
  );
}

/** Viewport width the live preview renders at before being scaled down to fit. */
const DESKTOP_WIDTH = 1440;
/** Below this preview width (phones) the site shows its own mobile layout unscaled. */
const MIN_SCALED_WIDTH = 640;

function PreviewModal({
  templates,
  index,
  onIndex,
  onClose,
}: {
  templates: Template[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const t = templates[index];
  const n = templates.length;
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const dialog = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fit a desktop-width render of the site into the preview area (1 = no scaling, on phones).
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      setScale(w >= MIN_SCALED_WIDTH && w < DESKTOP_WIDTH ? w / DESKTOP_WIDTH : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setLoading(true);
      onIndex((index + dir + n) % n);
    },
    [index, n, onIndex],
  );

  // Lock page scroll, focus the dialog, restore focus on close.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      prev?.focus?.({ preventScroll: true });
    };
  }, []);

  // Keyboard: Escape closes, arrows switch template, Tab stays inside.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("a[href], button, iframe");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const host = t.url.replace(/^https?:\/\//, "");

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-3 md:p-6" data-lenis-prevent>
      <div aria-hidden className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="template-preview-title"
        tabIndex={-1}
        className="relative flex h-[min(88vh,820px)] supports-[height:1dvh]:h-[min(88dvh,820px)] w-[min(100%,1100px)] flex-col overflow-hidden rounded-2xl bg-[#2b2a27] text-paper shadow-2xl outline-none ring-1 ring-paper/10"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-4">
          <div>
            <p className="label text-paper/50">Template preview</p>
            <h2 id="template-preview-title" className="mt-1 flex items-baseline gap-2">
              <span className="heading text-lg uppercase">{t.name}</span>
              <span className="text-small text-paper/60">{t.category}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="grid size-9 place-items-center rounded-full ring-1 ring-paper/30 transition-colors hover:bg-paper hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Browser bar */}
        <div className="flex items-center gap-4 border-y border-paper/10 px-5 py-2.5 text-small text-paper/70">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2 rounded-full bg-paper/30" />
            <span className="size-2 rounded-full bg-paper/30" />
          </span>
          <span className="truncate">{host}</span>
        </div>

        {/* Live site */}
        {/* The site is rendered at a real desktop width (1440px) and scaled down to fit, so the
            whole desktop layout shows instead of a squeezed tablet layout. Phones keep the
            site's own mobile layout at 1:1 — a scaled desktop page would be unreadable there. */}
        <div ref={frame} className="relative flex-1 overflow-hidden bg-ink">
          {loading && (
            <div className="absolute inset-0 grid place-items-center text-small text-paper/50">
              Loading {t.name}…
            </div>
          )}
          <iframe
            key={`${t.slug}-${reloadKey}`}
            src={t.url}
            title={`${t.name} template live preview`}
            onLoad={() => setLoading(false)}
            style={
              scale < 1
                ? { width: DESKTOP_WIDTH, height: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "0 0" }
                : undefined
            }
            className={cn(
              "absolute left-0 top-0 size-full border-0 transition-opacity duration-500",
              loading ? "opacity-0" : "opacity-100",
            )}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <SmallButton label="Previous template" onClick={() => go(-1)}>
              <ArrowLeft className="size-4" />
            </SmallButton>
            <SmallButton label="Next template" onClick={() => go(1)}>
              <ArrowRight className="size-4" />
            </SmallButton>
            <SmallButton
              label="Reload preview"
              onClick={() => {
                setLoading(true);
                setReloadKey((k) => k + 1);
              }}
            >
              <RotateCw className="size-4" />
            </SmallButton>
            <span className="ml-1 text-small tabular-nums text-paper/60">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
          {/* Phones: the two actions share the full row in equal halves. */}
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ui flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-btn ring-1 ring-paper/40 transition-colors hover:bg-paper hover:text-ink max-sm:px-2"
            >
              Open live site <ArrowUpRight className="size-4" />
            </a>
            <Link
              href={enquiryHref(`the ${t.name} template`)}
              className="ui flex items-center justify-center whitespace-nowrap rounded-full bg-paper px-4 py-2 text-btn text-ink transition-colors hover:bg-lime max-sm:px-2"
            >
              Buy — {CURRENCY}
              {t.price}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoundButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      data-cursor="hover"
      className="grid size-14 place-items-center rounded-full border border-ink/40 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
    >
      {children}
    </button>
  );
}

function SmallButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full ring-1 ring-paper/30 transition-colors hover:bg-paper hover:text-ink"
    >
      {children}
    </button>
  );
}
