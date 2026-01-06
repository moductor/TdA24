import { Jwt } from "jsonwebtoken";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { User } from "../database/models/User";
import { isTokenValid, parseUserToken } from "./tokenParser";

export async function getUserTokenWithSession(
  currentCookies?: ReadonlyRequestCookies,
): Promise<Jwt | undefined> {
  const c = currentCookies ?? (await require("next/headers").cookies());
  const tokenCookie = c.get("JWT")?.value;
  return parseUserToken(tokenCookie);
}

export async function isLoggedInWithSession(
  token?: Jwt,
  cookies?: ReadonlyRequestCookies,
): Promise<boolean> {
  if (!token) token = await getUserTokenWithSession(cookies);
  return isTokenValid(token);
}

export async function getCurrentUserWithSession(
  cookies?: ReadonlyRequestCookies,
): Promise<User | undefined> {
  const token = await getUserTokenWithSession(cookies);
  if (!token || !isLoggedInWithSession(token)) return;
  return token!.payload as User;
}
