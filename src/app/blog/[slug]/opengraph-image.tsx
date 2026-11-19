import { ogSize, renderOgImage } from "@/lib/og";
import { getPost, posts } from "@/lib/blog";

export const alt = "YOOH Technologies blog article";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return renderOgImage({ eyebrow: p?.category ?? "Blog", title: p?.title ?? "YOOH Technologies Blog" });
}
