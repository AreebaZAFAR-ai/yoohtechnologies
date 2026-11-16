import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Label, TornEdge } from "@/components/ui/Marks";
import { servicesFaqs } from "@/lib/site";
import { WaysToWork } from "@/components/services/WaysToWork";
import { FaqList } from "@/components/shared/FaqList";
import { services } from "@/lib/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website and app development, UI/UX design, e-commerce, digital marketing, Google Map Business and AI & automation — seven disciplines from one team at YOOH Technologies.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-theme="paper"
        aria-labelledby="services-title"
        className="tex-paper relative bg-paper pb-16 pt-40 text-center text-ink md:pb-24 md:pt-52"
      >
        <div className="container-x">
          <RevealText
            as="h1"
            id="services-title"
            type="chars"
            immediate
            className="display text-[clamp(3.5rem,2rem+8vw,9rem)] text-green"
          >
            Services
          </RevealText>
          <Reveal>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lead leading-relaxed text-ink/75">
              Software, marketing and growth — planned together, built by one team, and measured
              against the outcomes that matter to your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Alternating service rows */}
      <section data-theme="paper" aria-label="Our services" className="tex-paper relative bg-paper pb-24 text-ink md:pb-36">
        <div className="container-x">
          {services.map((s, i) => {
            const img = s.card ?? s.image;
            const flip = i % 2 === 1;
            return (
              <article
                key={s.slug}
                aria-labelledby={`svc-${s.slug}`}
                className="grid items-center gap-10 border-t border-ink/15 py-16 md:py-24 lg:grid-cols-2 lg:gap-24"
              >
                <Reveal className={cn("relative", flip && "lg:order-2")}>
                  <Link
                    data-reveal
                    data-cursor="view"
                    href={`/services/${s.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className="group block overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_12px_30px_-18px_rgb(5_5_5/0.35)]"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      width={img.width}
                      height={img.height}
                      sizes="(min-width:1024px) 46vw, 100vw"
                      className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                    />
                  </Link>
                </Reveal>

                <Reveal className={cn(flip && "lg:order-1")} stagger={0.08}>
                  <span data-reveal className="label block text-green">
                    {s.number}
                  </span>
                  <h2
                    data-reveal
                    id={`svc-${s.slug}`}
                    className="heading mt-5 text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1.05] text-green"
                  >
                    {s.title}
                  </h2>
                  <p data-reveal className="mt-6 max-w-xl text-lead leading-relaxed text-ink/75">
                    {s.summary}
                  </p>
                  <ul data-reveal className="mt-8 flex flex-wrap gap-2.5">
                    {s.items.map((it) => (
                      <li
                        key={it.name}
                        className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-small text-ink/80"
                      >
                        {it.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    data-reveal
                    href={`/services/${s.slug}`}
                    className="ui group mt-10 inline-flex items-center gap-2 text-btn text-ink hover:text-green"
                  >
                    View service
                    <span className="sr-only">: {s.title}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* General questions */}
      <section data-theme="green" aria-labelledby="services-faq-title" className="tex-felt on-dark relative bg-green py-24 text-paper md:py-36">
        <TornEdge className="text-green" seed={59} />
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Label index="01" className="mb-8 text-paper/80">
                Questions
              </Label>
            </Reveal>
            <RevealText id="services-faq-title" className="display text-h2">
              Good to
              <br />
              know.
            </RevealText>
          </div>
          <Reveal className="lg:col-span-7">
            <div data-reveal>
              <FaqList faqs={servicesFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      <WaysToWork index="02" />

      <FinalCTA
        compact
        plain
        title={
          <>
            Let&apos;s make something <span className="text-paper">matter.</span>
          </>
        }
      />
    </>
  );
}
