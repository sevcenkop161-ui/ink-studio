import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getArtists } from "@/lib/data/artists";

const staticPaths = ["", "/booking", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artists = await getArtists("en");
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({ url: `${siteUrl}/${locale}${path}`, lastModified: now });
    }
    for (const artist of artists) {
      entries.push({
        url: `${siteUrl}/${locale}/artists/${artist.slug}`,
        lastModified: now,
      });
    }
  }

  return entries;
}
