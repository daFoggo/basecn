"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  type ILoginParams,
  type IRegisterParams,
  authService,
} from "../services/auth";
import type { IAuthTokens, IUserData } from "../utils/types";

export const AUTH_CACHE_KEYS = {
  CURRENT_USER: "/api/auth/me",
};

export function useCurrentUser() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    AUTH_CACHE_KEYS.CURRENT_USER,
    () => authService.getCurrentUser(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      errorRetryCount: 0,
    }
  );

  return {
    user: data as IUserData | null,
    isLoading,
    isValidating,
    error,
    mutate,
    refresh: () => mutate(),
  };
}

export function useLogin() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    AUTH_CACHE_KEYS.CURRENT_USER,
    async (_, { arg }: { arg: ILoginParams }) => {
      return await authService.login(arg);
    },
    {
      revalidate: true,
      onSuccess: (result) => {
        toast.success("Đăng nhập thành công");
        console.log("Login successful:", result.user);
      },
      onError: (error) => {
        toast.error("Đăng nhập thất bại");
        console.error("Failed to login:", error);
      },
    }
  );

  return {
    trigger,
    isLogging: isMutating,
    error,
    data: data as { user: IUserData; tokens: IAuthTokens },
    reset,
  };
}

export function useRegister() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    AUTH_CACHE_KEYS.CURRENT_USER,
    async (_, { arg }: { arg: IRegisterParams }) => {
      return await authService.register(arg);
    },
    {
      revalidate: true,
      onSuccess: (result) => {
        toast.success("Đăng ký tài khoản thành công");
        console.log("Registration successful:", result.user);
      },
      onError: (error) => {
        toast.error("Đăng ký tài khoản thất bại");
        console.error("Failed to register:", error);
      },
    }
  );

  return {
    trigger,
    isRegistering: isMutating,
    error,
    data: data as { user: IUserData; tokens: IAuthTokens },
    reset,
  };
}

export function useLogout() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    AUTH_CACHE_KEYS.CURRENT_USER,
    async () => {
      return await authService.logout();
    },
    {
      revalidate: false,
      onSuccess: () => {
        toast.success("Đăng xuất thành công");
        console.log("Logout successful");
      },
      onError: (error) => {
        toast.error("Có lỗi xảy ra khi đăng xuất");
        console.error("Failed to logout:", error);
      },
    }
  );

  return {
    trigger,
    isLoggingOut: isMutating,
    error,
    data: data as void,
    reset,
  };
}

export function useRefreshToken() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    AUTH_CACHE_KEYS.CURRENT_USER,
    async () => {
      return await authService.refreshToken();
    },
    {
      revalidate: true,
      onSuccess: (result) => {
        console.log("Token refreshed successfully:", result.user);
      },
      onError: (error) => {
        toast.error("Phiên đăng nhập đã hết hạn");
        console.error("Failed to refresh token:", error);
      },
    }
  );

  return {
    trigger,
    isRefreshing: isMutating,
    error,
    data: data as { user: IUserData; tokens: IAuthTokens },
    reset,
  };
}

export function useAuth() {
  const userQuery = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const refreshTokenMutation = useRefreshToken();

  return {
    // User data
    user: userQuery.user,
    isLoading: userQuery.isLoading,
    isValidating: userQuery.isValidating,
    error: userQuery.error,
    refresh: userQuery.refresh,
    mutateUser: userQuery.mutate,

    // Login
    login: loginMutation.trigger,
    isLogging: loginMutation.isLogging,
    loginError: loginMutation.error,
    resetLogin: loginMutation.reset,

    // Register
    register: registerMutation.trigger,
    isRegistering: registerMutation.isRegistering,
    registerError: registerMutation.error,
    resetRegister: registerMutation.reset,

    // Logout
    logout: logoutMutation.trigger,
    isLoggingOut: logoutMutation.isLoggingOut,
    logoutError: logoutMutation.error,
    resetLogout: logoutMutation.reset,

    // Refresh Token
    refreshToken: refreshTokenMutation.trigger,
    isRefreshing: refreshTokenMutation.isRefreshing,
    refreshError: refreshTokenMutation.error,
    resetRefresh: refreshTokenMutation.reset,
  };
}
