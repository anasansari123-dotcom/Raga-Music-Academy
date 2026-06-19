import { siteConfig, aboutContent } from "./data";

export const businessInfo = {
  legalName: "Raga Veda Music Academy",
  brandName: siteConfig.name,
  email: "contact@ragavedaacademy.com",
  phone: siteConfig.phone,
  whatsapp: siteConfig.whatsapp,
  address: "Chennai, Tamil Nadu, India",
  website: siteConfig.siteUrl,
  services:
    "Online and offline vocal music training — Carnatic, Hindustani, Bollywood, Western, Bhajans & Shlokas",
  founder: aboutContent.founder.name,
  lastUpdated: "29 May 2026",
} as const;

export const legalPages = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/shipping-policy", label: "Shipping & Delivery" },
] as const;
