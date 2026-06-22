import { connectDB } from "@/lib/db";
import { requireAdmin, jsonError, jsonOk } from "@/lib/api-auth";
import { User } from "@/models/User";
import { serializeUser } from "@/lib/api-auth";

export async function GET() {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  try {
    await connectDB();
    const users = await User.find({ role: "user" })
      .sort({ name: 1 })
      .select("name email phone role");

    return jsonOk({
      users: users.map((user) => serializeUser(user)),
    });
  } catch (error) {
    console.error("[admin/users]", error);
    return jsonError("Unable to load users.", 500);
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdmin();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!name || !email || !phone || password.length < 6) {
      return jsonError("Name, email, phone, and password (min 6 chars) are required.");
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return jsonError("A user with this email already exists.");
    }

    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      phone,
      passwordHash,
      role: "user",
    });

    return jsonOk({ user: serializeUser(user) });
  } catch (error) {
    console.error("[admin/users POST]", error);
    return jsonError("Unable to create user.", 500);
  }
}
