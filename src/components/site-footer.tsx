import Link from "next/link";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import { Brand } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { navigation } from "@/lib/navigation";

const footerNavigation = [
  ...navigation.filter(({ href }) => href !== "/contact"),
  { label: "Meet our team", href: "/about#team-heading" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/25 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-[0.95fr_0.55fr_1.4fr] lg:gap-12">
          <div>
            <Link
              href="/"
              aria-label="Apollo Green Solutions home"
              className="inline-flex rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Brand />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/80">
              Hardware, software, and expertise for smarter energy decisions.
            </p>
            <div className="mt-6">
              <p className="font-mono text-xs tracking-widest text-accent uppercase">Where we work</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <MapPin size={16} className="shrink-0 text-accent" aria-hidden="true" />
                Germany &amp; Greece
              </p>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-xs tracking-widest text-accent uppercase">Explore</h2>
            <ul className="mt-3 flex flex-col gap-1">
              {footerNavigation.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center rounded text-sm text-white/80 transition-colors hover:text-accent motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rounded-3xl border border-white/15 bg-brand p-6 sm:col-span-2 sm:p-8 lg:col-span-1">
            <Reveal>
              <p className="font-mono text-xs tracking-widest text-accent uppercase">Energy intelligence</p>
              <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight">Make every watt count.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
                Find the tools to understand your energy use and take the next step toward more efficient operations.
              </p>
              <Link href="/products" className="action-link action-button mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-accent px-5 text-sm font-semibold text-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                Explore our solutions <ArrowUpRight className="action-arrow" size={18} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/20 py-5">
          <p className="text-xs leading-6 text-white/60">Web developer assignment · Apollo Green Solutions</p>
          <a href="#site-top" className="action-link inline-flex min-h-11 items-center gap-2 rounded text-sm text-white/80 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            Back to top <ArrowUp className="action-arrow action-arrow-up" size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
