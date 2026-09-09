import type { Metadata } from "next";

export const siteName = "Apollo Green Solutions";
// Set to this assignment's deployment URL when publishing, not Apollo's domain.
export const siteUrl = new URL(process.env.SITE_URL || "http://localhost:3000");

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      locale: "en_GB",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteName}: Make every watt count.` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: "/opengraph-image", alt: `${siteName}: Make every watt count.` }],
    },
  };
}
