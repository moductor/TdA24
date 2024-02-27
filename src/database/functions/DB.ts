import { MongoClient, WithId } from "mongodb";
import { v4 as generateUuid } from "uuid";

const client = new MongoClient(process.env.DB_URL);

await client.connect();
const db = client.db("tda24_lecturer");

export default db;

export const getUuid = () => generateUuid();

export function removeId<T>(obj: WithId<T>): T {
  delete (obj as any)["_id"];
  return obj as T;
}

export function removeIds<T>(objList: WithId<T>[]): T[] {
  return objList.map((obj) => removeId(obj));
}
