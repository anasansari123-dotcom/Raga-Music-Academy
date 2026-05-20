"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { courseCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { PricingSection } from "@/components/sections/PricingSection";
import { cn } from "@/lib/utils";

export function CoursesSection() {
  return (
    <section id="courses" className="section-padding bg-ivory">
      <motion.div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Courses We Offer"
          title="Certification Programs"
          subtitle="Every program includes objectives, curriculum, ragas, and certification — tap one dropdown on each card to view everything."
        />

        <motion.div className="space-y-16">
          {courseCategories.map((category) => (
            <motion.div key={category.id}>
              <motion.div
                id={category.id}
                className={cn(
                  "scroll-mt-28 rounded-3xl p-6 sm:p-8 lg:p-10",
                  category.variant === "dark"
                    ? "bg-gradient-royal border border-white/10"
                    : "border border-purple/10 bg-gradient-to-br from-white to-cream shadow-lg"
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8 max-w-3xl"
                >
                  <h3
                    className={cn(
                      "heading-display text-2xl font-semibold sm:text-3xl",
                      category.variant === "dark" ? "text-ivory" : "text-dark"
                    )}
                  >
                    {category.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed sm:text-base",
                      category.variant === "dark" ? "text-ivory/65" : "text-dark-soft/75"
                    )}
                  >
                    {category.subtitle}
                  </p>
                </motion.div>

                {category.programs.length === 1 && category.image ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid items-stretch gap-6 lg:grid-cols-2 [&>*]:h-full"
                  >
                    <ProgramCard
                      program={category.programs[0]}
                      ragaLabel={category.ragaLabel}
                      variant={category.variant}
                      index={0}
                    />
                    <motion.div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-gold/20 shadow-lg sm:min-h-[360px] lg:min-h-full lg:h-auto">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover"
                      />
                      <motion.div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-deep/35 via-transparent to-gold/10"
                        aria-hidden
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    className={cn(
                      "grid items-stretch gap-6",
                      category.programs.length === 2
                        ? "md:grid-cols-2"
                        : "md:grid-cols-2 xl:grid-cols-3"
                    )}
                  >
                    {category.programs.map((program, i) => (
                      <ProgramCard
                        key={program.id}
                        program={program}
                        ragaLabel={category.ragaLabel}
                        variant={category.variant}
                        index={i}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {category.insertPricingAfter && (
                <motion.div className="mt-16">
                  <PricingSection embedded />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
