import { WithUuid } from "./DB";

export type EventBase = {
  lecturerId: string;
  userId?: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  name: string;
  email: string;
  telephone: string;
  note?: string;
};

export type Event = WithUuid<EventBase>;
