import { NextRequest, NextResponse } from "next/server";
import { Error as ErrorRes } from "../../database/models/Error";
import { getUserFromToken } from "./user/auth/verifyToken";

const adminUser = {
  username: "TdA",
  password: "d8Ef6!dGG_pv",
};

export function getUnauthorizedError() {
  const error: ErrorRes = {
    code: 401,
    message: "Not authorized",
  };

  return NextResponse.json(error, {
    status: 401,
    headers: {
      "WWW-Authenticate": "Basic, Bearer",
    },
  });
}

export function isAuthorized(
  request: NextRequest,
  neededUserId?: string,
  neededLecturerId?: string,
): boolean {
  const authHeader = request.headers.get("Authorization");

  if (authHeader) {
    const scheme = authHeader.trim().split(" ")[0].trim();
    const value = authHeader.trim().replace(scheme, "").trim();

    if (scheme == "Basic") {
      const user = decodeBasicAuthValue(value);
      if (
        user.username == adminUser.username &&
        user.password == adminUser.password
      ) {
        return true;
      }
    }

    if (scheme == "Bearer") {
      if (checkToken(value, neededUserId, neededLecturerId)) {
        return true;
      }
    }
  }

  const sessionCookie = request.cookies.get("JWT");
  if (sessionCookie) {
    if (checkToken(sessionCookie.value, neededUserId, neededLecturerId)) {
      return true;
    }
  }

  return false;
}

function checkToken(
  token: string,
  neededUserId?: string,
  neededLecturerId?: string,
): boolean {
  const res = getUserFromToken(token);
  if (!res) return false;

  if (neededUserId && res.uuid != neededUserId) return false;
  if (neededLecturerId && res.lecturerId != neededLecturerId) return false;
  return true;
}

function decodeBasicAuthValue(value: string) {
  const decoded = atob(value);
  const username = decoded.split(":")[0];
  const password = decoded.replace(`${username}:`, "");
  return { username, password };
}
