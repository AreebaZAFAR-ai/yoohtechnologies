import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

/** Accessible FAQ accordion (native <details>, no JS). Inherits text colour. */
export function FaqList({
  faqs,
  className,
}: {
  faqs: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={cn("border-b border-current/25", className)}>
      {faqs.map((f) => (
        <details key={f.q} className="group border-t border-current/25">
          <summary
            data-cursor="hover"
            className="heading flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-h4 [&::-webkit-details-marker]:hidden"
          >
            {f.q}
            <Plus
              aria-hidden
              className="mt-0.5 size-5 shrink-0 transition-transform duration-500 ease-[var(--ease-expo)] group-open:rotate-45"
            />
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed opacity-80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
