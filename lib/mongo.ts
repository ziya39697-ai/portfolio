import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> | null {
  const uri = process.env.MONGO_URL || process.env.MONGOURL;
  if (!uri) return null;

  if (process.env.NODE_ENV !== "production") {
    if (!global.__mongoClientPromise) {
      global.__mongoClientPromise = new MongoClient(uri).connect();
    }
    return global.__mongoClientPromise;
  }

  if (!clientPromise) clientPromise = new MongoClient(uri).connect();
  return clientPromise;
}

export async function getDb(): Promise<Db | null> {
  const promise = getClientPromise();
  if (!promise) return null;
  const client = await promise;
  const dbName = process.env.MONGO_DB || "portfolio";
  return client.db(dbName);
}

let indexEnsured = false;

export async function getContactSends() {
  const db = await getDb();
  if (!db) return null;
  const col = db.collection<{ ip: string; ts: Date; email?: string }>(
    "contact_sends",
  );
  if (!indexEnsured) {
    try {
      await Promise.all([
        col.createIndex({ ip: 1, ts: -1 }),
        col.createIndex({ ts: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 }),
      ]);
      indexEnsured = true;
    } catch {
      // best-effort
    }
  }
  return col;
}
