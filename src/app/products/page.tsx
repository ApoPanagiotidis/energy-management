import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Monitor, Radio, Workflow } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Compare KDK three-phase energy meters and the Modbus converter from Apollo Green Solutions. Explore specifications and discuss your facility’s requirements.",
};

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our products"
        title="Good energy decisions start with the right connections."
        description="Explore three-phase meters and communication hardware for your facility. Compare the essentials, then talk to our team about bringing your energy data together."
      />
      <section aria-labelledby="catalog-heading" className="border-t border-brand/15 bg-accent/30">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="catalog-heading" className="text-3xl font-medium tracking-tight text-brand">Metering & connectivity</h2>
            <p className="font-mono text-xs text-brand">{products.length} products · KDK hardware</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      <section aria-labelledby="system-heading" className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase">Beyond the meter</p>
            <h2 id="system-heading" className="mt-4 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">Connect the hardware.<br />See the whole picture.</h2>
            <p className="mt-5 max-w-lg leading-7 text-white/80">Apollo’s energy management approach connects meters, solar installations, batteries, and equipment with a central dashboard for understanding energy use.</p>
            <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 text-sm font-semibold text-ink transition-colors hover:bg-white motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Discuss your system <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y divide-white/20 border-y border-white/20">
            {[
              { title: "Collect", description: "Bring readings from your energy assets into one system.", icon: Radio },
              { title: "Visualise", description: "Explore consumption through a central cloud dashboard.", icon: Monitor },
              { title: "Plan", description: "Use energy forecasts to support operational decisions.", icon: Workflow },
            ].map(({ title, description, icon: Icon }) => (
              <li key={title} className="flex items-start gap-5 py-7">
                <Icon size={24} className="shrink-0 text-accent" aria-hidden="true" />
                <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 leading-6 text-white/80">{description}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
