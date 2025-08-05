import type { LucideIcon } from "lucide-react";

export interface IBreadcrumbItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isCurrentPage?: boolean;
}

export interface INavigationConfig {
  root: INavItem;
  navMain: INavItem[];
  navSecondary?: INavItem[];
}

export interface INavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}
