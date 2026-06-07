"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { courseInterestLabels, getContactWhatsAppUrl } from "@/lib/contact-whatsapp";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PaymentCard } from "@/components/ui/PaymentCard";
import { fadeUp } from "@/lib/motion";

type FormStatus = "idle" | "success";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("website") ?? "").trim()) return;

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      course: String(formData.get("course") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.course) return;

    const whatsappUrl = getContactWhatsAppUrl(payload);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setStatus("success");
    form.reset();
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
                Thank you! WhatsApp opened with your details — tap Send there and we
                will reach out within 24 hours.
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
                      className="box-border w-full max-w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none"
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
                      className="box-border w-full max-w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none"
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
                    defaultValue="carnatic"
                    className="box-border w-full max-w-full appearance-none rounded-xl border border-white/15 bg-white/5 bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3 pr-10 text-ivory focus:border-gold/50 focus:outline-none [&>option]:bg-ivory [&>option]:text-dark"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23faf7f2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    }}
                  >
                    {Object.entries(courseInterestLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
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
                    className="box-border w-full max-w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none"
                    placeholder="Tell us about your musical goals..."
                  />
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full max-w-full sm:w-auto"
                  >
                    <Send size={18} />
                    Send
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
