"use client"

import { ChevronRight, MoreHorizontal } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import type { ISidebarConfig, ISidebarMenuItem, ISidebarSection } from "@/lib/types/sidebar"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

interface IReuseSidebarProps extends ComponentProps<typeof Sidebar> {
  config: ISidebarConfig
}

const MenuItem = ({ item }: { item: ISidebarMenuItem }) => {
  const hasSubItems = item.items && item.items.length > 0

  if (hasSubItems) {
    return (
      <Collapsible asChild defaultOpen={item.isActive}>
        <SidebarMenuItem className="group/collapsible">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.id}>
                  <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                    <a href={subItem.url}>
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
        <a href={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    </SidebarMenuItem>
  )
}

const ProjectMenuItem = ({
  item,
  actions,
}: {
  item: ISidebarMenuItem
  actions?: ISidebarSection["actions"]
}) => {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
      {actions && actions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction showOnHover>
              <MoreHorizontal />
              <span className="sr-only">More actions for {item.title}</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
            {actions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={action.onClick}>
                <action.icon className="text-muted-foreground" />
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </SidebarMenuItem>
  )
}

const SidebarSection = ({ section }: { section: ISidebarSection }) => {
  const SectionContent = () => (
    <SidebarMenu>
      {section.items.map((item) => {
        if (section.type === "projects") {
          return <ProjectMenuItem key={item.id} item={item} actions={section.actions} />
        }
        return <MenuItem key={item.id} item={item} />
      })}
    </SidebarMenu>
  )

  if (section.collapsible) {
    return (
      <Collapsible defaultOpen={section.defaultOpen}>
        <SidebarGroup className={section.className}>
          {section.title && (
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="group/label hover:bg-sidebar-accent text-sidebar-foreground text-sm hover:text-sidebar-accent-foreground">
                {section.title}
                <ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
          )}
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarGroupContent>
              <SectionContent />
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    )
  }

  return (
    <SidebarGroup className={section.className}>
      {section.title && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SectionContent />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export const ReuseSidebar = ({ config, className, ...props }: IReuseSidebarProps) => {
  const {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    sections,
    searchComponent: SearchComponent,
    userComponent: UserComponent,
    footerComponent: FooterComponent,
    showSearch = false,
    showUser = false,
    showFooter = false,
  } = config

  return (
    <Sidebar
      side={side}
      variant={variant}
      collapsible={collapsible}
      className={cn("top-[var(--header-height)] h-[calc(100svh-var(--header-height))]", className)}
      {...props}
    >
      <SidebarContent>
        {showSearch && SearchComponent && <SearchComponent />}

        {sections.map((section) => (
          <SidebarSection key={section.id} section={section} />
        ))}
      </SidebarContent>

      {showFooter && (
        <SidebarFooter>
          {showUser && UserComponent && <UserComponent />}
          {FooterComponent && <FooterComponent />}
          <SidebarTrigger className="self-end" />
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
