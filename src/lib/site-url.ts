/** Production domain — used when NEXT_PUBLIC_SITE_URL is not set (non-dev builds). */
export const PRODUCTION_SITE_URL = "https://www.ragavedaacademy.com";

/** Canonical site URL for metadata, sitemap, robots, and payment links. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return PRODUCTION_SITE_URL;
}
