import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { ArrowUpRight, MapPin, Target } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { team } from "@/lib/team";

export const metadata = pageMetadata(
  "About",
  "Meet the Apollo Green Solutions team and discover how our work in Germany and Greece connects energy hardware, software, and consulting.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Apollo Green Solutions"
        title="Engineering a clearer energy future."
        description="We bring physical infrastructure and digital insight together, helping businesses understand their energy and put that knowledge to work."
      />
      <section aria-labelledby="story-heading" className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 sm:pb-24 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-8">
        <div className="border-t border-brand/20 pt-8">
          <p className="font-mono text-xs tracking-widest text-brand uppercase">Our story</p>
          <h2 id="story-heading" className="mt-4 text-3xl font-medium tracking-tight text-brand">From solar to connected systems.</h2>
          <p className="mt-5 leading-8">Rafail Kasapis founded Apollo Green Solutions in January 2023. Starting with photovoltaic installations, the company grew into software development and energy consulting, with operations in Germany and Greece.</p>
          <p className="mt-4 leading-8">Today, our work combines hardware and software to help medium and large businesses improve how they manage energy.</p>
        </div>
        <aside aria-label="Company at a glance" className="rounded-3xl bg-brand p-8 text-white">
          <MapPin size={28} className="text-accent" aria-hidden="true" />
          <p className="mt-5 text-2xl font-medium tracking-tight">Two countries.<br />One connected approach.</p>
          <dl className="mt-6 divide-y divide-white/25">
            <div className="py-4"><dt className="text-xs text-accent">Founded</dt><dd className="mt-1 font-medium">January 2023</dd></div>
            <div className="py-4"><dt className="text-xs text-accent">Operations</dt><dd className="mt-1 font-medium">Germany & Greece</dd></div>
          </dl>
        </aside>
      </section>
      <section aria-labelledby="mission-heading" className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
          <div><Target size={32} className="text-accent" aria-hidden="true" /><h2 id="mission-heading" className="mt-5 font-mono text-sm tracking-widest text-accent uppercase">Our mission</h2></div>
          <div>
            <p className="text-3xl leading-snug font-medium tracking-tight text-balance sm:text-4xl">Make efficient energy management something every enterprise can act on.</p>
            <p className="mt-6 max-w-2xl leading-8 text-white/80">We connect measurement with understanding, giving organisations practical tools to use energy more efficiently and pursue their sustainability goals.</p>
          </div>
        </div>
      </section>
      <section aria-labelledby="team-heading" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
          <p className="font-mono text-xs tracking-widest text-brand uppercase">The people behind Apollo</p>
          <h2 id="team-heading" className="mt-4 text-3xl font-medium tracking-tight text-brand sm:text-4xl">Meet our team.</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(({ name, role, initials }) => (
              <li key={name}>
                <Reveal className="h-full rounded-2xl border border-brand/20 p-6">
                <div aria-hidden="true" className="flex size-16 items-center justify-center rounded-2xl bg-accent font-mono text-xl text-brand">{initials}</div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-brand">{name}</h3>
                <p className="mt-2 text-sm leading-6">{role}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="about-contact-heading" className="bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 px-6 py-14 sm:py-16 lg:flex-row lg:items-center lg:px-8">
          <h2 id="about-contact-heading" className="max-w-xl text-3xl leading-tight font-medium tracking-tight text-balance text-brand">Let’s talk about what comes next for your facility.</h2>
          <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-ink motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">Talk to our team <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
