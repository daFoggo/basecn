"use client";

import { LayoutPanelLeft } from "lucide-react";
import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { APP_INFO } from "@/lib/configs/app-info";
import { SIDEBAR_NAVIGATION } from "@/lib/configs/sidebar-navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider>
			<DashboardSidebar
				navMain={SIDEBAR_NAVIGATION.navMain}
				navSecondary={SIDEBAR_NAVIGATION.navSecondary}
				sidebarLogo={{
					icon: LayoutPanelLeft,
					title: APP_INFO.name || "Dashboard",
					url: "/dashboard",
					variant: "default",
					useIconBackground: false,
				}}
			/>
			<SidebarInset>
				<DashboardHeader />
				<main className="flex-1 p-2 sm:p-6 w-full">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardLayout;
