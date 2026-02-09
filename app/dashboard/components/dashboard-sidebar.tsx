"use client";

import {
  ChevronLeft,
  ChevronRight,
  Inbox,
  Search,
  SquareArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useCommandMenu } from "@/components/common/command-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { SITE_CONFIG } from "@/configs/site";
import type { INavItem } from "@/types/navigation";
import { navData } from "./nav-data";

export const DashboardSidebar = () => {
  const { setOpen } = useCommandMenu();
  const [activeItem, setActiveItem] = useState<INavItem | null>(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

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

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <SquareArrowUpRight className="size-4" />
                </div>
                <span className="font-medium text-lg">
                  {SITE_CONFIG.metadata.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
                <Kbd>⌘K</Kbd>
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
                      {group.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild tooltip={subItem.title}>
                            <Link href={subItem.href}>
                              {subItem.icon}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
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
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            {item.items && item.items.length > 0 ? (
                              <SidebarMenuButton
                                tooltip={item.title}
                                onClick={() => handleSubItemClick(item)}
                                isActive={item.isActive}
                              >
                                {item.icon}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                              </SidebarMenuButton>
                            ) : (
                              <SidebarMenuButton asChild tooltip={item.title}>
                                <Link href={item.href}>
                                  {item.icon}
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            )}
                          </SidebarMenuItem>
                        ))}
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:p-0!"
              asChild
            >
              <div className="group-data-[collapsible=icon]:justify-center">
                <Avatar className="size-6 rounded-lg">
                  <AvatarImage
                    src="https://api.dicebear.com/9.x/thumbs/svg?seed=Felix"
                    alt="Felix"
                  />
                  <AvatarFallback className="rounded-lg">F</AvatarFallback>
                </Avatar>
                <span className="truncate font-medium text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  Felix
                </span>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  className="ml-auto group-data-[collapsible=icon]:hidden"
                >
                  <Inbox className="size-4" />
                </Button>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
