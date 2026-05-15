"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";

export function About() {
  return (
    <section id="about" className="section-padding bg-gradient-luxury relative overflow-hidden">
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-magenta/10 blur-3xl" />
      <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Story"
          title="Where Tradition Meets Modern Excellence"
          subtitle="Raga Veda is a premium online music academy dedicated to preserving and propagating India's rich vocal heritage through world-class digital education."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideFromLeft}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={images.classicalInstruments}
                alt="Classical music instruments"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <motion.div className="absolute inset-0 bg-gradient-to-t from-purple-deep/60 to-transparent" />
            </div>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="glass-light absolute -bottom-6 -right-4 max-w-xs rounded-2xl p-5 shadow-xl sm:-right-8"
            >
              <p className="heading-display text-3xl font-bold text-gold-dark">15+</p>
              <p className="text-sm text-dark-soft/80">Years of Musical Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideFromRight}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-dark-soft/85">
              Founded on the belief that every voice carries a unique raga waiting
              to unfold, Raga Veda offers structured certification programs led by
              accomplished gurus — accessible from anywhere in the world.
            </p>
            <p className="leading-relaxed text-dark-soft/75">
              From the intricate gamakas of Carnatic music to the soulful alaaps of
              Hindustani tradition, from Bollywood stardom to devotional bhajans —
              we nurture complete musicians with daily riyaz, stage training, and
              personalized mentorship.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Live 1-on-1 & Group Classes",
                "Certified Curriculum",
                "Performance Opportunities",
                "Flexible Schedules",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-center gap-2 text-sm font-medium text-dark"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
