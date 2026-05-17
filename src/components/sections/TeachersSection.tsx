"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Languages, Mic2 } from "lucide-react";
import { teachers } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";

export function TeachersSection() {
  return (
    <section id="teachers" className="section-padding relative overflow-hidden bg-cream">
      <motion.div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <motion.div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />

      <motion.div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Faculty"
          title="Learn From Accomplished Gurus"
          subtitle="Dedicated mentors who guide every student with patience, structure, and the timeless discipline of Indian classical vocal music."
        />

        <motion.div className="space-y-12">
          {teachers.map((teacher) => (
            <motion.article
              key={teacher.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="overflow-hidden rounded-3xl border border-gold/20 bg-white shadow-xl"
            >
              <motion.div className="grid items-stretch lg:grid-cols-2">
                <div className="relative min-h-[360px] lg:min-h-[480px]">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                    priority
                    unoptimized
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-deep/40 via-transparent to-gold/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/20"
                    aria-hidden
                  />
                </div>

                <motion.div
                  variants={slideFromRight}
                  className="flex flex-col justify-center p-8 sm:p-10 lg:p-12"
                >
                  <motion.div
                    variants={fadeUp}
                    custom={0}
                    className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1"
                  >
                    <Mic2 size={14} className="text-gold-dark" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                      Lead Faculty
                    </span>
                  </motion.div>

                  <motion.h3
                    variants={fadeUp}
                    custom={1}
                    className="heading-display text-3xl font-semibold text-dark sm:text-4xl"
                  >
                    {teacher.name}
                  </motion.h3>

                  <motion.p
                    variants={fadeUp}
                    custom={2}
                    className="mt-2 text-base font-medium text-gold-dark"
                  >
                    {teacher.role}
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    custom={3}
                    className="mt-5 flex flex-wrap items-center gap-2"
                  >
                    <Languages size={14} className="text-dark-soft/50" />
                    {teacher.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full border border-purple/15 bg-purple/5 px-3 py-1 text-xs font-medium text-purple-deep"
                      >
                        {lang}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p
                    variants={fadeUp}
                    custom={4}
                    className="mt-6 text-base leading-relaxed text-dark-soft/85"
                  >
                    {teacher.bio}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
