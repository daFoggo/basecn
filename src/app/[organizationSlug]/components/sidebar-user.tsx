"use client";

import { Inbox } from "lucide-react";
import { Suspense, use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

// Simulated user data
const USER_DATA = {
  name: "Felix",
  avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Felix",
  initial: "F",
};

const userLoader = new Promise<typeof USER_DATA>((resolve) =>
  setTimeout(() => resolve(USER_DATA), 2000),
);

const SidebarUserSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="pointer-events-none group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
        >
          <Skeleton className="size-6 rounded-lg shrink-0" />
          <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden w-full overflow-hidden ml-2">
            <Skeleton className="h-4 w-20" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const SidebarUserContent = () => {
  const user = use(userLoader);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:p-0!"
          asChild
        >
          <div className="group-data-[collapsible=icon]:justify-center cursor-pointer">
            <Avatar className="size-6 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                {user.initial}
              </AvatarFallback>
            </Avatar>
            <span className="truncate font-medium text-sm leading-tight group-data-[collapsible=icon]:hidden">
              {user.name}
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
  );
};

export const SidebarUser = () => {
  return (
    <Suspense fallback={<SidebarUserSkeleton />}>
      <SidebarUserContent />
    </Suspense>
  );
};
