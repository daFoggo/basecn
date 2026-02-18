import {
  Book,
  Home,
  Inbox,
  LogOut,
  MessageCircleQuestionMark,
} from "lucide-react";
import Link from "next/link";
import { type ReactNode, Suspense, use } from "react";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_USER } from "@/constants/sample-data";

const userLoader = new Promise<typeof SAMPLE_USER>((resolve) =>
  setTimeout(() => resolve(SAMPLE_USER), 1000),
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
  const { isMobile, state } = useSidebar();

  const user = use(userLoader);
  const MENU_ITEMS: { label: string; href?: string; icon?: ReactNode }[] = [
    {
      label: "Theme",
      icon: <ThemeSwitcher size="sm" />,
    },
    {
      label: "Home page",
      href: "/",
      icon: <Home className="text-muted-foreground" />,
    },
    {
      label: "Documents",
      icon: <Book className="text-muted-foreground" />,
    },
    {
      label: "Help",
      icon: <MessageCircleQuestionMark className="text-muted-foreground" />,
    },
    {
      label: "Logout",
      icon: <LogOut className="text-muted-foreground" />,
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:p-0!"
              asChild
            >
              <div className="group-data-[collapsible=icon]:justify-center cursor-pointer">
                <Avatar className="size-6 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.charAt(0)}
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
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className=" min-w-56 rounded-lg"
            side={
              isMobile ? "bottom" : state === "collapsed" ? "right" : "bottom"
            }
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex justify-between items-center w-full cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-md font-medium">{user?.name}</p>
                    {user?.email && (
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {MENU_ITEMS.map((item) => {
                const ItemContent = (
                  <DropdownMenuItem
                    key={item.label}
                    className="justify-between cursor-pointer"
                  >
                    <p>{item.label}</p>
                    {item.icon}
                  </DropdownMenuItem>
                );

                if (item.href) {
                  return (
                    <Link key={item.label} href={item.href}>
                      {ItemContent}
                    </Link>
                  );
                }

                return ItemContent;
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
