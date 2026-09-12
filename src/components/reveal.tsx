"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";

type RevealDelay = number | { sm?: number; md?: number; lg?: number };

export function Reveal({ children, className, delay = 0 }: {
  children: ReactNode;
  className?: string;
  /** Seconds; responsive values follow Tailwind's sm, md, and lg breakpoints. */
  delay?: RevealDelay;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.08 });
  const reducedMotion = useReducedMotion();
  const hasPlayed = useRef(false);
  // Depend on values so an equivalent delay object cannot interrupt a reveal.
  const baseDelay = typeof delay === "number" ? delay : 0;
  const smallDelay = typeof delay === "number" ? delay : delay.sm ?? 0;
  const mediumDelay = typeof delay === "number" ? delay : delay.md ?? smallDelay;
  const largeDelay = typeof delay === "number" ? delay : delay.lg ?? mediumDelay;

  useEffect(() => {
    if (!inView || hasPlayed.current) return;

    // Server-rendered content is visible. Animate only after hydration/entry.
    // Check the media query here too, before the hook's first client update.
    const reduce = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Treat a reduced-motion visit as already revealed; do not replay later.
    hasPlayed.current = true;
    if (reduce) return;

    const entranceDelay = window.matchMedia("(min-width: 1024px)").matches ? largeDelay
      : window.matchMedia("(min-width: 768px)").matches ? mediumDelay
      : window.matchMedia("(min-width: 640px)").matches ? smallDelay
      : baseDelay;
    const element = scope.current;
    const controls = animate(element, {
      opacity: [0.85, 1],
      y: [16, 0],
    }, { duration: 0.45, delay: entranceDelay, ease: "easeOut" });

    return () => {
      controls.stop();
      // Restore the resting state if preferences change during a reveal.
      element.style.opacity = "1";
      element.style.transform = "none";
    };
  }, [animate, baseDelay, smallDelay, mediumDelay, largeDelay, inView, reducedMotion, scope]);

  return <div ref={scope} data-reveal className={className}>{children}</div>;
}
