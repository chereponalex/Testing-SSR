export type LoginUserRequest = {
  login: string;
  password: string;
};
export type LoginUserResponse = {
  data: {
    token: string;
  };
};
