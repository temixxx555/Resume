import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0e0d0b" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M8 24.5 16 8l8 16.5M11.4 19.5h9.2" fill="none" stroke="#ece8df" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="25" cy="7" r="2.6" fill="#ff5b2e" />
        </svg>
      </div>
    ),
    size,
  );
}
