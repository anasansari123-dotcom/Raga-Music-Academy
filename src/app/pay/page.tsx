import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PaymentCard } from "@/components/ui/PaymentCard";
import { getPaymentPageUrl } from "@/lib/payment";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pay Fees",
  description: `Pay ${siteConfig.name} fees — scan the QR code or share this payment page.`,
  robots: { index: true, follow: true },
};

export default function PayPage() {
  const paymentUrl = getPaymentPageUrl();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-royal">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(157,78,221,0.25),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col px-4 py-10 sm:py-14">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-3 self-center"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/logo1.jpeg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl bg-white object-contain p-1"
          />
          <div className="text-center">
            <span className="heading-display block text-lg font-semibold text-ivory">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-light/80">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        <PaymentCard paymentUrl={paymentUrl} className="shadow-xl" />

        <p className="mt-6 text-center text-sm text-ivory/55">
          <Link href="/#demo-booking" className="text-gold-light underline-offset-2 hover:underline">
            Book a free demo
          </Link>
          {" · "}
          <Link href="/" className="text-gold-light underline-offset-2 hover:underline">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
