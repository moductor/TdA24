import { NextRequest, NextResponse } from "next/server";
import { insertOne } from "../../../../database/functions/User";
import { hash } from "../../../../helpers/passwordHash";
import { RegisterQuery } from "./RegisterQuery";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = (await request.json()) as RegisterQuery;

  const res = await insertOne({
    username: data.username,
    email: data.email,
    passwordHash: hash(data.password),
  });

  if (typeof res != "string") {
    return NextResponse.json(res, { status: 409 });
  }

  return NextResponse.json(res, { status: 201 });
}
