import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "PianoOS — Learn Piano Like A Musician",
  description:
    "PianoOS teaches piano through chords, patterns, harmony, and real songs — not just notes and sheet music. Built for adults who want to actually understand music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full antialiased",
        inter.variable,
        fraunces.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background">
        {children}
      </body>
    </html>
  );
}
