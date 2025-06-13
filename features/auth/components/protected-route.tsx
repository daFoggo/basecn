"use client";

import { PageLoader } from "@/components/common/page-loader";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthContext } from "../contexts/auth-context";

interface IProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  fallback,
  redirectTo = "/auth/login",
}: IProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex flex-col justify-center items-center min-h-svh">
          <PageLoader variant="bars" text="sdasd" />
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
}
