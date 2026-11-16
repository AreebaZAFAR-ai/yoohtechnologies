import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant =
  | "lime"
  | "ink"
  | "outline"
  | "outline-light"
  | "outline-paper"
  | "green"
  | "green-paper"
  | "outline-green";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-ink hover:bg-ink hover:text-lime",
  ink: "bg-ink text-paper hover:bg-lime hover:text-ink",
  green: "bg-green text-lime hover:bg-ink",
  /* Green + paper only (no lime) */
  "green-paper": "border border-green bg-green text-paper hover:border-ink hover:bg-ink",
  "outline-green": "border border-green text-green hover:bg-green hover:text-paper",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/60 text-paper hover:bg-lime hover:text-ink hover:border-lime",
  /* Paper outline for green sections, no lime */
  "outline-paper": "border border-paper/60 text-paper hover:border-paper hover:bg-paper hover:text-green",
};

export function ButtonLink({
  href,
  children,
  variant = "lime",
  className,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={href}
      data-cursor="hover"
      className={cn(
        "group ui inline-flex items-center justify-between gap-4 transition-colors duration-300",
        size === "md" ? "min-h-12 px-5 text-btn" : "min-h-14 px-7 text-btn-lg",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      <ArrowShift />
    </Link>
  );
}

export function ArrowShift({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex size-[1.15em] overflow-hidden", className)}
    >
      <ArrowRight className="absolute inset-0 size-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-[130%]" />
      <ArrowRight className="absolute inset-0 size-full -translate-x-[130%] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0" />
    </span>
  );
}
