"use client";

import { SquareArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SITE_CONFIG } from "@/configs/site";

const logoLoader = new Promise((resolve) => setTimeout(resolve, 1000));

const SidebarLogoSkeleton = () => {
  return (
    <SidebarMenuButton size="lg" className="pointer-events-none">
      <Skeleton className="size-8 rounded-lg shrink-0" />
      <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden w-full">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-16" />
      </div>
    </SidebarMenuButton>
  );
};

const SidebarLogoContent = () => {
  use(logoLoader);

  return (
    <SidebarMenuButton size="lg" asChild>
      <Link href="/dashboard">
        <Avatar className="size-8 rounded-lg overflow-hidden shrink-0">
          <AvatarImage
            src={SITE_CONFIG.metadata.logo}
            alt={SITE_CONFIG.metadata.title}
            className="object-cover rounded-lg"
          />
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
            <SquareArrowUpRight className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
          <span className="font-semibold">{SITE_CONFIG.metadata.title}</span>
          <span className="">v1.0.0</span>
        </div>
      </Link>
    </SidebarMenuButton>
  );
};

export const SidebarLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Suspense fallback={<SidebarLogoSkeleton />}>
          <SidebarLogoContent />
        </Suspense>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
