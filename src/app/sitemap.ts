import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
import { navigation } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map(({ href }) => ({ url: new URL(href, siteUrl).href }));
}
