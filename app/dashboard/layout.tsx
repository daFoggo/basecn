import type { ReactNode } from "react";
import { CommandMenuProvider } from "@/components/common/command-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardSidebar } from "./components/dashboard-sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CommandMenuProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex-1 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </CommandMenuProvider>
  );
};

export default DashboardLayout;
