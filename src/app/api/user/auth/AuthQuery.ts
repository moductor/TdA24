export type AuthQuery = {
  username: string;
  password: string;
  keepLoggedIn?: boolean;
};

export type AuthResponse = {
  token: string;
};
