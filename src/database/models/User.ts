export type UserBase = {
  username: string;
  passwordHash: string;
  lecturerId?: string;
  name?: string;
  email?: string;
  telephone?: string;
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
