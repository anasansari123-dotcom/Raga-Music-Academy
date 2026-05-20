"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { academyAffiliations } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AffiliationsSection() {
  return (
    <section
      id="affiliations"
      className="section-padding relative overflow-hidden bg-ivory"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Recognized Affiliations"
          title="Affiliated with Leading Music Institutions"
          subtitle="Raga Veda is proudly affiliated with established academies for Carnatic and Hindustani classical music — offering students trusted curricula, examinations, and certification pathways."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {academyAffiliations.map((affiliation, i) => (
            <motion.article
              key={affiliation.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center rounded-3xl border border-gold/20 bg-white p-8 text-center shadow-lg transition-shadow hover:border-gold/40 hover:shadow-xl"
            >
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-cream to-white p-4 shadow-inner ring-2 ring-gold/20 transition-transform duration-300 group-hover:scale-105 sm:h-40 sm:w-40">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={affiliation.logo}
                    alt={`${affiliation.name} logo`}
                    fill
                    className="object-contain p-2"
                    sizes="160px"
                    unoptimized
                  />
                </div>
              </div>

              <span
                className={cn(
                  "mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                  affiliation.tradition.includes("Carnatic")
                    ? "bg-purple/10 text-purple-deep"
                    : affiliation.tradition.includes("Hindustani")
                      ? "bg-magenta/10 text-magenta"
                      : "bg-gold/15 text-gold-dark"
                )}
              >
                <Handshake size={12} />
                {affiliation.tradition}
              </span>

              <h3 className="heading-display text-lg font-semibold text-dark sm:text-xl">
                {affiliation.name}
              </h3>
              <p className="mt-1 text-xs font-medium text-gold-dark">
                {affiliation.fullName}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-dark-soft/80">
                {affiliation.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-2xl text-center text-sm text-dark-soft/65"
        >
          Affiliations reflect our commitment to authentic classical training,
          recognized standards, and pathways from foundation to advanced
          diploma-level study.
        </motion.p>
      </div>
    </section>
  );
}
