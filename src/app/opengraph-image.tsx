import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "YOOH Technologies — Software development, AI automation and digital marketing";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Software · AI · Digital Growth",
    title: "Custom software, web development & AI solutions for growing businesses",
  });
}
