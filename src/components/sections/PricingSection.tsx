"use client";

import { motion } from "framer-motion";
import { Mic2, GraduationCap } from "lucide-react";
import { courseFees } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp } from "@/lib/motion";

function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

const feeIcons = [Mic2, GraduationCap] as const;

type PricingSectionProps = {
  embedded?: boolean;
};

export function PricingSection({ embedded = false }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className={embedded ? "relative" : "section-padding relative overflow-hidden bg-ivory"}
    >
      {!embedded && (
        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      )}

      <div className={embedded ? "relative" : "relative mx-auto max-w-7xl"}>
        <SectionHeading
          eyebrow="Fees"
          title="Simple, Transparent Pricing"
          subtitle="Starting prices for vocal classes and our 6-month foundation course. Book a free demo for a plan tailored to your goals."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2"
        >
          {courseFees.map((fee, i) => {
            const Icon = feeIcons[i] ?? Mic2;
            const highlighted = i === 1;

            return (
              <motion.div
                key={fee.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className={`relative overflow-hidden rounded-3xl border p-8 text-center transition-shadow ${
                  highlighted
                    ? "border-gold/40 bg-gradient-to-b from-purple-deep to-dark text-ivory shadow-xl shadow-purple/20"
                    : "border-gold/15 bg-white shadow-lg"
                }`}
              >
                <div
                  className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    highlighted ? "bg-gold/20 text-gold-light" : "bg-gold/15 text-gold-dark"
                  }`}
                >
                  <Icon size={24} />
                </div>

                <h3
                  className={`heading-display text-xl font-semibold sm:text-2xl ${
                    highlighted ? "text-ivory" : "text-dark"
                  }`}
                >
                  {fee.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    highlighted ? "text-ivory/70" : "text-dark-soft/75"
                  }`}
                >
                  {fee.subtitle}
                </p>

                <p
                  className={`mt-6 text-xs font-semibold uppercase tracking-[0.2em] ${
                    highlighted ? "text-gold-light" : "text-gold-dark"
                  }`}
                >
                  Starting price
                </p>
                <p
                  className={`heading-display mt-2 text-4xl font-bold sm:text-5xl ${
                    highlighted ? "text-gradient-gold" : "text-purple-deep"
                  }`}
                >
                  from {formatInr(fee.priceInr)}
                  {fee.priceSuffix ? (
                    <span
                      className={`mt-1 block text-base font-semibold tracking-normal sm:text-lg ${
                        highlighted ? "text-ivory/75" : "text-dark-soft/70"
                      }`}
                    >
                      {fee.priceSuffix}
                    </span>
                  ) : null}
                </p>

                <div className="mt-8">
                  <Button
                    href="#demo-booking"
                    variant={highlighted ? "primary" : "secondary"}
                    className="w-full justify-center"
                  >
                    Book Free Demo
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-xl text-center text-sm text-dark-soft/60"
        >
          Final fees depend on course type, batch size, and online or offline mode.
          Contact us for 1-year and 3-year diploma pricing.
        </motion.p>
      </div>
    </section>
  );
}
