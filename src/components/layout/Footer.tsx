import Image from "next/image";
import Link from "next/link";
import { siteConfig, navLinks, courses } from "@/lib/data";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full min-w-0 overflow-x-hidden border-t border-white/10 bg-gradient-royal">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid w-full min-w-0 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <Link href="#home" className="flex min-w-0 flex-wrap items-center gap-3">
              <Image
                src="/logo1.jpeg"
                alt={siteConfig.name}
                width={96}
                height={96}
                className="h-11 w-auto shrink-0 object-contain sm:h-12"
              />
              <div className="min-w-0">
                <span className="heading-display block break-words text-lg font-semibold text-ivory sm:text-xl">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-light/70 sm:text-xs">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="mt-4 break-words text-sm leading-relaxed text-ivory/60">
              Awakening voices through the timeless beauty of Indian classical
              and contemporary vocal music — online, accessible, transformative.
            </p>
          </div>

          <div className="min-w-0">
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

          <div className="min-w-0">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Courses
            </h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.id} className="min-w-0">
                  <Link
                    href={course.href}
                    className="block break-words text-sm text-ivory/65 transition-colors hover:text-gold-light"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Connect
            </h4>
            <SocialLinks />
            <p className="mt-4 break-all text-sm text-ivory/50">{siteConfig.email}</p>
          </div>
        </div>

        <div className="mt-10 flex w-full min-w-0 flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center sm:mt-12 sm:flex-row sm:gap-4 sm:text-left">
          <p className="max-w-full break-words text-xs text-ivory/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-full break-words text-xs text-ivory/40">
            Crafted with devotion to Indian classical music
          </p>
        </div>
      </div>
    </footer>
  );
}
