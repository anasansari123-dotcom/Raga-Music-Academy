import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, jsonError, jsonOk } from "@/lib/api-auth";
import { PaymentRequest } from "@/models/PaymentRequest";
import { Payment } from "@/models/Payment";
import { getRazorpayClient, getPublicKeyId } from "@/lib/razorpay";

export async function POST(request: Request) {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await request.json();
    const paymentRequestId =
      typeof body.paymentRequestId === "string" ? body.paymentRequestId.trim() : "";

    if (!paymentRequestId) {
      return jsonError("Payment request ID is required.");
    }

    await connectDB();

    const paymentRequest = await PaymentRequest.findById(paymentRequestId);
    if (!paymentRequest) {
      return jsonError("Payment request not found.", 404);
    }

    if (paymentRequest.userId.toString() !== authResult.user.id) {
      return jsonError("Forbidden.", 403);
    }

    if (paymentRequest.status !== "pending") {
      return jsonError("This payment request is no longer pending.");
    }

    const existingPayment = await Payment.findOne({ paymentRequestId });
    if (existingPayment && existingPayment.status !== "failed" && existingPayment.status !== "cancelled") {
      return jsonError("Payment already initiated for this request.");
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: Math.round(paymentRequest.amount * 100),
      currency: "INR",
      receipt: paymentRequestId.slice(-12),
      notes: {
        paymentRequestId,
        userId: authResult.user.id,
      },
    });

    return jsonOk({
      orderId: order.id,
      amount: paymentRequest.amount,
      currency: "INR",
      keyId: getPublicKeyId(),
      description: paymentRequest.description,
    });
  } catch (error) {
    console.error("[payments/create-order]", error);

    const razorpayError =
      error &&
      typeof error === "object" &&
      "error" in error &&
      error.error &&
      typeof error.error === "object" &&
      "description" in error.error
        ? String(error.error.description)
        : null;

    if (razorpayError?.toLowerCase().includes("authentication failed")) {
      return jsonError(
        "Razorpay authentication failed. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local — both must be from the same key pair in your Razorpay dashboard.",
        500
      );
    }

    const message =
      error instanceof Error && error.message.includes("Razorpay")
        ? "Payment gateway is not configured."
        : razorpayError ?? "Unable to create payment order.";
    return jsonError(message, 500);
  }
}
