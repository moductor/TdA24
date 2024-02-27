import { Filter } from "mongodb";
import { getUuid, removeId, removeIds } from "../models/DB";
import { Event, EventBase } from "../models/Event";
import DB from "./DB";
const db = DB.collection<Event>("event");

export async function insertOne(event: EventBase): Promise<string> {
  const timeDifference =
    event.dateTimeEnd.getTime() - event.dateTimeStart.getTime();

  if (timeDifference < 0) {
    throw Error("end time must not be before start time");
  }

  const existing = await db.findOne({
    lecturerId: event.lecturerId,
    dateTimeStart: {
      $gte: event.dateTimeStart,
      $lte: event.dateTimeEnd,
    },
    dateTimeEnd: {
      $gte: event.dateTimeStart,
      $lte: event.dateTimeEnd,
    },
  });

  if (existing) {
    throw Error("other event exists in this time period for this lecturer");
  }

  const item: Event = {
    ...event,
    uuid: getUuid(),
  };

  await db.insertOne(item);
  return item.uuid;
}

export async function get(uuid: string): Promise<Event | null> {
  const item = await db.findOne({ uuid: uuid });
  if (!item) return null;
  return removeId(item);
}

export type EventQuery = {
  lecturerId?: string;
  userId?: string;
  dateTimeAfter?: Date;
  dateTimeBefore?: Date;
};

export async function getAll(q: EventQuery): Promise<Event[]> {
  if (!q.lecturerId && !q.userId) {
    throw Error("at least one of lecturerId or userId has to be defined");
  }

  const filter: Filter<Event> = {};
  if (q.lecturerId) filter.lecturerId = q.lecturerId;
  if (q.userId) filter.userId = q.userId;
  if (q.dateTimeAfter) filter.dateTimeStart = { $gte: q.dateTimeAfter };
  if (q.dateTimeBefore) filter.dateTimeEnd = { $lte: q.dateTimeBefore };

  const items = await db.find(filter).toArray();
  return removeIds(items);
}

export async function update(
  uuid: string,
  event: EventBase,
): Promise<Event | null> {
  const item: Event = {
    ...event,
    uuid,
  };

  await db.updateOne({ uuid }, { $set: item });

  return await get(uuid);
}

export async function remove(uuid: string): Promise<boolean> {
  return (await db.deleteOne({ uuid })).acknowledged;
}
