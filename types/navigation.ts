import type { ReactNode } from "react";

export interface INavItem {
  title: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
  items?: INavItem[];
  variant?: "item" | "group";
  disabled?: boolean;

  // Command menu
  keywords?: string[];
  description?: string;
  shortcut?: string;
  external?: boolean;
}

export interface INavGroup {
  title?: string;
  items: INavItem[];
}

export type TFlatNavItem = INavItem & { group: string };

export type TFlatNavGroup = Omit<INavGroup, "items"> & {
  items: TFlatNavItem[];
};

export type TNavItemWithIcon = INavItem & { icon: ReactNode };
