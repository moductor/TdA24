import { Jwt } from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "../database/models/User";
import { isTokenValid, parseUserToken } from "./tokenParser";

export async function getUserTokenWithSession(): Promise<Jwt | undefined> {
  const tokenCookie = (await cookies()).get("JWT")?.value;
  return parseUserToken(tokenCookie);
}

export async function isLoggedInWithSession(token?: Jwt): Promise<boolean> {
  if (!token) token = await getUserTokenWithSession();
  return isTokenValid(token);
}

export async function getCurrentUserWithSession(): Promise<User | undefined> {
  const token = await getUserTokenWithSession();
  if (!token || !isLoggedInWithSession(token)) return;
  return token!.payload as User;
}
