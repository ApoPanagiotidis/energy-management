import Link from "next/link";
import { Brand } from "@/components/brand";
import { navigation } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/25 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 py-10 md:flex-row md:items-center lg:px-8">
        <div>
          <Link
            href="/"
            aria-label="Apollo Green Solutions home"
            className="inline-flex rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Brand />
          </Link>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
            Energy insights for more efficient operations.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navigation.map(({ label, href }) => (
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
    </footer>
  );
}
