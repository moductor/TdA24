import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL);

await client.connect();
const db = client.db("tda24_lecturer");

export default db;
