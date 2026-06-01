"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, QrCode } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { getPaymentPageUrl } from "@/lib/payment";
import { cn } from "@/lib/utils";

type PaymentCardProps = {
  className?: string;
  id?: string;
};

export function PaymentCard({ className, id = "payment" }: PaymentCardProps) {
  const paymentUrl = getPaymentPageUrl();
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
        <button
          type="button"
          onClick={copyPaymentLink}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/15 px-4 py-2.5 text-sm font-semibold text-gold-light transition-colors hover:bg-gold/25"
          aria-label="Copy payment link"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy payment link
            </>
          )}
        </button>

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
