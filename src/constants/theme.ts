import { Monitor, Moon, Sun } from "lucide-react";

import type { IThemeOption } from "@/types/theme";

export const THEME_OPTIONS: IThemeOption[] = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export const DEFAULT_THEME = "system" as const;
