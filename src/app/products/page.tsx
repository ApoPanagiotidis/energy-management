import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore energy monitoring products from Apollo Green Solutions for industrial and commercial facilities.",
};

export default function ProductsPage() {
  return (
    <PageIntro
      eyebrow="Our products"
      title="Connected tools for a clearer energy picture."
      description="Bring energy monitoring into your daily operations with connected meters, gateways, and insights designed for industrial and commercial facilities."
    />
  );
}
