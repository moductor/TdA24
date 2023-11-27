import DB, { getUuid } from "./DB";
const db = DB.collection("tag");

export type TagBase = {
  name: string;
};

export type Tag = TagBase & { uuid: string };

export async function insertOne(tag: TagBase): Promise<undefined> {
  if ((await findOne(tag.name)) != null) return;

  const item: Tag = {
    uuid: getUuid(),
    ...tag,
  };

  await db.insertOne(item);
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
  const item = (await db.findOne({ uuid })) as Tag | null;
  if (!item) return null;
  return item;
}

export async function findOne(name: string): Promise<Tag | null> {
  const item = (await db.findOne({ name })) as Tag | null;
  if (!item) return null;
  return item;
}
