import { compareSync, hashSync } from "bcrypt";

export const saltRounds = 10;

export function hash(password: string): string {
  return hashSync(password, saltRounds);
}

export function compare(password: string, hash: string): boolean {
  return compareSync(password, hash);
}
