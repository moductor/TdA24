"use client";

import Cookies from "js-cookie";
import { Jwt } from "jsonwebtoken";
import { User } from "../database/models/User";
import { isTokenValid, parseUserToken } from "./tokenParser";

export const jwtKeyCookie = "JWT";

export function deleteUserSession() {
  Cookies.remove(jwtKeyCookie);
}

export function isUserLoggedIn(token?: Jwt): boolean {
  if (!token) {
    const tokenStr = Cookies.get(jwtKeyCookie);
    if (!tokenStr) return false;
    token = parseUserToken(tokenStr);
  }

  if (!token) return false;
  if (!isTokenValid(token)) return false;
  return true;
}

export function getCurrentUser(): User | undefined {
  const tokenStr = Cookies.get(jwtKeyCookie);
  if (!tokenStr) return;
  const token = parseUserToken(tokenStr);
  if (!token) return;
  if (!isUserLoggedIn(token)) return;
  return token.payload as User;
}
