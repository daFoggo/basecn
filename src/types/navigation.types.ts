import type { LucideIcon } from "lucide-react";

/**
 * Interface for a navigation item (Link or Submenu).
 * - If no `items` -> Standard Link.
 * - If `items` exists -> Parent Item with Submenu (e.g. Collapsible).
 */
export interface INavItem {
  title: string;
  href?: string; // Reverted to href as requested
  icon?: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  items?: INavItem[]; // Child submenu (if valid)

  // Metadata for Command Menu / Search
  keywords?: string[];
  description?: string;
  shortcut?: string;
  external?: boolean;
}

/**
 * Interface for a group in Sidebar (Section).
 * Contains Title (Label) and list of items inside.
 */
export interface INavGroup {
  title?: string; // Section Name (e.g. "Projects", "Settings"). Can be null.
  items: INavItem[];
}

export type TFlatNavItem = INavItem & { group: string };
export type TFlatNavGroup = { title: string; items: TFlatNavItem[] };
