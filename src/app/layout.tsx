import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAGA VEDA | Online Music Academy — Carnatic, Hindustani & Bollywood Vocal",
  description:
    "Premium online certification courses in Carnatic, Hindustani & Bollywood vocal music. Awaken your voice through classical music with expert mentors at Raga Veda.",
  keywords: [
    "Carnatic vocal classes online",
    "Hindustani classical music",
    "Bollywood singing course",
    "Indian classical music academy",
    "Raga Veda",
  ],
  openGraph: {
    title: "RAGA VEDA — Online Music Academy",
    description:
      "Professional online certification courses in Carnatic, Hindustani & Bollywood vocal music.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-ivory font-body text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
