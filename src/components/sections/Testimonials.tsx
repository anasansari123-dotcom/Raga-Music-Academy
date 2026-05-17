"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="section-padding bg-ivory relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Student Voices"
          title="Stories of Musical Transformation"
          subtitle="Hear from our students who discovered their raga and found their stage."
        />

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl border border-gold/20 bg-white p-8 shadow-xl sm:p-12"
            >
              <Quote className="absolute top-6 right-8 h-12 w-12 text-gold/15" />

              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-gold/30">
                  <Image
                    src={t.image}
                    alt={`${t.name} — ${t.course}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="mb-3 flex justify-center gap-1 sm:justify-start">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-dark-soft/85 italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="mt-6">
                    <p className="heading-display text-xl font-semibold text-dark">
                      {t.name}
                    </p>
                    <p className="text-sm text-gold-dark">{t.course}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-gold/30 p-3 text-gold-dark transition-all hover:bg-gold/10 hover:glow-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-gold" : "w-2 bg-gold/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-gold/30 p-3 text-gold-dark transition-all hover:bg-gold/10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
