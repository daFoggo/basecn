import { Laptop, Moon, Sun } from "lucide-react";

import type { IThemeOption } from "@/types/theme";

// =============================================================================
// THEME CONSTANTS
// Theme options for UI components (Command Menu, Theme Switcher, etc.)
// =============================================================================

export const THEME_OPTIONS: IThemeOption[] = [
  { value: "light", label: "Light", icon: <Sun className="size-4" /> },
  { value: "dark", label: "Dark", icon: <Moon className="size-4" /> },
  { value: "system", label: "System", icon: <Laptop className="size-4" /> },
];

/**
 * Default theme value
 */
export const DEFAULT_THEME = "system" as const;
