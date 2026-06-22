import { connectDB } from "@/lib/db";
import { requireAuth, requireAdmin, jsonError } from "@/lib/api-auth";
import { Payment } from "@/models/Payment";
import { PaymentRequest } from "@/models/PaymentRequest";
import { User } from "@/models/User";
import { generateReceiptPdf } from "@/lib/receipt-pdf";

type RouteContext = { params: Promise<{ paymentId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  const { paymentId } = await context.params;

  try {
    await connectDB();

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return jsonError("Receipt not found.", 404);
    }

    const isOwner = payment.userId.toString() === authResult.user.id;
    const isAdmin = authResult.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return jsonError("Forbidden.", 403);
    }

    if (!payment.razorpayPaymentId) {
      return jsonError("Receipt is not available yet.", 400);
    }

    const [user, paymentRequest] = await Promise.all([
      User.findById(payment.userId),
      PaymentRequest.findById(payment.paymentRequestId),
    ]);

    if (!user || !paymentRequest) {
      return jsonError("Receipt data incomplete.", 404);
    }

    const pdfBuffer = await generateReceiptPdf({
      receiptNumber: payment.receiptNumber,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      amount: payment.amount,
      description: paymentRequest.description,
      razorpayPaymentId: payment.razorpayPaymentId,
      razorpayOrderId: payment.razorpayOrderId,
      paidAt: payment.createdAt.toISOString(),
      status: payment.status === "verified" ? "verified" : "paid",
    });

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${payment.receiptNumber}.pdf"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("[receipts/download]", error);
    return jsonError("Unable to generate receipt.", 500);
  }
}
