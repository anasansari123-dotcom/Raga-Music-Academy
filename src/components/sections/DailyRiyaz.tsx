"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mic2 } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { dailyRiyaz, siteConfig } from "@/lib/data";
import { images, riyazVideoSrc } from "@/lib/images";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function DailyRiyaz() {
  return (
    <section id="riyaz" className="section-padding relative overflow-hidden bg-gradient-royal">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a227\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-4 py-2"
            >
              <Mic2 size={18} className="text-pink-300" />
              <span className="text-xs uppercase tracking-widest text-ivory/80">
                🎤 Daily Practice · Hindustani Classical
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="heading-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl"
            >
              <span className="text-gradient-gold">{dailyRiyaz.cta}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-lg font-medium text-ivory/90"
            >
              {dailyRiyaz.headline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-3 leading-relaxed text-ivory/70"
            >
              {dailyRiyaz.description}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={4}
              className="mt-4 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-sm text-gold-light"
            >
              👉 {dailyRiyaz.callToAction}
            </motion.p>

            <motion.div variants={staggerContainer} className="mt-8 space-y-3">
              {dailyRiyaz.practices.map((practice, i) => (
                <motion.div
                  key={practice.title}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h4 className="font-semibold text-ivory">{practice.title}</h4>
                    <p className="mt-1 text-sm text-ivory/60">{practice.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={5}
              className="mt-6 flex flex-wrap gap-2"
            >
              {dailyRiyaz.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-ivory/50"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gold/20 bg-white/5 p-8 backdrop-blur-md lg:sticky lg:top-65"
          >
            <p className="text-center text-sm text-ivory/60">{dailyRiyaz.followNote}</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {dailyRiyaz.stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  light
                />
              ))}
            </div>
            <motion.a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-magenta px-6 py-4 font-semibold text-white shadow-lg"
            >
              <InstagramIcon className="h-4 w-4 shrink-0" />
              Follow for Daily Riyaz
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 overflow-hidden rounded-2xl border border-gold/25 shadow-2xl shadow-purple-900/40"
            >
              <video
                autoPlay
                muted
                loop
                controls
                playsInline
                preload="auto"
                poster={images.vocalPerformance}
                className="aspect-video w-full bg-dark object-cover"
                aria-label="Female vocalist performing on luxury stage"
              >
                <source src={riyazVideoSrc} type="video/mp4" />
                <source
                  src="/Female_vocalist_on_luxury_stage_202605160153.mp4"
                  type="video/mp4"
                />
              </video>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
