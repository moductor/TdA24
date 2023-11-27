import { MongoClient } from "mongodb";
import { v4 as generateUuid } from "uuid";

const client = new MongoClient("mongodb://localhost:27017");

await client.connect();
const db = client.db("tda24_lecturer");

export default db;

export const getUuid = () => generateUuid();
