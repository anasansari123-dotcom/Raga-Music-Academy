import { connectDB } from "@/lib/db";
import { requireAdmin, jsonError, jsonOk } from "@/lib/api-auth";
import { Payment } from "@/models/Payment";
import { PaymentRequest } from "@/models/PaymentRequest";
import { User } from "@/models/User";
import { toPaymentDTO } from "@/lib/payment-serializers";

export async function GET() {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  try {
    await connectDB();

    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(200);

    const userIds = [...new Set(payments.map((p) => p.userId.toString()))];
    const requestIds = [...new Set(payments.map((p) => p.paymentRequestId.toString()))];

    const [users, requests] = await Promise.all([
      User.find({ _id: { $in: userIds } }),
      PaymentRequest.find({ _id: { $in: requestIds } }),
    ]);

    const userMap = new Map(users.map((u) => [u._id.toString(), u]));
    const requestMap = new Map(requests.map((r) => [r._id.toString(), r]));

    return jsonOk({
      payments: payments.map((payment) =>
        toPaymentDTO(
          payment,
          userMap.get(payment.userId.toString()),
          requestMap.get(payment.paymentRequestId.toString())
        )
      ),
    });
  } catch (error) {
    console.error("[admin/payments GET]", error);
    return jsonError("Unable to load receipts.", 500);
  }
}
