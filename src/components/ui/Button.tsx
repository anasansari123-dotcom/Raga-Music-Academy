"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark font-semibold shadow-lg shadow-gold/25 hover:shadow-gold/40",
  secondary:
    "bg-gradient-to-r from-purple-deep via-purple to-magenta text-ivory font-semibold shadow-lg shadow-purple/30",
  outline:
    "border-2 border-gold/60 text-gold-light hover:bg-gold/10 backdrop-blur-sm",
  ghost: "text-ivory/90 hover:text-gold-light hover:bg-white/5",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide transition-all duration-300",
    variants[variant],
    disabled && "pointer-events-none opacity-60",
    className
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
