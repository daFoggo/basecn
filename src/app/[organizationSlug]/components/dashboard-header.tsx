import { GitHubStar } from "@/components/common/github-star";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderProjectSwitcher } from "./header-project-switcher";

export const DashboardHeader = ({
  breadcrumb,
}: {
  breadcrumb?: React.ReactNode;
}) => {
  return (
    <header className="flex sticky top-0 bg-background h-14 shrink-0 items-center justify-between border-b px-4 z-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="my-4 h-4" />
        <HeaderProjectSwitcher />
      </div>

      <div className="flex-1 hidden md:flex justify-center">{breadcrumb}</div>

      <div className="hidden md:block">
        <GitHubStar />
      </div>
    </header>
  );
};
