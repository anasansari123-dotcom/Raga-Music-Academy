"use client";

import { motion } from "framer-motion";
import { IndianRupee, Tag } from "lucide-react";
import { classicalPricing } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp } from "@/lib/motion";

function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

type PricingSectionProps = {
  embedded?: boolean;
};

export function PricingSection({ embedded = false }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className={embedded ? "relative" : "section-padding bg-ivory relative overflow-hidden"}
    >
      {!embedded && (
        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      )}

      <div className={embedded ? "relative" : "relative mx-auto max-w-7xl"}>
        <SectionHeading
          eyebrow="Investment"
          title="Course Fees — Carnatic & Hindustani"
          subtitle="Transparent pricing for our classical certification programs. Limited-time offer prices available — book a free demo to enroll."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {classicalPricing.map((tier, i) => (
            <motion.div
              key={tier.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -8 }}
              className={`relative overflow-hidden rounded-3xl border p-8 transition-shadow ${
                i === 1
                  ? "border-gold/40 bg-gradient-to-b from-purple-deep to-dark text-ivory shadow-xl shadow-purple/20"
                  : "border-gold/15 bg-white shadow-lg"
              }`}
            >
              {i === 1 && (
                <span className="absolute top-4 right-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-dark">
                  Popular
                </span>
              )}

              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                  i === 1 ? "text-gold-light" : "text-gold-dark"
                }`}
              >
                {tier.label}
              </p>
              <h3
                className={`heading-display mt-2 text-2xl font-semibold ${
                  i === 1 ? "text-ivory" : "text-dark"
                }`}
              >
                {tier.duration}
              </h3>

              <div className="mt-6 space-y-3">
                <div className={i === 1 ? "text-ivory/50" : "text-dark-soft/50"}>
                  <p className="text-xs uppercase tracking-wider">Actual Price</p>
                  <p className="mt-1 text-sm line-through">
                    {formatInr(tier.actualInr)} · ${tier.actualUsd} USD
                  </p>
                </div>
                <div>
                  <p
                    className={`flex items-center gap-1 text-xs uppercase tracking-wider ${
                      i === 1 ? "text-gold-light" : "text-gold-dark"
                    }`}
                  >
                    <Tag size={12} />
                    Offer Price
                  </p>
                  <p
                    className={`heading-display mt-1 text-3xl font-bold ${
                      i === 1 ? "text-gradient-gold" : "text-purple-deep"
                    }`}
                  >
                    {formatInr(tier.offerInr)}
                  </p>
                  <p className={`text-sm ${i === 1 ? "text-ivory/70" : "text-dark-soft/70"}`}>
                    ${tier.offerUsd} USD
                  </p>
                </div>
              </div>

              <ul
                className={`mt-6 space-y-2 text-sm ${
                  i === 1 ? "text-ivory/65" : "text-dark-soft/75"
                }`}
              >
                <li className="flex items-center gap-2">
                  <IndianRupee size={14} className="text-gold" />
                  Live online classes
                </li>
                <li className="flex items-center gap-2">
                  <IndianRupee size={14} className="text-gold" />
                  Certified upon completion
                </li>
                <li className="flex items-center gap-2">
                  <IndianRupee size={14} className="text-gold" />
                  Practice material included
                </li>
              </ul>

              <div className="mt-8">
                <Button
                  href="#contact"
                  variant={i === 1 ? "primary" : "secondary"}
                  className="w-full justify-center"
                >
                  Enroll Now
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-dark-soft/60"
        >
          Bollywood, Filmy Music & Bhajans courses — contact us for fee details. All
          prices subject to change. GST may apply for Indian residents.
        </motion.p>
      </div>
    </section>
  );
}
