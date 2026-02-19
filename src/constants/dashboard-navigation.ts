import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  Book,
  Box,
  Cloud,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Globe,
  Image,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LineChart,
  List,
  Package2,
  RefreshCw,
  Settings2,
  ShieldAlert,
  Shuffle,
  SquareFunction,
  Table,
  Timer,
  ToggleLeft,
} from "lucide-react";
import type { INavGroup } from "@/types/navigation";

export const getDashboardNav = (
  orgSlug: string,
  projectSlug: string,
): INavGroup[] => {
  const isProjectContext = !!projectSlug;
  const baseUrl = isProjectContext
    ? `/${orgSlug}/${projectSlug}`
    : `/${orgSlug}/~`;

  const coreGroup: INavGroup = {
    title: isProjectContext ? "Project" : "Organization",
    items: [
      isProjectContext
        ? {
            title: "Overview",
            href: `${baseUrl}/overview`,
            icon: LayoutDashboard,
          }
        : {
            title: "Projects",
            href: `/${orgSlug}/projects`,
            icon: LayoutGrid,
          },
      {
        title: "Deployments",
        href: `${baseUrl}/deployments`,
        icon: Box,
      },
      {
        title: "Logs",
        href: `${baseUrl}/logs`,
        icon: List,
      },
      {
        title: "Analytics",
        href: `${baseUrl}/analytics`,
        icon: LineChart,
      },
      {
        title: "Speed Insights",
        href: `${baseUrl}/speed-insights`,
        icon: Timer,
      },
      {
        title: "Data Table",
        href: `${baseUrl}/data-table`,
        icon: Table,
      },
    ],
  };

  const obsGroup: INavGroup = {
    title: "Observability",
    items: [
      {
        title: "Monitoring",
        href: "#",
        icon: Eye,
        items: [
          {
            title: "Overview",
            href: `${baseUrl}/monitoring/overview`,
            icon: LayoutDashboard,
          },
          {
            title: "Query",
            href: `${baseUrl}/monitoring/query`,
            icon: Activity,
          },
          {
            title: "Notebooks",
            href: `${baseUrl}/monitoring/notebooks`,
            icon: Book,
          },
          {
            title: "Alerts",
            href: `${baseUrl}/monitoring/alerts`,
            icon: AlertTriangle,
          },
        ],
      },
      {
        title: "Compute",
        href: "#",
        icon: Cpu,
        items: [
          {
            title: "Functions",
            href: `${baseUrl}/compute/functions`,
            icon: SquareFunction,
          },
          {
            title: "External APIs",
            href: `${baseUrl}/compute/external-apis`,
            icon: Globe,
          },
          {
            title: "Middleware",
            href: `${baseUrl}/compute/middleware`,
            icon: Layers,
          },
          {
            title: "Workflows",
            href: `${baseUrl}/compute/workflows`,
            icon: GitBranch,
          },
        ],
      },
      {
        title: "Edge Network",
        href: "#",
        icon: Cloud,
        items: [
          {
            title: "Edge Requests",
            href: `${baseUrl}/edge-network/edge-requests`,
            icon: Globe,
          },
          {
            title: "Fast Data Transfer",
            href: `${baseUrl}/edge-network/fast-data-transfer`,
            icon: ArrowRightLeft,
          },
          {
            title: "Image Optimization",
            href: `${baseUrl}/edge-network/image-optimization`,
            icon: Image,
          },
          {
            title: "ISR",
            href: `${baseUrl}/edge-network/isr`,
            icon: RefreshCw,
          },
          {
            title: "External Rewrites",
            href: `${baseUrl}/edge-network/external-rewrites`,
            icon: Shuffle,
          },
          {
            title: "Microfrontends",
            href: `${baseUrl}/edge-network/microfrontends`,
            icon: Package2,
          },
        ],
      },
      {
        title: "Firewall",
        href: `${baseUrl}/firewall`,
        icon: ShieldAlert,
      },
    ],
  };
  const settingsGroup: INavGroup = {
    title: "Settings",
    items: [
      {
        title: "Domains",
        href: `${baseUrl}/domains`,
        icon: Globe,
      },
      {
        title: "Integrations",
        href: `${baseUrl}/integrations`,
        icon: List,
      },
      {
        title: "Storage",
        href: `${baseUrl}/storage`,
        icon: Database,
      },
      {
        title: "Flags",
        href: `${baseUrl}/flags`,
        icon: ToggleLeft,
      },
      {
        title: "General",
        href: `${baseUrl}/settings/general`,
        icon: Settings2,
      },
    ],
  };

  return [coreGroup, obsGroup, settingsGroup];
};
