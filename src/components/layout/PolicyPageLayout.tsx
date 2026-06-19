import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/data";
import { businessInfo, legalPages } from "@/lib/legal";
import { cn } from "@/lib/utils";

type PolicyPageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function PolicyPageLayout({
  title,
  description,
  children,
  className,
}: PolicyPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-luxury lotus-pattern">
      <header className="border-b border-gold/15 bg-purple-deep/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo1.jpeg"
              alt={siteConfig.name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg bg-white object-contain p-0.5"
            />
            <div>
              <span className="heading-display block text-base font-semibold text-ivory sm:text-lg">
                {siteConfig.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-gold-light/75">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm text-gold-light underline-offset-2 transition-colors hover:text-ivory hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="mb-8">
          <h1 className="heading-display text-3xl font-semibold text-dark sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-dark/70">
              {description}
            </p>
          ) : null}
          <p className="mt-4 text-xs text-dark/45">
            Last updated: {businessInfo.lastUpdated}
          </p>
        </div>

        <article
          className={cn(
            "glass-light rounded-2xl p-6 shadow-sm sm:p-8 lg:p-10",
            "[&_h2]:heading-display [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-dark [&_h2:first-child]:mt-0",
            "[&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-dark",
            "[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-dark/80",
            "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-dark/80",
            "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:text-dark/80",
            "[&_a]:text-purple [&_a]:underline-offset-2 hover:[&_a]:underline",
            "[&_strong]:font-semibold [&_strong]:text-dark",
            className
          )}
        >
          {children}
        </article>

        <nav
          aria-label="Legal pages"
          className="mt-10 rounded-2xl border border-gold/15 bg-cream/60 p-6"
        >
          <h2 className="heading-display text-sm font-semibold uppercase tracking-widest text-purple">
            Related Pages
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {legalPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-sm text-dark/70 underline-offset-2 hover:text-purple hover:underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
