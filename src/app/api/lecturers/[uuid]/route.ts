import { NextRequest, NextResponse } from "next/server";
import {
  get,
  remove,
  updateOneById,
} from "../../../../database/functions/Lecturer";
import { Error } from "../../../../database/models/Error";
import { LecturerInput } from "../../../../database/models/Lecturer";

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
  const lecturer = await get(params.uuid);

  if (!lecturer) {
    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  return NextResponse.json(lecturer);
}

export async function DELETE(
  _: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  const lecturer = await get(params.uuid);

  if (!lecturer) {
    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  await remove(params.uuid);
  return NextResponse.json(null);
}

export async function PUT(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  const lecturer = await get(params.uuid);

  if (!lecturer) {
    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  try {
    const data = (await request.json()) as LecturerInput;

    Object.keys(data)
      .filter((key) => (data as any)[key] === null)
      .forEach((key) => ((data as any)[key] = undefined));

    const lecturer = await updateOneById(params.uuid, data);
    return NextResponse.json(lecturer);
  } catch (e) {
    console.log(e);

    const error: Error = {
      code: 400,
      message:
        (e as any)["message"] ||
        "An error occured while parsing the input data",
    };

    return NextResponse.json(error, { status: 400 });
  }
}
