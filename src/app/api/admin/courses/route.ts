import { connectDB } from "@/lib/db";
import { requireAdmin, jsonError, jsonOk } from "@/lib/api-auth";
import { CoursePrice } from "@/models/CoursePrice";
import { toCoursePriceDTO } from "@/lib/course-serializers";

export async function GET() {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  try {
    await connectDB();
    const courses = await CoursePrice.find().sort({ sortOrder: 1, createdAt: 1 });
    return jsonOk({ courses: courses.map(toCoursePriceDTO) });
  } catch (error) {
    console.error("[admin/courses GET]", error);
    return jsonError("Unable to load courses.", 500);
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const subtitle = typeof body.subtitle === "string" ? body.subtitle.trim() : "";
    const priceInr = Number(body.priceInr);
    const priceSuffix =
      typeof body.priceSuffix === "string" ? body.priceSuffix.trim() : undefined;
    const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0;
    const highlighted = Boolean(body.highlighted);
    const isActive = body.isActive !== false;

    if (!title || !subtitle || !Number.isFinite(priceInr) || priceInr < 0) {
      return jsonError("Title, subtitle, and a valid price are required.");
    }

    await connectDB();

    const course = await CoursePrice.create({
      title,
      subtitle,
      priceInr,
      priceSuffix: priceSuffix || undefined,
      sortOrder,
      highlighted,
      isActive,
    });

    return jsonOk({ course: toCoursePriceDTO(course) });
  } catch (error) {
    console.error("[admin/courses POST]", error);
    return jsonError("Unable to create course price.", 500);
  }
}
