import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ICoursePrice extends Document {
  title: string;
  subtitle: string;
  priceInr: number;
  priceSuffix?: string;
  sortOrder: number;
  highlighted: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CoursePriceSchema = new Schema<ICoursePrice>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    subtitle: { type: String, required: true, trim: true, maxlength: 300 },
    priceInr: { type: Number, required: true, min: 0 },
    priceSuffix: { type: String, trim: true, maxlength: 60 },
    sortOrder: { type: Number, default: 0 },
    highlighted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CoursePrice: Model<ICoursePrice> =
  mongoose.models.CoursePrice ??
  mongoose.model<ICoursePrice>("CoursePrice", CoursePriceSchema);
