"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Link2, QrCode, Share2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { getPaymentWhatsAppShareUrl } from "@/lib/payment";
import { cn } from "@/lib/utils";

type PaymentCardProps = {
  className?: string;
  paymentUrl: string;
  id?: string;
};

export function PaymentCard({ className, paymentUrl, id = "payment" }: PaymentCardProps) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const copyPaymentLink = async () => {
    try {
      await navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this payment link:", paymentUrl);
    }
  };

  const whatsappSharePaymentLink = getPaymentWhatsAppShareUrl(paymentUrl);

  return (
    <div id={id} className={cn("glass w-full min-w-0 rounded-2xl p-5 sm:p-6", className)}>
      <div className="mb-4 flex items-center gap-2">
        <QrCode size={20} className="text-gold-light" />
        <h3 className="heading-display text-lg font-semibold text-ivory sm:text-xl">
          {siteConfig.payment.title}
        </h3>
      </div>

      <p className="mb-4 text-sm text-ivory/70">{siteConfig.payment.instruction}</p>

      <div className="mx-auto max-w-[240px] overflow-hidden rounded-2xl bg-white p-3 shadow-lg">
        <Image
          src={siteConfig.payment.qrImage}
          alt={`${siteConfig.name} payment QR code`}
          width={400}
          height={400}
          className="h-auto w-full object-contain"
        />
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-ivory/55">
        {siteConfig.payment.note}
      </p>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ivory/50">
          {siteConfig.payment.linkLabel}
        </p>
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5">
          <Link2 size={16} className="shrink-0 text-gold-light/80" aria-hidden />
          <p className="min-w-0 flex-1 truncate text-sm text-ivory/85" suppressHydrationWarning>
            {paymentUrl}
          </p>
          <button
            type="button"
            onClick={copyPaymentLink}
            className="shrink-0 rounded-lg border border-gold/30 bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold-light transition-colors hover:bg-gold/25"
            aria-label="Copy payment link"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1">
                <Check size={14} />
                Copied
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Copy size={14} />
                Copy
              </span>
            )}
          </button>
        </div>

        <a
          href={whatsappSharePaymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/15 px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-gold/25"
        >
          <Share2 size={16} />
          Share payment link on WhatsApp
        </a>

        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/25"
        >
          Share payment screenshot on WhatsApp
        </a>
      </div>
    </div>
  );
}
