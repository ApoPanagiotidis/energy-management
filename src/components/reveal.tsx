"use client";

import { useEffect, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";

export function Reveal({ children, className, onMount = false }: {
  children: ReactNode;
  className?: string;
  onMount?: boolean;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.08 });
  const reducedMotion = useReducedMotion();
  const active = onMount || inView;

  useEffect(() => {
    if (!active) return;

    // Server-rendered content is visible. Animate only after hydration/entry.
    // Check the media query here too, before the hook's first client update.
    const reduce = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(scope.current, {
      opacity: reduce ? 1 : [0.85, 1],
      y: reduce ? 0 : [onMount ? 8 : 16, 0],
    }, { duration: reduce ? 0 : onMount ? 0.25 : 0.45, ease: "easeOut" });

    return () => controls.stop();
  }, [active, animate, onMount, reducedMotion, scope]);

  return <div ref={scope} className={className}>{children}</div>;
}
