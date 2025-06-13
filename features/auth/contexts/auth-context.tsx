"use client";

import { IAuthTokens } from "@/lib/types/token";
import { IUserData } from "@/lib/types/user";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { ILoginParams, IRegisterParams } from "../services/auth";

interface IAuthContextType {
  user: IUserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    params: ILoginParams
  ) => Promise<{ user: IUserData; tokens: IAuthTokens }>;
  register: (
    params: IRegisterParams
  ) => Promise<{ user: IUserData; tokens: IAuthTokens }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<{ user: IUserData; tokens: IAuthTokens }>;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface IAuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const { user, isLoading, isError, login, register, logout, refreshToken } =
    useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  const value = {
    user,
    isLoading: isLoading || !isInitialized,
    isAuthenticated: !!user && !isError,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use the auth context
 */
export function useAuthContext(): IAuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
}
