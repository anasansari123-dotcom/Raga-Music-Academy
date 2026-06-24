import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/components/portal/AuthProvider";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "RAGA VEDA | Music Academy — Carnatic, Hindustani & Bollywood Vocal",
    template: "%s | RAGA VEDA",
  },
  description:
    "Premium certification courses in Carnatic, Hindustani & Bollywood vocal music — online and offline. Awaken your voice through classical music with expert mentors at Raga Veda.",
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
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "RAGA VEDA — Music Academy",
    description:
      "Professional certification courses in Carnatic, Hindustani & Bollywood vocal music — online and offline.",
    type: "website",
    locale: "en_IN",
    siteName: "RAGA VEDA",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "RAGA VEDA — Music Academy",
    description:
      "Professional certification courses in Carnatic, Hindustani & Bollywood vocal music — online and offline.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ivory font-body text-dark antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
