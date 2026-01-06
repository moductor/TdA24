import { NextRequest, NextResponse } from "next/server";
import {
  get,
  remove,
  updateOneById,
} from "../../../../database/functions/Lecturer";
import {
  get as getUser,
  insertOne as insertOneUser,
  update as updateUser,
} from "../../../../database/functions/User";
import { Error } from "../../../../database/models/Error";
import { LecturerInput } from "../../../../database/models/Lecturer";
import { UserBase } from "../../../../database/models/User";
import { hash } from "../../../../helpers/passwordHash";
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
  console.log("API: GET /api/lecturers/[uuid], uuid:", params.uuid);

  const lecturer = await get(params.uuid);

  if (!lecturer) {
    console.log("  lecturer not found");

    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  return NextResponse.json(lecturer);
}

export async function DELETE(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  console.log("API: DELETE /api/lecturers/[uuid], uuid:", params.uuid);

  if (!isAuthorized(request, undefined, params.uuid)) {
    console.log("  unauthorized!");
    return getUnauthorizedError();
  }

  const lecturer = await get(params.uuid);

  if (!lecturer) {
    console.log("  lecturer not found");

    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  await remove(params.uuid);
  return NextResponse.json(null);
}

type UpdateQuery = LecturerInput & { username?: string; password?: string };

export async function PUT(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  console.log("API: PUT /api/lecturers/[uuid], uuid:", params.uuid);

  if (!isAuthorized(request, undefined, params.uuid)) {
    console.log("  unauthorized!");
    return getUnauthorizedError();
  }

  const lecturer = await get(params.uuid);

  if (!lecturer) {
    console.log("  lecturer not found");

    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  try {
    const data = (await request.json()) as UpdateQuery;

    Object.keys(data)
      .filter((key) => (data as any)[key] === null)
      .forEach((key) => ((data as any)[key] = undefined));

    if (data.username && data.password) {
      const userData = {
        username: data.username,
        passwordHash: hash(data.password),
        lecturerId: params.uuid,
      } as UserBase;

      const user = await getUser(undefined, { lecturerId: params.uuid });

      const res = user
        ? await updateUser(user.uuid, { ...user, ...userData })
        : await insertOneUser(userData);

      if (res && typeof res !== "string" && !Object.hasOwn(res, "uuid")) {
        console.log("  user error", JSON.stringify(res));

        return NextResponse.json({ userError: res }, { status: 409 });
      }

      console.log("  update user", user?.uuid);
    }

    const lecturer = await updateOneById(params.uuid, data);

    console.log("  update lecturer", lecturer?.uuid);

    return NextResponse.json({
      ...lecturer,
      username: data.username && data.password ? data.username : undefined,
    });
  } catch (e) {
    console.log("  error:", e);

    const error: Error = {
      code: 400,
      message: "An error occured while parsing the input data",
    };

    const errorObj = e as any;
    if (errorObj.message) {
      error.message = JSON.stringify(errorObj.cause);
    }

    return NextResponse.json(error, { status: 400 });
  }
}
