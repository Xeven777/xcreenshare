import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/svg+xml";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: "2px",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        X
      </div>
    ),
    {
      ...size,
    }
  );
}
