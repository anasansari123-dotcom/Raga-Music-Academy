"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={cn(
        "mb-14 w-full min-w-0 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          custom={0}
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.25em]",
            light ? "text-gold-light" : "text-gold-dark"
          )}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className={cn(
          "heading-display break-words text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          light ? "text-ivory" : "text-dark"
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className={cn(
            "mt-4 break-words text-base leading-relaxed sm:text-lg",
            light ? "text-ivory/75" : "text-dark-soft/80"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
