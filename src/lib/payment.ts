import { siteConfig } from "@/lib/data";
import { PRODUCTION_SITE_URL } from "@/lib/site-url";

export function getPaymentPagePath() {
  return siteConfig.payment.pagePath;
}

/** Always your public domain — never Vercel preview URLs with deployer name. */
export function getPaymentPageUrl() {
  const path = getPaymentPagePath();

  if (process.env.NODE_ENV === "development") {
    const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (fromEnv) return `${fromEnv.replace(/\/$/, "")}${path}`;
    return `http://localhost:3000${path}`;
  }

  return `${PRODUCTION_SITE_URL}${path}`;
}

export function getPaymentWhatsAppShareUrl(paymentUrl?: string) {
  const link = paymentUrl ?? getPaymentPageUrl();
  const text = encodeURIComponent(`${siteConfig.payment.shareMessage}\n\n${link}`);
  const phone = siteConfig.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${text}`;
}
