"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Music2 } from "lucide-react";
import { aboutContent } from "@/lib/data";
import { fadeUp, slideFromRight, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const NAV_OFFSET = 112;

function BulletList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          variants={fadeUp}
          custom={i}
          className="flex items-start gap-2 text-sm font-medium text-dark"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

export function About() {
  const { founder, certifications } = aboutContent;
  const trackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const studentsReceiveRef = useRef<HTMLDivElement>(null);
  const maxYRef = useRef(0);
  const enabledRef = useRef(false);
  const mountedRef = useRef(false);

  const applySlide = useCallback((y: number) => {
    if (!imageRef.current) return;
    imageRef.current.style.transform =
      y > 0 ? `translate3d(0, ${y}px, 0)` : "translate3d(0, 0, 0)";
  }, []);

  const measure = useCallback(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    enabledRef.current = mq.matches;

    if (
      !mq.matches ||
      !imageRef.current ||
      !studentsReceiveRef.current ||
      !contentColRef.current
    ) {
      maxYRef.current = 0;
      applySlide(0);
      return;
    }

    const students = studentsReceiveRef.current;
    const image = imageRef.current;
    const track = trackRef.current;
    if (!track) return;

    const scrollY = window.scrollY;
    const trackDocTop = track.getBoundingClientRect().top + scrollY;
    const studentsDocBottom = students.getBoundingClientRect().bottom + scrollY;
    const studentsBottomFromTrack = studentsDocBottom - trackDocTop;

    maxYRef.current = Math.max(0, studentsBottomFromTrack - image.offsetHeight);
  }, [applySlide]);

  const updateSlide = useCallback(() => {
    if (!mountedRef.current) return;

    if (!enabledRef.current || !trackRef.current) {
      applySlide(0);
      return;
    }

    const trackTop = trackRef.current.getBoundingClientRect().top;
    const scrolled = NAV_OFFSET - trackTop;
    const nextY = Math.min(Math.max(scrolled, 0), maxYRef.current);
    applySlide(nextY);
  }, [applySlide]);

  useEffect(() => {
    mountedRef.current = true;
    let alive = true;

    const refresh = () => {
      if (!alive) return;
      measure();
      updateSlide();
    };

    const rafId = requestAnimationFrame(refresh);

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(refresh);
    });

    const nodes = [
      trackRef.current,
      imageRef.current,
      contentColRef.current,
      studentsReceiveRef.current,
    ];
    for (const node of nodes) {
      if (node) observer.observe(node);
    }

    window.addEventListener("scroll", updateSlide, { passive: true });
    window.addEventListener("resize", refresh);

    const mq = window.matchMedia("(min-width: 1024px)");
    mq.addEventListener("change", refresh);

    return () => {
      alive = false;
      mountedRef.current = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", updateSlide);
      window.removeEventListener("resize", refresh);
      mq.removeEventListener("change", refresh);
    };
  }, [measure, updateSlide]);

  return (
    <section id="about" className="section-padding relative bg-gradient-luxury">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-magenta/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading title={aboutContent.title} />

        <div ref={trackRef} className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
          <div className="relative flex min-h-[320px] w-full pb-10 lg:min-h-0 lg:pb-0">
            <div
              ref={imageRef}
              className="relative h-full w-full will-change-transform transition-transform duration-150 ease-out"
            >
              <div className="relative h-full w-full">
                <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-3xl shadow-2xl lg:min-h-full">
                  <Image
                    src={aboutContent.image}
                    alt={aboutContent.imageAlt}
                    fill
                    className="object-cover object-[center_35%]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={100}
                    unoptimized
                    priority
                  />
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <p className="heading-display text-lg font-semibold text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                      {founder.name}
                    </p>
                    <p className="mt-1 text-sm text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                      {founder.role}
                    </p>
                  </div>
                </div>
                <div className="glass-light absolute -bottom-6 -right-4 max-w-xs rounded-2xl p-5 shadow-xl sm:-right-8">
                  <p className="heading-display text-3xl font-bold text-gold-dark">
                    {aboutContent.stat.value}
                  </p>
                  <p className="text-sm text-dark-soft">{aboutContent.stat.label}</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={contentColRef} className="relative w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideFromRight}
              className="space-y-6"
            >
              {aboutContent.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-lg leading-relaxed text-dark-soft/85"
                >
                  {paragraph}
                </p>
              ))}

              <p className="leading-relaxed text-dark-soft/75">{founder.bio}</p>
              <p className="leading-relaxed text-dark-soft/75">
                {aboutContent.teachingApproach}
              </p>

              <div className="rounded-2xl border border-gold/20 bg-white/60 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Music2 size={18} className="text-gold-dark" />
                  <h3 className="font-semibold text-dark">Our Training</h3>
                </div>
                <BulletList items={aboutContent.trainingOffered} />
              </div>

              <div
                ref={studentsReceiveRef}
                className="rounded-2xl border border-purple/15 bg-white/60 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Award size={18} className="text-purple-deep" />
                  <h3 className="font-semibold text-dark">Students Receive</h3>
                </div>
                <BulletList items={aboutContent.studentBenefits} />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="mt-16 space-y-8"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5">
              <GraduationCap size={16} className="text-gold-dark" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                Certifications
              </span>
            </div>
            <h3 className="heading-display text-2xl font-semibold text-dark sm:text-3xl">
              {certifications.title}
            </h3>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-dark-soft/75">
              {certifications.intro}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {certifications.partners.map((partner, i) => (
              <motion.article
                key={partner.name}
                variants={fadeUp}
                custom={i + 1}
                className="flex flex-col rounded-2xl border border-gold/15 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-3 flex items-start gap-2">
                  <BookOpen size={18} className="mt-0.5 shrink-0 text-gold-dark" />
                  <h4 className="font-semibold leading-snug text-dark">{partner.name}</h4>
                </div>
                <p className="text-sm leading-relaxed text-dark-soft/80">
                  {partner.description}
                </p>
                {"highlights" in partner && partner.highlights ? (
                  <ul className="mt-4 space-y-2 border-t border-gold/10 pt-4">
                    {partner.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-xs leading-relaxed text-dark-soft/85"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {"note" in partner && partner.note ? (
                  <p className="mt-4 border-t border-gold/10 pt-4 text-xs leading-relaxed text-dark-soft/70">
                    {partner.note}
                  </p>
                ) : null}
              </motion.article>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            custom={4}
            className="mx-auto max-w-4xl rounded-2xl border border-gold/20 bg-gradient-to-br from-purple-deep/5 to-gold/5 p-6 text-center text-base leading-relaxed text-dark-soft/85 sm:p-8"
          >
            {aboutContent.closing}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
