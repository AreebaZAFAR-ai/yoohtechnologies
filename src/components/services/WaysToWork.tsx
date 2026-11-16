import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Label, TornEdge } from "@/components/ui/Marks";
import { engagementModels } from "@/lib/site";

/** "Working together" — the three engagement models. Anchored at #engage. */
export function WaysToWork({ index = "03" }: { index?: string }) {
  return (
    <section
      id="engage"
      data-theme="paper"
      aria-labelledby="engage-title"
      className="tex-paper relative scroll-mt-24 bg-paper py-24 text-ink md:py-36"
    >
      <TornEdge className="text-paper" seed={57} />
      <div className="container-x">
        <Reveal>
          <Label index={index} className="mb-8">
            Working together
          </Label>
        </Reveal>
        <RevealText id="engage-title" className="display text-h2">
          Ways to
          <br />
          work with us.
        </RevealText>

        <Reveal as="ul" className="mt-16 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {engagementModels.map((m, i) => (
            <li
              data-reveal
              key={m.title}
              className={
                i === 1
                  ? "tex-felt flex flex-col bg-green p-6 text-paper md:p-8"
                  : "flex flex-col border border-ink p-6 md:p-8"
              }
            >
              <span className="label opacity-60">0{i + 1}</span>
              <h3 className="display mt-6 text-h3">{m.title}</h3>
              <p className="mt-3 leading-relaxed opacity-80">{m.text}</p>
              <ul className="mt-6 space-y-2 border-t border-current/25 pt-6">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-current" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
