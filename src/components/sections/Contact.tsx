"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Send, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PaymentCard } from "@/components/ui/PaymentCard";
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
    <section
      id="demo-booking"
      className="section-padding relative w-full min-w-0 overflow-x-hidden bg-gradient-royal"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(157,78,221,0.2),transparent_60%)]" />

      <div className="relative mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeading
          eyebrow="Demo Booking"
          title="Book Your Free Demo Class"
          subtitle="Schedule a free trial, ask about courses, or reach out — we're here to guide every step of your musical journey."
          light
        />

        <div className="grid w-full min-w-0 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex w-full min-w-0 flex-col gap-5 sm:gap-6"
          >
          <motion.form
            onSubmit={handleSubmit}
            className="glass relative h-fit w-full min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8"
          >
            {status === "success" ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="break-words py-10 text-center text-base text-gold-light sm:py-12 sm:text-lg"
              >
                Thank you! We received your inquiry and will reach out on WhatsApp or phone
                within 24 hours.
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

                <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
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
                      className="box-border w-full max-w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="min-w-0">
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
                      className="box-border w-full max-w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none disabled:opacity-60"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="mt-5 min-w-0">
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
                    className="box-border w-full max-w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory focus:border-gold/50 focus:outline-none disabled:opacity-60"
                  >
                    <option value="carnatic">Carnatic Classical</option>
                    <option value="hindustani">Hindustani Classical</option>
                    <option value="bollywood">Bollywood / Filmy</option>
                    <option value="bhajans">Bhajans & Shlokas</option>
                    <option value="western">Western Music Vocal</option>
                  </select>
                </div>

                <div className="mt-5 min-w-0">
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
                    className="box-border w-full max-w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none disabled:opacity-60"
                    placeholder="Tell us about your musical goals..."
                  />
                </div>

                {status === "error" && (
                  <p className="mt-4 break-words rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full max-w-full sm:w-auto"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </Button>
                </div>
              </>
            )}
          </motion.form>

            <motion.div variants={fadeUp} custom={0} className="glass w-full min-w-0 rounded-2xl p-5 sm:p-6">
              <h3 className="heading-display mb-3 text-lg font-semibold text-ivory">
                Newsletter
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-ivory/60">
                Receive riyaz tips, course updates, and performance invites.
              </p>
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="box-border min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none"
                />
                <button
                  type="button"
                  className="w-full shrink-0 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gold-light sm:w-auto"
                >
                  Join
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex w-full min-w-0 flex-col gap-5 sm:gap-6"
          >
            <motion.div variants={fadeUp} custom={0} className="glass w-full min-w-0 rounded-2xl p-5 sm:p-6">
              <h3 className="heading-display mb-4 text-lg font-semibold text-ivory sm:text-xl">
                Contact Details
              </h3>
              <ul className="space-y-4">
                <li className="flex min-w-0 items-start gap-3 text-ivory/75">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gold">
                    <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="min-w-0 break-words text-sm hover:text-gold-light sm:text-base"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex min-w-0 items-start gap-3 text-ivory/75">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gold">
                    <InstagramIcon className="h-3.5 w-3.5" />
                  </span>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 break-words text-sm hover:text-gold-light sm:text-base"
                  >
                    @ragavedamusicacademy
                  </a>
                </li>
              </ul>
            </motion.div>

            <PaymentCard className="h-fit lg:sticky lg:top-28" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
