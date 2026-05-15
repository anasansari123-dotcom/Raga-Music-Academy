"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  hover?: boolean;
};

export function GlassCard({
  children,
  className,
  light = false,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
      className={cn(
        "rounded-2xl p-6 transition-shadow duration-300",
        light ? "glass-light" : "glass",
        hover && "hover:glow-gold",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
