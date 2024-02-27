import { Filter } from "mongodb";
import { Event, EventBase } from "../models/Event";
import DB, { getUuid } from "./DB";
const db = DB.collection<Event>("event");

export async function insertOne(event: EventBase): Promise<string | undefined> {
  const timeDifference =
    event.dateTimeEnd.getTime() - event.dateTimeStart.getTime();

  if (timeDifference < 0) return;

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

  if (existing) return;

  const item: Event = {
    uuid: getUuid(),
    ...event,
  };

  await db.insertOne(item);
  return item.uuid;
}

export async function get(uuid: string): Promise<Event | null> {
  const item = await db.findOne({ uuid: uuid });
  if (!item) return null;
  return item;
}

type EventQuery = {
  lecturerId?: string;
  userId?: string;
  dateTimeAfter?: Date;
  dateTimeBefore?: Date;
};

export async function getAll(q: EventQuery): Promise<Event[] | null> {
  if (!q.lecturerId && !q.userId) return null;

  const filter: Filter<Event> = {};
  if (q.lecturerId) filter.lecturerId = q.lecturerId;
  if (q.userId) filter.userId = q.userId;
  if (q.dateTimeAfter) filter.dateTimeStart = { $gte: q.dateTimeAfter };
  if (q.dateTimeBefore) filter.dateTimeEnd = { $lte: q.dateTimeBefore };

  const item = await db.find(filter).toArray();

  if (!item) return null;
  return item;
}

export async function update(
  uuid: string,
  event: EventBase,
): Promise<Event | null> {
  const item: Event = {
    uuid,
    ...event,
  };

  await db.updateOne({ uuid }, { $set: item });

  return await get(uuid);
}

export async function remove(uuid: string): Promise<boolean> {
  return (await db.deleteOne({ uuid })).acknowledged;
}
