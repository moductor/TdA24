import { Filter } from "mongodb";
import {
  ContactInfo,
  Lecturer,
  LecturerBase,
  LecturerFilters,
  LecturerInput,
  getFilters as generateFilters,
} from "../models/Lecturer";
import { Pagination } from "../models/Pagination";
import DB, { getUuid } from "./DB";
import { get as getTag, getByName as getTagByName } from "./Tag";
const db = DB.collection<LecturerDB>("lecturer");

const emptyContactInfo: ContactInfo = {
  telephone_numbers: [],
  emails: [],
};

type LecturerDB = LecturerBase & {
  uuid: string;
  tags?: string[];
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
        }),
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
        }),
      );

  const lecturer: Lecturer = {
    ...item,
    contact: item.contact || emptyContactInfo,
    tags,
  };

  return lecturer;
}

export async function getAll(
  pagination?: Pagination,
  filters?: LecturerFilters,
): Promise<Lecturer[]> {
  const dbFilter: Filter<LecturerDB> = {};

  if (filters) {
    dbFilter.price_per_hour = {
      $gte: filters.price.value.min,
      $lte: filters.price.value.max,
    };

    const selectedLocations = filters.location
      .filter((e) => e.selected)
      .map((e) => e.value);

    if (selectedLocations.length) {
      dbFilter.location = {
        $in: selectedLocations,
      };
    }

    const selectedTagUuids = (
      await Promise.all(
        filters.tags
          .filter((e) => e.selected)
          .map((e) => getTagByName(e.value)),
      )
    ).map((e) => e.uuid);

    if (selectedTagUuids.length) {
      dbFilter.tags = {
        $all: selectedTagUuids,
      };
    }
  }

  const cursor = db.find(dbFilter);

  if (pagination) {
    cursor.skip(pagination.skip);
    cursor.limit(pagination.limit);
  }

  const data = await cursor.toArray();
  const lecturers = await Promise.all(
    data.map(async (_lecturer) => {
      const item = _lecturer as LecturerDB;

      const tags = !item.tags
        ? undefined
        : await Promise.all(
            item.tags!.map(async (tagId) => {
              return (await getTag(tagId))!;
            }),
          );

      const lecturer: Lecturer = {
        ...item,
        contact: item.contact || emptyContactInfo,
        tags,
      };

      return lecturer;
    }),
  );

  return lecturers;
}

export async function getFilters(): Promise<LecturerFilters> {
  const lecturers = await getAll();
  return generateFilters(lecturers);
}

export async function updateOneById(
  uuid: string,
  lecturer: LecturerInput,
): Promise<Lecturer | null> {
  const tags = !lecturer.tags
    ? undefined
    : await Promise.all(
        lecturer.tags!.map(async (tag) => {
          return (await getTagByName(tag.name)).uuid;
        }),
      );

  const item: LecturerDB = {
    uuid,
    ...lecturer,
    tags,
  };

  await db.updateOne({ uuid }, { $set: item });

  return await get(uuid);
}

export async function remove(uuid: string): Promise<boolean> {
  return (await db.deleteOne({ uuid })).acknowledged;
}

export async function removeAll(): Promise<boolean> {
  return (await db.deleteMany({})).acknowledged;
}

export async function getCount(): Promise<number> {
  return await db.countDocuments();
}
