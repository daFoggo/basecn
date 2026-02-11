"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCommandMenu } from "@/components/common/command-menu";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
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
} from "@/components/ui/sidebar";
import { getDashboardNav } from "@/constants/dashboard-nav";
import type { INavItem } from "@/types/navigation";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarOrganizationSwitcher } from "./sidebar-organization-switcher";
import { SidebarUser } from "./sidebar-user";

interface IDashboardSidebarProps {
  enableTeamSwitcher?: boolean;
}

// Helper to group items for the drill-down view
const getGroupedItems = (items: INavItem[]) => {
  const groups: { title?: string; items: INavItem[] }[] = [];
  let currentGroup: { title?: string; items: INavItem[] } = { items: [] };

  for (const item of items) {
    if (item.variant === "group") {
      if (currentGroup.items.length > 0) {
        groups.push(currentGroup);
      }
      groups.push({ title: item.title, items: item.items || [] });
      currentGroup = { items: [] };
    } else {
      currentGroup.items.push(item);
    }
  }
  if (currentGroup.items.length > 0) {
    groups.push(currentGroup);
  }
  return groups;
};
export const DashboardSidebar = ({
  enableTeamSwitcher = false,
}: IDashboardSidebarProps) => {
  const { setOpen } = useCommandMenu();
  const params = useParams();
  const organizationSlug = params.organizationSlug as string;
  const projectSlug = params.projectSlug as string;
  const [activeItem, setActiveItem] = useState<INavItem | null>(null);
  const [direction, setDirection] = useState(1);

  const navData = getDashboardNav(organizationSlug, projectSlug);

  const handleSubItemClick = (item: INavItem) => {
    setDirection(1);
    setActiveItem(item);
  };

  const handleBack = () => {
    setDirection(-1);
    setActiveItem(null);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-20%",
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-20%" : "100%",
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
      },
    }),
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {enableTeamSwitcher ? <SidebarOrganizationSwitcher /> : <SidebarLogo />}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Search"
            onClick={() => setOpen(true)}
          >
            <InputGroup className="group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center cursor-pointer">
              <InputGroupInput
                placeholder="Find..."
                className="group-data-[collapsible=icon]:hidden cursor-pointer"
                readOnly
              />
              <InputGroupAddon className="group-data-[collapsible=icon]:p-0!">
                <Search />
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                className="group-data-[collapsible=icon]:hidden"
              >
                <Kbd>Ctrl+K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {activeItem ? (
            <motion.div
              key="sub-menu"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full w-full"
            >
              <SidebarGroup>
                <SidebarGroupLabel className="p-0 h-auto group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:opacity-100">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="w-full group-data-[collapsible=icon]:hidden flex items-center justify-between"
                  >
                    <ChevronLeft className="size-4" />
                    <span className="font-medium text-sm truncate flex-1 text-center">
                      {activeItem.title}
                    </span>
                    {/* Invisible element to maintain center alignment */}
                    <div className="size-4 opacity-0" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden group-data-[collapsible=icon]:flex shrink-0"
                    onClick={handleBack}
                    title="Back"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                </SidebarGroupLabel>
              </SidebarGroup>

              {getGroupedItems(activeItem.items || []).map((group, index) => (
                <SidebarGroup key={group.title || index}>
                  {group.title && (
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                  )}
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((subItem) => {
                        const Icon = subItem.icon;
                        return (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild tooltip={subItem.title}>
                              <Link href={subItem.href}>
                                {Icon && <Icon className="size-4" />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="main-menu"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full w-full"
            >
              {navData.map((group, index) => (
                <div key={group.title || index}>
                  <SidebarGroup>
                    {group.title && (
                      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <SidebarMenuItem key={item.title}>
                              {item.items && item.items.length > 0 ? (
                                <SidebarMenuButton
                                  tooltip={item.title}
                                  onClick={() => handleSubItemClick(item)}
                                  isActive={item.isActive}
                                >
                                  {Icon && <Icon className="size-4" />}
                                  <span>{item.title}</span>
                                  <ChevronRight className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                                </SidebarMenuButton>
                              ) : (
                                <SidebarMenuButton asChild tooltip={item.title}>
                                  <Link href={item.href}>
                                    {Icon && <Icon className="size-4" />}
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
                </div>
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
