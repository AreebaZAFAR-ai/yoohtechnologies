import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * YOOH wordmark, rebuilt from the poster artwork as live type so it stays
 * crisp at every size. Proportions are fixed — never stretch or recolour
 * outside the lime / ink / paper set.
 */
export function LogoMark({
  className,
  tone = "green",
}: {
  className?: string;
  tone?: "green" | "ink";
}) {
  return (
    <span
      className={cn(
        "display inline-flex items-center px-[0.28em] pt-[0.2em] pb-[0.12em] leading-none text-lime",
        tone === "green" ? "bg-green" : "bg-ink",
        className,
      )}
    >
      YOOH
    </span>
  );
}

export function Logo({
  className,
  light = false,
  onClick,
}: {
  className?: string;
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="YOOH Technologies — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoMark
        tone={light ? "ink" : "green"}
        className="text-[1.6rem] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-rotate-3"
      />
      <span
        className={cn(
          "font-display text-[1.05rem] leading-[0.95] lowercase",
          light ? "text-paper" : "text-ink",
        )}
      >
        technologies
        <span className="label block text-[0.5rem] tracking-[0.12em] opacity-70">
          software. marketing. growth.
        </span>
      </span>
    </Link>
  );
}

/** Large stacked lockup used in hero panels and footer. */
export function Wordmark({
  className,
  tagline = true,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <div className={cn("inline-flex flex-col items-start text-lime", className)}>
      <span className="display text-[1em] leading-[0.8]">YOOH</span>
      <span className="font-display text-[0.36em] lowercase leading-[1.05] tracking-[0.005em]">
        technologies
      </span>
      {tagline && (
        <>
          <span className="mt-[0.08em] block h-[0.025em] min-h-[2px] w-full bg-current" />
          <span className="display mt-[0.1em] text-[0.15em] tracking-[0.01em]">
            Software. Marketing. Growth.
          </span>
        </>
      )}
    </div>
  );
}
