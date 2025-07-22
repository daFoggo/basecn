"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { type ILoginParams, type IRegisterParams } from "../services/auth";
import { type IAuthTokens, type IUserData } from "../utils/types";

interface IAuthContextType {
  user: IUserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Auth actions
  login: (
    params: ILoginParams
  ) => Promise<{ user: IUserData; tokens: IAuthTokens }>;
  register: (
    params: IRegisterParams
  ) => Promise<{ user: IUserData; tokens: IAuthTokens }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<{ user: IUserData; tokens: IAuthTokens }>;

  // Loading states
  isLogging: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  isRefreshing: boolean;

  // Error states
  loginError: Error | null;
  registerError: Error | null;
  logoutError: Error | null;
  refreshError: Error | null;

  // Reset functions
  resetLogin: () => void;
  resetRegister: () => void;
  resetLogout: () => void;
  resetRefresh: () => void;

  // Utils
  refresh: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface IAuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const {
    // User data
    user,
    isLoading,
    error,
    refresh,

    // Login
    login,
    isLogging,
    loginError,
    resetLogin,

    // Register
    register,
    isRegistering,
    registerError,
    resetRegister,

    // Logout
    logout,
    isLoggingOut,
    logoutError,
    resetLogout,

    // Refresh Token
    refreshToken,
    isRefreshing,
    refreshError,
    resetRefresh,
  } = useAuth();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  const value: IAuthContextType = {
    // User state
    user,
    isLoading: isLoading || !isInitialized,
    isAuthenticated: !!user && !error,

    // Auth actions
    login,
    register,
    logout,
    refreshToken,

    // Loading states
    isLogging,
    isRegistering,
    isLoggingOut,
    isRefreshing,

    // Error states
    loginError,
    registerError,
    logoutError,
    refreshError,

    // Reset functions
    resetLogin,
    resetRegister,
    resetLogout,
    resetRefresh,

    // Utils
    refresh,
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
