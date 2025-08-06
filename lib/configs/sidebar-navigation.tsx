import {
	BookOpen,
	ChartNoAxesCombined,
	type LucideIcon,
	SquareKanban,
	Users,
} from "lucide-react";
import { GitHubIcon } from "@/components/common/icons";
import type { INavigationConfig } from "../types/navigation";
import { APP_INFO } from "./app-info";

export const SIDEBAR_NAVIGATION: INavigationConfig = {
	root: {
		title: "Dashboard",
		url: "/dashboard",
	},
	navMain: [
		{
			title: "Overview",
			url: "/dashboard/overview",
			icon: ChartNoAxesCombined,
		},
		{
			title: "Tasks",
			url: "/dashboard/tasks",
			icon: SquareKanban,
		},
		{
			title: "Members",
			url: "/dashboard/members",
			icon: Users,
		},
	],
	navSecondary: [
		{
			title: "Documents",
			url: APP_INFO.githubUrl || "",
			icon: BookOpen,
		},
		{
			title: "Github",
			url: APP_INFO.githubUrl || "",
			icon: GitHubIcon as unknown as LucideIcon,
		},
	],
};
