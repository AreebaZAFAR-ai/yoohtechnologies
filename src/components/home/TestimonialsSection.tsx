import Image from "next/image";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Label, TornEdge } from "@/components/ui/Marks";

const reviews = [
  {
    src: "/images/testimonials/review-real-estate.webp",
    width: 1024,
    height: 1536,
    service: "Website & SEO",
    industry: "Real estate",
    highlight: "More inquiries through the site, and our Google rankings have significantly improved.",
    quote:
      "The website looks modern, professional, and is very easy to use. Your team is highly professional, responsive and always ready to help. Highly recommended!",
  },
  {
    src: "/images/testimonials/review-saas.webp",
    width: 653,
    height: 1199,
    service: "SaaS development",
    industry: "Software",
    highlight: "The platform is running smoothly, and the maintenance support is excellent.",
    quote:
      "Your team is always quick to resolve any issues. Highly professional, responsive and very easy to work with. I'm really happy with the service!",
  },
  {
    src: "/images/testimonials/review-maintenance.webp",
    width: 656,
    height: 1199,
    service: "Maintenance support",
    industry: "Ongoing project",
    highlight: "Very proactive in implementing updates and fixing issues. The communication is great.",
    quote:
      "The project is progressing smoothly. Really appreciate your dedication and support. Looking forward to continuing our partnership!",
  },
];

/** Client feedback, shown as the WhatsApp messages clients sent us. */
export function TestimonialsSection() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="testimonials-title"
      className="on-dark relative bg-ink py-14 text-paper md:py-20"
    >
      <TornEdge className="text-ink" seed={17} />
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Label index="05" className="mb-6 text-paper">
              Client Feedback
            </Label>
          </Reveal>
          <RevealText id="testimonials-title" className="display text-h2">
            Our work speaks
          </RevealText>
          <Reveal className="mt-5 max-w-md">
            <p data-reveal className="text-paper">
              Messages our clients sent us on WhatsApp after working together. Names and photos
              are blurred for their privacy.
            </p>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          className="mx-auto mt-8 grid max-w-[17rem] gap-10 sm:max-w-none sm:grid-cols-3 sm:gap-6 md:mt-12 lg:max-w-3xl lg:gap-8"
          stagger={0.12}
          y={40}
        >
          {reviews.map((r) => (
            <li data-reveal key={r.src}>
              <figure className="flex h-full flex-col">
                <div className="overflow-hidden rounded-2xl bg-[#efeae2] ring-1 ring-paper/10">
                  <Image
                    src={r.src}
                    width={r.width}
                    height={r.height}
                    alt={`WhatsApp message from a ${r.industry.toLowerCase()} client: “${r.quote}”`}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 272px"
                    className="aspect-[6/11] w-full object-contain object-top"
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="label text-paper">{r.service}</p>
                  <blockquote className="mt-3 text-small text-paper">“{r.highlight}”</blockquote>
                  <p className="mt-2 text-small text-paper">{r.industry}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
