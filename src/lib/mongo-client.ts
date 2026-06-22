import { MongoClient } from "mongodb";

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

declare global {
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise() {
  const client = new MongoClient(getMongoUri());
  return client.connect();
}

export async function getMongoClient() {
  if (!global.mongoClientPromise) {
    global.mongoClientPromise = createClientPromise();
  }
  return global.mongoClientPromise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(getDbName());
}
