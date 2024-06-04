import { post } from ".";
import { config } from "../../config";
import { LoginUserRequest } from "./types";
import { LoginUserResponse } from "./types";

export const loginUser = (dataCredentials: LoginUserRequest) =>
  post<LoginUserResponse, LoginUserRequest>(
    `${config.BACKEND_URL}/api/v1/login`,
    dataCredentials
  );
