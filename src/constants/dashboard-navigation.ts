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
  Timer,
  ToggleLeft,
} from "lucide-react";
import type { INavGroup } from "@/types/navigation.types";

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
            href: `${baseUrl}/observability/overview`,
            icon: LayoutDashboard,
          },
          {
            title: "Query",
            href: `${baseUrl}/observability/query`,
            icon: Activity,
          },
          {
            title: "Notebooks",
            href: `${baseUrl}/observability/notebooks`,
            icon: Book,
          },
          {
            title: "Alerts",
            href: `${baseUrl}/observability/alerts`,
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
            href: `${baseUrl}/observability/functions`,
            icon: SquareFunction,
          },
          {
            title: "External APIs",
            href: `${baseUrl}/observability/external-apis`,
            icon: Globe,
          },
          {
            title: "Middleware",
            href: `${baseUrl}/observability/middleware`,
            icon: Layers,
          },
          {
            title: "Workflows",
            href: `${baseUrl}/observability/workflows`,
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
            href: `${baseUrl}/observability/edge-requests`,
            icon: Globe,
          },
          {
            title: "Fast Data Transfer",
            href: `${baseUrl}/observability/fast-data-transfer`,
            icon: ArrowRightLeft,
          },
          {
            title: "Image Optimization",
            href: `${baseUrl}/observability/image-optimization`,
            icon: Image,
          },
          {
            title: "ISR",
            href: `${baseUrl}/observability/isr`,
            icon: RefreshCw,
          },
          {
            title: "External Rewrites",
            href: `${baseUrl}/observability/external-rewrites`,
            icon: Shuffle,
          },
          {
            title: "Microfrontends",
            href: `${baseUrl}/observability/microfrontends`,
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
