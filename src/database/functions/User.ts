import { Filter, WithId } from "mongodb";
import { getUuid, removeId } from "../models/DB";
import { User, UserBase, UserInsertErrorResponse } from "../models/User";
import DB from "./DB";
const db = DB.collection<User>("user");

export async function insertOne(
  user: UserBase,
): Promise<string | UserInsertErrorResponse> {
  const filters: Filter<WithId<User>>[] = [{ username: user.username }];
  if (user.lecturerId) filters.push({ lecturerId: user.lecturerId });
  if (user.email) filters.push({ email: user.email });
  if (user.telephone) filters.push({ telephone: user.telephone });

  const existing = await db.findOne({ $or: filters });
  if (existing) {
    return {
      conflict: {
        username:
          user.username != undefined && user.username == existing.username,
        lecturerId:
          user.lecturerId != undefined &&
          user.lecturerId == existing.lecturerId,
        email: user.email != undefined && user.email == existing.email,
        telephone:
          user.telephone != undefined && user.telephone == existing.telephone,
      },
    } as UserInsertErrorResponse;
  }

  const item: User = {
    ...user,
    uuid: getUuid(),
  };

  await db.insertOne(item);
  return item.uuid;
}

type UserQuery = {
  username?: string;
  email?: string;
  lecturerId?: string;
};

export async function get(uuid?: string, q?: UserQuery): Promise<User | null> {
  if (!uuid && !q?.username && !q?.email && !q?.lecturerId) {
    throw Error(
      "at least one of uuid, username, email or lecturerId has to be defined",
    );
  }

  const filter: Filter<User> = {};
  if (uuid) filter.uuid = uuid;
  if (q?.username) filter.username = q?.username;
  if (q?.email) filter.email = q?.email;

  const item = await db.findOne(filter);

  if (!item) return null;
  return removeId(item);
}

export async function update(
  uuid: string,
  user: UserBase,
): Promise<User | UserInsertErrorResponse> {
  const filters: Filter<WithId<User>>[] = [{ username: user.username }];
  if (user.lecturerId) filters.push({ lecturerId: user.lecturerId });
  if (user.email) filters.push({ email: user.email });
  if (user.telephone) filters.push({ telephone: user.telephone });

  const existing = await db.findOne({ $or: filters });
  if (existing && existing.uuid != uuid) {
    return {
      conflict: {
        username:
          user.username != undefined && user.username == existing.username,
        lecturerId:
          user.lecturerId != undefined &&
          user.lecturerId == existing.lecturerId,
        email: user.email != undefined && user.email == existing.email,
        telephone:
          user.telephone != undefined && user.telephone == existing.telephone,
      },
    } as UserInsertErrorResponse;
  }

  const item: User = {
    ...user,
    uuid,
  };

  await db.updateOne({ uuid }, { $set: item });

  return (await get(uuid))!;
}

export async function remove(uuid: string): Promise<boolean> {
  return (await db.deleteOne({ uuid })).acknowledged;
}
