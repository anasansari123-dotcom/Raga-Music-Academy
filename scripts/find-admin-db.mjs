import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import mongoose from "mongoose";

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
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("mongoose default db:", mongoose.connection.db?.databaseName);

  const client = mongoose.connection.getClient();
  for (const dbName of ["test", "raga-veda", "admin"]) {
    const user = await client
      .db(dbName)
      .collection("users")
      .findOne({ email: "admin@ragavedaacademy.com" });
    console.log(`db "${dbName}":`, user ? `found (${user.role})` : "not found");
  }

  await mongoose.disconnect();
}

main().catch(console.error);
