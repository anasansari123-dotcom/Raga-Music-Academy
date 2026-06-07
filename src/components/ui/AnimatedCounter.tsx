"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  light = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35, margin: "0px 0px -40px 0px" });
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isInView || hasRun.current) return;
    hasRun.current = true;

    let frameId = 0;
    let cancelled = false;
    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.round(value * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    setCount(0);
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [mounted, isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p
        className={`heading-display text-4xl font-bold tabular-nums sm:text-5xl ${
          light ? "text-gradient-gold" : "text-gradient-purple"
        }`}
        suppressHydrationWarning
      >
        {count.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p
        className={`mt-2 text-sm uppercase tracking-widest ${
          light ? "text-ivory/60" : "text-dark-soft/60"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}
