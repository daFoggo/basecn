import { useCallback } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  authServices,
  type IAuthResponse,
  type IPostLogin,
  type IPostRegister,
} from "../services/auth";
import type { IUser } from "../utils/types";

export const AUTH_CACHE_KEYS = {
  ME: "auth-me",
  LOGIN: "auth-login",
  REGISTER: "auth-register",
};

export function useAuthSWR() {

  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
    mutate: mutateUser,
  } = useSWR<IUser>(AUTH_CACHE_KEYS.ME, authServices.me, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    onError: (error) => {
      toast.error("Failed to get user info");
      console.error("Failed to get user info:", error);
    },
  });

  const {
    trigger: loginTrigger,
    isMutating: isLoggingIn,
    error: loginError,
    reset: resetLogin,
  } = useSWRMutation(
    AUTH_CACHE_KEYS.LOGIN,
    async (_, { arg }: { arg: IPostLogin }) => {
      const response = await authServices.login(arg);
      return response;
    },
    {
      onSuccess: (data: IAuthResponse) => {
        mutateUser(data.user, false);
        toast.success("Đăng nhập thành công!");
      },
      onError: (error) => {
        toast.error("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin");
        console.error("Login failed:", error);
      },
    }
  );

  const {
    trigger: registerTrigger,
    isMutating: isRegistering,
    error: registerError,
    reset: resetRegister,
  } = useSWRMutation(
    AUTH_CACHE_KEYS.REGISTER,
    async (_, { arg }: { arg: IPostRegister }) => {
      const response = await authServices.register(arg);
      return response;
    },
    {
      onSuccess: (data: IAuthResponse) => {
        mutateUser(data.user, false);
        toast.success("Đăng ký thành công!");
      },
      onError: (error) => {
        toast.error("Đăng ký thất bại, vui lòng thử lại");
        console.error("Register failed:", error);
      },
    }
  );

  const login = useCallback(
    async (params: IPostLogin) => {
      return await loginTrigger(params);
    },
    [loginTrigger]
  );

  const register = useCallback(
    async (params: IPostRegister) => {
      return await registerTrigger(params);
    },
    [registerTrigger]
  );

  const logout = useCallback(() => {
    mutateUser(undefined, false);
    resetLogin();
    resetRegister();
    toast.success("Đã đăng xuất");
  }, [mutateUser, resetLogin, resetRegister]);

  const refreshUser = useCallback(() => {
    return mutateUser();
  }, [mutateUser]);

  const isAuthenticated = Boolean(user && !userError);

  return {
    user,
    isAuthenticated,
    isLoadingUser,
    userError,

    login,
    register,
    logout,
    refreshUser,

    isLoggingIn,
    isRegistering,

    loginError,
    registerError,

    resetLogin,
    resetRegister,
  };
}
