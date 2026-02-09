"use client";

import { createContext, useContext } from "react";

interface ICommandMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const CommandMenuContext =
  createContext<ICommandMenuContextValue | null>(null);

export const useCommandMenu = () => {
  const context = useContext(CommandMenuContext);
  if (!context) {
    throw new Error("useCommandMenu must be used within CommandMenuProvider");
  }
  return context;
};
