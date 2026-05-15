"use client";

import { motion } from "framer-motion";
import { Clock, GraduationCap } from "lucide-react";
import type { MusicProgram } from "@/lib/types";
import { buildProgramAccordionItems } from "@/lib/programAccordion";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

type ProgramCardProps = {
  program: MusicProgram;
  ragaLabel?: "Ragas" | "Raags";
  variant?: "dark" | "light";
  index?: number;
};

export function ProgramCard({
  program,
  ragaLabel = "Ragas",
  variant = "dark",
  index = 0,
}: ProgramCardProps) {
  const isDark = variant === "dark";
  const ragas = program.ragas ?? program.raags ?? [];
  const accordionItems = buildProgramAccordionItems(program, ragaLabel);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "flex h-full flex-col rounded-2xl border transition-shadow hover:shadow-xl",
        isDark
          ? "border-white/10 bg-white/5 backdrop-blur-sm hover:border-gold/25 hover:shadow-gold/10"
          : "border-gold/15 bg-white shadow-md hover:border-gold/30"
      )}
    >
      <div className="border-b border-inherit p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              isDark ? "bg-gold/20 text-gold-light" : "bg-gold/15 text-gold-dark"
            )}
          >
            {program.badge}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px]",
              isDark ? "bg-white/10 text-ivory/70" : "bg-purple/10 text-purple-deep"
            )}
          >
            {program.level}
          </span>
        </div>

        <h4
          className={cn(
            "heading-display mt-3 text-lg font-semibold leading-snug sm:text-xl",
            isDark ? "text-ivory" : "text-dark"
          )}
        >
          {program.title}
        </h4>

        <div
          className={cn(
            "mt-3 flex flex-wrap gap-3 text-xs",
            isDark ? "text-ivory/55" : "text-dark-soft/60"
          )}
        >
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-gold" />
            {program.duration}
          </span>
        </div>

        {program.objectives[0] && (
          <p
            className={cn(
              "mt-3 line-clamp-3 text-sm leading-relaxed",
              isDark ? "text-ivory/65" : "text-dark-soft/75"
            )}
          >
            {program.objectives[0]}
          </p>
        )}

        {ragas.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {ragas.slice(0, 4).map((r) => (
              <span
                key={r}
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px]",
                  isDark ? "bg-gold/10 text-gold-light/90" : "bg-cream text-gold-dark"
                )}
              >
                🎼 {r}
              </span>
            ))}
            {ragas.length > 4 && (
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px]",
                  isDark ? "text-ivory/40" : "text-dark-soft/50"
                )}
              >
                +{ragas.length - 4} more
              </span>
            )}
          </div>
        )}

        {program.songs && program.songs.length > 0 && (
          <p
            className={cn(
              "mt-3 text-xs",
              isDark ? "text-ivory/50" : "text-dark-soft/55"
            )}
          >
            🎵 {program.songs.length} songs in repertoire
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p
          className={cn(
            "mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider",
            isDark ? "text-gold-light/70" : "text-gold-dark"
          )}
        >
          <GraduationCap size={12} />
          Full course details
        </p>
        <Accordion items={accordionItems} light={isDark} />
      </div>
    </motion.article>
  );
}
