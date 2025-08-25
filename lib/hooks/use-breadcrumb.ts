"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type { IBreadcrumbItem, INavigationConfig } from "../types/navigation";

/**
 * Custom hook that generates breadcrumb items based on the current pathname and navigation configuration
 *
 * @param navigationConfig - The navigation configuration object containing menu structure
 * @returns Array of breadcrumb items representing the current page's navigation path
 *
 * Usage:
 * const breadcrumbs = useBreadcrumb(navigationConfig);
 * // Returns: [{ title: "Home", url: "/", icon: "home" }, { title: "Products", url: "/products", isCurrentPage: true }]
 */
export const useBreadcrumb = (
  navigationConfig: INavigationConfig
): IBreadcrumbItem[] => {
  const pathname = usePathname(); // Get current URL path from Next.js router

  // Memoize breadcrumb generation to avoid unnecessary recalculations
  return useMemo(() => {
    return generateHierarchicalBreadcrumb(pathname, navigationConfig);
  }, [pathname, navigationConfig]);
};

/**
 * Main function that generates breadcrumb trail by processing navigation hierarchy
 * Combines breadcrumbs from all navigation levels and removes duplicates
 *
 * @param pathname - Current URL path (e.g., "/products/category/item")
 * @param navigationConfig - Navigation configuration with menu structure
 * @returns Sorted array of unique breadcrumb items
 */
const generateHierarchicalBreadcrumb = (
  pathname: string,
  navigationConfig: INavigationConfig
): IBreadcrumbItem[] => {
  // Collect all navigation configs from root to current level (parent hierarchy)
  const configHierarchy = collectNavigationHierarchy(navigationConfig);
  const breadcrumbs: IBreadcrumbItem[] = [];

  // Process each navigation level to extract matching breadcrumbs
  for (const config of configHierarchy) {
    const levelBreadcrumbs = generateBreadcrumbFromNavigation(pathname, config);

    // Add unique breadcrumbs (avoid duplicates across levels)
    for (const breadcrumb of levelBreadcrumbs) {
      const exists = breadcrumbs.some(
        (existing) => existing.url === breadcrumb.url
      );
      if (!exists) {
        breadcrumbs.push(breadcrumb);
      }
    }
  }

  // Sort breadcrumbs by URL depth (shallow to deep) for proper hierarchy display
  return sortBreadcrumbsByDepth(breadcrumbs, pathname);
};

/**
 * Builds the complete navigation hierarchy chain from root to current config
 * Traverses parent relationships to create ordered hierarchy array
 *
 * @param config - Current navigation configuration
 * @returns Array of navigation configs from root parent to current level
 *
 * Example: If current config has 2 parents, returns [grandparent, parent, current]
 */
const collectNavigationHierarchy = (
  config: INavigationConfig
): INavigationConfig[] => {
  const hierarchy: INavigationConfig[] = [];
  let current: INavigationConfig | undefined = config;

  // Walk up the parent chain and build hierarchy array
  while (current) {
    hierarchy.unshift(current); // Add to beginning to maintain root->leaf order
    current = current.parent;
  }

  return hierarchy;
};

/**
 * Sorts breadcrumbs by URL depth (number of path segments) for proper navigation order
 * Secondary sort ensures current path matches take precedence
 *
 * @param breadcrumbs - Array of breadcrumb items to sort
 * @param pathname - Current URL path for matching priority
 * @returns Sorted breadcrumbs array (shallowest URLs first)
 *
 * Example: ["/", "/products", "/products/category"] -> proper breadcrumb order
 */
const sortBreadcrumbsByDepth = (
  breadcrumbs: IBreadcrumbItem[],
  pathname: string
): IBreadcrumbItem[] => {
  return breadcrumbs.sort((a, b) => {
    // Primary sort: by URL depth (number of "/" segments)
    const aDepth = a.url ? a.url.split("/").length : 0;
    const bDepth = b.url ? b.url.split("/").length : 0;

    if (aDepth !== bDepth) {
      return aDepth - bDepth; // Shallow URLs first
    }

    // Secondary sort: prioritize URLs that match current pathname
    const aMatch = pathname.startsWith(a.url || "");
    const bMatch = pathname.startsWith(b.url || "");

    if (aMatch && !bMatch) return -1; // a matches, b doesn't -> a comes first
    if (!aMatch && bMatch) return 1; // b matches, a doesn't -> b comes first
    return 0; // Both match or both don't match -> maintain current order
  });
};

/**
 * Generates breadcrumb items from a single navigation configuration level
 * Matches current pathname against navigation items to build breadcrumb trail
 *
 * @param pathname - Current URL path to match against navigation items
 * @param navigationConfig - Single level navigation config with root and main nav items
 * @returns Array of breadcrumb items that match the current path
 *
 * Process:
 * 1. Check if pathname matches root item
 * 2. Find matching main navigation item
 * 3. Check sub-items if they exist
 * 4. Mark current page with isCurrentPage flag
 */
const generateBreadcrumbFromNavigation = (
  pathname: string,
  navigationConfig: INavigationConfig
): IBreadcrumbItem[] => {
  const { root, navMain } = navigationConfig;
  const breadcrumbs: IBreadcrumbItem[] = [];

  // Add root breadcrumb if current path starts with root URL
  if (root && pathname.startsWith(root.url)) {
    breadcrumbs.push({
      title: root.title,
      url: root.url,
      icon: root.icon,
      isCurrentPage: pathname === root.url, // Mark as current if exact match
    });

    // If we're exactly on root page, return early
    if (pathname === root.url) {
      return breadcrumbs;
    }
  }

  // Process main navigation items to find matching path
  for (const item of navMain) {
    // Check if current path matches this navigation item (but not root to avoid duplicates)
    if (pathname.startsWith(item.url) && item.url !== root?.url) {
      breadcrumbs.push({
        title: item.title,
        url: item.url,
        icon: item.icon,
      });

      // Check sub-items if this item has children
      if (item.items) {
        for (const subItem of item.items) {
          // Match exact URL or paths that start with subItem URL + "/"
          if (
            pathname === subItem.url ||
            pathname.startsWith(`${subItem.url}/`)
          ) {
            breadcrumbs.push({
              title: subItem.title,
              url: subItem.url,
              icon: subItem.icon,
              isCurrentPage: pathname === subItem.url, // Mark current page
            });
            break; // Found matching sub-item, exit sub-item loop
          }
        }
      } else if (pathname === item.url) {
        // No sub-items and exact match -> mark this item as current page
        if (breadcrumbs.length > 0) {
          breadcrumbs[breadcrumbs.length - 1].isCurrentPage = true;
        }
      }

      break; // Found matching main item, exit main navigation loop
    }
  }

  return breadcrumbs;
};
