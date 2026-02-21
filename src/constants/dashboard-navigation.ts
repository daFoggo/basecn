import {
  Bell,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
  Table,
  UserCircle,
  Users,
} from "lucide-react";
import type { INavGroup } from "@/types/navigation";

export const getDashboardNav = (
  orgSlug: string,
  projectSlug: string,
): INavGroup[] => {
  const isProjectContext = !!projectSlug;
  const baseUrl = isProjectContext
    ? `/${orgSlug}/${projectSlug}`
    : `/${orgSlug}/~`;

  const appGroup: INavGroup = {
    title: "Application",
    items: [
      isProjectContext
        ? {
            title: "Overview",
            href: `${baseUrl}/overview`,
            icon: LayoutDashboard,
          }
        : {
            title: "Projects",
            href: `/${orgSlug}/projects`,
            icon: LayoutDashboard,
          },
      {
        title: "Data Table",
        href: `/${orgSlug}/data-table`,
        icon: Table,
      },
    ],
  };

  const managementGroup: INavGroup = {
    title: "Management",
    items: [
      {
        title: "Users",
        href: "#",
        icon: Users,
        items: [
          {
            title: "Members",
            href: `${baseUrl}/users/members`,
            icon: UserCircle,
          },
          {
            title: "Roles",
            href: `${baseUrl}/users/roles`,
            icon: Shield,
          },
        ],
      },
      {
        title: "Reports",
        href: `${baseUrl}/reports`,
        icon: FileText,
      },
    ],
  };

  const settingsGroup: INavGroup = {
    title: "Settings",
    items: [
      {
        title: "General",
        href: `${baseUrl}/settings/general`,
        icon: Settings,
      },
      {
        title: "Notifications",
        href: `${baseUrl}/settings/notifications`,
        icon: Bell,
      },
    ],
  };

  return [appGroup, managementGroup, settingsGroup];
};
