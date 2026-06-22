import type { IPayment } from "@/models/Payment";
import type { IPaymentRequest } from "@/models/PaymentRequest";
import type { IUser } from "@/models/User";
import type { PaymentDTO, PaymentRequestDTO, UserSummary } from "@/lib/payment-types";

export function toUserSummary(user: IUser | null | undefined): UserSummary | undefined {
  if (!user) return undefined;
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

export function toPaymentRequestDTO(
  request: IPaymentRequest,
  user?: IUser | null,
  payment?: IPayment | null
): PaymentRequestDTO {
  return {
    id: request._id.toString(),
    userId: request.userId.toString(),
    user: toUserSummary(user ?? undefined),
    amount: request.amount,
    description: request.description,
    status: request.status,
    dueDate: request.dueDate?.toISOString(),
    adminNote: request.adminNote,
    createdBy: request.createdBy.toString(),
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
    payment: payment ? toPaymentDTO(payment) : null,
  };
}

export function toPaymentDTO(
  payment: IPayment,
  user?: IUser | null,
  paymentRequest?: IPaymentRequest | null
): PaymentDTO {
  return {
    id: payment._id.toString(),
    userId: payment.userId.toString(),
    user: toUserSummary(user ?? undefined),
    paymentRequestId: payment.paymentRequestId.toString(),
    paymentRequest: paymentRequest
      ? {
          description: paymentRequest.description,
          status: paymentRequest.status,
        }
      : undefined,
    amount: payment.amount,
    razorpayOrderId: payment.razorpayOrderId,
    razorpayPaymentId: payment.razorpayPaymentId,
    status: payment.status,
    receiptNumber: payment.receiptNumber,
    createdAt: payment.createdAt.toISOString(),
    verifiedAt: payment.verifiedAt?.toISOString(),
    verifiedBy: payment.verifiedBy?.toString(),
  };
}
