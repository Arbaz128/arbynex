import { ImageResponse } from "next/og";

// ARBYNEX Apple touch icon (home screen). Brand gradient tile + "A" monogram.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg,#22d3ee 0%,#8b5cf6 52%,#ec4899 100%)",
          color: "#06070f",
          fontSize: 128,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
