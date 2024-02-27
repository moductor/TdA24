import { getUuid, removeId } from "../models/DB";
import { Tag, TagBase } from "../models/Tag";
import DB from "./DB";
const db = DB.collection<Tag>("tag");

export async function insertOne(tag: TagBase): Promise<string | undefined> {
  if ((await findOne(tag.name)) != null) return;

  const item: Tag = {
    uuid: getUuid(),
    ...tag,
  };

  await db.insertOne(item);
  return item.uuid;
}

export async function insertMany(tags: TagBase[]): Promise<undefined> {
  const items: Tag[] = tags
    .filter(async (tag) => (await findOne(tag.name)) == null)
    .map((tag) => ({
      uuid: getUuid(),
      ...tag,
    }));

  await db.insertMany(items);
}

export async function get(uuid: string): Promise<Tag | null> {
  const item = await db.findOne({ uuid });
  if (!item) return null;
  return removeId(item);
}

export async function findOne(name: string): Promise<Tag | null> {
  const item = await db.findOne({ name });
  if (!item) return null;
  return removeId(item);
}

export async function getByName(name: string): Promise<Tag> {
  let item = await findOne(name);
  if (!item) {
    const id = await insertOne({ name });
    item = await get(id!);
  }
  return item!;
}
