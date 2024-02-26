export type UserBase = {
  username: string;
  passwordHash: string;
  lecturerId?: string | null;
  name?: string | null;
  email?: string | null;
  telephone?: string | null;
};

export type User = UserBase & { uuid: string };

export type UserInsertErrorResponse = {
  conflict?: {
    username: boolean;
    lecturerId: boolean;
    email: boolean;
    telephone: boolean;
  };
};
