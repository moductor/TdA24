import { MongoClient } from "mongodb";
import { v4 as generateUuid } from "uuid";

const client = new MongoClient(import.meta.env.DB_URL);

await client.connect();
const db = client.db("tda24_lecturer");

export default db;

export const getUuid = () => generateUuid();
