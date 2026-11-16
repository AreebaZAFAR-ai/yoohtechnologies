import type { Service } from "@/lib/services";
import { cn } from "@/lib/cn";

/** Minimal geometric glyphs — one per service. Animate on parent `group` hover. */
export function ServiceGlyph({
  glyph,
  className,
}: {
  glyph: Service["glyph"];
  className?: string;
}) {
  const common = cn(
    "size-16 fill-none stroke-current transition-transform duration-700 ease-[var(--ease-expo)]",
    className,
  );
  switch (glyph) {
    case "grid":
      return (
        <svg aria-hidden viewBox="0 0 64 64" strokeWidth="1.5" className={cn(common, "group-hover:rotate-90")}>
          <rect x="4" y="4" width="24" height="24" />
          <rect x="36" y="4" width="24" height="24" className="fill-current" />
          <rect x="4" y="36" width="24" height="24" />
          <rect x="36" y="36" width="24" height="24" />
        </svg>
      );
    case "circle":
      return (
        <svg aria-hidden viewBox="0 0 64 64" strokeWidth="1.5" className={cn(common, "group-hover:scale-110")}>
          <circle cx="32" cy="32" r="28" />
          <circle cx="32" cy="32" r="16" />
          <circle cx="32" cy="32" r="5" className="fill-current" />
          <path d="M32 0v64M0 32h64" />
        </svg>
      );
    case "node":
      return (
        <svg aria-hidden viewBox="0 0 64 64" strokeWidth="1.5" className={cn(common, "group-hover:-rotate-45")}>
          <path d="M12 12 32 32 52 12M32 32v22" />
          <circle cx="12" cy="12" r="6" className="fill-current" />
          <circle cx="52" cy="12" r="6" />
          <circle cx="32" cy="32" r="6" />
          <circle cx="32" cy="56" r="6" className="fill-current" />
        </svg>
      );
    case "cross":
      return (
        <svg aria-hidden viewBox="0 0 64 64" strokeWidth="1.5" className={cn(common, "group-hover:rotate-45")}>
          <path d="M32 2v60M2 32h60" />
          <rect x="18" y="18" width="28" height="28" />
          <path d="M18 18 46 46" />
        </svg>
      );
    case "arrow":
      return (
        <svg aria-hidden viewBox="0 0 64 64" strokeWidth="1.5" className={cn(common, "group-hover:-translate-y-1 group-hover:translate-x-1")}>
          <path d="M4 60 26 38l10 10L60 8" />
          <path d="M42 8h18v18" />
          <path d="M4 60h56" />
        </svg>
      );
    case "orbit":
      return (
        <svg aria-hidden viewBox="0 0 64 64" strokeWidth="1.5" className={cn(common, "group-hover:rotate-180")}>
          <ellipse cx="32" cy="32" rx="29" ry="12" />
          <ellipse cx="32" cy="32" rx="12" ry="29" />
          <circle cx="32" cy="32" r="6" className="fill-current" />
        </svg>
      );
  }
}
