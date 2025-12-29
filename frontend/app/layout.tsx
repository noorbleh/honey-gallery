import "./globals.css";
import type { Metadata } from "next";
import AmbientAudio from "@/components/AmbientAudio";

export const metadata: Metadata = {
  title: "Honey's Art Gallery",
  description: "Vintage virtual art gallery showcasing graphite & watercolour works.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 🔊 GLOBAL AMBIENT AUDIO (persists across pages) */}
        <AmbientAudio />

        {children}
      </body>
    </html>
  );
}
