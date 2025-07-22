"use client";

import { fetcher } from "@/lib/fetch";
import type { ReactNode } from "react";
import { SWRConfig } from "swr";
import { AuthContextProvider } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Root Auth Provider that combines  special SWR configuration with Auth Context
 */
export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
      }}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </SWRConfig>
  );
}
