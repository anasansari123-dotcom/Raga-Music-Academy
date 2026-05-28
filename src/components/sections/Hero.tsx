"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SoundWave } from "@/components/ui/SoundWave";
import { heroVideoSrc } from "@/lib/images";

const MusicParticles = dynamic(
  () =>
    import("@/components/ui/MusicParticles").then((m) => ({
      default: m.MusicParticles,
    })),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-dark">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          aria-hidden
        >
          <source src={heroVideoSrc} type="video/mp4" />
          <source
            src="/Futuristic_music_universe_create._202605160120.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/80 via-purple-deep/70 to-dark/90" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_30%_20%,rgba(157,78,221,0.3),transparent_50%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_80%,rgba(201,162,39,0.18),transparent_50%)]" />

      <MusicParticles className="z-[2]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold-light">
            Premium Music Academy
          </span>
        </motion.div>

        <h1 className="heading-display mx-auto max-w-5xl text-4xl font-semibold leading-[1.15] text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Awaken Your Voice</span>
          <span className="mt-2 block text-gradient-gold">
            Through Classical Music
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg md:text-xl"
        >
          Professional Certification Courses in Carnatic, Hindustani
          &amp; Bollywood Vocal Music — Online &amp; Offline
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#courses" variant="primary">
            Explore Courses
            <ArrowRight size={18} />
          </Button>
          <Button href="#demo-booking" variant="outline">
            <Play size={16} className="fill-current" />
            Book Free Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16"
        >
          <SoundWave className="opacity-60" />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-gold/40 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mx-auto h-2 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
