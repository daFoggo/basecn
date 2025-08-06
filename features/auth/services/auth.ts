import { BACKEND_API } from "@/lib/configs/environment";
import { fetcher } from "@/lib/utils/fetcher";
import { SAMPLE_USER } from "../utils/constants";
import { generateSampleSession } from "../utils/functions";
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
    // const response = await fetcher<IAuthResponse>([
    //   AUTH_ENDPOINTS.LOGIN,
    //   { method: "POST", data: params },
    // ]);
    console.log("Login service called with params:", params);
    return {
      session: generateSampleSession(),
      user: {
        ...SAMPLE_USER,
        // ...response.user,
      },
    };
    // return response;
  },

  register: async (params: IPostRegister): Promise<IAuthResponse> => {
    const response = await fetcher<IAuthResponse>([
      AUTH_ENDPOINTS.REGISTER,
      { method: "POST", data: params },
    ]);
    return response;
  },

  me: async (): Promise<IUser> => {
    const response = await fetcher<IUser>([
      AUTH_ENDPOINTS.ME,
      { method: "GET" },
    ]);
    return response;
  },
};
