import { ButtonLink } from "@/components/ui/Button";
import { Cross, LongArrow } from "@/components/ui/Marks";

export default function NotFound() {
  return (
    <section data-theme="paper" className="tex-paper relative flex min-h-[90svh] items-center overflow-hidden bg-paper pt-32 pb-20 text-ink">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 text-ink/50" />
      <div className="container-x relative">
        <p className="label flex items-center gap-3">
          <span className="h-px w-8 bg-current" /> Error 404 — Page not found
        </p>
        <h1 className="display mt-8 text-[clamp(3.5rem,2.5rem+4vw,5rem)] leading-[0.9]">
          Lost<span className="text-green">.</span>
        </h1>
        <p className="mt-8 max-w-md text-lead">
          The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/" variant="ink">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="lime" className="border border-ink">Let&apos;s Talk</ButtonLink>
          <LongArrow className="hidden md:block" />
          <Cross />
        </div>
      </div>
    </section>
  );
}
