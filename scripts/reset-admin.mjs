/**
 * Reset admin password from .env.local ADMIN_EMAIL / ADMIN_PASSWORD
 */
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

const email = (process.env.ADMIN_EMAIL ?? "admin@ragavedaacademy.com").toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "Admin@123456";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required.");
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB_NAME || "raga-veda" });
  const users = mongoose.connection.db.collection("users");
  const passwordHash = await bcrypt.hash(password, 12);

  const result = await users.updateOne(
    { email },
    {
      $set: { passwordHash },
      $setOnInsert: {
        name: process.env.ADMIN_NAME ?? "Academy Admin",
        phone: process.env.ADMIN_PHONE ?? "+919136593977",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  if (result.upsertedCount > 0) {
    console.log("Admin account created:", email);
  } else {
    console.log("Admin password reset for:", email);
  }
  console.log("Password:", password);

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
