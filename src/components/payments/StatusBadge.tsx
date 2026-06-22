import { cn } from "@/lib/utils";
import type { PaymentRequestStatus, PaymentStatus } from "@/lib/payment-types";
import { getStatusLabel } from "@/lib/payment-types";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  paid: "bg-blue-100 text-blue-800 border-blue-200",
  verified: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

export function StatusBadge({
  status,
  className,
}: {
  status: PaymentRequestStatus | PaymentStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
        statusStyles[status] ?? "bg-gray-100 text-gray-700",
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}
