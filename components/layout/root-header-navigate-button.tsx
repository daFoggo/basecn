"use client";

import { useAuthContext } from "@/features/auth";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const RootHeaderNavigateButton = () => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  const handleClick = () => {
    router.push(isAuthenticated ? "/dashboard" : "/auth/login");
  };

  return (
    <Button size="sm" onClick={handleClick}>
      {isAuthenticated ? "Go to the app" : "Login"}
      <ChevronRight className="size-4" />
    </Button>
  );
};
