import type { ICoursePrice } from "@/models/CoursePrice";
import type { CoursePriceDTO } from "@/lib/course-types";

export function toCoursePriceDTO(course: ICoursePrice): CoursePriceDTO {
  return {
    id: course._id.toString(),
    title: course.title,
    subtitle: course.subtitle,
    priceInr: course.priceInr,
    priceSuffix: course.priceSuffix,
    sortOrder: course.sortOrder,
    highlighted: course.highlighted,
    isActive: course.isActive,
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  };
}
