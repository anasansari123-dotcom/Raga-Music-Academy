"use client";

import { motion } from "framer-motion";
import { Music, Sparkles } from "lucide-react";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + (i * 7) % 80}%`,
  y: `${15 + (i * 11) % 70}%`,
  delay: i * 0.4,
  size: i % 3 === 0 ? 20 : 14,
}));

export function MusicParticles({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-gold-light/30"
          style={{ left: p.x, top: p.y }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + (p.id % 3),
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.id % 2 === 0 ? (
            <Music size={p.size} />
          ) : (
            <Sparkles size={p.size} />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
