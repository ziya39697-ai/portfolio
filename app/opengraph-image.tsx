import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Jiya Yadav — HR Intern";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #16141F 0%, #1C1824 50%, #2A1F28 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#E4B4B8",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Portfolio · Jiya Yadav
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 980,
            display: "flex",
          }}
        >
          Building Clear Hiring Pipelines From First Contact to Offer
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
            display: "flex",
          }}
        >
          HR Intern · Recruitment · Screening · People Ops
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            display: "flex",
            gap: 12,
            alignItems: "center",
            color: "#E4B4B8",
            fontSize: 22,
          }}
        >
          jiya-portfolio.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
