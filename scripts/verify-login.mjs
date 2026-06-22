import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  const dbName = process.env.MONGODB_DB_NAME || "raga-veda";
  await mongoose.connect(process.env.MONGODB_URI, { dbName });

  const users = mongoose.connection.getClient().db(dbName).collection("users");
  const user = await users.findOne({ email: "admin@ragavedaacademy.com" });
  console.log("db:", dbName);
  console.log("user:", user?.email, user?.role);
  console.log("password ok:", await bcrypt.compare("Admin@123456", user?.passwordHash ?? ""));

  await mongoose.disconnect();
}

main().catch(console.error);
