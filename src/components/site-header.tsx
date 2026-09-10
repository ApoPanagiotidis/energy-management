"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { navigation } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/25 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5 lg:px-8">
        <Link
          href="/"
          aria-label="Apollo Green Solutions home"
          className="flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Brand />
        </Link>
        <nav aria-label="Main navigation" className="order-last w-full md:order-none md:w-auto">
          <ul className="flex items-center justify-between gap-2 md:gap-6">
            {navigation.map(({ label, href }) => (
              <li key={href} className={href === "/contact" ? "lg:hidden" : undefined}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center border-b-2 px-1 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    pathname === href
                      ? "border-accent text-accent"
                      : "border-transparent text-white hover:border-accent hover:text-accent"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          className="hidden min-h-11 items-center gap-2 rounded-lg border border-white px-4 text-sm font-semibold text-white transition-colors hover:border-accent hover:bg-accent hover:text-ink aria-[current=page]:border-accent aria-[current=page]:bg-accent aria-[current=page]:text-ink motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:inline-flex"
        >
          Get in touch <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
