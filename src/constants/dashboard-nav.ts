import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  Book,
  Bot,
  Box,
  BoxSelect,
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
  LifeBuoy,
  LineChart,
  List,
  Package2,
  PieChart,
  RefreshCw,
  Settings2,
  Share2,
  ShieldAlert,
  Shuffle,
  SquareFunction,
  Timer,
  ToggleLeft,
} from "lucide-react";
import type { INavGroup } from "@/types/navigation";

export const DASHBOARD_NAV_DATA: INavGroup[] = [
  {
    title: "",
    items: [
      {
        title: "Projects",
        href: "/dashboard/projects",
        icon: LayoutGrid,
      },
      {
        title: "Deployments",
        href: "/dashboard/deployments",
        icon: Box,
      },
      {
        title: "Logs",
        href: "/dashboard/logs",
        icon: List,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: LineChart,
      },
      {
        title: "Speed Insights",
        href: "/dashboard/speed-insights",
        icon: Timer,
      },
      {
        title: "Observability",
        href: "#",
        icon: Eye,
        items: [
          {
            title: "Overview",
            href: "/dashboard/observability/overview",
            icon: LayoutDashboard,
          },
          {
            title: "Query",
            href: "/dashboard/observability/query",
            icon: Activity,
          },
          {
            title: "Notebooks",
            href: "/dashboard/observability/notebooks",
            icon: Book,
          },
          {
            title: "Alerts",
            href: "/dashboard/observability/alerts",
            icon: AlertTriangle,
          },
          {
            title: "COMPUTE",
            href: "#",
            icon: Cpu, // Replaced <div /> with Cpu icon
            variant: "group",
            items: [
              {
                title: "Functions",
                href: "/dashboard/observability/functions",
                icon: SquareFunction,
              },
              {
                title: "External APIs",
                href: "/dashboard/observability/external-apis",
                icon: Globe,
              },
              {
                title: "Middleware",
                href: "/dashboard/observability/middleware",
                icon: Layers,
              },
              {
                title: "Workflows",
                href: "/dashboard/observability/workflows",
                icon: GitBranch,
              },
            ],
          },
          {
            title: "CDN",
            href: "#",
            icon: Cloud, // Replaced <div /> with Cloud icon
            variant: "group",
            items: [
              {
                title: "Edge Requests",
                href: "/dashboard/observability/edge-requests",
                icon: Globe,
              },
              {
                title: "Fast Data Transfer",
                href: "/dashboard/observability/fast-data-transfer",
                icon: ArrowRightLeft,
              },
              {
                title: "Image Optimization",
                href: "/dashboard/observability/image-optimization",
                icon: Image,
              },
              {
                title: "ISR",
                href: "/dashboard/observability/isr",
                icon: RefreshCw,
              },
              {
                title: "External Rewrites",
                href: "/dashboard/observability/external-rewrites",
                icon: Shuffle,
              },
              {
                title: "Microfrontends",
                href: "/dashboard/observability/microfrontends",
                icon: Package2,
              },
            ],
          },
        ],
      },
      {
        title: "Firewall",
        href: "/dashboard/firewall",
        icon: ShieldAlert,
      },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "Domains",
        href: "/dashboard/domains",
        icon: Globe,
      },
      {
        title: "Integrations",
        href: "/dashboard/integrations",
        icon: List,
      },
      {
        title: "Storage",
        href: "/dashboard/storage",
        icon: Database,
      },
      {
        title: "Flags",
        href: "/dashboard/flags",
        icon: ToggleLeft,
      },
      {
        title: "Agent",
        href: "#",
        icon: Bot,
        items: [
          {
            title: "Agent Settings",
            href: "/dashboard/agent/settings",
            icon: Settings2,
          },
        ],
      },
      {
        title: "AI Gateway",
        href: "#",
        icon: Share2,
        items: [
          {
            title: "Gateway Settings",
            href: "/dashboard/ai-gateway/settings",
            icon: Settings2,
          },
        ],
      },
      {
        title: "Sandboxes",
        href: "/dashboard/sandboxes",
        icon: BoxSelect,
      },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "Usage",
        href: "/dashboard/usage",
        icon: PieChart,
      },
      {
        title: "Support",
        href: "/dashboard/support",
        icon: LifeBuoy,
      },
      {
        title: "Settings",
        href: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            href: "/dashboard/settings/general",
            icon: Settings2,
          },
          {
            title: "Team",
            href: "/dashboard/settings/team",
            icon: PieChart,
          },
        ],
      },
    ],
  },
];
