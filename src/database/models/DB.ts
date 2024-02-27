import { WithId } from "mongodb";
import { v4 as generateUuid } from "uuid";

export type WithUuid<T> = T & { uuid: string };

export const getUuid = () => generateUuid();

export function removeId<T>(obj: WithId<T>): T {
  delete (obj as any)["_id"];
  return obj as T;
}

export function removeIds<T>(objList: WithId<T>[]): T[] {
  return objList.map((obj) => removeId(obj));
}

export function removeUuid<T>(obj: WithUuid<T>): T {
  delete (obj as any)["uuid"];
  return obj as T;
}

export function removeUuids<T>(objList: WithUuid<T>[]): T[] {
  return objList.map((obj) => removeUuid(obj));
}
