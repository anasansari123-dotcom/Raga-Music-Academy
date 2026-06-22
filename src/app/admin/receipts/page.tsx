"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CheckCircle, Download, Loader2, XCircle } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { StatusBadge } from "@/components/payments/StatusBadge";
import { Button } from "@/components/ui/Button";
import type { PaymentDTO } from "@/lib/payment-types";
import { formatCurrency, formatDateTime } from "@/lib/payment-types";

import { adminNavItems } from "@/lib/admin-nav";

export default function AdminReceiptsPage() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<PaymentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const loadPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load receipts.");
      setPayments(data.payments ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const handleAction = async (id: string, action: "verify" | "reject") => {
    setActionId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/payments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          adminNote: notes[id] ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Action failed.");
      await loadPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <PortalShell
      title="Receipts & Verification"
      subtitle="Review student payments, verify receipts, and add students to WhatsApp groups manually after verification."
      navItems={adminNavItems}
      userName={session?.user?.name ?? undefined}
    >
      {error ? (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-deep" />
        </div>
      ) : payments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gold/30 bg-white/60 p-12 text-center">
          <p className="text-lg font-semibold text-purple-deep">No receipts yet</p>
          <p className="mt-2 text-sm text-dark-soft/70">
            Receipts appear here after students complete Razorpay payments.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {payments.map((payment) => (
            <article
              key={payment.id}
              className="rounded-2xl border border-gold/15 bg-white/80 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-purple-deep">
                    {payment.user?.name ?? "Student"}
                  </p>
                  <p className="text-sm text-dark-soft/70">{payment.user?.email}</p>
                  <p className="text-sm text-dark-soft/70">{payment.user?.phone}</p>
                </div>
                <StatusBadge status={payment.status === "verified" ? "verified" : "paid"} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-dark-soft/60">Amount</p>
                  <p className="font-semibold text-dark">{formatCurrency(payment.amount)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-dark-soft/60">Purpose</p>
                  <p className="text-dark">{payment.paymentRequest?.description ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-dark-soft/60">Receipt No.</p>
                  <p className="text-dark">{payment.receiptNumber}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-dark-soft/60">Razorpay Payment ID</p>
                  <p className="break-all text-dark">{payment.razorpayPaymentId ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-dark-soft/60">Order ID</p>
                  <p className="break-all text-dark">{payment.razorpayOrderId}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-dark-soft/60">Paid At</p>
                  <p className="text-dark">{formatDateTime(payment.createdAt)}</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-dark-soft/80">
                  Admin note
                </label>
                <textarea
                  rows={2}
                  value={notes[payment.id] ?? ""}
                  onChange={(e) =>
                    setNotes((prev) => ({ ...prev, [payment.id]: e.target.value }))
                  }
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold/50"
                  placeholder="Optional note for internal reference"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  href={`/api/receipts/${payment.id}`}
                  variant="outline"
                  className="border-purple/30 text-purple-deep"
                >
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>

                {payment.status === "paid" ? (
                  <>
                    <Button
                      variant="primary"
                      disabled={actionId === payment.id}
                      onClick={() => handleAction(payment.id, "verify")}
                    >
                      {actionId === payment.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      Verify
                    </Button>
                    <Button
                      variant="outline"
                      disabled={actionId === payment.id}
                      onClick={() => handleAction(payment.id, "reject")}
                      className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </>
                ) : payment.verifiedAt ? (
                  <p className="self-center text-sm text-emerald-700">
                    Verified on {formatDateTime(payment.verifiedAt)}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
