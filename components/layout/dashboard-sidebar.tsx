import { ISidebarConfig } from "@/lib/types/sidebar";
import { FileText, GitCompareArrows, Logs } from "lucide-react";
import { ReuseSidebar } from "./reuse-sidebar";

export const dashboardSidebarConfig: ISidebarConfig = {
  side: "left",
  variant: "sidebar",
  collapsible: "icon",

  sections: [
    {
      id: "main-nav",
      type: "navigation",
      title: "Platform",
      items: [
        {
          id: "data-management",
          title: "Quản lí dữ liệu",
          url: "#data-management",
          icon: FileText,
          isActive: false,
          items: [
            {
              id: "knowledge-base",
              title: "Kho tri thức",
              url: "/dashboard/data-management/knowledge-base",
            },
          ],
        },
        {
          id: "functional-testing",
          title: "Kiểm thử chức năng",
          url: "#functional-testing",
          icon: GitCompareArrows,
          isActive: false,
          items: [
            {
              id: "chat",
              title: "Chat",
              url: "/dashboard/functional-testing/chat",
            },
          ],
        },
        {
          id: "logs",
          title: "Logs",
          url: "#logs",
          icon: Logs,
          isActive: false,
          items: [
            {
              id: "chat",
              title: "Chat",
              url: "/dashboard/logs/chat",
            },
          ],
        },
      ],
    },
  ],
  showFooter: true
};
const DashboardSidebar = () => {
  return <ReuseSidebar config={dashboardSidebarConfig} />;
};

export default DashboardSidebar;
