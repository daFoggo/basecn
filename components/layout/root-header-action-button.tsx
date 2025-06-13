"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const RootHeaderActionButton = () => {
  const isAuthenticated = false;
  const router = useRouter();

  const handleClick = () => {
    router.push(isAuthenticated ? "/dashboard" : "/auth");
  };

  return (
    <Button size="sm" onClick={handleClick}>
      {isAuthenticated ? "Go to the app" : "Login"}
      <ChevronRight className="size-4" />
    </Button>
  );
};
