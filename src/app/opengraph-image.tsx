import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Apollo Green Solutions: Make every watt count.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/apollo-logo.jpg"));

  // ImageResponse renders an image outside the browser and requires inline CSS.
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#000000", color: "#ffffff", borderBottom: "20px solid #020cb1" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 34 }}>
        {/* ImageResponse needs a plain img with embedded bytes, not next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${logo.toString("base64")}`} width={80} height={80} alt="" />
        <span>Apollo Green Solutions</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 94, fontWeight: 700, lineHeight: 1.05, letterSpacing: -4 }}>
        <span>Make every</span>
        <span style={{ color: "#e3f5b9" }}>watt count.</span>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#e3f5b9" }}>Hardware. Software. Energy expertise.</div>
    </div>,
    size,
  );
}
