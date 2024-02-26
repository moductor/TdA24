import { Jwt } from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "../database/models/User";
import { isTokenValid, parseUserToken } from "./tokenParser";

export function getUserTokenWithSession(): Jwt | undefined {
  const tokenCookie = cookies().get("JWT")?.value;
  return parseUserToken(tokenCookie);
}

export function isLoggedInWithSession(token?: Jwt): boolean {
  if (!token) token = getUserTokenWithSession();
  return isTokenValid(token);
}

export function getCurrentUserWithSession(): User | undefined {
  const token = getUserTokenWithSession();
  if (!isLoggedInWithSession(token)) return;
  return token!.payload as User;
}
