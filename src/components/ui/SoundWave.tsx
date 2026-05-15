"use client";

import { motion } from "framer-motion";

const bars = 24;

export function SoundWave({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-gold-dark to-gold-light"
          animate={{
            height: [8, 12 + Math.random() * 28, 8],
          }}
          transition={{
            duration: 0.8 + (i % 5) * 0.1,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  );
}
