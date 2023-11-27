import type { ObjectId } from "bson";
import DB, { getUuid, parseUuid } from "./DB";
const db = DB.collection("tag");

export type TagBase = {
  name: string;
};

type TagDB = TagBase & { _id: ObjectId };

export type Tag = TagBase & { uuid: string };

function fromDbObject(obj: TagDB): Tag {
  return {
    uuid: parseUuid(obj._id),
    ...obj,
  };
}

export async function insertOne(tag: TagBase): Promise<undefined> {
  if ((await findOne(tag.name)) != null) return;

  const item: TagDB = {
    _id: getUuid(),
    ...tag,
  };

  await db.insertOne(item);
}

export async function insertMany(tags: TagBase[]): Promise<undefined> {
  const items: TagDB[] = tags
    .filter(async (tag) => (await findOne(tag.name)) == null)
    .map((tag) => ({
      _id: getUuid(),
      ...tag,
    }));

  await db.insertMany(items);
}

export async function get(uuid: string): Promise<Tag | null> {
  const item = (await db.findOne({ _id: getUuid(uuid) })) as TagDB | null;
  if (!item) return null;
  return fromDbObject(item);
}

export async function findOne(name: string): Promise<Tag | null> {
  const item = (await db.findOne({ name })) as TagDB | null;
  if (!item) return null;
  return fromDbObject(item);
}
