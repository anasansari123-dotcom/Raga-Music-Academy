"use client";

import Image from "next/image";
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
        "mb-8 grid items-stretch gap-6 overflow-hidden rounded-2xl border lg:grid-cols-2",
        isDark
          ? "border-gold/25 bg-white/5 backdrop-blur-sm"
          : "border-gold/20 bg-white shadow-md"
      )}
    >
      <motion.div className="relative min-h-[320px] lg:min-h-full">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover object-top"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-deep/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-purple-deep/20"
          aria-hidden
        />
      </motion.div>

      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3 py-1">
          <Mic2 size={14} className="text-gold" />
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              isDark ? "text-gold-light" : "text-gold-dark"
            )}
          >
            Lead Faculty
          </span>
        </div>

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
      </div>
    </motion.div>
  );
}
