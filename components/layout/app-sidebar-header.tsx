import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HeaderActionButtons from "./header-action-buttons";

export function AppSidebarHeader() {
  return (
    <header className="top-0 z-50 sticky flex items-center gap-2 bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b h-16 shrink-0">
      <div className="flex justify-between items-center gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
        </div>
        <div className="flex items-center gap-4">
          <HeaderActionButtons showNavigationButton={false} />
        </div>
      </div>
    </header>
  );
}
