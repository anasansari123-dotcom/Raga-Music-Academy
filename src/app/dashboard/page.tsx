"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, CreditCard, Inbox, Loader2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { StatusBadge } from "@/components/payments/StatusBadge";
import { RazorpayCheckout } from "@/components/payments/RazorpayCheckout";
import { ReceiptActions } from "@/components/payments/ReceiptActions";
import type { PaymentRequestDTO } from "@/lib/payment-types";
import { formatCurrency, formatDateTime } from "@/lib/payment-types";

const navItems = [{ href: "/dashboard", label: "My Payments" }];

function EmptyState({ icon: Icon, title, description }: {
  icon: typeof Inbox;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gold/30 bg-white/60 p-12 text-center">
      <Icon className="mx-auto h-10 w-10 text-gold-dark/60" />
      <h3 className="mt-4 text-lg font-semibold text-purple-deep">{title}</h3>
      <p className="mt-2 text-sm text-dark-soft/70">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<PaymentRequestDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/payment-requests");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load payments.");
      setRequests(data.paymentRequests ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const pending = requests.filter((r) => r.status === "pending");
  const others = requests.filter((r) => r.status !== "pending");

  return (
    <PortalShell
      title="Student Dashboard"
      subtitle="View pending fees and download your payment receipts."
      navItems={navItems}
      userName={session?.user?.name ?? undefined}
    >
      {loading ? (
        <div className="flex items-center justify-center py-20 text-purple-deep">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : (
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-purple-deep">Pending Payments</h2>
            {pending.length === 0 ? (
              <EmptyState
                icon={CreditCard}
                title="No pending payments"
                description="When admin adds a fee for you, it will appear here with a Pay Now button."
              />
            ) : (
              <div className="grid gap-4">
                {pending.map((request) => (
                  <article
                    key={request.id}
                    className="rounded-2xl border border-gold/15 bg-white/80 p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-dark-soft/70">Amount due</p>
                        <p className="text-3xl font-semibold text-purple-deep">
                          {formatCurrency(request.amount)}
                        </p>
                        <p className="mt-2 font-medium text-dark">{request.description}</p>
                        {request.dueDate ? (
                          <p className="mt-2 flex items-center gap-2 text-sm text-dark-soft/70">
                            <Calendar className="h-4 w-4" />
                            Due by {formatDateTime(request.dueDate)}
                          </p>
                        ) : null}
                      </div>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="mt-6">
                      <RazorpayCheckout paymentRequest={request} onSuccess={loadRequests} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-purple-deep">Payment History</h2>
            {others.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No receipts yet"
                description="After you complete a payment, your receipt will appear here."
              />
            ) : (
              <div className="grid gap-4">
                {others.map((request) => (
                  <article
                    key={request.id}
                    className="rounded-2xl border border-gold/15 bg-white/80 p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-dark">{request.description}</p>
                        <p className="mt-1 text-2xl font-semibold text-purple-deep">
                          {formatCurrency(request.amount)}
                        </p>
                        <p className="mt-2 text-sm text-dark-soft/70">
                          Requested on {formatDateTime(request.createdAt)}
                        </p>
                        {request.payment?.receiptNumber ? (
                          <p className="mt-1 text-sm text-dark-soft/70">
                            Receipt: {request.payment.receiptNumber}
                          </p>
                        ) : null}
                        {request.payment?.razorpayPaymentId ? (
                          <p className="mt-1 text-sm text-dark-soft/70">
                            Payment ID: {request.payment.razorpayPaymentId}
                          </p>
                        ) : null}
                      </div>
                      <StatusBadge status={request.status} />
                    </div>

                    {request.payment ? (
                      <div className="mt-6">
                        <ReceiptActions
                          paymentId={request.payment.id}
                          userName={session?.user?.name ?? "Student"}
                          amount={request.amount}
                          razorpayPaymentId={request.payment.razorpayPaymentId}
                        />
                      </div>
                    ) : null}

                    {request.adminNote ? (
                      <p className="mt-4 rounded-lg bg-cream px-4 py-3 text-sm text-dark-soft/80">
                        Admin note: {request.adminNote}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </PortalShell>
  );
}
