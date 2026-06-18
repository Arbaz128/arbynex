import { ImageResponse } from "next/og";

export const alt =
  "ARBYNEX — AI Automation Agency. Your business on autopilot. Free working demo before you pay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRADIENT = "linear-gradient(100deg,#22d3ee 0%,#8b5cf6 50%,#ec4899 100%)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060f",
          backgroundImage:
            "radial-gradient(900px circle at 80% -10%, rgba(139,92,246,0.28), transparent 55%), radial-gradient(700px circle at 0% 110%, rgba(34,211,238,0.18), transparent 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 8,
              backgroundImage: GRADIENT,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ARBYNEX
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "#eef0ff",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Your business,
          </div>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 800, letterSpacing: -2 }}>
            <span style={{ color: "#eef0ff" }}>running on&nbsp;</span>
            <span
              style={{
                backgroundImage: GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              autopilot.
            </span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#9aa0b8",
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            AI chatbots, automation systems & modern websites — a free working
            demo for your business before you pay a dollar.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            {["24/7 instant replies", "30+ hrs saved / mo", "100% leads captured"].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    fontSize: 22,
                    color: "#c9cde3",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 999,
                    padding: "10px 20px",
                  }}
                >
                  {t}
                </div>
              )
            )}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#9aa0b8" }}>
            arbynex.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
