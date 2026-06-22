export type PaymentRequestStatus =
  | "pending"
  | "paid"
  | "verified"
  | "rejected";

export type PaymentStatus = "paid" | "verified" | "failed" | "cancelled";

export type UserSummary = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
};

export type PaymentRequestDTO = {
  id: string;
  userId: string;
  user?: UserSummary;
  amount: number;
  description: string;
  status: PaymentRequestStatus;
  dueDate?: string;
  adminNote?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  payment?: PaymentDTO | null;
};

export type PaymentDTO = {
  id: string;
  userId: string;
  user?: UserSummary;
  paymentRequestId: string;
  paymentRequest?: {
    description: string;
    status: PaymentRequestStatus;
  };
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: PaymentStatus;
  receiptNumber: string;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function getStatusLabel(status: PaymentRequestStatus | PaymentStatus) {
  const labels: Record<string, string> = {
    pending: "Pending",
    paid: "Paid — Pending Verification",
    verified: "Verified",
    rejected: "Rejected",
    failed: "Failed",
    cancelled: "Cancelled",
  };
  return labels[status] ?? status;
}

export function getWhatsAppShareUrl(params: {
  userName: string;
  amount: number;
  paymentId: string;
  adminPhone?: string;
}) {
  const message = [
    "Hello Admin, I have completed my payment. Please verify my receipt.",
    `Name: ${params.userName}`,
    `Amount: ₹${params.amount}`,
    `Payment ID: ${params.paymentId}`,
  ].join("\n");

  const phone = params.adminPhone?.replace(/\D/g, "") ?? "919136593977";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
