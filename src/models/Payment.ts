import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";

export type PaymentStatus = "paid" | "verified" | "failed" | "cancelled";

export interface IPayment extends Document {
  userId: Types.ObjectId;
  paymentRequestId: Types.ObjectId;
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: PaymentStatus;
  receiptNumber: string;
  verifiedAt?: Date;
  verifiedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    paymentRequestId: {
      type: Schema.Types.ObjectId,
      ref: "PaymentRequest",
      required: true,
      unique: true,
    },
    amount: { type: Number, required: true, min: 1 },
    razorpayOrderId: { type: String, required: true, index: true },
    razorpayPaymentId: { type: String, index: true },
    razorpaySignature: { type: String },
    status: {
      type: String,
      enum: ["paid", "verified", "failed", "cancelled"],
      default: "paid",
      index: true,
    },
    receiptNumber: { type: String, required: true, unique: true },
    verifiedAt: { type: Date },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Payment: Model<IPayment> =
  mongoose.models.Payment ?? mongoose.model<IPayment>("Payment", PaymentSchema);
