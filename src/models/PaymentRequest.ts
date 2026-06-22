import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";

export type PaymentRequestStatus =
  | "pending"
  | "paid"
  | "verified"
  | "rejected";

export interface IPaymentRequest extends Document {
  userId: Types.ObjectId;
  amount: number;
  description: string;
  status: PaymentRequestStatus;
  dueDate?: Date;
  adminNote?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentRequestSchema = new Schema<IPaymentRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["pending", "paid", "verified", "rejected"],
      default: "pending",
      index: true,
    },
    dueDate: { type: Date },
    adminNote: { type: String, trim: true, maxlength: 1000 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const PaymentRequest: Model<IPaymentRequest> =
  mongoose.models.PaymentRequest ??
  mongoose.model<IPaymentRequest>("PaymentRequest", PaymentRequestSchema);
