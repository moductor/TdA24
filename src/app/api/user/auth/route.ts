import { sign } from "jsonwebtoken";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
import { get } from "../../../../database/functions/User";
import { compare } from "../../../../helpers/passwordHash";
import { AuthQuery, AuthResponse } from "./AuthQuery";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = (await request.json()) as AuthQuery;

  const user =
    (await get(undefined, { email: data.usernameOrEmail })) ||
    (await get(undefined, { username: data.usernameOrEmail }));

  if (!user) {
    return new NextResponse(null, { status: 404 });
  }

  if (!compare(data.password, user.passwordHash)) {
    return new NextResponse(null, { status: 404 });
  }

  const keepLoggedIn = data.keepLoggedIn || false;

  const token = sign(user, process.env.JWT_ACCESS_KEY);

  const res = NextResponse.json({ token } as AuthResponse);

  const cookieOptions: Partial<ResponseCookie> = {
    path: "/",
    sameSite: "strict",
  };
  if (keepLoggedIn) cookieOptions.expires = getExpirationDate();
  res.cookies.set("JWT", token, cookieOptions);
  return res;
}

function getExpirationDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date;
}
