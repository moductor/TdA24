import { NextRequest, NextResponse } from "next/server";
import {
  get,
  getAll,
  insertOne,
  isInputValid,
} from "../../../database/functions/Lecturer";
import { Error } from "../../../database/models/Error";
import { LecturerBase } from "../../../database/models/Lecturer";

export async function GET(): Promise<NextResponse> {
  const lecturers = await getAll();
  return NextResponse.json(lecturers);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as LecturerBase;

    if (!isInputValid(data)) {
      const error: Error = {
        code: 400,
        message: "This is not a valid input",
      };

      return NextResponse.json(error, { status: 400 });
    }

    const id = await insertOne(data);
    const lecturer = await get(id);
    return NextResponse.json(lecturer);
  } catch (e) {
    console.log(e);

    const error: Error = {
      code: 400,
      message: "An error occured while parsing the input data",
    };

    return NextResponse.json(error, { status: 400 });
  }
}
