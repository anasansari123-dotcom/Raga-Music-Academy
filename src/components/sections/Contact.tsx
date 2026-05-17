"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      course: String(formData.get("course") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Could not send your message. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Could not send your message. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-gradient-royal">
      <motion.div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(157,78,221,0.2),transparent_60%)]" />

      <motion.div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Begin Your Musical Journey"
          subtitle="Book a free demo, ask about courses, or join our community — we're here to guide every step."
          light
        />

        <motion.div className="grid gap-10 lg:grid-cols-2">
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass relative rounded-3xl p-8"
          >
            {status === "success" ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-lg text-gold-light"
              >
                Thank you! Your inquiry was sent to {siteConfig.email}. We&apos;ll reach out within
                24 hours.
              </motion.p>
            ) : (
              <>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                  aria-hidden
                />

                <motion.div className="grid gap-5 sm:grid-cols-2">
                  <motion.div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs uppercase tracking-wider text-ivory/60"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      type="text"
                      disabled={status === "loading"}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs uppercase tracking-wider text-ivory/60"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      required
                      type="email"
                      disabled={status === "loading"}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none disabled:opacity-60"
                      placeholder="you@email.com"
                    />
                  </motion.div>
                </motion.div>

                <motion.div className="mt-5">
                  <label
                    htmlFor="contact-course"
                    className="mb-2 block text-xs uppercase tracking-wider text-ivory/60"
                  >
                    Course Interest
                  </label>
                  <select
                    id="contact-course"
                    name="course"
                    required
                    disabled={status === "loading"}
                    defaultValue="carnatic"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory focus:border-gold/50 focus:outline-none disabled:opacity-60"
                  >
                    <option value="carnatic">Carnatic Classical</option>
                    <option value="hindustani">Hindustani Classical</option>
                    <option value="bollywood">Bollywood / Filmy</option>
                    <option value="bhajans">Bhajans & Shlokas</option>
                  </select>
                </motion.div>

                <motion.div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs uppercase tracking-wider text-ivory/60"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    disabled={status === "loading"}
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none disabled:opacity-60"
                    placeholder="Tell us about your musical goals..."
                  />
                </motion.div>

                {status === "error" && (
                  <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                  </p>
                )}

                <motion.div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </Button>
                </motion.div>
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
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gold">
                    <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-light">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-ivory/75">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gold">
                    <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-gold-light">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-ivory/75">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gold">
                    <InstagramIcon className="h-3.5 w-3.5" />
                  </span>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-light"
                  >
                    @ragavedamusicacademy
                  </a>
                </li>
              </ul>
              <motion.div className="mt-5 border-t border-white/10 pt-5">
                <p className="mb-3 text-xs uppercase tracking-wider text-ivory/50">
                  Follow us
                </p>
                <SocialLinks />
              </motion.div>
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
              <MessageCircle size={20} strokeWidth={2} />
              Chat on WhatsApp
            </motion.a>

            <motion.div variants={fadeUp} custom={2} className="glass rounded-2xl p-6">
              <h3 className="heading-display mb-3 text-lg font-semibold text-ivory">
                Newsletter
              </h3>
              <p className="mb-4 text-sm text-ivory/60">
                Receive riyaz tips, course updates, and performance invites.
              </p>
              <motion.div className="flex gap-2">
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
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
