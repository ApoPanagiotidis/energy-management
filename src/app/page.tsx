import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export default function Home() {
  return (
    <div className="flex-1 bg-ink text-white">
      <PageIntro
        tone="dark"
        eyebrow="Energy intelligence for industry"
        title="Understand your energy. Improve your impact."
        description="Apollo Green Solutions helps industrial and commercial teams monitor energy use, uncover waste, and make more informed decisions with connected monitoring solutions."
      />
      <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24 lg:px-8">
        <Link
          href="/products"
          className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-accent px-6 font-semibold text-ink transition-colors hover:bg-white motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Explore our products <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
