"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Music2 } from "lucide-react";
import { aboutContent } from "@/lib/data";
import { fadeUp, slideFromRight, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function BulletList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          variants={fadeUp}
          custom={i}
          className="flex items-start gap-2 text-sm font-medium text-dark"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

export function About() {
  const { certifications } = aboutContent;

  return (
    <section id="about" className="section-padding relative bg-gradient-luxury">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-magenta/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading title={aboutContent.title} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromRight}
          className="mx-auto max-w-4xl space-y-6"
        >
          {aboutContent.intro.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-lg leading-relaxed text-dark-soft/85"
            >
              {paragraph}
            </p>
          ))}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gold/20 bg-white/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <Music2 size={18} className="text-gold-dark" />
                <h3 className="font-semibold text-dark">Our Training</h3>
              </div>
              <BulletList items={aboutContent.trainingOffered} />
            </div>

            <div className="rounded-2xl border border-purple/15 bg-white/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <Award size={18} className="text-purple-deep" />
                <h3 className="font-semibold text-dark">Students Receive</h3>
              </div>
              <BulletList items={aboutContent.studentBenefits} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="mt-16 space-y-8"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5">
              <GraduationCap size={16} className="text-gold-dark" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                Certifications
              </span>
            </div>
            <h3 className="heading-display text-2xl font-semibold text-dark sm:text-3xl">
              {certifications.title}
            </h3>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-dark-soft/75">
              {certifications.intro}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {certifications.partners.map((partner, i) => (
              <motion.article
                key={partner.name}
                variants={fadeUp}
                custom={i + 1}
                className="flex flex-col rounded-2xl border border-gold/15 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-3 flex items-start gap-2">
                  <BookOpen size={18} className="mt-0.5 shrink-0 text-gold-dark" />
                  <h4 className="font-semibold leading-snug text-dark">{partner.name}</h4>
                </div>
                <p className="text-sm leading-relaxed text-dark-soft/80">
                  {partner.description}
                </p>
                {"highlights" in partner && partner.highlights ? (
                  <ul className="mt-4 space-y-2 border-t border-gold/10 pt-4">
                    {partner.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-xs leading-relaxed text-dark-soft/85"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {"note" in partner && partner.note ? (
                  <p className="mt-4 border-t border-gold/10 pt-4 text-xs leading-relaxed text-dark-soft/70">
                    {partner.note}
                  </p>
                ) : null}
              </motion.article>
            ))}
          </div>

          {aboutContent.closing ? (
            <motion.p
              variants={fadeUp}
              custom={4}
              className="mx-auto max-w-4xl rounded-2xl border border-gold/20 bg-gradient-to-br from-purple-deep/5 to-gold/5 p-6 text-center text-base leading-relaxed text-dark-soft/85 sm:p-8"
            >
              {aboutContent.closing}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
