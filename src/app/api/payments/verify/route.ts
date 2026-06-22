import { connectDB } from "@/lib/db";
import { requireAuth, jsonError, jsonOk } from "@/lib/api-auth";
import { PaymentRequest } from "@/models/PaymentRequest";
import { Payment } from "@/models/Payment";
import {
  generateReceiptNumber,
  verifyPaymentSignature,
} from "@/lib/razorpay";
import { toPaymentDTO } from "@/lib/payment-serializers";

export async function POST(request: Request) {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await request.json();
    const paymentRequestId =
      typeof body.paymentRequestId === "string" ? body.paymentRequestId.trim() : "";
    const razorpayOrderId =
      typeof body.razorpayOrderId === "string" ? body.razorpayOrderId.trim() : "";
    const razorpayPaymentId =
      typeof body.razorpayPaymentId === "string" ? body.razorpayPaymentId.trim() : "";
    const razorpaySignature =
      typeof body.razorpaySignature === "string" ? body.razorpaySignature.trim() : "";

    if (!paymentRequestId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return jsonError("Missing payment verification data.");
    }

    const isValid = verifyPaymentSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValid) {
      return jsonError("Invalid payment signature.", 400);
    }

    await connectDB();

    const paymentRequest = await PaymentRequest.findById(paymentRequestId);
    if (!paymentRequest) {
      return jsonError("Payment request not found.", 404);
    }

    if (paymentRequest.userId.toString() !== authResult.user.id) {
      return jsonError("Forbidden.", 403);
    }

    if (paymentRequest.status === "verified" || paymentRequest.status === "rejected") {
      return jsonError("This payment request is already closed.");
    }

    const duplicate = await Payment.findOne({
      razorpayPaymentId,
    });

    if (duplicate) {
      return jsonError("This payment has already been recorded.");
    }

    const existingForRequest = await Payment.findOne({ paymentRequestId });

    let payment;
    if (existingForRequest) {
      if (existingForRequest.status === "paid" || existingForRequest.status === "verified") {
        return jsonOk({ payment: toPaymentDTO(existingForRequest) });
      }
      existingForRequest.razorpayOrderId = razorpayOrderId;
      existingForRequest.razorpayPaymentId = razorpayPaymentId;
      existingForRequest.razorpaySignature = razorpaySignature;
      existingForRequest.status = "paid";
      await existingForRequest.save();
      payment = existingForRequest;
    } else {
      payment = await Payment.create({
        userId: authResult.user.id,
        paymentRequestId,
        amount: paymentRequest.amount,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        status: "paid",
        receiptNumber: generateReceiptNumber(),
      });
    }

    paymentRequest.status = "paid";
    await paymentRequest.save();

    return jsonOk({ payment: toPaymentDTO(payment) });
  } catch (error) {
    console.error("[payments/verify]", error);
    return jsonError("Unable to verify payment.", 500);
  }
}
