import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SocialPlatformIcon, type SocialPlatform } from "@/components/ui/SocialIcons";

export type SocialLinkItem = {
  platform: SocialPlatform;
  href: string;
  label: string;
};

export const socialLinkItems: SocialLinkItem[] = [
  {
    platform: "instagram",
    href: siteConfig.social.instagram,
    label: "Instagram",
  },
  {
    platform: "youtube",
    href: siteConfig.social.youtube,
    label: "YouTube",
  },
  {
    platform: "facebook",
    href: siteConfig.social.facebook,
    label: "Facebook",
  },
  {
    platform: "whatsapp",
    href: siteConfig.whatsapp,
    label: "WhatsApp",
  },
  {
    platform: "email",
    href: `mailto:${siteConfig.email}`,
    label: "Email",
  },
];

const hoverStyles: Record<SocialPlatform, string> = {
  instagram: "hover:border-pink-400/40 hover:bg-pink-500/15 hover:text-pink-300",
  youtube: "hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300",
  facebook: "hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300",
  whatsapp: "hover:border-emerald-400/40 hover:bg-emerald-500/15 hover:text-emerald-300",
  email: "hover:border-gold/40 hover:bg-gold/15 hover:text-gold-light",
};

type SocialLinksProps = {
  className?: string;
  /** footer = dark glass pills; light = on ivory/cream sections */
  variant?: "footer" | "light";
};

export function SocialLinks({ className, variant = "footer" }: SocialLinksProps) {
  const isFooter = variant === "footer";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} role="list">
      {socialLinkItems.map((item) => (
        <a
          key={item.platform}
          href={item.href}
          target={item.platform === "email" ? undefined : "_blank"}
          rel={item.platform === "email" ? undefined : "noopener noreferrer"}
          aria-label={item.label}
          role="listitem"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200",
            isFooter
              ? "border-white/10 bg-white/5 text-ivory/75 backdrop-blur-sm"
              : "border-purple/15 bg-white text-dark-soft/70 shadow-sm",
            hoverStyles[item.platform]
          )}
        >
          <SocialPlatformIcon platform={item.platform} />
        </a>
      ))}
    </div>
  );
}
