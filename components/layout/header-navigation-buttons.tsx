"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const HeaderNavigationButtons = () => {
  // const { isAuthenticated } = useAuthContext();
  const isAuthenticated = true;
  const router = useRouter();

  const handleClick = () => {
    router.push(isAuthenticated ? "/exercises" : "/auth/login");
  };

  return (
    <Button size="sm" onClick={handleClick}>
      {isAuthenticated ? "Go to the app" : "Login"}
      <ChevronRight className="size-4" />
    </Button>
  );
};

export default HeaderNavigationButtons;
