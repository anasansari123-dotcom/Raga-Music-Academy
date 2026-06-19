import type { MetadataRoute } from "next";
import { legalPages } from "@/lib/legal";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/pay`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...legalPages.map((page) => ({
      url: `${base}${page.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
