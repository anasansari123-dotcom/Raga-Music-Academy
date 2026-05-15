"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-gradient-royal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(157,78,221,0.2),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Begin Your Musical Journey"
          subtitle="Book a free demo, ask about courses, or join our community — we're here to guide every step."
          light
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8"
          >
            {submitted ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-lg text-gold-light"
              >
                Thank you! We&apos;ll reach out within 24 hours.
              </motion.p>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-ivory/60">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-ivory/60">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label className="mb-2 block text-xs uppercase tracking-wider text-ivory/60">
                    Course Interest
                  </label>
                  <select className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory focus:border-gold/50 focus:outline-none">
                    <option value="carnatic">Carnatic Classical</option>
                    <option value="hindustani">Hindustani Classical</option>
                    <option value="bollywood">Bollywood / Filmy</option>
                    <option value="bhajans">Bhajans & Shlokas</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="mb-2 block text-xs uppercase tracking-wider text-ivory/60">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none"
                    placeholder="Tell us about your musical goals..."
                  />
                </div>
                <div className="mt-6">
                  <Button type="submit" variant="primary" className="w-full sm:w-auto">
                    <Send size={18} />
                    Send Message
                  </Button>
                </div>
              </>
            )}
          </motion.form>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} custom={0} className="glass rounded-2xl p-6">
              <h3 className="heading-display mb-4 text-xl font-semibold text-ivory">
                Contact Details
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-ivory/75">
                  <Mail className="h-5 w-5 text-gold" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-light">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-ivory/75">
                  <Phone className="h-5 w-5 text-gold" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-gold-light">
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              custom={1}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-5 font-semibold text-white shadow-lg transition-shadow hover:shadow-[#25D366]/40"
            >
              <MessageCircle size={24} />
              Chat on WhatsApp
            </motion.a>

            <motion.div variants={fadeUp} custom={2} className="glass rounded-2xl p-6">
              <h3 className="heading-display mb-3 text-lg font-semibold text-ivory">
                Newsletter
              </h3>
              <p className="mb-4 text-sm text-ivory/60">
                Receive riyaz tips, course updates, and performance invites.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gold-light"
                >
                  Join
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
