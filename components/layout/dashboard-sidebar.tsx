"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronRight, ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import { type ComponentProps, type ElementType, useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { APP_INFO } from "@/lib/configs/app-info";
import type { INavItem } from "@/lib/types/navigation";
import { cn } from "@/lib/utils/tailwind";

interface ITeam {
	name: string;
	logo: ElementType;
	plan: string;
}

interface ISidebarLogoProps {
	icon: LucideIcon;
	title: string;
	url?: string;
	variant?: "default" | "compact";
	useIconBackground?: boolean;
}

export interface IDashboardSidebarProps extends ComponentProps<typeof Sidebar> {
	teams?: ITeam[];
	navMain?: INavItem[];
	navSecondary?: INavItem[];
	sidebarLogo?: ISidebarLogoProps;
}

export const DashboardSidebar = ({
	teams,
	navMain,
	navSecondary,
	sidebarLogo,
	...props
}: IDashboardSidebarProps) => {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex justify-center items-center border-b h-16">
				{sidebarLogo ? (
					<SidebarLogo
						icon={sidebarLogo.icon}
						title={sidebarLogo.title}
						url={sidebarLogo.url}
						variant={sidebarLogo.variant}
						useIconBackground={sidebarLogo.useIconBackground}
					/>
				) : (
					<TeamSwitcher teams={teams || []} />
				)}
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navMain || []} />
				<NavSecondary items={navSecondary || []} />
			</SidebarContent>
			<SidebarFooter>
				<FooterSection />
			</SidebarFooter>
		</Sidebar>
	);
};

export const NavMain = ({ items }: { items: INavItem[] }) => {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					// Nếu item có children, render như collapsible
					if (item.items && item.items.length > 0) {
						return (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={item.isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.title}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
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
						);
					}

					return (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild tooltip={item.title}>
								<a href={item.url}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
};

export const NavSecondary = ({ items }: { items: INavItem[] }) => {
	return (
		<SidebarGroup className="mt-auto">
			<SidebarGroupLabel>Resources</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild tooltip={item.title}>
							<a href={item.url}>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};

export const SidebarLogo = ({
	icon: LogoIcon,
	title,
	url,
	variant = "default",
	useIconBackground = true,
}: ISidebarLogoProps) => {
	const { state } = useSidebar();
	const isExpanded = state === "expanded";

	const logoContent = (
		<>
			<div
				className={cn(
					"flex justify-center items-center size-8 aspect-square",
					useIconBackground
						? "bg-sidebar-primary rounded-lg text-sidebar-primary-foreground"
						: "",
				)}
			>
				<LogoIcon className={cn("", useIconBackground ? "size-4" : "size-5")} />
			</div>
			{isExpanded && (
				<div className="flex flex-col gap-0.5 leading-none">
					<span
						className={`font-semibold ${variant === "compact" ? "text-sm" : "text-xl"}`}
					>
						{title}
					</span>
				</div>
			)}
		</>
	);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					asChild
					size="lg"
					tooltip={title}
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					{url ? (
						<a href={url} className="flex items-center gap-2">
							{logoContent}
						</a>
					) : (
						<div className="flex items-center gap-2">{logoContent}</div>
					)}
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export const TeamSwitcher = ({ teams }: { teams: ITeam[] }) => {
	const { isMobile } = useSidebar();
	const [activeTeam, setActiveTeam] = useState(teams[0]);

	if (!activeTeam) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex justify-center items-center bg-sidebar-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground">
								<activeTeam.logo className="size-4" />
							</div>
							<div className="flex-1 grid text-sm text-left leading-tight">
								<span className="font-medium truncate">{activeTeam.name}</span>
								<span className="text-xs truncate">{activeTeam.plan}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Teams
						</DropdownMenuLabel>
						{teams.map((team) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() => setActiveTeam(team)}
								className="gap-2 p-2"
							>
								<div className="flex justify-center items-center border rounded-md size-6">
									<team.logo className="size-3.5 shrink-0" />
								</div>
								{team.name}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex justify-center items-center bg-transparent border rounded-md size-6">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export const FooterSection = () => {
	const { state } = useSidebar();
	return (
		<>
			{state === "expanded" && (
				<Link
					className="font-medium text-muted-foreground hover:text-primary text-xs hover:underline transition-all duration-300"
					href={APP_INFO.githubUrl || ""}
					target="_blank"
				>
					v{APP_INFO.appVersion}
				</Link>
			)}
		</>
	);
};
