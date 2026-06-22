import { connectDB } from "@/lib/db";
import { jsonError, jsonOk } from "@/lib/api-auth";
import { CoursePrice } from "@/models/CoursePrice";
import { toCoursePriceDTO } from "@/lib/course-serializers";
import { defaultCoursePrices } from "@/lib/course-defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const courses = await CoursePrice.find({ isActive: true }).sort({
      sortOrder: 1,
      createdAt: 1,
    });

    if (courses.length === 0) {
      return jsonOk({
        courses: defaultCoursePrices.map((course, index) => ({
          id: `default-${index}`,
          ...course,
          createdAt: new Date(0).toISOString(),
          updatedAt: new Date(0).toISOString(),
        })),
        source: "defaults",
      });
    }

    return jsonOk({
      courses: courses.map(toCoursePriceDTO),
      source: "database",
    });
  } catch (error) {
    console.error("[courses GET]", error);
    return jsonError("Unable to load course prices.", 500);
  }
}
