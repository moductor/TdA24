import { verify } from "jsonwebtoken";
import { User } from "../../../../database/models/User";

export function getUserFromToken(token: string): User | undefined {
  try {
    const res = verify(token, process.env.JWT_ACCESS_KEY, { complete: true });
    return res.payload as User;
  } catch {
    return;
  }
}
