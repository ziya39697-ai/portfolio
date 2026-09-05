import type { MetadataRoute } from "next";
import { projects } from "@/data";

const SITE_URL = "https://jiya-portfolio-hr.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
