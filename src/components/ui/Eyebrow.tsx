import { cn } from "@/lib/cn";

/** Small uppercase eyebrow with a square marker. `as="span"` lets it sit inside a heading. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span";
}) {
  return (
    <Tag className={cn("label flex items-center gap-2.5 text-ink/60", className)}>
      <span aria-hidden className="size-2 shrink-0 rounded-[2px] bg-green" />
      {children}
    </Tag>
  );
}
