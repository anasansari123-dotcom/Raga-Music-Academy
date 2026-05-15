"use client";

import { motion } from "framer-motion";
import {
  Award,
  Users,
  Video,
  Trophy,
  Calendar,
  Spotlight,
  Sunrise,
} from "lucide-react";
import { whyChooseUs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  award: Award,
  users: Users,
  video: Video,
  trophy: Trophy,
  calendar: Calendar,
  spotlight: Spotlight,
  sunrise: Sunrise,
};

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-gradient-luxury relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Raga Veda"
          title="Excellence in Every Note"
          subtitle="Seven pillars that make our academy the premier choice for serious vocal students worldwide."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {whyChooseUs.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Award;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl border border-gold/15 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-gold/20 to-purple/10 p-3 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-gold-dark" />
                </div>
                <h3 className="heading-display text-lg font-semibold text-dark">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-soft/75">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
