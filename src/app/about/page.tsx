import type { Metadata } from "next";
import Image from "next/image";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { StatsBar } from "@/components/home/StatsBar";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { Label, TornEdge } from "@/components/ui/Marks";
import { principles } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "About YOOH Technologies | Software & Digital Agency";
const description =
  "YOOH Technologies is a Pakistan-based software house: one team of engineers, designers and marketers building websites, apps, AI automation and campaigns.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/about", absoluteTitle: true });

const jsonLd = graph(webPageSchema({ type: "AboutPage", path: "/about", name: title, description }));

const pillars = [
  {
    word: "Software",
    text: "Custom software, websites, mobile apps, SaaS and AI-powered tools — engineered to be fast, scalable and maintainable.",
  },
  {
    word: "Marketing",
    text: "Search, paid media, social and content working together to connect your brand with the people who matter.",
  },
  {
    word: "Growth",
    text: "Strategy, analytics and continuous optimisation that turn digital investment into measurable progress.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      {/* Hero: centred title + framed photo */}
      <section
        data-theme="paper"
        aria-labelledby="about-title"
        className="tex-paper relative bg-paper pb-24 pt-40 text-center text-ink md:pb-36 md:pt-52"
      >
        <div className="container-x">
          <RevealText
            as="h1"
            id="about-title"
            type="chars"
            immediate
            className="display text-[clamp(3.5rem,2rem+8vw,9rem)]"
          >
            About us
          </RevealText>
          <Reveal>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lead leading-relaxed text-ink/75">
              YOOH Technologies is a software house based in Pakistan. One team of engineers,
              designers and marketers helps businesses at home and abroad build, automate and grow
              online.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-16 max-w-[640px] md:mt-24">
            <div data-reveal className="tex-felt rounded-3xl bg-green p-3 md:p-5">
              <Parallax className="relative aspect-[2/3] overflow-hidden rounded-2xl" amount={8}>
                <Image
                  src="/images/about-studio.webp"
                  alt="A quiet studio desk with monitors showing code beneath black pendant lamps"
                  fill
                  priority
                  sizes="(min-width:768px) 600px, 92vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section
        data-theme="green"
        aria-labelledby="story-title"
        className="tex-felt on-dark relative bg-green py-16 text-paper md:py-24 lg:flex lg:h-stat lg:items-center lg:py-0"
      >
        <TornEdge className="text-green" seed={41} />
        <div className="container-x grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Label index="01" className="text-paper/80">
                Who we are
              </Label>
            </Reveal>
            <RevealText id="story-title" className="heading mt-5 text-h2 leading-[1.2]">
              We build digital experiences, develop <span className="text-paper/60">intelligent solutions</span>,
              and help businesses grow.
            </RevealText>
          </div>
          <div className="lg:col-span-6">
            <Reveal className="grid gap-6 md:grid-cols-2" stagger={0.12}>
              <p data-reveal className="leading-relaxed text-paper/80">
                We are more than a software house. YOOH brings engineers, marketers and designers
                into one team, so strategy, build and growth are planned together rather than
                handed between separate suppliers.
              </p>
              <p data-reveal className="leading-relaxed text-paper/80">
                From custom software and mobile applications to digital marketing and intelligent
                automation, we bring technology and creativity together to create meaningful
                business results.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Disciplines */}
      <section data-theme="green" aria-labelledby="pillars-title" className="tex-felt on-dark relative bg-green py-14 text-paper md:py-20">
        <TornEdge className="text-green" seed={43} />
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <Label index="02" className="mb-5 text-paper/80">
                  Three disciplines
                </Label>
              </Reveal>
              <RevealText id="pillars-title" className="display text-h2">
                One team. <span className="text-paper/60">Three forces.</span>
              </RevealText>
            </div>
            <Reveal>
              <ButtonLink href="/services" variant="outline-paper">
                All Services
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal className="mt-10 grid gap-4 md:grid-cols-3" stagger={0.12}>
            {pillars.map((p, i) => (
              <article data-reveal key={p.word} className="rounded-lg border border-paper/20 p-6 md:p-7">
                <span className="label text-paper/60">0{i + 1}</span>
                <h3 className="heading mt-4 text-h3">{p.word}</h3>
                <p className="mt-2 leading-relaxed text-paper/80">{p.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section data-theme="paper" aria-labelledby="believe-title" className="tex-paper relative bg-paper py-24 text-ink md:py-36">
        <TornEdge className="text-paper" seed={47} />
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Label index="03" className="mb-8 text-green">
                What we believe
              </Label>
            </Reveal>
            <RevealText id="believe-title" className="display text-h2">
              Built on four
              <br />
              principles.
            </RevealText>
          </div>
          <ol className="lg:col-span-7">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/15 py-7 last:border-b"
                y={30}
              >
                <span data-reveal className="label pt-1.5 text-green">
                  0{i + 1}
                </span>
                <div data-reveal>
                  <h3 className="heading text-h3">{p.title}</h3>
                  <p className="mt-2 text-ink/75">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

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
