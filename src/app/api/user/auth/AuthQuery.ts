export type AuthQuery = {
  usernameOrEmail: string;
  password: string;
  keepLoggedIn?: boolean;
};

export type AuthResponse = {
  token: string;
};
