import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
import { get } from "../../../../database/functions/User";
import {
  generateToken,
  getExpirationDate,
} from "../../../../helpers/generateToken";
import { compare } from "../../../../helpers/passwordHash";
import { AuthQuery, AuthResponse } from "./AuthQuery";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = (await request.json()) as AuthQuery;

  const user = await get(undefined, { username: data.username });

  if (!user) {
    return new NextResponse(null, { status: 404 });
  }

  if (!compare(data.password, user.passwordHash)) {
    return new NextResponse(null, { status: 404 });
  }

  const keepLoggedIn = data.keepLoggedIn || false;

  const token = generateToken(user);

  const res = NextResponse.json({ token } as AuthResponse);

  const cookieOptions: Partial<ResponseCookie> = {
    path: "/",
    sameSite: "strict",
  };
  if (keepLoggedIn) cookieOptions.expires = getExpirationDate();
  res.cookies.set("JWT", token, cookieOptions);
  return res;
}
