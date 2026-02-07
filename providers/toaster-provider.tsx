"use client";

import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export const ToasterProvider = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      richColors
      closeButton
      theme={theme as "light" | "dark" | "system"}
    />
  );
};
