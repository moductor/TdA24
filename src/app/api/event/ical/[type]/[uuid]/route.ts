import ical, { ICalCalendarMethod } from "ical-generator";
import { NextRequest, NextResponse } from "next/server";
import {
  EventQuery,
  getAll as getEvents,
} from "../../../../../../database/functions/Event";
import { get as getLecturer } from "../../../../../../database/functions/Lecturer";
import { get as getUser } from "../../../../../../database/functions/User";
import { generateToken } from "../../../../../../helpers/generateToken";
import {
  checkToken,
  getUnauthorizedError,
  isAuthorized,
} from "../../../../checkAuthenticated";

export const dynamic = "force-dynamic";

type Params = {
  type: string;
  uuid: string;
};

type Props = {
  params: Params;
};

export async function GET(request: NextRequest, props: Props): Promise<NextResponse> {
  const params = await props.params;
  if (!["lecturer", "user"].includes(params.type)) {
    return new NextResponse(null, { status: 404 });
  }

  const jwt = request.nextUrl.searchParams.get("token") || undefined;
  if (!getAuthorizedForToken(jwt, params.type, params.uuid)) {
    return getUnauthorizedError();
  }

  const query = await getEventQuery(params.type, params.uuid);
  if (!query) return new NextResponse(null, { status: 404 });

  const events = await getEvents(query);

  const calendar = ical({
    name: "Teacher digital Agency",
    description: "Teacher digital Agency",
    method: ICalCalendarMethod.REQUEST,
    events: events.map((event) => ({
      id: event.uuid,
      start: event.dateTimeStart,
      end: event.dateTimeEnd,
      summary: params.type == "lecturer" ? event.name : event.lecturerName,
      description: event.note,
      organizer: {
        name: params.type == "lecturer" ? event.name : event.lecturerName || "",
        email: params.type == "lecturer" ? event.email : undefined,
      },
    })),
  });

  return new NextResponse(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calendar.ics"',
    },
  });
}

export async function POST(request: NextRequest, props: Props): Promise<NextResponse> {
  const params = await props.params;
  if (!["lecturer", "user"].includes(params.type)) {
    return new NextResponse(null, { status: 404 });
  }

  if (!getAuthorizedForSession(request, params.type, params.uuid)) {
    return getUnauthorizedError();
  }

  const token = generateToken(getTokenData(params.type, params.uuid));
  return new NextResponse(`${request.url}?token=${token}`);
}

async function getEventQuery(
  type: string,
  uuid: string,
): Promise<EventQuery | undefined> {
  if (type == "lecturer") {
    const lecturer = await getLecturer(uuid);
    if (!lecturer) return;
    return { lecturerId: lecturer.uuid };
  } else {
    const user = await getUser(uuid);
    if (!user) return;
    return { userId: user.uuid };
  }
}

function getAuthorizedForToken(
  jwt: string | undefined,
  type: string,
  uuid: string,
): boolean {
  return type == "lecturer"
    ? checkToken(jwt, undefined, uuid)
    : checkToken(jwt, uuid);
}

function getAuthorizedForSession(
  request: NextRequest,
  type: string,
  uuid: string,
): boolean {
  return type == "lecturer"
    ? isAuthorized(request, undefined, uuid)
    : isAuthorized(request, uuid);
}

function getTokenData(type: string, uuid: string): any {
  return type == "lecturer" ? { lecturerId: uuid } : { uuid };
}
