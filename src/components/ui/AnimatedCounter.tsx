"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
};

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  light = false,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p
        className={`heading-display text-4xl font-bold sm:text-5xl ${
          light ? "text-gradient-gold" : "text-gradient-purple"
        }`}
      >
        {count.toLocaleString()}
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
