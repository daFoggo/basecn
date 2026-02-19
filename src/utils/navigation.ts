import { getDashboardNav } from "@/constants/dashboard-navigation";
import type {
  INavGroup,
  INavItem,
  TFlatNavGroup,
  TFlatNavItem,
} from "@/types/navigation";

// ============================================================================
// 1. FLATTEN NAVIGATION (For Command Menu / Search)
// Purpose: Transform nested sidebar structure (Group -> Item -> SubItem) into a flat list.
// ============================================================================

/**
 * Flattens the navigation structure for search functionality.
 *
 * @example
 * Input (NavGroup[]):
 * [
 *   { title: "Settings", items: [
 *       { title: "General", href: "/settings" },
 *       { title: "Advanced", items: [{ title: "Logs", href: "/logs" }] }
 *   ]}
 * ]
 *
 * Output (TFlatNavGroup[]):
 * [
 *   { title: "Settings", items: [{ title: "General", group: "Settings" }] },
 *   { title: "Advanced", items: [{ title: "Logs", group: "Advanced" }] }
 * ]
 */
export const flattenNavData = (navGroups: INavGroup[]): TFlatNavGroup[] => {
  const resultGroups: TFlatNavGroup[] = [];
  const defaultItems: TFlatNavItem[] = [];

  // Iterate through top-level Groups (e.g., "Projects", "Settings")
  for (const group of navGroups) {
    for (const item of group.items) {
      // ---------------------------------------------------------
      // CASE 1: Item is a Parent (has Submenu) -> Create a New Child Group
      // ---------------------------------------------------------
      if (item.items && item.items.length > 0) {
        const subItemsFlat: TFlatNavItem[] = [];

        // Recursive helper to collect all descendant items
        const collectFlatItems = (subItem: INavItem) => {
          if (subItem.href && subItem.href !== "#") {
            subItemsFlat.push({ ...subItem, group: item.title });
          }
          if (subItem.items) {
            subItem.items.forEach(collectFlatItems);
          }
        };

        item.items.forEach(collectFlatItems);

        if (subItemsFlat.length > 0) {
          resultGroups.push({ title: item.title, items: subItemsFlat });
        }
      }
      // ---------------------------------------------------------
      // CASE 2: Single Item -> Add to default "Pages" group (or use parent Group Title)
      // ---------------------------------------------------------
      else {
        if (item.href && item.href !== "#") {
          // Strategy: Single items go to "Pages" to keep Command Menu compact.
          defaultItems.push({ ...item, group: "Pages" });
        }
      }
    }
  }

  // Result: Put "Pages" group (containing single items) at the beginning
  return defaultItems.length > 0
    ? [{ title: "Pages", items: defaultItems }, ...resultGroups]
    : resultGroups;
};

// ============================================================================
// 2. BREADCRUMB UTILITIES (Path Finder)
// Purpose: Find the path from the current URL back up the navigation tree.
// ============================================================================

/**
 * Recursively find the breadcrumb path from a list of items.
 *
 * @param items - Current list of items to search
 * @param targetUrl - The target URL to find
 * @returns Array [Parent, Child] if found, or null.
 */
export const findBreadcrumbPath = (
  items: INavItem[],
  targetUrl: string,
): INavItem[] | null => {
  for (const item of items) {
    // 1. Check the item itself
    // Note: Using exact match.
    if (item.href === targetUrl) {
      return [item];
    }

    // 2. If it has children, search deeper
    if (item.items && item.items.length > 0) {
      const foundInChildren = findBreadcrumbPath(item.items, targetUrl);

      if (foundInChildren) {
        // If found in children, return [Current Item, ...Child Path]
        // e.g. [Settings, General]
        return [item, ...foundInChildren];
      }
    }
  }
  return null;
};

/**
 * Main function: Automatically detect Context (Org vs Project) and return Breadcrumb.
 */
export const getDashboardBreadcrumb = (
  organizationSlug: string,
  segments: string[] = [],
): INavItem[] => {
  const cleanSegments = segments.filter(Boolean);
  // Normalized Target URL: /org/segment1/segment2
  const targetUrl = `/${organizationSlug}${cleanSegments.length > 0 ? `/${cleanSegments.join("/")}` : ""}`;

  // Helper to get all root items from all Groups flattened into a single parent list for searching
  const getAllRootItems = (projectSlug: string) =>
    getDashboardNav(organizationSlug, projectSlug).flatMap((g) => g.items);

  // 1. Try finding in Organization Context (projectSlug="")
  const orgItems = getAllRootItems("");
  const orgPath = findBreadcrumbPath(orgItems, targetUrl);
  if (orgPath?.length) return orgPath;

  // 2. Try finding in Project Context (with first segment = projectID)
  const possibleProjectId = cleanSegments[0];
  if (possibleProjectId) {
    const projectItems = getAllRootItems(possibleProjectId);
    const projectPath = findBreadcrumbPath(projectItems, targetUrl);
    if (projectPath?.length) return projectPath;
  }

  return [];
};

// ============================================================================
// 3. SLUG UTILITIES
// Purpose: Convert URL slugs to human-readable titles.
// ============================================================================

/**
 * Converts a URL slug (e.g. "speed-insights") to a title-cased string ("Speed Insights").
 */
export const formatSlugToTitle = (slug: string): string =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
