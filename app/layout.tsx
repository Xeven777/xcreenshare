import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemedToaster, ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ThemeToggle";

const mona = Mona_Sans({
  subsets: ["latin"],
  fallback: ["Arial", "system-ui", "sans-serif"],
});

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
          "min-h-screen bg-gradient-to-b from-background to-muted/80 p-8 py-10 flex flex-col justify-between"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <ModeToggle />
          <footer>
            <p className="text-sm text-muted-foreground">
              &copy; 2024 XcreenShare. Made by{" "}
              <a
                href="http://anish7.me"
                target="_blank"
                className="text-primary"
                rel="noopener noreferrer"
              >
                Anish{" "}
              </a>
              ❤️
            </p>
          </footer>
          <ThemedToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
