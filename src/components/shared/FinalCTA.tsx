import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Cross, DataBlock, Label, TornEdge } from "@/components/ui/Marks";

export function FinalCTA({
  title = (
    <>
      Let&apos;s make
      <br />
      something
      <br />
      <span className="text-paper">matter.</span>
    </>
  ),
  text = "Have an idea, a challenge, or a business ready for its next stage of growth? Let's build something meaningful together.",
  cta = "Start a Project",
  href = "/contact",
  compact = false,
  plain = false,
}: {
  title?: React.ReactNode;
  text?: string;
  cta?: string;
  href?: string;
  /** Short single-row version (home page): same height as the stat bar. */
  compact?: boolean;
  /** Green + paper only — no lime or orange accents. */
  plain?: boolean;
}) {
  const btn = plain
    ? "bg-paper text-green hover:bg-ink hover:text-paper"
    : "bg-lime text-ink hover:bg-ink hover:text-lime";
  if (compact) {
    return (
      <section
        data-theme="green"
        aria-labelledby="cta-title"
        className="tex-felt on-dark relative overflow-x-clip bg-green py-16 text-paper md:py-24"
      >
        <TornEdge className="text-green" seed={29} />
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 text-paper/25" />
        {/* min-height mirrors the StatsBar content (numeral + gap + label line) so both bars match */}
        <Reveal className="container-x relative grid items-center gap-8 lg:min-h-[calc(clamp(3rem,2rem+5vw,6.5rem)+0.75rem+var(--text-lead)*1.6)] lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 id="cta-title" data-reveal className="display text-hero">
              {title}
            </h2>
            <p data-reveal className="mt-4 max-w-xl leading-relaxed text-paper">
              {text}
            </p>
          </div>
          <div data-reveal className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              href={href}
              className={`group inline-flex w-full items-center justify-between gap-6 px-6 py-4 transition-colors duration-500 sm:w-auto md:px-8 md:py-5 ${btn}`}
            >
              <span className="display text-h3">{cta}</span>
              <span className="grid size-12 place-items-center rounded-full border border-current md:size-14">
                <ArrowUpRight className="size-6 animate-[nudge_2.4s_var(--ease-expo)_infinite] transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </Link>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section
      data-theme="green"
      aria-labelledby="cta-title"
      className={`tex-felt on-dark relative overflow-x-clip bg-green pb-28 pt-24 md:pb-40 md:pt-36 ${plain ? "text-paper" : "text-lime"}`}
    >
      <TornEdge className="text-green" seed={29} />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 text-paper/25" />
      <div className="container-x relative">
        <Reveal className="flex items-center justify-between">
          <Label className="text-paper/80">Next Chapter</Label>
          <Cross className={plain ? "text-paper" : "text-lime"} />
        </Reveal>

        <RevealText id="cta-title" className="display mt-10 text-hero">
          {title}
        </RevealText>

        <Reveal className="mt-14 grid items-end gap-10 lg:grid-cols-12">
          <p data-reveal className="max-w-md text-lead leading-relaxed text-paper lg:col-span-5">
            {text}
          </p>
          <div data-reveal className="lg:col-span-7 lg:flex lg:justify-end">
            <Link
              href={href}
              className={`group relative inline-flex w-full items-center justify-between gap-8 px-6 py-5 transition-colors duration-500 sm:w-auto md:px-10 md:py-8 ${btn}`}
            >
              <span className="display text-h3">{cta}</span>
              <span className="relative grid size-14 place-items-center overflow-hidden rounded-full border border-current md:size-20">
                <ArrowUpRight className="size-7 animate-[nudge_2.4s_var(--ease-expo)_infinite] transition-transform duration-500 group-hover:rotate-45 md:size-9" />
              </span>
            </Link>
          </div>
        </Reveal>

        {!plain && (
          <DataBlock className="absolute right-[clamp(16px,3vw,44px)] top-2 hidden w-16 text-signal lg:block" />
        )}
      </div>
    </section>
  );
}
