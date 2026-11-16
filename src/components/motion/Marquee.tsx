import { cn } from "@/lib/cn";

/** Infinite CSS marquee (pauses for reduced-motion users via CSS). */
export function Marquee({
  items,
  className,
  speed = 32,
  separator = "✕",
}: {
  items: string[];
  className?: string;
  speed?: number;
  separator?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-[0.35em]">{t}</span>
          <span className="px-[0.35em] text-[0.45em] opacity-70">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)} aria-label={items.join(", ")} role="marquee">
      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
        aria-hidden
      >
        {row}
        {row}
      </div>
    </div>
  );
}
