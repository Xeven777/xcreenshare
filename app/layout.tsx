import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const mona = Mona_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XcreenShare - Share Your Screen Instantly",
  description:
    "Share your screen instantly with anyone using a simple room code. No downloads or sign-ups required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mona.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
