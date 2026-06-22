import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { getSessionUser, jsonError, jsonOk } from "@/lib/api-auth";
import { resolveCoursePrice } from "@/lib/resolve-course-price";
import { toPaymentRequestDTO } from "@/lib/payment-serializers";
import { PaymentRequest } from "@/models/PaymentRequest";
import { User } from "@/models/User";
import { verifyCredentials } from "@/lib/verify-credentials";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const courseId = typeof body.courseId === "string" ? body.courseId.trim() : "";
    const courseTitle =
      typeof body.courseTitle === "string" ? body.courseTitle.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    await connectDB();

    const course = await resolveCoursePrice({ courseId, courseTitle });
    if (!course) {
      return jsonError("Course not found or unavailable.");
    }

    const sessionUser = await getSessionUser();
    let userId = sessionUser?.id;
    let userRecord = sessionUser
      ? await User.findById(sessionUser.id)
      : null;

    if (!sessionUser) {
      if (!name || !email || !phone || password.length < 6) {
        return jsonError("Name, email, phone, and password (min 6 chars) are required.");
      }

      const existing = await User.findOne({ email });
      if (existing) {
        const verified = await verifyCredentials(email, password);
        if (!verified) {
          return jsonError(
            "An account with this email already exists. Please enter the correct password or sign in first."
          );
        }
        userId = verified.id;
        userRecord = existing;
      } else {
        const passwordHash = await bcrypt.hash(password, 12);
        userRecord = await User.create({
          name,
          email,
          phone,
          passwordHash,
          role: "user",
        });
        userId = userRecord._id.toString();
      }
    } else if (sessionUser.role !== "user") {
      return jsonError("Please sign in with a student account to book a course.");
    }

    if (!userId || !userRecord) {
      return jsonError("Unable to identify student account.");
    }

    const description = `Course enrollment: ${course.title}`;

    const paymentRequest = await PaymentRequest.create({
      userId,
      amount: course.priceInr,
      description,
      status: "pending",
      createdBy: userId,
    });

    return jsonOk({
      paymentRequest: toPaymentRequestDTO(paymentRequest, userRecord),
      loginEmail: userRecord.email,
      requiresLogin: !sessionUser,
    });
  } catch (error) {
    console.error("[bookings/create]", error);
    return jsonError("Unable to start booking.", 500);
  }
}
