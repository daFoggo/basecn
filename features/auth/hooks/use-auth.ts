"use client";

import type { IAuthTokens } from "@/lib/types/token";
import type { IUserData } from "@/lib/types/user";
import { useCallback } from "react";
import useSWR, { type KeyedMutator, mutate } from "swr";
import { ILoginParams, IRegisterParams, authService } from "../services/auth";

interface IAuthState {
  user: IUserData | null;
  isLoading: boolean;
  isError: Error | null;
}

const USER_KEY = "/api/auth/me";

export const useAuth = (): IAuthState & {
  login: (
    params: ILoginParams
  ) => Promise<{ user: IUserData; tokens: IAuthTokens }>;
  register: (
    params: IRegisterParams
  ) => Promise<{ user: IUserData; tokens: IAuthTokens }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<{ user: IUserData; tokens: IAuthTokens }>;
  mutateUser: KeyedMutator<IUserData>;
} => {
  const {
    data: user,
    error,
    isLoading,
    mutate: mutateUser,
  } = useSWR<IUserData>(USER_KEY, () => authService.getCurrentUser(), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    errorRetryCount: 0,
  });

  const login = useCallback(async (params: ILoginParams) => {
    const result = await authService.login(params);
    await mutate(USER_KEY, result.user, false);
    return result;
  }, []);

  const register = useCallback(async (params: IRegisterParams) => {
    const result = await authService.register(params);
    await mutate(USER_KEY, result.user, false);
    return result;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    await mutate(USER_KEY, null, false);
  }, []);

  const refreshToken = useCallback(async () => {
    const result = await authService.refreshToken();
    await mutate(USER_KEY, result.user, false);
    return result;
  }, []);

  return {
    user: user || null,
    isLoading,
    isError: error,
    login,
    register,
    logout,
    refreshToken,
    mutateUser,
  };
};
