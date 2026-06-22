import { connectDB } from "@/lib/db";
import { requireAdmin, jsonError, jsonOk } from "@/lib/api-auth";
import { CoursePrice } from "@/models/CoursePrice";
import { toCoursePriceDTO } from "@/lib/course-serializers";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  const { id } = await context.params;

  try {
    const body = await request.json();
    await connectDB();

    const course = await CoursePrice.findById(id);
    if (!course) {
      return jsonError("Course not found.", 404);
    }

    if (typeof body.title === "string" && body.title.trim()) {
      course.title = body.title.trim();
    }
    if (typeof body.subtitle === "string" && body.subtitle.trim()) {
      course.subtitle = body.subtitle.trim();
    }
    if (Number.isFinite(Number(body.priceInr)) && Number(body.priceInr) >= 0) {
      course.priceInr = Number(body.priceInr);
    }
    if (typeof body.priceSuffix === "string") {
      course.priceSuffix = body.priceSuffix.trim() || undefined;
    }
    if (Number.isFinite(Number(body.sortOrder))) {
      course.sortOrder = Number(body.sortOrder);
    }
    if (typeof body.highlighted === "boolean") {
      course.highlighted = body.highlighted;
    }
    if (typeof body.isActive === "boolean") {
      course.isActive = body.isActive;
    }

    await course.save();
    return jsonOk({ course: toCoursePriceDTO(course) });
  } catch (error) {
    console.error("[admin/courses PATCH]", error);
    return jsonError("Unable to update course.", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  const { id } = await context.params;

  try {
    await connectDB();
    const course = await CoursePrice.findByIdAndDelete(id);
    if (!course) {
      return jsonError("Course not found.", 404);
    }
    return jsonOk({});
  } catch (error) {
    console.error("[admin/courses DELETE]", error);
    return jsonError("Unable to delete course.", 500);
  }
}
