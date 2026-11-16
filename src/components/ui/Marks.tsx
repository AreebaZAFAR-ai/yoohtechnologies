import { cn } from "@/lib/cn";

/** Small editorial label, e.g. "WHO WE ARE". */
export function Label({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <p className={cn("label flex items-center gap-3", className)}>
      {index && <span className="opacity-60">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-current" />
      <span>{children}</span>
    </p>
  );
}

/** Registration cross mark. */
export function Cross({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("size-6 stroke-current", className)}
      fill="none"
      strokeWidth="1.2"
      data-mark
    >
      <path d="M12 0v24M0 12h24" />
    </svg>
  );
}

/** Corner bracket used to frame images. */
export function Corners({ className }: { className?: string }) {
  const c = "absolute size-4 border-current";
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(c, "left-0 top-0 border-l border-t")} />
      <span className={cn(c, "right-0 top-0 border-r border-t")} />
      <span className={cn(c, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(c, "bottom-0 right-0 border-b border-r")} />
    </span>
  );
}

/** Long technical arrow. */
export function LongArrow({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: "right" | "down" | "up";
}) {
  const rot = direction === "down" ? "rotate-90" : direction === "up" ? "-rotate-90" : "";
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      fill="none"
      className={cn("h-3 w-28 stroke-current", rot, className)}
      strokeWidth="1.2"
      data-arrow
    >
      <path d="M0 6h118M112 1l6 5-6 5" />
    </svg>
  );
}

/** Concrete-style "data block" glyph from the posters. */
export function DataBlock({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 80 44" className={cn("w-20 fill-current", className)}>
      <rect x="0" y="0" width="44" height="6" />
      <rect x="48" y="0" width="14" height="6" />
      <rect x="66" y="0" width="12" height="3" />
      <rect x="0" y="12" width="22" height="6" />
      <rect x="26" y="12" width="24" height="6" />
      <rect x="54" y="12" width="10" height="6" />
      <rect x="0" y="24" width="56" height="6" />
      <rect x="60" y="24" width="10" height="6" />
      <rect x="0" y="36" width="30" height="6" />
      <rect x="34" y="36" width="20" height="6" />
    </svg>
  );
}

/* ---------- torn paper edge ---------- */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
function tornPath(seed: number) {
  const rnd = seeded(seed);
  const pts: string[] = ["0,40"];
  let x = 0;
  while (x < 1440) {
    const y = 6 + rnd() * 22 + (rnd() > 0.85 ? 8 : 0);
    pts.push(`${x.toFixed(0)},${y.toFixed(1)}`);
    x += 6 + rnd() * 26;
  }
  pts.push("1440,14", "1440,40");
  return `M${pts.join(" L")} Z`;
}

/** Torn paper edge. Colour = the colour of the section it belongs to. */
export function TornEdge({
  className,
  position = "top",
  seed = 3,
}: {
  className?: string;
  position?: "top" | "bottom";
  seed?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute left-0 z-10 h-5 w-full fill-current md:h-8",
        position === "top" ? "-top-[19px] md:-top-[31px]" : "-bottom-[19px] rotate-180 md:-bottom-[31px]",
        className,
      )}
    >
      <path d={tornPath(seed)} />
    </svg>
  );
}
