import type { ReactNode } from "react";
import { CommandMenuProvider } from "@/components/common/command-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardSidebar } from "./components/dashboard-sidebar";

const DashboardLayout = ({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb: ReactNode;
}) => {
  return (
    <CommandMenuProvider>
      <SidebarProvider className="h-svh overflow-hidden">
        <DashboardSidebar enableOrganizationSwitcher />
        <SidebarInset className="overflow-hidden">
          <DashboardHeader breadcrumb={breadcrumb} />
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </CommandMenuProvider>
  );
};

export default DashboardLayout;
