import { WithUuid } from "./DB";

export type UserBase = {
  username: string;
  passwordHash: string;
  lecturerId?: string;
  name?: string;
  email?: string;
  telephone?: string;
};

export type User = WithUuid<UserBase>;

export type UserInsertErrorResponse = {
  conflict?: {
    username: boolean;
    lecturerId: boolean;
    email: boolean;
    telephone: boolean;
  };
};
