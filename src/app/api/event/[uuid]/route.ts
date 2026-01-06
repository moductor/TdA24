import { NextRequest, NextResponse } from "next/server";
import { get, remove, update } from "../../../../database/functions/Event";
import { Error as ErrorRes } from "../../../../database/models/Error";
import { EventBase } from "../../../../database/models/Event";
import { getUnauthorizedError, isAuthorized } from "../../checkAuthenticated";

export const dynamic = "force-dynamic";

type Params = {
  uuid: string;
};

type Props = {
  params: Params;
};

export async function GET(
  _: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  const event = await get(params.uuid);

  if (!event) {
    const error: ErrorRes = {
      code: 404,
      message: "Event not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function DELETE(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  const event = await get(params.uuid);

  if (!event) {
    const error: ErrorRes = {
      code: 404,
      message: "Event not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  if (
    !isAuthorized(request, event.userId) &&
    !isAuthorized(request, undefined, event.lecturerId)
  ) {
    return getUnauthorizedError();
  }

  await remove(params.uuid);
  return NextResponse.json(null);
}

export async function PUT(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  const event = await get(params.uuid);

  if (!event) {
    const error: ErrorRes = {
      code: 404,
      message: "Event not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  if (
    !isAuthorized(request, event.userId) &&
    !isAuthorized(request, undefined, event.lecturerId)
  ) {
    return getUnauthorizedError();
  }

  try {
    const data = (await request.json()) as EventBase;
    const event = await update(params.uuid, data);
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
