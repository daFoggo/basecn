import type { ReactNode } from "react";

export type TThemeValue = "light" | "dark" | "system";

export interface IThemeOption {
  value: TThemeValue;
  label: string;
  icon: ReactNode;
}
