import { BACKEND_API } from "@/lib/constants/environment";
import { fetcher } from "@/lib/utils/fetcher";
import type { ISession, IUser } from "../utils/types";

const AUTH_ENDPOINTS = {
  LOGIN: `${BACKEND_API}/auth/login`,
  REGISTER: `${BACKEND_API}/auth/register`,
  ME: `${BACKEND_API}/auth/me`,
};

export interface IPostLogin {
  userName: string;
  password: string;
}

export interface IPostRegister {
  userName: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  session: ISession;
  user: IUser;
}

export const authServices = {
  login: async (params: IPostLogin): Promise<IAuthResponse> => {
    const response = await fetcher<IAuthResponse>([
      AUTH_ENDPOINTS.LOGIN,
      { method: "POST", data: params },
    ]);
    return response;
  },

  register: async (params: IPostRegister): Promise<IAuthResponse> => {
    const response = await fetcher<IAuthResponse>([
      AUTH_ENDPOINTS.REGISTER,
      { method: "POST", data: params },
    ]);
    return response;
  },

  me: async (): Promise<IUser> => {
    // const response = await fetcher<IUser>([
    //   AUTH_ENDPOINTS.ME,
    //   { method: "GET" },
    // ]);
    // return response;
    // Mocking user data for demonstration purposes
    const SAMPLE_USER: IUser = {
      id: "foggo",
      userName: "Foggo",
      email: "foggo@gmail.com",
      emailVerified: true,
      image: "https://api.dicebear.com/9.x/lorelei/svg?seed=Chase",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    };

    return SAMPLE_USER;
  },
};
