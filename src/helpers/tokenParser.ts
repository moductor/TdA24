import { Jwt, JwtPayload, decode } from "jsonwebtoken";

export function parseUserToken(tokenStr?: string): Jwt | undefined {
  if (!tokenStr) return;
  const tokenData = decode(tokenStr, { complete: true, json: true });
  if (!tokenData) return;
  return tokenData;
}

export function isTokenValid(token?: Jwt): boolean {
  if (!token) return false;
  const payload = token.payload as JwtPayload;
  if (!payload.exp) return true;
  if (Date.now() < payload.exp * 1000) return true;
  return false;
}
