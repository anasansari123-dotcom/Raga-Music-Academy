import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import bcrypt from "bcryptjs";
import { connectDB } from "../src/lib/db";
import { User } from "../src/models/User";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

async function main() {
  await connectDB();
  const mongoose = await import("mongoose");
  console.log("db:", mongoose.default.connection.db?.databaseName);

  const user = await User.findOne({
    email: "admin@ragavedaacademy.com".trim().toLowerCase(),
  });

  console.log("found:", !!user, user?.role);
  console.log("passwordHash exists:", !!user?.passwordHash);

  if (user?.passwordHash) {
    console.log("valid password:", await bcrypt.compare("Admin@123456", user.passwordHash));
  }
}

main().catch(console.error);
