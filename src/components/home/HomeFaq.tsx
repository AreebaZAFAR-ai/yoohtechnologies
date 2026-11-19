import Link from "next/link";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Label, TornEdge } from "@/components/ui/Marks";
import { FaqList } from "@/components/shared/FaqList";
import { homeFaqs } from "@/lib/site";
import { services } from "@/lib/services";

/** Answer-first questions on the home page (paired with FAQPage JSON-LD in app/page.tsx). */
export function HomeFaq() {
  return (
    <section
      data-theme="paper"
      aria-labelledby="home-faq-title"
      className="relative bg-paper-deep py-20 text-ink md:py-28"
    >
      <TornEdge className="text-paper-deep" seed={37} />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Label index="06" className="mb-8 text-green">
              Questions
            </Label>
          </Reveal>
          <RevealText id="home-faq-title" className="display text-h2">
            Questions businesses
            <br />
            ask us.
          </RevealText>
          <Reveal className="mt-8" stagger={0.06}>
            <p data-reveal className="text-small text-ink/65">Explore a service:</p>
            <ul data-reveal className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-block rounded-full bg-white/55 px-3 py-1.5 text-[0.8125rem] text-ink/80 ring-1 ring-ink/10 transition-colors hover:bg-white/80 hover:text-green"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7">
          <div data-reveal>
            <FaqList faqs={homeFaqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
