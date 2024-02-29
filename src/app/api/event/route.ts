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
  const params = request.nextUrl.searchParams;
  function param(name: string): string | undefined {
    return params.get(name) || undefined;
  }

  const query: EventQuery = {
    lecturerId: param("lecturerId"),
    userId: param("userId"),
  };

  if (param("dateTimeAfter")) {
    query.dateTimeAfter = new Date();
    query.dateTimeAfter.setTime(Date.parse(param("dateTimeAfter")!));
  }

  if (param("dateTimeBefore")) {
    query.dateTimeBefore = new Date();
    query.dateTimeBefore.setTime(Date.parse(param("dateTimeBefore")!));
  }

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
