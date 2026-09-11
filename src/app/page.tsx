import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChartNoAxesCombined,
  Cpu,
  Factory,
  Gauge,
  Layers3,
  Monitor,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";
import { EnergyFlow } from "@/components/energy-flow";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Energy Management",
  "Energy monitoring solutions for industrial and commercial teams. Understand consumption, identify waste, and operate more efficiently.",
  "/",
);

const benefits = [
  {
    title: "See where energy goes",
    description: "Bring consumption into focus across equipment and facilities. Give your team a clearer picture of how your business uses energy.",
    icon: Gauge,
  },
  {
    title: "Find opportunities to improve",
    description: "Understand demand patterns and spot unnecessary consumption, so you can prioritise the changes that matter to your operations.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Put insights to work",
    description: "Use connected monitoring and practical guidance to turn energy data into informed decisions for your facilities.",
    icon: SlidersHorizontal,
  },
];

const solutions = [
  {
    number: "01",
    title: "Connected hardware",
    category: "Measure at the source",
    description: "Capture energy flows with monitoring hardware that connects your physical infrastructure to useful data.",
    icon: Cpu,
  },
  {
    number: "02",
    title: "Intelligent software",
    category: "Make sense of your data",
    description: "Bring energy information together to understand consumption, recognise patterns, and support your next decision.",
    icon: Monitor,
  },
  {
    number: "03",
    title: "Expert services",
    category: "Move forward with guidance",
    description: "Connect your energy goals with technical expertise, from understanding your needs to deployment and ongoing improvement.",
    icon: Wrench,
  },
];

export default function Home() {
  return (
    <div>
      <section aria-labelledby="hero-heading" className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs leading-6 tracking-widest text-accent uppercase">
              Energy intelligence for industry
            </p>
            <h1 id="hero-heading" className="mt-6 text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Make every<br />
              <span className="text-accent">watt count.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-pretty text-white/80">
              Understand your energy. Take control of your impact. Apollo Green
              Solutions brings hardware, software, and expertise together for
              smarter industrial and commercial operations.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="action-link action-button inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-semibold text-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Explore our solutions <ArrowUpRight className="action-arrow" size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="action-link action-button inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/60 px-6 text-sm font-semibold text-white hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Talk to our team <ArrowRight className="action-arrow action-arrow-right" size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <EnergyFlow />
        </div>
        <div className="border-t border-white/25">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-5 px-6 py-6 text-sm lg:px-8">
            <p className="text-white/60">Built for your operations</p>
            <span className="flex items-center gap-3"><Factory size={18} className="text-accent" aria-hidden="true" />Industrial facilities</span>
            <span className="flex items-center gap-3"><Building2 size={18} className="text-accent" aria-hidden="true" />Commercial buildings</span>
            <span className="flex items-center gap-3"><Layers3 size={18} className="text-accent" aria-hidden="true" />Multiple sites</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-xs tracking-widest text-brand uppercase">A clearer picture</p>
              <h2 id="benefits-heading" className="mt-4 text-3xl leading-tight font-medium tracking-tight text-balance text-brand sm:text-4xl">
                Better decisions start<br className="hidden sm:block" /> with better visibility.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 lg:pt-8">
              Energy data should help you act. Connect what happens on the ground
              with the information your team needs to reduce waste and run more
              efficient facilities.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {benefits.map(({ title, description, icon: Icon }) => (
              <Reveal key={title}>
                <article className="border-t border-brand/25 pt-7">
                  <Icon size={28} className="text-brand" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand">{title}</h3>
                  <p className="mt-3 text-base leading-7">{description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="solutions-heading" className="bg-accent">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs tracking-widest text-brand uppercase">One connected approach</p>
              <h2 id="solutions-heading" className="mt-4 max-w-xl text-3xl leading-tight font-medium tracking-tight text-balance text-brand sm:text-4xl">
                The tools and expertise<br className="hidden sm:block" /> to move you forward.
              </h2>
            </div>
            <Link href="/products" className="action-link inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded text-sm font-semibold text-brand underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
              Explore all solutions <ArrowUpRight className="action-arrow" size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {solutions.map(({ number, title, category, description, icon: Icon }) => (
              <Reveal key={title}>
                <article className="h-full rounded-2xl border border-brand/20 bg-white p-7 transition-colors hover:border-brand motion-reduce:transition-none">
                  <div className="flex items-center justify-between text-brand">
                    <Icon size={32} aria-hidden="true" />
                    <span className="font-mono text-xs" aria-hidden="true">/{number}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-medium tracking-tight text-brand">{title}</h3>
                  <p className="mt-2 text-sm font-semibold">{category}</p>
                  <p className="mt-4 leading-7">{description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase">Your next step</p>
            <h2 id="contact-heading" className="mt-4 max-w-2xl text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
              Let’s make your energy<br className="hidden sm:block" /> work smarter.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
              Tell us about your facility and your goals. We’ll help you explore
              the right approach to energy monitoring.
            </p>
          </div>
          <Link href="/contact" className="action-link action-button inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-semibold text-brand hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            Start a conversation <ArrowUpRight className="action-arrow" size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
