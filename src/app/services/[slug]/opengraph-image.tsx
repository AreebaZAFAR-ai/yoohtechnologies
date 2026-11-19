import { ogSize, renderOgImage } from "@/lib/og";
import { getService, serviceSeo, services } from "@/lib/services";

export const alt = "YOOH Technologies service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  return renderOgImage({
    eyebrow: "Service",
    title: (s && serviceSeo[s.slug]?.h1) ?? s?.title ?? "Digital services",
  });
}
