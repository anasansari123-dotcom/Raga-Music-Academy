import mongoose from "mongoose";

const DEFAULT_DB_NAME = "raga-veda";

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define MONGODB_URI in your environment variables.");
  }
  return uri;
}

export function getDbName() {
  return process.env.MONGODB_DB_NAME?.trim() || DEFAULT_DB_NAME;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  dbName: string | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
  dbName: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  const dbName = getDbName();

  // Always reconnect in dev to avoid stale Turbopack/HMR mongoose cache
  if (process.env.NODE_ENV === "development" && cached.conn) {
    const currentDb = mongoose.connection.db?.databaseName;
    if (currentDb !== dbName) {
      await mongoose.disconnect();
      cached.conn = null;
      cached.promise = null;
      cached.dbName = null;
    }
  }

  if (cached.conn && cached.dbName && cached.dbName !== dbName) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    cached.dbName = null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(getMongoUri(), {
      bufferCommands: false,
      dbName,
    });
    cached.dbName = dbName;
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function getUsersCollection() {
  await connectDB();
  const db = mongoose.connection.getClient().db(getDbName());
  return db.collection("users");
}
