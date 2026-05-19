import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "RAGA VEDA | Online Music Academy — Carnatic, Hindustani & Bollywood Vocal",
    template: "%s | RAGA VEDA",
  },
  description:
    "Premium online certification courses in Carnatic, Hindustani & Bollywood vocal music. Awaken your voice through classical music with expert mentors at Raga Veda.",
  keywords: [
    "Carnatic vocal classes online",
    "Hindustani classical music",
    "Bollywood singing course",
    "Indian classical music academy",
    "Raga Veda",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo1-removebg-preview.png",
    apple: "/logo1-removebg-preview.png",
  },
  openGraph: {
    title: "RAGA VEDA — Online Music Academy",
    description:
      "Professional online certification courses in Carnatic, Hindustani & Bollywood vocal music.",
    type: "website",
    locale: "en_IN",
    siteName: "RAGA VEDA",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "RAGA VEDA — Online Music Academy",
    description:
      "Professional online certification courses in Carnatic, Hindustani & Bollywood vocal music.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a1942",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} min-h-screen bg-ivory font-body text-dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
