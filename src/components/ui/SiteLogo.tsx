import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  /** Visible logo height — image is cropped to hide the "Online Music Academy" subtitle */
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-10 w-[2.75rem]",
  md: "h-11 w-[3rem]",
};

/** Brand mark from logo1.jpeg, cropped to tanpura + "RAGA VEDA" only (no "Online" subtitle). */
export function SiteLogo({ className, size = "md" }: SiteLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-sm",
        sizeClasses[size],
        className
      )}
      aria-hidden
    >
      <Image
        src="/logo1.jpeg"
        alt=""
        width={120}
        height={120}
        className="absolute top-0 left-1/2 h-[158%] w-auto max-w-none -translate-x-1/2 object-cover object-top"
        priority={size === "md"}
      />
    </span>
  );
}
