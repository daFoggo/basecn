import { BACK_END_API } from "@/lib/constants";
import { fetcher } from "@/lib/fetch";
import {
  clearAuthData,
  getRefreshToken,
  saveTokens,
  saveUser,
} from "@/lib/storage";
import { IAuthTokens } from "@/lib/types/token";
import { IUserData } from "@/lib/types/user";

const AUTH_ENDPOINTS = {
  LOGIN: `${BACK_END_API}/auth/login`,
  REGISTER: `${BACK_END_API}/auth/register`,
  REFRESH: `${BACK_END_API}/auth/refresh`,
  LOGOUT: `${BACK_END_API}/auth/logout`,
  ME: `${BACK_END_API}/auth/me`,
};

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: IUserData;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams {
  email: string;
  password: string;
  userName: string;
}

/**
 *
 * @param response The authentication response from the server
 * @returns An object containing user data and authentication tokens
 */
const processAuthResponse = (
  response: IAuthResponse
): { user: IUserData; tokens: IAuthTokens } => {
  const tokens: IAuthTokens = {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt: Date.now() + response.expires_in * 1000,
  };

  saveTokens(tokens);
  saveUser(response.user);

  return { user: response.user, tokens };
};

export const authService = {
  login: async (params: ILoginParams) => {
    const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data: IAuthResponse = await response.json();
    return processAuthResponse(data);
  },

  register: async (params: IRegisterParams) => {
    const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data: IAuthResponse = await response.json();
    return processAuthResponse(data);
  },

  refreshToken: async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(AUTH_ENDPOINTS.REFRESH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      clearAuthData();
      throw new Error("Token refresh failed");
    }

    const data: IAuthResponse = await response.json();
    return processAuthResponse(data);
  },

  logout: async () => {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      await fetch(AUTH_ENDPOINTS.LOGOUT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      }).catch(console.error);
    }
    clearAuthData();
  },

  getCurrentUser: async () => {
    return await fetcher<IUserData>(AUTH_ENDPOINTS.ME);
  },
};
