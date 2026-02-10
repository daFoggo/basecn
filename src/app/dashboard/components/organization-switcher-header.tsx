"use client";

import { ChevronsUpDown, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
import { SAMPLE_ORGANIZATIONS } from "@/constants/sample-data";

export const OrganizationSwitcherHeader = () => {
  const { isMobile } = useSidebar();
  const [activeOrg, setActiveOrg] = useState(SAMPLE_ORGANIZATIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  if (!activeOrg) {
    return null;
  }

  const filteredOrgs = SAMPLE_ORGANIZATIONS.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden shrink-0">
                {activeOrg.logo ? (
                  <Image
                    src={activeOrg.logo}
                    alt={activeOrg.name}
                    className="size-full object-cover"
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="font-semibold">{activeOrg.name[0]}</span>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="font-medium text-lg truncate">
                  {activeOrg.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
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
                    onClick={() => setActiveOrg(org)}
                    className="gap-2 p-2 cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border overflow-hidden shrink-0">
                      {org.logo ? (
                        <Image
                          src={org.logo}
                          alt={org.name}
                          className="size-full object-cover"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <span className="text-xs font-medium">
                          {org.name[0]}
                        </span>
                      )}
                    </div>
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
              {filteredOrgs.length === 0 && (
                <div className="p-2 text-center text-xs text-muted-foreground">
                  No organization found.
                </div>
              )}
            </div>

            <DropdownMenuSeparator />
            <div className="p-1">
              <DropdownMenuItem className="cursor-pointer">
                <Button size="icon-sm">
                  <PlusCircle className="size-4" />
                </Button>
                <span>New organization</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
