import type { LucideIcon } from "lucide-react";

export type TThemeValue = "light" | "dark" | "system";

export interface IThemeOption {
  value: TThemeValue;
  label: string;
  icon: LucideIcon;
}
