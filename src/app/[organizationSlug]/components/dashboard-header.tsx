import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderProjectSwitcher } from "./header-project-switcher";

export const DashboardHeader = () => {
  return (
    <header className="flex sticky top-0 bg-background h-14 shrink-0 items-center gap-2 border-b px-4 z-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger />
      <Separator orientation="vertical" className="my-4" />
      <HeaderProjectSwitcher />
    </header>
  );
};
