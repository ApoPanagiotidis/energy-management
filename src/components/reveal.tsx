"use client";

import { useEffect, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";

export function Reveal({ children, className }: {
  children: ReactNode;
  className?: string;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.08 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    // Server-rendered content is visible. Animate only after hydration/entry.
    // Check the media query here too, before the hook's first client update.
    const reduce = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(scope.current, {
      opacity: reduce ? 1 : [0.85, 1],
      y: reduce ? 0 : [16, 0],
    }, { duration: reduce ? 0 : 0.45, ease: "easeOut" });

    return () => controls.stop();
  }, [animate, inView, reducedMotion, scope]);

  return <div ref={scope} className={className}>{children}</div>;
}
