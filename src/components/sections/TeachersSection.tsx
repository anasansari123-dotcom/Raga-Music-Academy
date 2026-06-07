"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Languages, MapPin, Mic2, Sparkles } from "lucide-react";
import { teachers, type Teacher } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, slideFromRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

function TeacherPortrait({ teacher }: { teacher: Teacher }) {
  if (!teacher.image) {
    return (
      <div className="relative flex min-h-[320px] items-center justify-center bg-gradient-to-br from-purple-deep via-magenta/80 to-gold-dark sm:min-h-[380px] lg:min-h-[440px]">
        <span className="heading-display text-6xl font-semibold text-white/90 sm:text-7xl">
          {teacher.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
    );
  }

  const fitContain = teacher.imageFit === "contain";

  return (
    <motion.div
      className={cn(
        "relative min-h-[320px] sm:min-h-[380px] lg:min-h-[440px]",
        fitContain && "bg-gradient-to-b from-ivory via-cream to-cream"
      )}
    >
      <Image
        src={teacher.image}
        alt={teacher.name}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn(
          fitContain ? "object-contain p-3 sm:p-4" : "object-cover",
          teacher.imagePosition ??
            (teacher.founder ? "object-[center_25%]" : "object-center")
        )}
        priority={teacher.founder}
        loading={teacher.founder ? undefined : "lazy"}
        quality={teacher.founder ? 100 : 75}
        unoptimized={teacher.founder}
      />
      {!teacher.founder && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-deep/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/30"
          aria-hidden
        />
      )}
    </motion.div>
  );
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  const isFounder = teacher.founder;
  const imageRight = isFounder || teacher.imageRight;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(
        "overflow-hidden rounded-3xl border bg-white shadow-xl transition-shadow hover:shadow-2xl",
        isFounder
          ? "border-gold/50 shadow-gold/10 ring-1 ring-gold/25"
          : "border-gold/20"
      )}
    >
      <motion.div
        className={cn(
          "grid items-stretch lg:grid-cols-2",
          imageRight && "lg:[&>*:first-child]:order-2"
        )}
      >
        <TeacherPortrait teacher={teacher} />

        <motion.div
          variants={slideFromRight}
          className={cn(
            "relative flex flex-col justify-center p-7 sm:p-9 lg:p-11",
            imageRight && "lg:border-r lg:border-gold/15"
          )}
        >
          {isFounder && (
            <motion.div
              className="absolute left-0 top-8 hidden h-24 w-1 rounded-full bg-gradient-to-b from-gold via-gold-light to-transparent lg:block"
              aria-hidden
            />
          )}

          <motion.div
            variants={fadeUp}
            custom={0}
            className={cn(
              "mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5",
              isFounder
                ? "border-gold/40 bg-gradient-to-r from-gold/20 to-gold/5"
                : "border-gold/25 bg-gold/10"
            )}
          >
            {isFounder ? (
              <Sparkles size={14} className="text-gold-dark" />
            ) : (
              <Mic2 size={14} className="text-gold-dark" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
              {teacher.badge}
            </span>
          </motion.div>

          <motion.h3
            variants={fadeUp}
            custom={1}
            className="heading-display text-2xl font-semibold text-dark sm:text-3xl lg:text-4xl"
          >
            {teacher.name}
          </motion.h3>

                  <motion.p
                    variants={fadeUp}
                    custom={2}
                    className="mt-2 text-base font-medium text-gold-dark sm:text-lg"
                  >
                    {teacher.role}
                  </motion.p>

                  {teacher.tagline && (
                    <motion.p
                      variants={fadeUp}
                      custom={2}
                      className="mt-1 text-sm tracking-wide text-dark-soft/75"
                    >
                      {teacher.tagline}
                    </motion.p>
                  )}

                  {teacher.location && (
                    <motion.p
                      variants={fadeUp}
                      custom={2}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-dark-soft/70"
                    >
                      <MapPin size={14} className="shrink-0 text-gold-dark" />
                      {teacher.location}
                    </motion.p>
                  )}

                  {teacher.highlights && teacher.highlights.length > 0 && (
            <motion.ul
              variants={fadeUp}
              custom={3}
              className="mt-5 flex flex-wrap gap-2"
            >
              {teacher.highlights.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple/15 bg-purple/5 px-3 py-1 text-xs font-medium text-purple-deep"
                >
                  <Award size={12} className="shrink-0 text-gold-dark" />
                  {item}
                </li>
              ))}
            </motion.ul>
          )}

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-5 flex flex-wrap items-center gap-2"
          >
            <Languages size={14} className="text-dark-soft/50" aria-hidden />
            {teacher.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-gold/20 bg-ivory px-3 py-1 text-xs font-medium text-dark-soft"
              >
                {lang}
              </span>
            ))}
          </motion.div>

                  <motion.p
                    variants={fadeUp}
                    custom={5}
                    className="mt-6 border-t border-gold/15 pt-6 text-base leading-relaxed text-dark-soft/90"
                  >
                    {teacher.bio}
                  </motion.p>

                  {teacher.credentials && teacher.credentials.length > 0 && (
                    <motion.ul
                      variants={fadeUp}
                      custom={6}
                      className="mt-5 space-y-2.5 border-t border-gold/10 pt-5"
                    >
                      {teacher.credentials.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-dark-soft/85"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
      </motion.div>
    </motion.article>
  );
}

export function TeachersSection() {
  return (
    <section id="teachers" className="section-padding relative overflow-hidden bg-cream">
      <motion.div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-magenta/10 blur-3xl"
        aria-hidden
      />

      <motion.div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Teacher"
          title="Faculty Head & Expert Mentors"
          subtitle="Learn from accomplished gurus who guide every student with patience, structure, and the timeless discipline of Indian classical vocal music."
        />

        <motion.div className="space-y-10 lg:space-y-14">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.name} teacher={teacher} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
