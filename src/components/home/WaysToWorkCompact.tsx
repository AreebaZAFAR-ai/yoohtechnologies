import { Reveal } from "@/components/motion/Reveal";
import { Label, TornEdge } from "@/components/ui/Marks";
import { engagementModels } from "@/lib/site";

/**
 * Home page "Ways to work with us" — a deliberately smaller, quieter section than its
 * neighbours: tighter vertical padding, a narrower content column and lighter cards.
 * The full version lives on the Services page (`WaysToWork`).
 */
export function WaysToWorkCompact() {
  return (
    <section
      data-theme="paper"
      aria-labelledby="ways-title"
      className="tex-paper relative bg-paper py-14 text-ink md:py-20"
    >
      <TornEdge className="text-paper" seed={19} />

      <div className="container-x">
        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12" stagger={0.1}>
            <div>
              <div data-reveal>
                <Label className="mb-4 text-ink/70">Working together</Label>
              </div>
              <h2 id="ways-title" data-reveal className="display text-h2 leading-none">
                Ways to work <span className="text-green">with us.</span>
              </h2>
            </div>
            <p data-reveal className="max-w-sm text-small leading-relaxed text-ink/70 md:text-right">
              Start with a defined project, grow into a dedicated team, or hand us the care of
              software that&rsquo;s already live.
            </p>
          </Reveal>

          <Reveal as="ul" className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5" stagger={0.1} y={32}>
            {engagementModels.map((m) => (
              <li
                data-reveal
                key={m.title}
                className="flex flex-col rounded-lg border border-ink/10 bg-white/70 p-5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:shadow-[0_12px_30px_-18px_rgb(5_5_5/0.35)] md:p-6"
              >
                <span className="label text-green">{m.tag}</span>
                <h3 className="heading mt-2 text-h3 leading-tight">{m.title}</h3>
                <p className="mt-3 text-small leading-relaxed text-ink/70">{m.text}</p>
                <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-small text-ink/75">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="text-ink/35">—</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
