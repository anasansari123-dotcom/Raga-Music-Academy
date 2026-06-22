import bcrypt from "bcryptjs";
import { getDbName, getMongoDb } from "@/lib/mongo-client";

export type VerifiedUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
};

export async function verifyCredentials(
  email: string,
  password: string
): Promise<VerifiedUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const db = await getMongoDb();
  const user = await db.collection("users").findOne({ email: normalizedEmail });

  if (!user?.passwordHash) {
    if (process.env.NODE_ENV === "development") {
      console.error("[auth] no user in db:", getDbName(), normalizedEmail);
    }
    return null;
  }

  const hash = String(user.passwordHash);
  const valid = bcrypt.compareSync(password, hash);

  if (!valid) {
    if (process.env.NODE_ENV === "development") {
      console.error("[auth] wrong password for:", normalizedEmail);
    }
    return null;
  }

  return {
    id: user._id.toString(),
    name: String(user.name ?? ""),
    email: String(user.email ?? normalizedEmail),
    phone: String(user.phone ?? ""),
    role: user.role === "admin" ? "admin" : "user",
  };
}
