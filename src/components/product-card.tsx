import Link from "next/link";
import { ArrowUpRight, Gauge, Network } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const Icon = product.category === "Communication gateway" ? Network : Gauge;

  return (
    <article aria-labelledby={product.id} className="flex h-full flex-col rounded-2xl border border-brand/20 bg-white p-6 transition-colors hover:border-brand motion-reduce:transition-none sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-brand">
          <Icon size={28} aria-hidden="true" />
        </span>
        <p className="font-mono text-xs tracking-wide text-brand">{product.category}</p>
      </div>
      <h3 id={product.id} className="mt-6 text-2xl leading-tight font-medium tracking-tight text-brand">
        {product.name}
      </h3>
      <p className="mt-4 flex-1 text-base leading-7">{product.description}</p>
      <dl className="mt-7 divide-y divide-brand/15 border-y border-brand/15">
        {product.specifications.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4 py-3 text-sm leading-6">
            <dt className="text-foreground/70">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <Link href="/contact" aria-label={`Enquire about ${product.name}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-ink motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          Enquire <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <a href={product.sourceUrl} aria-label={`Full specifications for ${product.name} on Apollo’s website`} className="inline-flex min-h-11 items-center gap-1 rounded text-sm text-brand underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          Full specifications <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
