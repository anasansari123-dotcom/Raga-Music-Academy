import { connectDB } from "@/lib/db";
import { requireAdmin, jsonError, jsonOk } from "@/lib/api-auth";
import { PaymentRequest } from "@/models/PaymentRequest";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
import { toPaymentRequestDTO } from "@/lib/payment-serializers";

export async function GET() {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  try {
    await connectDB();

    const requests = await PaymentRequest.find().sort({ createdAt: -1 });
    const userIds = [...new Set(requests.map((r) => r.userId.toString()))];
    const requestIds = requests.map((r) => r._id.toString());

    const [users, payments] = await Promise.all([
      User.find({ _id: { $in: userIds } }),
      Payment.find({ paymentRequestId: { $in: requestIds } }),
    ]);

    const userMap = new Map(users.map((u) => [u._id.toString(), u]));
    const paymentMap = new Map(
      payments.map((p) => [p.paymentRequestId.toString(), p])
    );

    return jsonOk({
      paymentRequests: requests.map((request) =>
        toPaymentRequestDTO(
          request,
          userMap.get(request.userId.toString()),
          paymentMap.get(request._id.toString())
        )
      ),
    });
  } catch (error) {
    console.error("[admin/payment-requests GET]", error);
    return jsonError("Unable to load payment requests.", 500);
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await request.json();
    const userId = typeof body.userId === "string" ? body.userId.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const amount = Number(body.amount);
    const dueDate =
      typeof body.dueDate === "string" && body.dueDate ? new Date(body.dueDate) : undefined;

    if (!userId || !description || !Number.isFinite(amount) || amount < 1) {
      return jsonError("User, description, and a valid amount are required.");
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user || user.role !== "user") {
      return jsonError("Student user not found.", 404);
    }

    const paymentRequest = await PaymentRequest.create({
      userId,
      amount,
      description,
      dueDate,
      status: "pending",
      createdBy: authResult.user.id,
    });

    return jsonOk({
      paymentRequest: toPaymentRequestDTO(paymentRequest, user),
    });
  } catch (error) {
    console.error("[admin/payment-requests POST]", error);
    return jsonError("Unable to create payment request.", 500);
  }
}
