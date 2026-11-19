import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Crumb } from "@/lib/seo";

/**
 * Visible breadcrumb trail. Pair it with `breadcrumbSchema()` in the page's JSON-LD graph
 * (same crumbs) so the structured data always matches what users see.
 */
export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-small text-ink/55", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
