import { disciplineBelt, principles } from "@/lib/site";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Label, TornEdge } from "@/components/ui/Marks";
import { Marquee } from "@/components/motion/Marquee";
import { PrinciplesPipeline } from "@/components/home/PrinciplesPipeline";

export function WhyYooh() {
  return (
    <>
    <section
      data-theme="green"
      aria-labelledby="why-title"
      className="tex-felt on-dark relative overflow-x-clip bg-green py-14 text-paper md:py-20"
    >
      <TornEdge className="text-green" seed={13} />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 text-paper/20" />

      <div className="container-x relative">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Label index="04" className="mb-4 text-paper/70">
                Principles
              </Label>
            </Reveal>
            <RevealText id="why-title" type="chars" className="display text-h2">
              Why YOOH?
            </RevealText>
          </div>
        </div>

        <PrinciplesPipeline items={principles} />
      </div>
    </section>

    {/* Belt sits on its own off-white strip (sibling, so the header theme probe sees it) */}
    <div data-theme="paper" className="tex-paper relative bg-paper py-12 text-ink">
      <TornEdge className="text-paper" seed={11} />
      <Marquee
        className="display border-y border-ink bg-lime py-4 text-h2 text-ink"
        items={disciplineBelt}
      />
    </div>
    </>
  );
}
