import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppSidebarHeader } from "@/components/layout/app-sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ProtectedRoute> -> enable this when auth is ready
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppSidebarHeader />
        <main className="flex flex-col flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
    // </ProtectedRoute>
  );
};

export default DashboardLayout;
