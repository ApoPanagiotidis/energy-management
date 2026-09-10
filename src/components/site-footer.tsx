import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Brand } from "@/components/brand";
import { navigation } from "@/lib/navigation";

const footerNavigation = navigation.filter(({ href }) => href !== "/contact");

export function SiteFooter() {
  return (
    <footer className="border-t border-white/25 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:py-16 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            <Link
              href="/"
              aria-label="Apollo Green Solutions home"
              className="inline-flex rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Brand />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
              Connecting hardware, software, and expertise to help your business
              understand energy and operate more efficiently.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-xs tracking-widest text-white/70 uppercase">Explore</h2>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1 md:min-w-40 md:flex-col">
              {footerNavigation.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center rounded text-sm text-accent transition-colors hover:text-white motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/20 py-5">
          <p className="text-sm font-medium text-accent">Make every watt count.</p>
          <a href="#site-top" className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-white/80 transition-colors hover:text-accent motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            Back to top <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
