"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { certificationPrograms } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function CertificationSection() {
  return (
    <section id="certification" className="section-padding relative bg-cream">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Certification"
          title="Recognized Credentials at Every Level"
          subtitle="Structured programs with certificates and diplomas — from your first swara to concert-ready performance."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {certificationPrograms.map((program, i) => (
            <motion.article
              key={program.title}
              variants={fadeUp}
              custom={i}
              className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
            >
              <motion.div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold-dark"
                whileHover={{ scale: 1.05 }}
              >
                {i === 2 ? (
                  <GraduationCap size={24} />
                ) : (
                  <Award size={24} />
                )}
              </motion.div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                {program.duration}
              </p>
              <h3 className="heading-display mt-2 text-xl font-semibold text-dark">
                {program.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dark-soft/85">
                {program.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
