import { ImageResponse } from "next/og";
import { site } from "./site";

/** Shared 1200×630 Open Graph card in the YOOH palette (green felt, lime mark, paper type). */
export const ogSize = { width: 1200, height: 630 };

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#305429",
          color: "#ede9dc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" fill="#d7f841" />
            <path d="M10 10h13l9 19 9-19h13L38 39v15H26V39z" fill="#305429" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 26, textTransform: "uppercase", letterSpacing: 4, color: "#d7f841" }}>
            {eyebrow}
          </span>
          <span style={{ fontSize: title.length > 48 ? 60 : 72, fontWeight: 700, lineHeight: 1.08 }}>{title}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(237,233,220,0.75)" }}>
          <span>{site.tagline}</span>
          <span>yoohtechnologies.com</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
