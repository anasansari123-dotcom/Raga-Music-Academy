"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { globalStudents } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function GlobalStudentsSection() {
  return (
    <section
      id="global-students"
      className="section-padding relative overflow-hidden bg-gradient-luxury"
    >
      <motion.div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-purple/15 blur-3xl"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Worldwide Learning"
          title={globalStudents.title}
          subtitle={globalStudents.subtitle}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-display mx-auto -mt-6 mb-10 max-w-3xl text-center text-xl font-semibold text-purple-deep sm:text-2xl"
        >
          {globalStudents.headline}
        </motion.p>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5"
        >
          {globalStudents.regions.map((region, i) => (
            <motion.li
              key={region.name}
              variants={fadeUp}
              custom={i}
              className="group overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-purple-deep/90 via-purple-deep/25 to-transparent"
                  aria-hidden
                />
                <motion.div className="absolute left-3 top-3 z-10 overflow-hidden rounded-md shadow-lg ring-2 ring-white/40 sm:left-4 sm:top-4">
                  <motion.div className="relative h-7 w-10 sm:h-8 sm:w-12">
                    <Image
                      src={region.flagImage}
                      alt={`${region.name} flag`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>
                <motion.div className="absolute bottom-0 left-0 right-0 p-3 text-center sm:p-4">
                  <p className="text-sm font-bold tracking-wide text-white sm:text-base">
                    {region.name}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/80 sm:text-xs">
                    Students
                  </p>
                </motion.div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <motion.div className="inline-flex items-center gap-2 text-sm font-medium text-dark-soft">
            <Globe2 size={18} className="text-gold-dark" />
            <span>Flexible timings + cultural learning</span>
          </motion.div>
          <Button href="#demo-booking" variant="primary">
            Book a Free Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
