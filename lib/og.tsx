import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const font = (file: string) => readFile(path.join(process.cwd(), "assets", "fonts", file));

type OgProps = {
  eyebrow: string;
  title: string;
  /** Word(s) in `title` to set in the serif italic accent. */
  emphasis?: string;
  subtitle?: string;
};

/** One social-card template for the whole site, so every share looks intentional. */
export async function renderOg({ eyebrow, title, emphasis, subtitle }: OgProps) {
  const [bold, medium, serif] = await Promise.all([
    font("geist-latin-700-normal.woff"),
    font("geist-latin-500-normal.woff"),
    font("instrument-serif-latin-400-italic.woff"),
  ]);

  const size = title.length > 46 ? 62 : title.length > 28 ? 80 : 104;
  const parts = emphasis && title.includes(emphasis) ? title.split(emphasis) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0e0d0b",
          backgroundImage:
            "linear-gradient(rgba(236,232,223,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,223,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          color: "#ece8df",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                border: "2px solid rgba(236,232,223,0.35)",
                borderRadius: 8,
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {site.initials}
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 500 }}>{site.displayName}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#9b968a" }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: "#ff5b2e" }} />
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#ff5b2e", textTransform: "uppercase" }}>{eyebrow}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              columnGap: Math.round(size * 0.24),
              fontSize: size,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 1040,
            }}
          >
            {parts ? (
              <>
                <span>{parts[0]}</span>
                <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, fontSize: size * 1.06, letterSpacing: -1.5 }}>
                  {emphasis}
                </span>
                <span>{parts[1]}</span>
              </>
            ) : (
              <span>{title}</span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28, color: "#9b968a" }}>
          <div style={{ display: "flex", maxWidth: 820 }}>{subtitle ?? site.role}</div>
          <div style={{ display: "flex" }}>{site.location}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
