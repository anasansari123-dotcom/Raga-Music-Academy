"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  light?: boolean;
  /** When true, first item starts expanded; when false, all start collapsed */
  defaultOpen?: boolean;
  /** Tighter trigger for course cards — consistent height across a row */
  compact?: boolean;
};

export function Accordion({
  items,
  light = false,
  defaultOpen = false,
  compact = false,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpen ? 0 : null
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-3"
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors duration-300",
              light
                ? "border-white/10 bg-white/5"
                : "border-gold/15 bg-white/60 backdrop-blur-sm"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={cn(
                "flex w-full items-center justify-between gap-3 text-left",
                compact ? "min-h-[3.25rem] px-4 py-3.5" : "gap-4 px-6 py-5",
                light ? "text-ivory" : "text-dark"
              )}
            >
              <span
                className={cn(
                  "heading-display font-medium leading-snug",
                  compact ? "text-sm" : "text-lg"
                )}
              >
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0",
                    light ? "text-gold-light" : "text-gold-dark"
                  )}
                />
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className={cn(
                      "px-6 pb-5 text-sm leading-relaxed",
                      light ? "text-ivory/70" : "text-dark-soft/80"
                    )}
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
