import Image from "next/image";
import Link from "next/link";
import { siteConfig, navLinks, courses } from "@/lib/data";
import { legalPages } from "@/lib/legal";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full min-w-0 overflow-x-hidden border-t border-white/10 bg-gradient-royal">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid w-full min-w-0 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-5">
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
                {siteConfig.tagline ? (
                  <span className="text-[10px] uppercase tracking-widest text-gold-light/70 sm:text-xs">
                    {siteConfig.tagline}
                  </span>
                ) : null}
              </div>
            </Link>
            <p className="mt-4 break-words text-sm leading-relaxed text-ivory/60">
              Awakening voices through the timeless beauty of Indian classical
              and contemporary vocal music — online and offline, accessible,
              transformative.
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Quick Links
            </h3>
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
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Courses
            </h3>
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
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Connect
            </h3>
            <SocialLinks />
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-sm text-ivory/65 transition-colors hover:text-gold-light"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex w-full min-w-0 flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center sm:mt-12 sm:flex-row sm:gap-4 sm:text-left">
          <p className="max-w-full break-words text-xs text-ivory/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-ivory/40 sm:justify-end">
            <Link href="/privacy" className="hover:text-gold-light/80">
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-gold-light/80">
              Terms
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/refund-policy" className="hover:text-gold-light/80">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}