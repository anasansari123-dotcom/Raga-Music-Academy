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

const email = process.env.ADMIN_EMAIL ?? "admin@ragavedaacademy.com";
const password = process.env.ADMIN_PASSWORD ?? "Admin@123456";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI missing");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected DB:", mongoose.connection.db?.databaseName);

  const collections = await mongoose.connection.db?.listCollections().toArray();
  console.log(
    "Collections:",
    collections?.map((c) => c.name).join(", ") ?? "none"
  );

  const users = mongoose.connection.db?.collection("users");
  const user = await users?.findOne({ email: email.toLowerCase() });
  console.log("User found:", !!user);
  if (user) {
    console.log("  name:", user.name);
    console.log("  role:", user.role);
    console.log("  has passwordHash:", !!user.passwordHash);
    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log("  password matches Admin@123456:", valid);
  } else {
    const all = await users?.find({}).toArray();
    console.log("All users in collection:", all?.length ?? 0);
    for (const u of all ?? []) {
      console.log(" -", u.email, u.role);
    }
  }

  await mongoose.disconnect();
}

main().catch(console.error);
