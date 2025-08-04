"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type {
  IBreadcrumbItem,
  INavItem,
  INavigationConfig,
} from "../types/navigation";

interface UseBreadcrumbOptions {
  skipSegments?: string[];
}

export const useBreadcrumb = (
  navigationConfig: INavigationConfig,
  options: UseBreadcrumbOptions = {}
): IBreadcrumbItem[] => {
  const pathname = usePathname();

  const {
    skipSegments = ["dashboard", "admin"], // add skip segments to ignore in breadcrumb
  } = options;

  return useMemo(() => {
    return generateBreadcrumbFromNavigation(
      pathname,
      navigationConfig.navMain,
      skipSegments
    );
  }, [pathname, navigationConfig, skipSegments]);
};

/**
 * Generates a breadcrumb navigation array based on the current pathname and navigation items.
 *
 * This function creates a breadcrumb trail, optionally starting with a "Dashboard" item,
 * then traverses the navigation items to find matching paths. It supports nested navigation
 * with sub-items and can skip specified segments.
 *
 * @param pathname - The current URL pathname to match against navigation items
 * @param navItems - Array of navigation items to search through for breadcrumb generation
 * @param skipSegments - Array of segment names to skip in breadcrumb
 * @param showRootDashboard - Whether to show "Dashboard" as root breadcrumb item
 * @returns An array of breadcrumb items representing the navigation path to the current page
 *
 * @example
 * ```typescript
 * const breadcrumbs = generateBreadcrumbFromNavigation(
 *   '/dashboard/users/profile',
 *   navItems,
 *   ['dashboard'],
 *   false
 * );
 * // Returns: [
 * //   { title: "Users", url: "/dashboard/users", icon: userIcon },
 * //   { title: "Profile", url: "/dashboard/users/profile", icon: profileIcon, isCurrentPage: true }
 * // ]
 * ```
 */
const generateBreadcrumbFromNavigation = (
  pathname: string,
  navItems: INavItem[],
  skipSegments: string[] = []
): IBreadcrumbItem[] => {
  const breadcrumbs: IBreadcrumbItem[] = [];

  const shouldSkipSegment = (segment: string) => skipSegments.includes(segment);

  for (const item of navItems) {
    // Check main item
    if (pathname.startsWith(item.url) && item.url !== "/dashboard") {
      const itemSegments = item.url.split("/").filter(Boolean);
      const lastSegment = itemSegments[itemSegments.length - 1];

      if (!shouldSkipSegment(lastSegment)) {
        breadcrumbs.push({
          title: item.title,
          url: item.url,
          icon: item.icon,
        });
      }

      if (item.items) {
        for (const subItem of item.items) {
          if (
            pathname === subItem.url ||
            pathname.startsWith(`${subItem.url}/`)
          ) {
            const subItemSegments = subItem.url.split("/").filter(Boolean);
            const subLastSegment = subItemSegments[subItemSegments.length - 1];

            if (!shouldSkipSegment(subLastSegment)) {
              breadcrumbs.push({
                title: subItem.title,
                url: subItem.url,
                icon: subItem.icon,
                isCurrentPage: pathname === subItem.url,
              });
            }
            break;
          }
        }
      } else if (pathname === item.url) {
        if (breadcrumbs.length > 0 && !shouldSkipSegment(lastSegment)) {
          breadcrumbs[breadcrumbs.length - 1].isCurrentPage = true;
        }
      }
      break;
    }
  }

  return breadcrumbs;
};
