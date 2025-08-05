"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type { IBreadcrumbItem, INavigationConfig } from "../types/navigation";

export const useBreadcrumb = (
  navigationConfig: INavigationConfig
): IBreadcrumbItem[] => {
  const pathname = usePathname();

  return useMemo(() => {
    return generateBreadcrumbFromNavigation(pathname, navigationConfig);
  }, [pathname, navigationConfig]);
};

/**
 * Generates a breadcrumb navigation array based on the current pathname and navigation config.
 *
 * This function creates a breadcrumb trail by traversing the navigation items to find
 * matching paths. It supports nested navigation with sub-items and can include a root
 * breadcrumb item if configured.
 *
 * @param pathname - The current URL pathname to match against navigation items
 * @param navigationConfig - Navigation configuration including root and nav items
 * @returns An array of breadcrumb items representing the navigation path to the current page
 *
 * @example
 * ```typescript
 * const config = {
 *   root: { title: "Admin", url: "/admin", icon: AdminIcon },
 *   navMain: [...]
 * };
 * const breadcrumbs = generateBreadcrumbFromNavigation('/admin/users/profile', config);
 * // Returns: [
 * //   { title: "Admin", url: "/admin", icon: AdminIcon },
 * //   { title: "Users", url: "/admin/users", icon: UserIcon },
 * //   { title: "Profile", url: "/admin/users/profile", icon: ProfileIcon, isCurrentPage: true }
 * // ]
 * ```
 */
const generateBreadcrumbFromNavigation = (
  pathname: string,
  navigationConfig: INavigationConfig
): IBreadcrumbItem[] => {
  const { root, navMain } = navigationConfig;
  const breadcrumbs: IBreadcrumbItem[] = [];

  // Add root breadcrumb if configured and pathname matches root
  if (root && pathname.startsWith(root.url)) {
    breadcrumbs.push({
      title: root.title,
      url: root.url,
      icon: root.icon,
      isCurrentPage: pathname === root.url,
    });

    // If we're exactly on root path, return just the root breadcrumb
    if (pathname === root.url) {
      return breadcrumbs;
    }
  }

  // Find matching navigation items (exclude root url to avoid duplication)
  for (const item of navMain) {
    if (pathname.startsWith(item.url) && item.url !== root?.url) {
      breadcrumbs.push({
        title: item.title,
        url: item.url,
        icon: item.icon,
      });

      // Check sub-items
      if (item.items) {
        for (const subItem of item.items) {
          if (
            pathname === subItem.url ||
            pathname.startsWith(`${subItem.url}/`)
          ) {
            breadcrumbs.push({
              title: subItem.title,
              url: subItem.url,
              icon: subItem.icon,
              isCurrentPage: pathname === subItem.url,
            });
            break;
          }
        }
      } else if (pathname === item.url) {
        // Mark current item as current page
        if (breadcrumbs.length > 0) {
          breadcrumbs[breadcrumbs.length - 1].isCurrentPage = true;
        }
      }
      break;
    }
  }

  return breadcrumbs;
};
