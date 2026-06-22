import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { requireAdmin, jsonError, jsonOk } from "@/lib/api-auth";
import { PaymentRequest } from "@/models/PaymentRequest";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
import { toPaymentRequestDTO } from "@/lib/payment-serializers";
import type { PaymentRequestStatus } from "@/models/PaymentRequest";

type RouteContext = { params: Promise<{ id: string }> };

const VALID_STATUSES: PaymentRequestStatus[] = [
  "pending",
  "paid",
  "verified",
  "rejected",
];

export async function PATCH(request: Request, context: RouteContext) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  const { id } = await context.params;

  try {
    const body = await request.json();
    const status =
      typeof body.status === "string" ? (body.status as PaymentRequestStatus) : undefined;
    const adminNote =
      typeof body.adminNote === "string" ? body.adminNote.trim() : undefined;

    await connectDB();

    const paymentRequest = await PaymentRequest.findById(id);
    if (!paymentRequest) {
      return jsonError("Payment request not found.", 404);
    }

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return jsonError("Invalid status.");
      }

      if (status === "verified" && paymentRequest.status !== "paid") {
        return jsonError("Only paid requests can be verified.");
      }

      paymentRequest.status = status;
    }

    if (adminNote !== undefined) {
      paymentRequest.adminNote = adminNote;
    }

    await paymentRequest.save();

    if (status === "verified") {
      const payment = await Payment.findOne({ paymentRequestId: id });
      if (payment) {
        payment.status = "verified";
        payment.verifiedAt = new Date();
        payment.verifiedBy = new mongoose.Types.ObjectId(authResult.user.id);
        await payment.save();
      }
    }

    if (status === "rejected") {
      const payment = await Payment.findOne({ paymentRequestId: id });
      if (payment && payment.status === "paid") {
        payment.status = "failed";
        await payment.save();
      }
    }

    const [user, payment] = await Promise.all([
      User.findById(paymentRequest.userId),
      Payment.findOne({ paymentRequestId: id }),
    ]);

    return jsonOk({
      paymentRequest: toPaymentRequestDTO(paymentRequest, user, payment),
    });
  } catch (error) {
    console.error("[admin/payment-requests PATCH]", error);
    return jsonError("Unable to update payment request.", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  const { id } = await context.params;

  try {
    await connectDB();

    const paymentRequest = await PaymentRequest.findById(id);
    if (!paymentRequest) {
      return jsonError("Payment request not found.", 404);
    }

    if (paymentRequest.status === "paid" || paymentRequest.status === "verified") {
      return jsonError("Cannot delete a paid or verified payment request.");
    }

    await PaymentRequest.findByIdAndDelete(id);
    return jsonOk({});
  } catch (error) {
    console.error("[admin/payment-requests DELETE]", error);
    return jsonError("Unable to delete payment request.", 500);
  }
}
