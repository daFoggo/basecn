import type { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

export interface ISidebarMenuItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  badge?: string | number;
  items?: ISidebarSubMenuItem[];
}

export interface ISidebarSubMenuItem {
  id: string;
  title: string;
  url: string;
  isActive?: boolean;
}

export interface ISidebarAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export interface ISidebarSection {
  id: string;
  type: "navigation" | "projects" | "custom";
  title?: string;
  items: ISidebarMenuItem[];
  showMore?: boolean;
  actions?: ISidebarAction[];
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export interface ISidebarUser {
  name: string;
  email: string;
  avatar: string;
  actions?: ISidebarAction[];
}

export interface ISidebarSearch {
  enabled: boolean;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export interface ISidebarConfig {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";

  sections: ISidebarSection[];

  showSearch?: boolean;
  showUser?: boolean;
  showFooter?: boolean;

  searchComponent?: ComponentType;
  userComponent?: ComponentType;
  footerComponent?: ComponentType;

  className?: string;
}
