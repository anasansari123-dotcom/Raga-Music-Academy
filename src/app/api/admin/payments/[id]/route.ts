import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { requireAdmin, jsonError, jsonOk } from "@/lib/api-auth";
import { Payment } from "@/models/Payment";
import { PaymentRequest } from "@/models/PaymentRequest";
import { User } from "@/models/User";
import { toPaymentDTO } from "@/lib/payment-serializers";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  const { id } = await context.params;

  try {
    const body = await request.json();
    const action = typeof body.action === "string" ? body.action : "";
    const adminNote =
      typeof body.adminNote === "string" ? body.adminNote.trim() : undefined;

    await connectDB();

    const payment = await Payment.findById(id);
    if (!payment) {
      return jsonError("Payment not found.", 404);
    }

    const paymentRequest = await PaymentRequest.findById(payment.paymentRequestId);
    if (!paymentRequest) {
      return jsonError("Payment request not found.", 404);
    }

    if (action === "verify") {
      if (payment.status === "verified") {
        return jsonOk({ payment: toPaymentDTO(payment) });
      }
      payment.status = "verified";
      payment.verifiedAt = new Date();
      payment.verifiedBy = new mongoose.Types.ObjectId(authResult.user.id);
      paymentRequest.status = "verified";
    } else if (action === "reject") {
      payment.status = "failed";
      paymentRequest.status = "rejected";
    } else {
      return jsonError("Invalid action. Use verify or reject.");
    }

    if (adminNote !== undefined) {
      paymentRequest.adminNote = adminNote;
    }

    await Promise.all([payment.save(), paymentRequest.save()]);

    const user = await User.findById(payment.userId);

    return jsonOk({
      payment: toPaymentDTO(payment, user, paymentRequest),
    });
  } catch (error) {
    console.error("[admin/payments PATCH]", error);
    return jsonError("Unable to update payment.", 500);
  }
}
