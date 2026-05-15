import Image from "next/image";
import Link from "next/link";
import { Share2, Video, Globe, Mail } from "lucide-react";
import { siteConfig, navLinks, courses } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-royal border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="#home" className="flex items-center gap-3">
              <Image
                src="/logo1.jpeg"
                alt={siteConfig.name}
                width={96}
                height={96}
                className="h-12 w-auto object-contain"
              />
              <div>
                <span className="heading-display block text-xl font-semibold text-ivory">
                  {siteConfig.name}
                </span>
                <span className="text-xs uppercase tracking-widest text-gold-light/70">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              Awakening voices through the timeless beauty of Indian classical
              and contemporary vocal music — online, accessible, transformative.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/65 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Courses
            </h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={course.href}
                    className="text-sm text-ivory/65 transition-colors hover:text-gold-light"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                className="rounded-full border border-white/15 p-2.5 text-ivory/70 transition-all hover:border-gold/50 hover:text-gold-light hover:glow-gold"
                aria-label="Instagram"
              >
                <Share2 size={18} />
              </a>
              <a
                href={siteConfig.social.youtube}
                className="rounded-full border border-white/15 p-2.5 text-ivory/70 transition-all hover:border-gold/50 hover:text-gold-light"
                aria-label="YouTube"
              >
                <Video size={18} />
              </a>
              <a
                href={siteConfig.social.facebook}
                className="rounded-full border border-white/15 p-2.5 text-ivory/70 transition-all hover:border-gold/50 hover:text-gold-light"
                aria-label="Facebook"
              >
                <Globe size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-full border border-white/15 p-2.5 text-ivory/70 transition-all hover:border-gold/50 hover:text-gold-light"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="mt-4 text-sm text-ivory/50">{siteConfig.email}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ivory/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-ivory/40">
            Crafted with devotion to Indian classical music
          </p>
        </div>
      </div>
    </footer>
  );
}
