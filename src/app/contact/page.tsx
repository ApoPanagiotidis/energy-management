import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
import { Building2, Gauge, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Apollo Green Solutions to discuss energy monitoring for your industrial or commercial facility.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact us"
        title="Let’s talk about your energy needs."
        description="Whether you manage a single facility or multiple sites, start a conversation about understanding your energy use and finding opportunities to improve."
      />
      <section className="border-t border-brand/15 bg-accent/30">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs tracking-widest text-brand uppercase">Start with a conversation</p>
            <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight text-balance text-brand">Your facility.<br />Your energy goals.</h2>
            <p className="mt-5 leading-8">Share a little about your project so we can understand what you need. You can ask about a specific meter or discuss a wider monitoring system.</p>
            <ul className="mt-8 space-y-6">
              {[
                { title: "Product enquiries", description: "Meter specifications and connectivity requirements.", icon: Gauge },
                { title: "System integration", description: "Connecting your equipment and energy data.", icon: Network },
                { title: "Facility planning", description: "Monitoring needs for one site or several locations.", icon: Building2 },
              ].map(({ title, description, icon: Icon }) => (
                <li key={title} className="flex items-start gap-4">
                  <Icon size={22} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
                  <div><h3 className="font-semibold text-brand">{title}</h3><p className="mt-1 text-sm leading-6">{description}</p></div>
                </li>
              ))}
            </ul>
            {process.env.NODE_ENV === "development" && <p className="mt-9 rounded-2xl border border-brand/25 p-5 text-sm leading-6">
              <strong className="text-brand">Development preview.</strong> Messages are captured in a local test inbox and are not emailed to Apollo.
            </p>}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
