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

export async function GET(request: NextRequest): Promise<NextResponse> {
  const params = request.nextUrl.searchParams;

  let pagination: Pagination | undefined;
  let filters: LecturerFilters | undefined;

  const paginationParam = params.get("pagination");
  const filtersParam = params.get("filters");

  if (paginationParam) pagination = JSON.parse(paginationParam) as Pagination;
  if (filtersParam) filters = JSON.parse(filtersParam) as LecturerFilters;

  try {
    const lecturers = await getAll(pagination, filters);
    return NextResponse.json(lecturers);
  } catch (e) {
    console.log(e);

    const error: Error = {
      code: 400,
      message: "An error occured while getting the filtered data",
    };

    return NextResponse.json(error, { status: 400 });
  }
}

type CreateQuery = LecturerBase & { username?: string; password?: string };

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return getUnauthorizedError();
  }

  try {
    const data = (await request.json()) as CreateQuery;

    if (!isInputValid(data)) {
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

    if (userData) {
      userData.lecturerId = id;
      const userRes = await insertOneUser(userData);

      if (typeof userRes !== "string") {
        return NextResponse.json(
          { lecturerId: lecturer, userError: userRes },
          { status: 409 },
        );
      }

      const user = await getUser(userRes);
      return NextResponse.json({ ...lecturer, username: user!.username });
    }

    return NextResponse.json(lecturer);
  } catch (e) {
    console.log(e);

    const error: Error = {
      code: 400,
      message: "An error occured while parsing the input data",
    };

    const errorObj = e as any;
    if (errorObj.message) error.message = errorObj.message;

    return NextResponse.json(error, { status: 400 });
  }
}
