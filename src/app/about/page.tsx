import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Apollo Green Solutions and our mission to make energy insights useful for industrial and commercial teams.",
};

export default function AboutPage() {
  return (
    <PageIntro
      eyebrow="About Apollo Green Solutions"
      title="Better energy decisions start with understanding."
      description="Our mission is to make energy use visible and understandable, helping businesses build more efficient operations and reduce unnecessary consumption."
    />
  );
}
