import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WaysToWorkCompact } from "@/components/home/WaysToWorkCompact";
import { WhyYooh } from "@/components/home/WhyYooh";
import { TemplatesSection } from "@/components/home/TemplatesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/shared/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <WaysToWorkCompact />
      <WhyYooh />
      <TestimonialsSection />
      <TemplatesSection />
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
