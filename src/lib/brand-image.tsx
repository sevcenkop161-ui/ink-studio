import { ImageResponse } from "next/og";

const BG = "#050505";
const ACCENT = "#8b5cf6";
const TEXT = "#f5f5f5";
const TEXT_SECONDARY = "#a1a1aa";

export function renderIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
        }}
      >
        <div
          style={{
            fontSize: size * 0.58,
            fontFamily: "serif",
            color: ACCENT,
            lineHeight: 1,
          }}
        >
          I
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}

export function renderOgImage(title: string, description: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: BG,
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: ACCENT,
              borderRadius: 12,
              fontSize: 32,
              fontFamily: "serif",
              color: BG,
            }}
          >
            I
          </div>
          <div
            style={{
              fontSize: 26,
              color: TEXT_SECONDARY,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Ink Studio
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 60,
            fontFamily: "serif",
            color: TEXT,
            maxWidth: 960,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 26,
            color: TEXT_SECONDARY,
            maxWidth: 820,
          }}
        >
          {description}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
