export type EventBase = {
  lecturerId: string;
  userId?: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  name: string;
  email: string;
  telephone: string;
};

export type Event = EventBase & { uuid: string };
