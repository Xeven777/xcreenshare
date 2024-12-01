import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

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
      <body
        className={cn(
          mona.className,
          "min-h-screen bg-gradient-to-b from-background to-muted p-8"
        )}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
