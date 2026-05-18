"use client";

import { siteConfig } from "@/lib/data";
import { WhatsappIcon } from "@/components/ui/SocialIcons";

export function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-8 sm:right-8"
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
