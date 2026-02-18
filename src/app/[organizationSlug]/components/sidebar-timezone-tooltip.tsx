"use client";

import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";
import { Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { projectsLoader } from "./header-project-switcher";
import { userLoader } from "./sidebar-user";

const SidebarTimezoneTooltipSkeleton = () => {
  return (
    <SidebarMenu className="w-auto">
      <SidebarMenuItem>
        <SidebarMenuButton
          size="sm"
          className="pointer-events-none group-data-[collapsible=icon]:justify-center"
        >
          <div className="flex justify-between items-center w-full group-data-[collapsible=icon]:hidden">
            <p className="text-xs">TIMEZONE</p>
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="size-4 rounded-full hidden group-data-[collapsible=icon]:block" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const SidebarTimezoneTooltipContent = () => {
  const projects = use(projectsLoader);
  const user = use(userLoader);
  const params = useParams();
  const projectSlug = params.projectSlug as string;
  const { state } = useSidebar();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const activeProject = projects.find((p) => p.slug === projectSlug);
  const projectTimezone = activeProject?.timezone || "UTC";
  const userTimezone = user?.timezone || "UTC";

  const projectTimeStr = formatInTimeZone(now, projectTimezone, "hh:mm aa");

  // Calculate offset difference in hours
  const projectOffset = getTimezoneOffset(projectTimezone, now);
  const userOffset = getTimezoneOffset(userTimezone, now);
  const diffHours = (projectOffset - userOffset) / (1000 * 60 * 60);

  const getDiffDescription = () => {
    if (diffHours === 0) return "Same as your timezone";
    const absoluteDiff = Math.abs(diffHours);
    const direction = diffHours > 0 ? "ahead of" : "behind";
    return `${absoluteDiff} ${absoluteDiff === 1 ? "hour" : "hours"} ${direction} your timezone`;
  };

  return (
    <SidebarMenu className="w-auto">
      <SidebarMenuItem>
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <SidebarMenuButton
              size="sm"
              className="group-data-[collapsible=icon]:justify-center"
            >
              <div className="flex justify-between items-center w-full min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-xs shrink-0 mr-2">TIMEZONE</p>
                <Badge
                  variant="secondary"
                  className="font-mono uppercase shrink-0"
                >
                  {projectTimeStr}
                </Badge>
              </div>
              <Globe className="size-4 hidden group-data-[collapsible=icon]:block text-muted-foreground group-hover:text-foreground transition-colors" />
            </SidebarMenuButton>
          </HoverCardTrigger>
          <HoverCardContent
            side={state === "collapsed" ? "right" : "bottom"}
            align={state === "collapsed" ? "start" : "start"}
            className="w-72"
            sideOffset={state === "collapsed" ? 16 : 4}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col min-w-0">
                <p
                  className="font-semibold text-sm leading-none truncate"
                  title={projectTimezone}
                >
                  {projectTimezone}
                </p>
                <p className="text-xs font-medium mt-1.5 font-mono">
                  {projectTimeStr} - {getDiffDescription()}
                </p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Project activities, notifications, and schedules are
                synchronized with this timezone.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export const SidebarTimezoneTooltip = () => {
  return (
    <Suspense fallback={<SidebarTimezoneTooltipSkeleton />}>
      <SidebarTimezoneTooltipContent />
    </Suspense>
  );
};
