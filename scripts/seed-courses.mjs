/**
 * Seed default course prices from website defaults.
 * Usage: npm run seed:courses
 */
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

const defaults = [
  {
    title: "Vocal Class",
    subtitle: "Carnatic, Hindustani, Bollywood & Western — online and offline",
    priceInr: 2499,
    priceSuffix: "per month",
    sortOrder: 0,
    highlighted: false,
    isActive: true,
  },
  {
    title: "6 Months Course",
    subtitle: "Structured foundation certification program",
    priceInr: 12999,
    sortOrder: 1,
    highlighted: true,
    isActive: true,
  },
];

const CoursePriceSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    priceInr: Number,
    priceSuffix: String,
    sortOrder: { type: Number, default: 0 },
    highlighted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required.");
    process.exit(1);
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME || "raga-veda",
  });

  const CoursePrice =
    mongoose.models.CoursePrice ?? mongoose.model("CoursePrice", CoursePriceSchema);

  const existing = await CoursePrice.countDocuments();
  if (existing > 0) {
    console.log(`Skipping seed — ${existing} course price(s) already exist.`);
    await mongoose.disconnect();
    return;
  }

  await CoursePrice.insertMany(defaults);
  console.log(`Seeded ${defaults.length} default course prices.`);

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
