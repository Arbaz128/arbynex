import { ImageResponse } from "next/og";

// ARBYNEX favicon — brand gradient tile with a bold "A" monogram.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
          color: "#06070f",
          fontSize: 24,
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
