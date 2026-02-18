"use client";

import {
  ChevronsUpDown,
  FolderKanban,
  LayoutGrid,
  PlusCircle,
  Search,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, use, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Empty, EmptyContent, EmptyTitle } from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createLevelConfig } from "@/constants/color-levels";
import { SAMPLE_PROJECTS } from "@/constants/sample-data";
import { cn } from "@/lib/utils";

const PROJECT_STATUS_CONFIG = createLevelConfig({
  active: { level: "green", label: "Active" },
  inactive: { level: "amber", label: "Inactive" },
  archived: { level: "gray", label: "Archived" },
});

const projectsLoader = new Promise<typeof SAMPLE_PROJECTS>((resolve) =>
  setTimeout(() => resolve(SAMPLE_PROJECTS), 1000),
);

const ProjectSwitcherSkeleton = () => {
  return (
    <SidebarMenu className="w-auto">
      <SidebarMenuItem>
        <SidebarMenuButton
          size="default"
          className="pointer-events-none w-auto max-w-[250px]"
        >
          <Skeleton className="size-6 rounded-md shrink-0" />
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="ml-auto size-4 shrink-0 rounded-full" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const ProjectSwitcherContent = () => {
  const projects = use(projectsLoader);
  const params = useParams();
  const router = useRouter();
  const organizationSlug = params.organizationSlug as string;
  const projectSlug = params.projectSlug as string;
  const [searchQuery, setSearchQuery] = useState("");

  const activeProject = projects.find((p) => p.slug === projectSlug);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleProjectSelect = (project: (typeof SAMPLE_PROJECTS)[0]) => {
    router.push(`/${organizationSlug}/${project.slug}/overview`);
  };

  const handleDeselect = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/${organizationSlug}/projects`);
  };

  if (!activeProject) {
    return (
      <SidebarMenu className="w-auto">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="default"
                className="w-auto max-w-[250px] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex bg-sidebar-primary text-sidebar-primary-foreground size-6 items-center justify-center rounded-md border text-xs font-medium">
                  <LayoutGrid className="size-4" />
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate font-medium text-sm">
                    All Projects
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 text-muted-foreground group-hover:opacity-100 transition-opacity" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-80 p-0"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <div className="p-2">
                <InputGroup>
                  <InputGroupInput
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <DropdownMenuSeparator />

              <div className="p-1 flex flex-col items-start">
                <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                  Projects
                </DropdownMenuLabel>
                <ScrollArea className="h-52 w-full">
                  {filteredProjects.map((project) => {
                    const config = PROJECT_STATUS_CONFIG[project.status];
                    return (
                      <DropdownMenuItem
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className="gap-2 p-2 cursor-pointer"
                      >
                        <Avatar className="size-7 rounded-md border shrink-0">
                          <AvatarImage
                            src={project.logo}
                            alt={project.name}
                            className="object-cover rounded-md"
                          />
                          <AvatarFallback className="rounded-md bg-muted/50 text-muted-foreground">
                            <FolderKanban className="size-3.5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5 flex-1 overflow-hidden">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-sm font-medium leading-none">
                              {project.name}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground shrink-0">
                              [{project.slug}]
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {/* Static dot for list items */}
                            <span
                              className={cn(
                                "inline-flex size-2 rounded-full shrink-0",
                                config.dot,
                              )}
                            />
                            <span className="text-xs text-muted-foreground leading-none">
                              {config.label}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </ScrollArea>
                {filteredProjects.length === 0 && (
                  <div className="p-2">
                    <Empty className="p-4 border-dashed rounded-md">
                      <EmptyContent>
                        <EmptyTitle className="text-xs">
                          No project found
                        </EmptyTitle>
                      </EmptyContent>
                    </Empty>
                  </div>
                )}
              </div>

              <DropdownMenuSeparator />
              <div className="p-2">
                <Button className="w-full justify-start" variant="ghost">
                  <PlusCircle className="size-4" />
                  <span>New project</span>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const statusConfig = PROJECT_STATUS_CONFIG[activeProject.status];

  return (
    <SidebarMenu className="w-auto">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="default"
              className="group w-auto max-w-[250px] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground pr-8"
            >
              <Avatar className="size-6 rounded-md">
                <AvatarImage
                  src={activeProject.logo}
                  alt={activeProject.name}
                  className="object-cover rounded-md"
                />
                <AvatarFallback className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <FolderKanban className="size-3.5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate font-medium text-sm">
                  {activeProject.name}
                </span>
                <div className="relative flex size-2 shrink-0 my-auto">
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                      statusConfig.dot,
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex size-2 rounded-full",
                      statusConfig.dot,
                    )}
                  />
                </div>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 text-muted-foreground group-hover:opacity-100 transition-opacity" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <SidebarMenuAction showOnHover onClick={handleDeselect}>
            <Tooltip>
              <TooltipTrigger asChild>
                <X />
              </TooltipTrigger>
              <TooltipContent>Deselect project</TooltipContent>
            </Tooltip>
          </SidebarMenuAction>
          <DropdownMenuContent
            className="min-w-80 p-0"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <div className="p-2">
              <InputGroup>
                <InputGroupInput
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <DropdownMenuSeparator />

            <div className="p-1 flex flex-col items-start">
              <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                Projects
              </DropdownMenuLabel>
              <ScrollArea className="h-52 w-full">
                {filteredProjects.map((project) => {
                  const config = PROJECT_STATUS_CONFIG[project.status];
                  return (
                    <DropdownMenuItem
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className="gap-2 p-2 cursor-pointer"
                    >
                      <Avatar className="size-7 rounded-md border shrink-0">
                        <AvatarImage
                          src={project.logo}
                          alt={project.name}
                          className="object-cover rounded-md"
                        />
                        <AvatarFallback className="rounded-md bg-muted/50 text-muted-foreground">
                          <FolderKanban className="size-3.5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5 flex-1 overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-medium leading-none">
                            {project.name}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground shrink-0">
                            [{project.slug}]
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "inline-flex size-2 rounded-full shrink-0",
                              config.dot,
                            )}
                          />
                          <span className="text-xs text-muted-foreground leading-none">
                            {config.label}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </ScrollArea>
              {filteredProjects.length === 0 && (
                <div className="p-2">
                  <Empty className="p-4 border-dashed rounded-md">
                    <EmptyContent>
                      <EmptyTitle className="text-xs">
                        No project found
                      </EmptyTitle>
                    </EmptyContent>
                  </Empty>
                </div>
              )}
            </div>

            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                className="w-full justify-center flex items-center"
                variant="ghost"
              >
                <PlusCircle className="size-4" />
                <span>New project</span>
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export const HeaderProjectSwitcher = () => {
  return (
    <Suspense fallback={<ProjectSwitcherSkeleton />}>
      <ProjectSwitcherContent />
    </Suspense>
  );
};
