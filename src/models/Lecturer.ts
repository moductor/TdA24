import DB, { getUuid } from "./DB";
import {
  get as getTag,
  getByName as getTagByName,
  type Tag,
  type TagBase,
} from "./Tag";
const db = DB.collection<LecturerDB>("lecturer");

export type ContactInfo = {
  telephone_numbers: string[];
  emails: string[];
};

const emptyContactInfo: ContactInfo = {
  telephone_numbers: [],
  emails: [],
};

export type LecturerBase = {
  title_before?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  title_after?: string;
  picture_url?: string;
  location?: string;
  claim?: string;
  bio?: string;
  price_per_hour?: number;
  contact?: ContactInfo;
};

export type LecturerInput = LecturerBase & {
  tags?: TagBase[];
};

type LecturerDB = LecturerBase & {
  uuid: string;
  tags?: string[];
};

export type Lecturer = LecturerBase & {
  uuid: string;
  contact: ContactInfo;
  tags?: Tag[];
};

export function isInputValid(lecturer: LecturerInput): boolean {
  if (
    !Object.hasOwn(lecturer, "first_name") ||
    (!lecturer.first_name && lecturer.first_name !== "")
  ) {
    return false;
  }

  if (
    !Object.hasOwn(lecturer, "last_name") ||
    (!lecturer.last_name && lecturer.first_name !== "")
  ) {
    return false;
  }

  return true;
}

export async function insertOne(lecturer: LecturerInput): Promise<string> {
  const tags = !lecturer.tags
    ? undefined
    : await Promise.all(
        lecturer.tags!.map(async (tag) => {
          return (await getTagByName(tag.name)).uuid;
        })
      );

  const item: LecturerDB = {
    uuid: getUuid(),
    ...lecturer,
    tags,
  };

  await db.insertOne(item);
  return item.uuid;
}

export async function get(uuid: string): Promise<Lecturer | null> {
  const item = (await db.findOne({ uuid })) as LecturerDB | null;
  if (!item) return null;

  const tags = !item.tags
    ? undefined
    : await Promise.all(
        item.tags!.map(async (tagId) => {
          return (await getTag(tagId))!;
        })
      );

  const lecturer: Lecturer = {
    ...item,
    contact: item.contact || emptyContactInfo,
    tags,
  };

  return lecturer;
}

export async function getAll(): Promise<Lecturer[]> {
  return await Promise.all(
    (
      await db.find().toArray()
    ).map(async (_lecturer) => {
      const item = _lecturer as LecturerDB;

      const tags = !item.tags
        ? undefined
        : await Promise.all(
            item.tags!.map(async (tagId) => {
              return (await getTag(tagId))!;
            })
          );

      const lecturer: Lecturer = {
        ...item,
        contact: item.contact || emptyContactInfo,
        tags,
      };

      return lecturer;
    })
  );
}

export async function updateOneById(
  uuid: string,
  lecturer: LecturerInput
): Promise<Lecturer | null> {
  const tags = !lecturer.tags
    ? undefined
    : await Promise.all(
        lecturer.tags!.map(async (tag) => {
          return (await getTagByName(tag.name)).uuid;
        })
      );

  const item: LecturerDB = {
    uuid,
    ...lecturer,
    tags,
  };

  await db.replaceOne({ uuid }, item);

  return await get(uuid);
}

export async function remove(uuid: string): Promise<boolean> {
  return (await db.deleteOne({ uuid })).acknowledged;
}
