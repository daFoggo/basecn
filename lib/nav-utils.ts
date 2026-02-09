import type {
  INavGroup,
  INavItem,
  TFlatNavGroup,
  TFlatNavItem,
} from "@/types/navigation";

interface IProcessItemParams {
  item: INavItem;
  groupTitle: string;
  result: Map<string, TFlatNavItem[]>;
  keywords?: string[];
}

/**
 * Recursively processes a nav item and its children
 */
const processItem = ({
  item,
  groupTitle,
  result,
  keywords = [],
}: IProcessItemParams) => {
  // Skip group headers (variant === "group") but process their children
  if (item.variant === "group") {
    if (item.items && item.items.length > 0) {
      for (const subItem of item.items) {
        processItem({
          item: subItem,
          groupTitle,
          result,
          keywords: [...keywords, item.title.toLowerCase()],
        });
      }
    }
    return;
  }

  // Items with sub-items become group headers
  if (item.items && item.items.length > 0) {
    const newGroupTitle = item.title;
    for (const subItem of item.items) {
      processItem({
        item: subItem,
        groupTitle: newGroupTitle,
        result,
        keywords: [...keywords, item.title.toLowerCase()],
      });
    }
    return;
  }

  // Only add items with valid hrefs (not "#")
  if (item.href && item.href !== "#") {
    const group = result.get(groupTitle) || [];
    group.push({
      ...item,
      group: groupTitle,
      keywords: [
        ...keywords,
        groupTitle.toLowerCase(),
        ...(item.keywords || []),
      ],
    });
    result.set(groupTitle, group);
  }
};

/**
 * Flattens nested navigation data into grouped structure.
 * Parent items with children become group headings.
 * Top-level items without children go to "Pages" group.
 *
 * @param navData - Array of navigation groups
 * @returns Array of flattened groups for Command Menu, Search, etc.
 */
export const flattenNavData = (navData: INavGroup[]): TFlatNavGroup[] => {
  const groupMap = new Map<string, TFlatNavItem[]>();

  for (const navGroup of navData) {
    for (const item of navGroup.items) {
      const groupTitle =
        item.items && item.items.length > 0 ? item.title : "Pages";

      processItem({
        item,
        groupTitle,
        result: groupMap,
      });
    }
  }

  // Convert Map to array of groups, with "Pages" first
  const groups: TFlatNavGroup[] = [];

  if (groupMap.has("Pages")) {
    groups.push({
      title: "Pages",
      items: groupMap.get("Pages") || [],
    });
    groupMap.delete("Pages");
  }

  for (const [title, items] of groupMap) {
    groups.push({ title, items });
  }

  return groups;
};

/**
 * Flattens navigation into a simple array (for Breadcrumb, simple lists)
 *
 * @param navData - Array of navigation groups
 * @returns Flat array of all nav items
 */
export const flattenToArray = (navData: INavGroup[]): INavItem[] => {
  const result: INavItem[] = [];

  const processRecursive = (item: INavItem) => {
    if (item.href && item.href !== "#" && item.variant !== "group") {
      result.push(item);
    }
    if (item.items) {
      for (const subItem of item.items) {
        processRecursive(subItem);
      }
    }
  };

  for (const group of navData) {
    for (const item of group.items) {
      processRecursive(item);
    }
  }

  return result;
};

/**
 * Find a nav item by href (for Breadcrumb, active state)
 *
 * @param navData - Array of navigation groups
 * @param href - URL to find
 * @returns The nav item if found, undefined otherwise
 */
export const findNavItemByHref = (
  navData: INavGroup[],
  href: string,
): INavItem | undefined => {
  const findRecursive = (item: INavItem): INavItem | undefined => {
    if (item.href === href) return item;
    if (item.items) {
      for (const subItem of item.items) {
        const found = findRecursive(subItem);
        if (found) return found;
      }
    }
    return undefined;
  };

  for (const group of navData) {
    for (const item of group.items) {
      const found = findRecursive(item);
      if (found) return found;
    }
  }

  return undefined;
};

/**
 * Get breadcrumb trail for a given href
 *
 * @param navData - Array of navigation groups
 * @param href - Current URL
 * @returns Array of nav items from root to current
 */
export const getBreadcrumbTrail = (
  navData: INavGroup[],
  href: string,
): INavItem[] => {
  const trail: INavItem[] = [];

  const findRecursive = (item: INavItem, path: INavItem[]): boolean => {
    const currentPath = [...path, item];

    if (item.href === href) {
      trail.push(...currentPath);
      return true;
    }

    if (item.items) {
      for (const subItem of item.items) {
        if (findRecursive(subItem, currentPath)) {
          return true;
        }
      }
    }

    return false;
  };

  for (const group of navData) {
    for (const item of group.items) {
      if (findRecursive(item, [])) {
        return trail;
      }
    }
  }

  return trail;
};
