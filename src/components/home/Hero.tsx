import { Reveal } from "@/components/motion/Reveal";
import { DisciplinesPanel } from "@/components/shared/DisciplinesPanel";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/motion/Marquee";
import { disciplineBelt } from "@/lib/site";

/** Home hero — brand heading on the left, "Fig. 02 — Disciplines" poster panel on the right. */
export function Hero() {
  return (
    <section
      data-theme="paper"
      aria-labelledby="hero-title"
      className="tex-paper relative bg-paper pb-12 pt-[calc(88px+2.5rem)] text-ink"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Mobile: two centred lines. Tablet & up: one left-aligned line. */}
        <Reveal className="text-center text-green md:text-left lg:col-span-7" stagger={0.12}>
          {/* One H1: the brand (display type) plus the descriptive search phrase beneath it. */}
          <h1 id="hero-title" data-reveal>
            <span className="display block text-[clamp(2.75rem,13vw,4.5rem)] md:whitespace-nowrap md:text-[9vw] lg:text-[clamp(4rem,6.5vw,6.5rem)]">
              <span className="block md:inline">YOOH</span>{" "}
              <span className="block md:inline">Technologies</span>
            </span>{" "}
            <span className="heading mx-auto mt-6 block max-w-xl text-h3 md:mx-0">
              Custom Software, Web Development &amp; AI Solutions for Growing Businesses
            </span>
          </h1>
          <p data-reveal className="mx-auto mt-5 max-w-xl text-lead leading-relaxed text-ink/75 md:mx-0">
            We help businesses build, automate and grow with custom software, modern websites,
            mobile apps, AI-powered automation and digital marketing.
          </p>
          {/* Phones: a fixed two-column grid, so the row can't re-wrap when the web font
              swaps in (the fallback font is wider) — that wrap was a visible layout shift. */}
          <div data-reveal className="mt-8 grid grid-cols-2 gap-3 max-xs:grid-cols-1 md:flex md:flex-wrap md:justify-start">
            <ButtonLink
              href="/services"
              variant="green-paper"
              className="whitespace-nowrap max-md:justify-center max-md:gap-1.5 max-md:px-2.5"
            >
              Our Services
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="outline-green"
              className="whitespace-nowrap max-md:justify-center max-md:gap-1.5 max-md:px-2.5"
            >
              Let&apos;s Talk
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" y={60}>
          <DisciplinesPanel reveal priority />
        </Reveal>
      </div>

      {/* Same scrolling belt as the Why YOOH section */}
      <Marquee
        className="display mt-16 border-y border-ink bg-lime py-4 text-h2 text-ink md:mt-24"
        items={disciplineBelt}
      />
    </section>
  );
}
