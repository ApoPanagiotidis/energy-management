import { Activity, ArrowDown, ChartNoAxesCombined, Settings2 } from "lucide-react";

const steps = [
  { title: "Measure", description: "Capture energy use at the source", icon: Activity },
  { title: "Understand", description: "Turn readings into useful insights", icon: ChartNoAxesCombined },
  { title: "Improve", description: "Make informed operational decisions", icon: Settings2 },
];

export function EnergyFlow() {
  return (
    <figure className="rounded-3xl border border-white/20 bg-brand p-6 text-white sm:p-8">
      <figcaption>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">The connected approach</p>
        <p className="mt-3 text-2xl font-medium tracking-tight">From measurement to action.</p>
      </figcaption>
      <ol className="mt-8">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <li key={title}>
            {index > 0 && (
              <div className="flex h-9 items-center pl-5 text-accent" aria-hidden="true">
                <ArrowDown size={20} />
              </div>
            )}
            <div className="flex items-center gap-4 rounded-2xl border border-white/25 bg-white/5 p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-lg font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-5 text-white/80">{description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-7 border-t border-white/25 pt-5 text-xs leading-5 text-accent">
        Connected hardware. Clear software. Practical guidance.
      </p>
    </figure>
  );
}
