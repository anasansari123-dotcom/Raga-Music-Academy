"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

type PortalShellProps = {
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  children: React.ReactNode;
  userName?: string;
};

export function PortalShell({
  title,
  subtitle,
  navItems,
  children,
  userName,
}: PortalShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-cream to-gold-light/20">
      <header className="border-b border-gold/20 bg-purple-deep/95 text-ivory backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo1.jpeg"
              alt={siteConfig.name}
              width={48}
              height={48}
              className="h-10 w-auto rounded-sm object-contain"
            />
            <div>
              <p className="heading-display text-base font-semibold">{siteConfig.name}</p>
              <p className="text-xs text-gold-light/80">{title}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-gold/20 text-gold-light"
                    : "text-ivory/80 hover:bg-white/5 hover:text-ivory"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {userName ? (
              <span className="text-sm text-ivory/70">Hi, {userName.split(" ")[0]}</span>
            ) : null}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-ivory/90 transition hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm",
                    pathname === item.href
                      ? "bg-gold/20 text-gold-light"
                      : "text-ivory/90 hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm text-ivory/90 hover:bg-white/5"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="heading-display text-3xl font-semibold text-purple-deep">{title}</h1>
          {subtitle ? <p className="mt-2 text-dark-soft/80">{subtitle}</p> : null}
        </div>
        {children}
      </main>
    </div>
  );
}
