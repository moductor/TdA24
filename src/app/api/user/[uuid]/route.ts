import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
import {
  get,
  get as getUser,
  insertOne as insertOneUser,
  remove,
  update,
  update as updateUser,
} from "../../../../database/functions/User";
import { Error } from "../../../../database/models/Error";
import { User, UserBase } from "../../../../database/models/User";
import { generateToken } from "../../../../helpers/generateToken";
import { getUnauthorizedError, isAuthorized } from "../../checkAuthenticated";

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
  console.log("API: GET /api/user/[uuid], uuid:", params.uuid);

  const user = await get(params.uuid);

  if (!user) {
    console.log("  user not found");

    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  console.log("API: DELETE /api/user/[uuid], uuid:", params.uuid);

  if (!isAuthorized(request, undefined, params.uuid)) {
    console.log("  unauthorized!");
    return getUnauthorizedError();
  }

  const user = await get(params.uuid);

  if (!user) {
    console.log("  user not found");

    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return NextResponse.json(error, { status: 404 });
  }

  await remove(params.uuid);
  return NextResponse.json(null);
}

type UpdateQuery = UserBase & { username?: string; password?: string };

export async function PUT(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  console.log("API: PUT /api/user/[uuid], uuid:", params.uuid);

  if (!isAuthorized(request, params.uuid, undefined)) {
    console.log("  unauthorized!");
    return getUnauthorizedError();
  }

  const user = await get(params.uuid);

  if (!user) {
    console.log("  user not found");

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

    if (data.username && data.passwordHash) {
      const userData = {
        username: data.username,
        passwordHash: data.passwordHash,
        telephone: data.telephone,
        email: data.email,
        lecturerId: data.lecturerId,
        name: data.name,
      } as UserBase;

      const user = await getUser(params.uuid, {});

      const res = user
        ? await updateUser(user.uuid, userData)
        : await insertOneUser(userData);

      if (res && typeof res !== "string" && !Object.hasOwn(res, "uuid")) {
        console.log("  user error", JSON.stringify(res));

        return NextResponse.json({ userError: res }, { status: 409 });
      }

      console.log("  update user", user?.uuid);
    }

    const user = await update(params.uuid, data);

    if ((user as any).conflict) {
      return NextResponse.json(user, { status: 409 });
    }
    console.log("  update user", user);

    const res = NextResponse.json({
      ...user,
      username: data.username && data.password ? data.username : undefined,
    });

    const cookieOptions: Partial<ResponseCookie> = {
      path: "/",
      sameSite: "strict",
    };

    res.cookies.set("JWT", generateToken(user as User), cookieOptions);

    return res;
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
