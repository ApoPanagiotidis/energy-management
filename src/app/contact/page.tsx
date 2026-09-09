import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Apollo Green Solutions to discuss energy monitoring for your industrial or commercial facility.",
};

export default function ContactPage() {
  return (
    <PageIntro
      eyebrow="Contact us"
      title="Let’s talk about your energy needs."
      description="Whether you manage a single facility or multiple sites, start a conversation about understanding your energy use and finding opportunities to improve."
    />
  );
}
