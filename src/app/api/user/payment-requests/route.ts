import { connectDB } from "@/lib/db";
import { requireAuth, jsonError, jsonOk } from "@/lib/api-auth";
import { PaymentRequest } from "@/models/PaymentRequest";
import { Payment } from "@/models/Payment";
import { toPaymentRequestDTO } from "@/lib/payment-serializers";

export async function GET() {
  const authResult = await requireAuth();
  if ("error" in authResult) return authResult.error;

  try {
    await connectDB();

    const requests = await PaymentRequest.find({ userId: authResult.user.id }).sort({
      createdAt: -1,
    });

    const requestIds = requests.map((r) => r._id.toString());
    const payments = await Payment.find({ paymentRequestId: { $in: requestIds } });
    const paymentMap = new Map(
      payments.map((p) => [p.paymentRequestId.toString(), p])
    );

    return jsonOk({
      paymentRequests: requests.map((request) =>
        toPaymentRequestDTO(request, undefined, paymentMap.get(request._id.toString()))
      ),
    });
  } catch (error) {
    console.error("[user/payment-requests]", error);
    return jsonError("Unable to load your payments.", 500);
  }
}
