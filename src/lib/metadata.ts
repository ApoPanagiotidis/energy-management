import type { Metadata } from "next";

export const siteName = "Apollo Green Solutions";
// Set to this assignment's deployment URL when publishing, not Apollo's domain.
const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteUrl = new URL(
  process.env.SITE_URL || (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"),
);

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
