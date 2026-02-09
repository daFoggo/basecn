import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  Book,
  Bot,
  Box,
  BoxSelect,
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

export const navData: INavGroup[] = [
  {
    title: "",
    items: [
      {
        title: "Projects",
        href: "/dashboard/projects",
        icon: <LayoutGrid className="size-4" />,
      },
      {
        title: "Deployments",
        href: "/dashboard/deployments",
        icon: <Box className="size-4" />,
      },
      {
        title: "Logs",
        href: "/dashboard/logs",
        icon: <List className="size-4" />,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: <LineChart className="size-4" />,
      },
      {
        title: "Speed Insights",
        href: "/dashboard/speed-insights",
        icon: <Timer className="size-4" />,
      },
      {
        title: "Observability",
        href: "#",
        icon: <Eye className="size-4" />,
        items: [
          {
            title: "Overview",
            href: "/dashboard/observability/overview",
            icon: <LayoutDashboard className="size-4" />,
          },
          {
            title: "Query",
            href: "/dashboard/observability/query",
            icon: <Activity className="size-4" />,
          },
          {
            title: "Notebooks",
            href: "/dashboard/observability/notebooks",
            icon: <Book className="size-4" />,
          },
          {
            title: "Alerts",
            href: "/dashboard/observability/alerts",
            icon: <AlertTriangle className="size-4" />,
          },
          {
            title: "COMPUTE",
            href: "#",
            icon: <div />, // Placeholder
            variant: "group",
            items: [
              {
                title: "Functions",
                href: "/dashboard/observability/functions",
                icon: <SquareFunction className="size-4" />,
              },
              {
                title: "External APIs",
                href: "/dashboard/observability/external-apis",
                icon: <Globe className="size-4" />,
              },
              {
                title: "Middleware",
                href: "/dashboard/observability/middleware",
                icon: <Layers className="size-4" />,
              },
              {
                title: "Workflows",
                href: "/dashboard/observability/workflows",
                icon: <GitBranch className="size-4" />,
              },
            ],
          },
          {
            title: "CDN",
            href: "#",
            icon: <div />, // Placeholder
            variant: "group",
            items: [
              {
                title: "Edge Requests",
                href: "/dashboard/observability/edge-requests",
                icon: <Globe className="size-4" />,
              },
              {
                title: "Fast Data Transfer",
                href: "/dashboard/observability/fast-data-transfer",
                icon: <ArrowRightLeft className="size-4" />,
              },
              {
                title: "Image Optimization",
                href: "/dashboard/observability/image-optimization",
                icon: <Image className="size-4" />,
              },
              {
                title: "ISR",
                href: "/dashboard/observability/isr",
                icon: <RefreshCw className="size-4" />,
              },
              {
                title: "External Rewrites",
                href: "/dashboard/observability/external-rewrites",
                icon: <Shuffle className="size-4" />,
              },
              {
                title: "Microfrontends",
                href: "/dashboard/observability/microfrontends",
                icon: <Package2 className="size-4" />,
              },
            ],
          },
        ],
      },
      {
        title: "Firewall",
        href: "/dashboard/firewall",
        icon: <ShieldAlert className="size-4" />,
      },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "Domains",
        href: "/dashboard/domains",
        icon: <Globe className="size-4" />,
      },
      {
        title: "Integrations",
        href: "/dashboard/integrations",
        icon: <List className="size-4" />,
      },
      {
        title: "Storage",
        href: "/dashboard/storage",
        icon: <Database className="size-4" />,
      },
      {
        title: "Flags",
        href: "/dashboard/flags",
        icon: <ToggleLeft className="size-4" />,
      },
      {
        title: "Agent",
        href: "#",
        icon: <Bot className="size-4" />,
        items: [
          {
            title: "Agent Settings",
            href: "/dashboard/agent/settings",
            icon: <Settings2 className="size-4" />,
          },
        ],
      },
      {
        title: "AI Gateway",
        href: "#",
        icon: <Share2 className="size-4" />,
        items: [
          {
            title: "Gateway Settings",
            href: "/dashboard/ai-gateway/settings",
            icon: <Settings2 className="size-4" />,
          },
        ],
      },
      {
        title: "Sandboxes",
        href: "/dashboard/sandboxes",
        icon: <BoxSelect className="size-4" />,
      },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "Usage",
        href: "/dashboard/usage",
        icon: <PieChart className="size-4" />,
      },
      {
        title: "Support",
        href: "/dashboard/support",
        icon: <LifeBuoy className="size-4" />,
      },
      {
        title: "Settings",
        href: "#",
        icon: <Settings2 className="size-4" />,
        items: [
          {
            title: "General",
            href: "/dashboard/settings/general",
            icon: <Settings2 className="size-4" />,
          },
          {
            title: "Team",
            href: "/dashboard/settings/team",
            icon: <PieChart className="size-4" />,
          },
        ],
      },
    ],
  },
];
