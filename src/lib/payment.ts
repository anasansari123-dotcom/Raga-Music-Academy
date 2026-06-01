import { siteConfig } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-url";

export function getPaymentPagePath() {
  return siteConfig.payment.pagePath;
}

export function getPaymentPageUrl() {
  return `${getSiteUrl()}${getPaymentPagePath()}`;
}

export function getPaymentWhatsAppShareUrl(paymentUrl?: string) {
  const link = paymentUrl ?? getPaymentPageUrl();
  const text = encodeURIComponent(`${siteConfig.payment.shareMessage}\n\n${link}`);
  const phone = siteConfig.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${text}`;
}
