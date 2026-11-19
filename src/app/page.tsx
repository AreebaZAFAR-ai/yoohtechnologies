import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WaysToWorkCompact } from "@/components/home/WaysToWorkCompact";
import { WhyYooh } from "@/components/home/WhyYooh";
import { TemplatesSection } from "@/components/home/TemplatesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { HomeFaq } from "@/components/home/HomeFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaqs, site } from "@/lib/site";
import { faqSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = `${site.name} | Software Development, AI & Digital Solutions`;
const description =
  "YOOH Technologies builds custom software, websites and mobile apps, AI automation, e-commerce stores and digital marketing for growing businesses worldwide.";

export const metadata = pageMetadata({ title, description, path: "/", absoluteTitle: true });

const jsonLd = graph(webPageSchema({ path: "/", name: title, description }), faqSchema("/", homeFaqs));

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <StatsBar />
      <ServicesSection />
      <WaysToWorkCompact />
      <WhyYooh />
      <TestimonialsSection />
      <TemplatesSection />
      <HomeFaq />
      <FinalCTA
        compact
        title={
          <>
            Let&apos;s make something <span className="text-paper">matter.</span>
          </>
        }
      />
    </>
  );
}
