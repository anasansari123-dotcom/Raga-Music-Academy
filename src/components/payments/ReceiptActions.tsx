"use client";

import { Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppShareUrl } from "@/lib/payment-types";

type ReceiptActionsProps = {
  paymentId: string;
  userName: string;
  amount: number;
  razorpayPaymentId?: string;
};

export function ReceiptActions({
  paymentId,
  userName,
  amount,
  razorpayPaymentId,
}: ReceiptActionsProps) {
  if (!razorpayPaymentId) return null;

  const whatsappUrl = getWhatsAppShareUrl({
    userName,
    amount,
    paymentId: razorpayPaymentId,
  });

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        href={`/api/receipts/${paymentId}`}
        variant="outline"
        className="border-purple/30 text-purple-deep hover:bg-purple/5"
      >
        <Download className="h-4 w-4" />
        Download Receipt PDF
      </Button>
      <Button
        href={whatsappUrl}
        variant="secondary"
        className="text-sm"
      >
        <MessageCircle className="h-4 w-4" />
        Share Receipt on WhatsApp
      </Button>
    </div>
  );
}
