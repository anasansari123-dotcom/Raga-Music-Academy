"use client";

import { motion } from "framer-motion";
import { Languages, Mic2 } from "lucide-react";
import type { Teacher } from "@/lib/data";
import { cn } from "@/lib/utils";

type TeacherSpotlightProps = {
  teacher: Teacher;
  variant?: "dark" | "light";
};

export function TeacherSpotlight({ teacher, variant = "dark" }: TeacherSpotlightProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "mb-8 rounded-2xl border p-6 sm:p-8",
        isDark
          ? "border-gold/25 bg-white/5 backdrop-blur-sm"
          : "border-gold/20 bg-white shadow-md"
      )}
    >
      <motion.div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3 py-1">
        <Mic2 size={14} className="text-gold" />
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider",
            isDark ? "text-gold-light" : "text-gold-dark"
          )}
        >
          Lead Faculty
        </span>
      </motion.div>

      <h4
        className={cn(
          "heading-display text-2xl font-semibold sm:text-3xl",
          isDark ? "text-ivory" : "text-dark"
        )}
      >
        {teacher.name}
      </h4>

      <p
        className={cn(
          "mt-1 text-sm font-medium",
          isDark ? "text-gold-light" : "text-gold-dark"
        )}
      >
        {teacher.role}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Languages
          size={14}
          className={isDark ? "text-ivory/50" : "text-dark-soft/50"}
        />
        {teacher.languages.map((lang) => (
          <span
            key={lang}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              isDark
                ? "border border-white/15 bg-white/10 text-ivory/80"
                : "border border-purple/15 bg-purple/5 text-purple-deep"
            )}
          >
            {lang}
          </span>
        ))}
      </div>

      <p
        className={cn(
          "mt-4 text-sm leading-relaxed sm:text-base",
          isDark ? "text-ivory/70" : "text-dark-soft/80"
        )}
      >
        {teacher.bio}
      </p>
    </motion.div>
  );
}
