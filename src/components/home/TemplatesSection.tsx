import { Reveal } from "@/components/motion/Reveal";
import { TornEdge } from "@/components/ui/Marks";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { templates } from "@/lib/templates";

/** Ready-made website templates: live previews and single-template prices. */
export function TemplatesSection() {
  return (
    <section
      id="templates"
      data-theme="paper"
      aria-labelledby="templates-title"
      className="tex-paper relative scroll-mt-24 bg-paper py-20 text-ink md:py-28"
    >
      <TornEdge className="text-paper" seed={29} />

      <Reveal className="container-x text-center" stagger={0.1}>
        <p data-reveal className="label text-ink/50">
          Website templates
        </p>
        <h2 id="templates-title" data-reveal className="heading mt-4 text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-tight">
          Ready-made sites, live today
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-lg text-ink/70">
          Preview each template live and buy the one you like.
        </p>
      </Reveal>

      <Reveal className="mt-12 md:mt-14" y={40}>
        <TemplateShowcase templates={templates} />
      </Reveal>
    </section>
  );
}
