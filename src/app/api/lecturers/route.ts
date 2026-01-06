import { NextRequest, NextResponse } from "next/server";
import {
  get,
  getAll,
  insertOne,
  isInputValid,
} from "../../../database/functions/Lecturer";
import {
  get as getUser,
  insertOne as insertOneUser,
} from "../../../database/functions/User";
import { Error } from "../../../database/models/Error";
import {
  LecturerBase,
  LecturerFilters,
} from "../../../database/models/Lecturer";
import { Pagination } from "../../../database/models/Pagination";
import { UserBase } from "../../../database/models/User";
import { hash } from "../../../helpers/passwordHash";
import { getUnauthorizedError, isAuthorized } from "../checkAuthenticated";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const params = request.nextUrl.searchParams;

  let pagination: Pagination | undefined;
  let filters: LecturerFilters | undefined;

  const paginationParam = params.get("pagination");
  const filtersParam = params.get("filters");

  if (paginationParam) pagination = JSON.parse(paginationParam) as Pagination;
  if (filtersParam) filters = JSON.parse(filtersParam) as LecturerFilters;

  console.log("API: GET /api/lecturers");

  try {
    const lecturers = await getAll(pagination, filters);
    return NextResponse.json(lecturers);
  } catch (e) {
    console.log("  error:", e);

    const error: Error = {
      code: 400,
      message: "An error occured while getting the filtered data",
    };

    return NextResponse.json(error, { status: 400 });
  }
}

type CreateQuery = LecturerBase & { username?: string; password?: string };

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("API: POST /api/lecturers");

  if (!isAuthorized(request)) {
    console.log("  unauthorized!");
    return getUnauthorizedError();
  }

  try {
    const data = (await request.json()) as CreateQuery;

    console.log("  body:", JSON.stringify(data));

    if (!isInputValid(data)) {
      console.log("  the input data is not valid");

      const error: Error = {
        code: 400,
        message: "This is not a valid input",
      };

      return NextResponse.json(error, { status: 400 });
    }

    const userData =
      data.username && data.password
        ? ({
            username: data.username,
            passwordHash: hash(data.password),
          } as UserBase)
        : undefined;

    if (data.username) delete data.username;
    if (data.password) delete data.password;

    const id = await insertOne(data as LecturerBase);
    const lecturer = await get(id);

    console.log("  inserted lecturer", id);

    if (userData) {
      userData.lecturerId = id;
      const userRes = await insertOneUser(userData);

      if (typeof userRes !== "string") {
        console.log("  user error", JSON.stringify(userRes));

        return NextResponse.json(
          { lecturerId: lecturer, userError: userRes },
          { status: 409 },
        );
      }

      const user = await getUser(userRes);

      console.log("  inserted user", user?.uuid);

      return NextResponse.json({ ...lecturer, username: user!.username });
    }

    return NextResponse.json(lecturer);
  } catch (e) {
    console.log("  error:", e);

    const error: Error = {
      code: 400,
      message: "An error occured while parsing the input data",
    };

    const errorObj = e as any;
    if (errorObj.message) error.message = errorObj.message;

    return NextResponse.json(error, { status: 400 });
  }
}
