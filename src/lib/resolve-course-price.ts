import mongoose from "mongoose";
import { CoursePrice } from "@/models/CoursePrice";
import { defaultCoursePrices } from "@/lib/course-defaults";

export type ResolvedCoursePrice = {
  title: string;
  priceInr: number;
};

export async function resolveCoursePrice(params: {
  courseId?: string;
  courseTitle?: string;
}): Promise<ResolvedCoursePrice | null> {
  const { courseId, courseTitle } = params;

  if (courseId && mongoose.Types.ObjectId.isValid(courseId)) {
    const course = await CoursePrice.findOne({ _id: courseId, isActive: true });
    if (course) {
      return { title: course.title, priceInr: course.priceInr };
    }
  }

  const title = courseTitle?.trim();
  if (title) {
    const course = await CoursePrice.findOne({ title, isActive: true });
    if (course) {
      return { title: course.title, priceInr: course.priceInr };
    }

    const fallback = defaultCoursePrices.find(
      (course) => course.title.toLowerCase() === title.toLowerCase()
    );
    if (fallback) {
      return { title: fallback.title, priceInr: fallback.priceInr };
    }
  }

  return null;
}
