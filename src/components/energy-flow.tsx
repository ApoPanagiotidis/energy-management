"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useInView, useReducedMotion, type AnimationSequence } from "framer-motion";
import { Activity, ArrowDown, ChartNoAxesCombined, Settings2 } from "lucide-react";

const steps = [
  { title: "Measure", description: "Capture energy use at the source", icon: Activity },
  { title: "Understand", description: "Turn readings into useful insights", icon: ChartNoAxesCombined },
  { title: "Improve", description: "Make informed operational decisions", icon: Settings2 },
];

export function EnergyFlow() {
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!inView || hasPlayed.current) return;

    hasPlayed.current = true;
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sequence: AnimationSequence = [];
    steps.forEach((_, index) => {
      sequence.push([
        `[data-energy-highlight="${index}"]`,
        { opacity: [0, 1, 1, 0] },
        { at: index * 1.1, duration: 0.8, times: [0, 0.25, 0.7, 1], ease: "easeInOut" },
      ]);
      if (index < steps.length - 1) {
        sequence.push([
          `[data-energy-arrow="${index}"]`,
          { y: [0, 3, 0], opacity: [0.7, 1, 0.7] },
          { at: index * 1.1 + 0.7, duration: 0.4, ease: "easeInOut" },
        ]);
      }
    });

    const highlights = scope.current.querySelectorAll<HTMLElement>("[data-energy-highlight]");
    const arrows = scope.current.querySelectorAll<HTMLElement>("[data-energy-arrow]");
    const playback = animate(sequence);

    return () => {
      playback.stop();
      // Also reset immediately if reduced motion is enabled mid-sequence.
      highlights.forEach((element) => { element.style.opacity = "0"; });
      arrows.forEach((element) => { element.style.transform = "none"; element.style.opacity = "0.7"; });
    };
  }, [animate, inView, reducedMotion, scope]);

  return (
    <figure ref={scope} className="rounded-3xl border border-white/20 bg-brand p-6 text-white sm:p-8">
      <figcaption>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">The connected approach</p>
        <p className="mt-3 text-2xl font-medium tracking-tight">From measurement to action.</p>
      </figcaption>
      <ol className="mt-8">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <li key={title}>
            {index > 0 && (
              <div className="flex h-9 items-center pl-5 text-accent" aria-hidden="true">
                <span data-energy-arrow={index - 1} className="inline-flex opacity-70"><ArrowDown size={20} /></span>
              </div>
            )}
            <div className="relative flex items-center gap-4 rounded-2xl border border-white/25 bg-white/5 p-4">
              <span data-energy-highlight={index} aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl border border-accent bg-accent/10 opacity-0" />
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
