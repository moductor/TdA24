import { sign } from "jsonwebtoken";
import { User } from "../database/models/User";

export function generateToken(user: User) {
  const token = sign(user, process.env.JWT_ACCESS_KEY);
  return token;
}

export function getExpirationDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date;
}
