import { UUID } from "bson";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

await client.connect();
const db = client.db("tda24_lecturer");

export default db;

export function getUuid(value?: string): ObjectId {
  return new ObjectId(new UUID(value).toBinary().value());
}

export function parseUuid(value: ObjectId): string {
  return new UUID(value.id).toString();
}
