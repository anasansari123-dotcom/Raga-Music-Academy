"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEnd = window.innerHeight * 0.85;
      setScrolled(window.scrollY > heroEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/20 bg-purple-deep/95 py-3 shadow-lg shadow-purple/25 backdrop-blur-md"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="group flex items-center gap-3">
          <Image
            src="/logo1.jpeg"
            alt={siteConfig.name}
            width={100}
            height={100}
            className="h-11 w-auto rounded-sm object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <motion.div
            className="hidden sm:block"
            whileHover={{ x: 2 }}
          >
            <span className="heading-display block text-lg font-semibold tracking-wide text-ivory">
              {siteConfig.name}
            </span>
            {siteConfig.tagline ? (
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-light/80">
                {siteConfig.tagline}
              </span>
            ) : null}
          </motion.div>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-sm text-ivory/80 transition-colors hover:text-gold-light"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-0 bg-gold"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </li>
          ))}
        </ul>

        <motion.div
          className="hidden lg:block"
          whileHover={{ scale: 1.02 }}
        >
          <Button href="#demo-booking" variant="primary">
            Book Free Demo
          </Button>
        </motion.div>

        <button
          type="button"
          className="rounded-lg p-2 text-ivory lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "border-t border-white/10 lg:hidden",
              scrolled
                ? "bg-purple-deep/98 backdrop-blur-md"
                : "glass backdrop-blur-xl"
            )}
          >
            <ul className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-ivory/90 hover:bg-white/5 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-4 px-4">
                <Button href="#demo-booking" variant="primary" className="w-full">
                  Book Free Demo
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
