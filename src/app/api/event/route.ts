import { NextRequest, NextResponse } from "next/server";
import {
  EventQuery,
  get,
  getAll,
  insertOne,
} from "../../../database/functions/Event";
import { Error as ErrorRes } from "../../../database/models/Error";
import { EventBase } from "../../../database/models/Event";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const data = (await request.json()) as { [prop: string]: string };
  const query: EventQuery = {
    lecturerId: data["lecturerId"],
    userId: data["userId"],
  };

  if (data["dateTimeAfter"]) {
    query.dateTimeAfter = new Date();
    query.dateTimeAfter.setTime(Date.parse(data["dateTimeAfter"]));
  }

  if (data["dateTimeBefore"]) {
    query.dateTimeBefore = new Date();
    query.dateTimeBefore.setTime(Date.parse(data["dateTimeBefore"]));
  }

  console.log(query);

  try {
    const events = await getAll(query);
    return NextResponse.json(events);
  } catch (e) {
    console.log(e);

    const error: ErrorRes = {
      code: 400,
      message: `Error: ${(e as any)["message"] || "unknown"}`,
    };

    return NextResponse.json(error, { status: 400 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = (await request.json()) as EventBase;

  try {
    const id = await insertOne(data);
    const event = await get(id);
    return NextResponse.json(event);
  } catch (e) {
    console.log(e);

    const error: ErrorRes = {
      code: 400,
      message: `Error: ${(e as any)["message"] || "unknown"}`,
    };

    return NextResponse.json(error, { status: 400 });
  }
}
