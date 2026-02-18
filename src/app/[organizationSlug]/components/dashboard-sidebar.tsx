"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Fragment, useMemo, useRef, useState } from "react";
import { useCommandMenu } from "@/components/common/command-menu";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { getDashboardNav } from "@/constants/dashboard-navigation";
import type { INavItem } from "@/types/navigation.types";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarOrganizationSwitcher } from "./sidebar-organization-switcher";
import { SidebarTimezoneTooltip } from "./sidebar-timezone-tooltip";
import { SidebarUser } from "./sidebar-user";

interface IDashboardSidebarProps {
  enableOrganizationSwitcher?: boolean;
}

export const DashboardSidebar = ({
  enableOrganizationSwitcher = false,
}: IDashboardSidebarProps) => {
  const { setOpen } = useCommandMenu();
  const { isMobile, setOpenMobile } = useSidebar();
  const params = useParams();
  const pathname = usePathname();
  const organizationSlug = params.organizationSlug as string;
  const projectSlug = params.projectSlug as string;

  // Manual expansion state (when user clicks a parent item to browse)
  const [manualNav, setManualNav] = useState<string | null>(null);
  // Dismiss state (when user clicks "Back" to override auto-detection)
  const [isDismissed, setIsDismissed] = useState(false);
  // Track previous pathname to reset states on navigation
  const prevPathnameRef = useRef(pathname);

  if (prevPathnameRef.current !== pathname) {
    prevPathnameRef.current = pathname;
    setManualNav(null);
    setIsDismissed(false);
  }

  const navData = getDashboardNav(organizationSlug, projectSlug);

  // Auto-detect which parent nav item the current pathname belongs to
  const pathActiveItem = useMemo<INavItem | null>(() => {
    for (const group of navData) {
      for (const item of group.items) {
        if (
          item.items?.some(
            (child) =>
              child.href && child.href !== "#" && pathname === child.href,
          )
        ) {
          return item;
        }
      }
    }
    return null;
  }, [pathname, navData]);

  // Lookup manually selected item
  const manualActiveItem = useMemo<INavItem | null>(() => {
    if (!manualNav) return null;
    for (const group of navData) {
      const found = group.items.find(
        (item) =>
          item.title === manualNav && item.items && item.items.length > 0,
      );
      if (found) return found;
    }
    return null;
  }, [manualNav, navData]);

  // Priority: manual selection > pathname detection (unless dismissed)
  const activeItem = manualActiveItem ?? (isDismissed ? null : pathActiveItem);

  const handleSubItemClick = (item: INavItem) => {
    setManualNav(item.title);
    setIsDismissed(false);
  };

  const handleBack = () => {
    setManualNav(null);
    setIsDismissed(true);
  };

  // Simplified animation variants
  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {enableOrganizationSwitcher ? (
          <SidebarOrganizationSwitcher />
        ) : (
          <SidebarLogo />
        )}
        {enableOrganizationSwitcher && <SidebarTimezoneTooltip />}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Search"
              onClick={() => setOpen(true)}
              className="border text-muted-foreground"
            >
              <Search className="size-4" />
              <span>Search...</span>
              <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden relative">
        <AnimatePresence mode="popLayout" initial={false}>
          {activeItem ? (
            <motion.div
              key="sub-menu"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full w-full"
            >
              <div className="px-2 py-2">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="w-full justify-start gap-2 h-8 px-2"
                >
                  <ChevronLeft className="size-4" />
                  <span className="font-medium text-sm truncate">
                    Back to {activeItem.title}
                  </span>
                </Button>
              </div>

              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {activeItem.items?.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      const Icon = subItem.icon;
                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            tooltip={subItem.title}
                            isActive={isSubActive}
                            className={
                              isSubActive ? "" : "text-sidebar-foreground/70"
                            }
                          >
                            <Link
                              href={subItem.href || "#"}
                              onClick={() => isMobile && setOpenMobile(false)}
                            >
                              {Icon && (
                                <Icon
                                  className={`size-4 ${isSubActive ? "text-sidebar-foreground" : ""}`}
                                />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </motion.div>
          ) : (
            <motion.div
              key="main-menu"
              variants={slideVariants}
              initial="exit"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full w-full"
            >
              {navData.map((group, index) => (
                <Fragment key={group.title || index}>
                  <SidebarGroup>
                    {group.title && (
                      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                      <SidebarMenu className="gap-0.5">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const hasSubmenu =
                            item.items && item.items.length > 0;
                          const isItemActive = hasSubmenu
                            ? item.items?.some(
                                (child) =>
                                  child.href &&
                                  child.href !== "#" &&
                                  pathname === child.href,
                              )
                            : pathname === item.href;

                          return (
                            <SidebarMenuItem key={item.title}>
                              {hasSubmenu ? (
                                <SidebarMenuButton
                                  tooltip={item.title}
                                  onClick={() => handleSubItemClick(item)}
                                  isActive={isItemActive}
                                  className={`justify-between ${isItemActive ? "" : "text-sidebar-foreground/70"}`}
                                >
                                  <div className="flex items-center gap-2">
                                    {Icon && (
                                      <Icon
                                        className={`size-4 ${isItemActive ? "text-sidebar-foreground" : ""}`}
                                      />
                                    )}
                                    <span>{item.title}</span>
                                  </div>
                                  <ChevronRight className="size-4 ml-auto text-muted-foreground/50" />
                                </SidebarMenuButton>
                              ) : (
                                <SidebarMenuButton
                                  asChild
                                  tooltip={item.title}
                                  isActive={isItemActive}
                                  className={
                                    isItemActive
                                      ? ""
                                      : "text-sidebar-foreground/70"
                                  }
                                >
                                  <Link
                                    href={item.href || "#"}
                                    onClick={() =>
                                      isMobile && setOpenMobile(false)
                                    }
                                  >
                                    {Icon && (
                                      <Icon
                                        className={`size-4 ${isItemActive ? "text-sidebar-foreground" : ""}`}
                                      />
                                    )}
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              )}
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  {index < navData.length - 1 && <SidebarSeparator />}
                </Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
