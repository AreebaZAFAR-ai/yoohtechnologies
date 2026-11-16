import { services } from "@/lib/services";
import { Reveal } from "@/components/motion/Reveal";
import { TornEdge } from "@/components/ui/Marks";
import { ServiceCarousel } from "@/components/home/ServiceCarousel";
import { ButtonLink } from "@/components/ui/Button";

export function ServicesSection() {
  return (
    <section
      data-theme="green"
      aria-labelledby="services-title"
      className="tex-felt on-dark relative bg-green py-24 text-paper md:py-32"
    >
      <TornEdge className="text-green" seed={7} />

      <Reveal className="container-x text-center" stagger={0.1}>
        <p data-reveal className="label text-paper/70">
          What we do — {String(services.length).padStart(2, "0")} services
        </p>
        <h2 id="services-title" data-reveal className="display mt-5 text-[clamp(2.5rem,1.5rem+4vw,5rem)]">
          Our Services
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-xl text-lead leading-relaxed text-paper/80">
          From your first website to your next app, store or campaign — one team that designs, builds
          and grows it with you.
        </p>
      </Reveal>

      <div className="mt-14 md:mt-20">
        <ServiceCarousel
          services={services.map(({ slug, number, title, summary, cardSummary, highlights, image, card }) => ({
            slug,
            number,
            title,
            summary,
            cardSummary,
            highlights,
            image,
            card,
          }))}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <ButtonLink href="/services" variant="outline-light">
          All services
        </ButtonLink>
      </div>
    </section>
  );
}
