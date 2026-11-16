import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { Cross, DataBlock, LongArrow } from "@/components/ui/Marks";
import { cn } from "@/lib/cn";

const WORDS = [
  { text: "Software.", className: "" },
  { text: "Marketing.", className: "text-paper" },
  { text: "Growth.", className: "" },
];

/**
 * Stepped green "Fig. 02 — Disciplines" poster panel.
 * Used as the home hero (`as="h1"`) and in the Intro section (`as="list"`).
 */
export function DisciplinesPanel({
  as = "list",
  titleId,
  priority = false,
  sizes = "(min-width: 1024px) 36vw, 90vw",
  reveal = false,
  className,
}: {
  as?: "h1" | "list";
  titleId?: string;
  priority?: boolean;
  sizes?: string;
  /** Mark the panel as a `[data-reveal]` target for a wrapping <Reveal>. */
  reveal?: boolean;
  className?: string;
}) {
  const titleClass = "display mt-8 text-feature leading-[1.05]";

  return (
    <div
      data-reveal={reveal || undefined}
      className={cn(
        "tex-felt panel-step-alt relative bg-green p-6 pb-10 pl-[12%] text-lime md:p-10 md:pl-[12%]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="label text-paper/70">Fig. 02 — Disciplines</span>
        <Cross className="text-lime" />
      </div>

      {as === "h1" ? (
        <h1 id={titleId} className={titleClass}>
          {WORDS.map((w) => (
            <span key={w.text} className={cn("block", w.className)}>
              {w.text}
            </span>
          ))}
        </h1>
      ) : (
        <ul id={titleId} className={titleClass}>
          {WORDS.map((w) => (
            <li key={w.text} className={w.className || undefined}>
              {w.text}
            </li>
          ))}
        </ul>
      )}

      <Parallax className="mt-8 aspect-[16/10] w-full" amount={14}>
        <Image
          src="/images/poster-yooh-wall.webp"
          alt="YOOH technologies poster pasted on a concrete wall"
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </Parallax>

      <div className="mt-6 flex items-center justify-between text-paper/80">
        <DataBlock className="w-14 text-signal" />
        <LongArrow className="text-lime" />
      </div>
    </div>
  );
}
