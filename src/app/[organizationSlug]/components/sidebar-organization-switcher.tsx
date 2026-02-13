"use client";

import { Building2, ChevronsUpDown, Search } from "lucide-react";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_ORGANIZATIONS } from "@/constants/sample-data";

const orgsLoader = new Promise<typeof SAMPLE_ORGANIZATIONS>((resolve) =>
  setTimeout(() => resolve(SAMPLE_ORGANIZATIONS), 1000),
);

const OrganizationSwitcherSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="pointer-events-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Skeleton className="size-8 rounded-lg shrink-0" />
          <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden w-full overflow-hidden">
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const OrganizationSwitcherContent = () => {
  const { isMobile, setOpenMobile } = useSidebar();
  const params = useParams();
  const router = useRouter();
  const organizationSlug = params.organizationSlug as string;
  const [searchQuery, setSearchQuery] = useState("");

  const organizations = use(orgsLoader);

  const activeOrg =
    organizations.find((org) => org.slug === organizationSlug) ||
    organizations[0];

  const filteredOrgs = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOrgSelect = (org: (typeof SAMPLE_ORGANIZATIONS)[0]) => {
    router.push(`/${org.slug}/projects`);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg overflow-hidden shrink-0">
                <AvatarImage
                  src={activeOrg.logo}
                  alt={activeOrg.name}
                  className="object-cover rounded-lg"
                />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg font-semibold">
                  {activeOrg.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="font-semibold text-lg truncate">
                  {activeOrg.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden text-sidebar-primary-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-64 p-0"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <div className="p-2">
              <InputGroup>
                <InputGroupInput
                  placeholder="Search organizations..."
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

            <div className="p-2 flex flex-col items-start">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Organizations
              </DropdownMenuLabel>
              <ScrollArea className="h-40 w-full">
                {filteredOrgs.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => handleOrgSelect(org)}
                    className="gap-2 p-2 cursor-pointer"
                  >
                    <Avatar className="size-6 rounded-sm border overflow-hidden shrink-0">
                      <AvatarImage
                        src={org.logo}
                        alt={org.name}
                        className="object-cover rounded-sm"
                      />
                      <AvatarFallback className="bg-muted text-muted-foreground rounded-sm text-xs font-medium">
                        {org.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 flex-1 overflow-hidden">
                      <span className="truncate text-sm font-medium leading-none">
                        {org.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground leading-none">
                        {org.members.length} members
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </div>

            <DropdownMenuSeparator />

            <div className="p-2">
              <Button className="w-full">
                <Building2 />
                Manage my organizations
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export const SidebarOrganizationSwitcher = () => {
  return (
    <Suspense fallback={<OrganizationSwitcherSkeleton />}>
      <OrganizationSwitcherContent />
    </Suspense>
  );
};
