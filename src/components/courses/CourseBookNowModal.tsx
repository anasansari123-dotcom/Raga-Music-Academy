"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RazorpayCheckout } from "@/components/payments/RazorpayCheckout";
import { ReceiptActions } from "@/components/payments/ReceiptActions";
import type { CoursePriceDTO } from "@/lib/course-types";
import { formatInr } from "@/lib/course-types";
import type { PaymentDTO, PaymentRequestDTO } from "@/lib/payment-types";

type CourseBookNowModalProps = {
  course: CoursePriceDTO;
  open: boolean;
  onClose: () => void;
};

type Step = "form" | "pay" | "success";

export function CourseBookNowModal({ course, open, onClose }: CourseBookNowModalProps) {
  const { data: session } = useSession();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequestDTO | null>(null);
  const [completedPayment, setCompletedPayment] = useState<PaymentDTO | null>(null);

  useEffect(() => {
    if (!open) return;

    setStep("form");
    setError(null);
    setPaymentRequest(null);
    setCompletedPayment(null);
    setName(session?.user?.name ?? "");
    setEmail(session?.user?.email ?? "");
    setPhone(session?.user?.phone ?? "");
    setPassword("");
  }, [open, session?.user?.email, session?.user?.name, session?.user?.phone]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id.startsWith("default-") ? undefined : course.id,
          courseTitle: course.title,
          name,
          email,
          phone,
          password: session ? undefined : password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Unable to start booking.");
      }

      if (data.requiresLogin) {
        const loginResult = await signIn("credentials", {
          email: data.loginEmail ?? email,
          password,
          redirect: false,
        });

        if (loginResult?.error) {
          throw new Error("Account created, but sign-in failed. Please log in and try again.");
        }
      }

      setPaymentRequest(data.paymentRequest);
      setStep("pay");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (payment?: PaymentDTO) => {
    if (payment) {
      setCompletedPayment(payment);
    }
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close booking form"
        className="absolute inset-0 bg-purple-deep/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-now-title"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gold/20 bg-ivory p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Book Now
            </p>
            <h2 id="book-now-title" className="heading-display mt-1 text-2xl font-semibold text-purple-deep">
              {course.title}
            </h2>
            <p className="mt-1 text-sm text-dark-soft/75">{course.subtitle}</p>
            <p className="mt-3 text-2xl font-bold text-purple-deep">
              {formatInr(course.priceInr)}
              {course.priceSuffix ? (
                <span className="ml-2 text-sm font-medium text-dark-soft/70">
                  {course.priceSuffix}
                </span>
              ) : null}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-dark-soft/60 transition hover:bg-purple/5 hover:text-purple-deep"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-dark-soft/75">
              Enter your details to continue to secure Razorpay payment. After payment, download
              your receipt and share it on WhatsApp for admin verification.
            </p>

            <div>
              <label htmlFor="book-name" className="mb-1 block text-sm font-medium text-dark">
                Full Name
              </label>
              <input
                id="book-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!!session}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-dark outline-none focus:border-gold/50"
              />
            </div>

            <div>
              <label htmlFor="book-email" className="mb-1 block text-sm font-medium text-dark">
                Email
              </label>
              <input
                id="book-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!session}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-dark outline-none focus:border-gold/50"
              />
            </div>

            <div>
              <label htmlFor="book-phone" className="mb-1 block text-sm font-medium text-dark">
                WhatsApp Number
              </label>
              <input
                id="book-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!!session}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-dark outline-none focus:border-gold/50"
              />
            </div>

            {!session ? (
              <div>
                <label htmlFor="book-password" className="mb-1 block text-sm font-medium text-dark">
                  Create Password
                </label>
                <input
                  id="book-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-dark outline-none focus:border-gold/50"
                />
                <p className="mt-1 text-xs text-dark-soft/60">
                  Used to access your dashboard and receipts later.
                </p>
              </div>
            ) : null}

            {error ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Preparing payment…
                </>
              ) : (
                "Continue to Payment"
              )}
            </Button>
          </form>
        ) : null}

        {step === "pay" && paymentRequest ? (
          <div className="space-y-4">
            <p className="text-sm text-dark-soft/75">
              Complete your payment with Razorpay. You will receive a receipt immediately after
              successful payment.
            </p>
            <RazorpayCheckout
              paymentRequest={paymentRequest}
              onSuccess={handlePaymentSuccess}
            />
            {error ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        ) : null}

        {step === "success" ? (
          <div className="space-y-5">
            <div className="rounded-2xl bg-emerald-50 px-4 py-4 text-emerald-800">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">Payment successful!</p>
                  <p className="mt-1 text-sm">
                    Download your receipt, share it on WhatsApp, and our admin will verify your
                    payment and add you to the course WhatsApp group.
                  </p>
                </div>
              </div>
            </div>

            {completedPayment ? (
              <ReceiptActions
                paymentId={completedPayment.id}
                userName={name || session?.user?.name || "Student"}
                amount={course.priceInr}
                razorpayPaymentId={completedPayment.razorpayPaymentId}
              />
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button href="/dashboard" variant="outline" className="border-purple/30 text-purple-deep">
                Go to Dashboard
              </Button>
              <Button variant="primary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
