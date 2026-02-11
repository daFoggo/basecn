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
  LifeBuoy,
  LineChart,
  List,
  Package2,
  PieChart,
  RefreshCw,
  Settings2,
  ShieldAlert,
  Shuffle,
  SquareFunction,
  Timer,
  ToggleLeft,
} from "lucide-react";
import type { INavGroup } from "@/types/navigation";

export const getDashboardNav = (
  orgSlug: string,
  projectSlug: string,
): INavGroup[] => {
  const isProjectContext = !!projectSlug;
  const projectBaseUrl = `/${orgSlug}/${projectSlug}`;
  // For Organization context (no project selected), Vercel uses /~ pattern
  const orgBaseUrl = `/${orgSlug}/~`;

  // Navigation for specific Project Context
  if (isProjectContext) {
    return [
      {
        title: "Project",
        items: [
          {
            title: "Overview",
            href: `${projectBaseUrl}/overview`,
            icon: LayoutDashboard,
          },
          {
            title: "Deployments",
            href: `${projectBaseUrl}/deployments`,
            icon: Box,
          },
          {
            title: "Logs",
            href: `${projectBaseUrl}/logs`,
            icon: List,
          },
          {
            title: "Analytics",
            href: `${projectBaseUrl}/analytics`,
            icon: LineChart,
          },
          {
            title: "Speed Insights",
            href: `${projectBaseUrl}/speed-insights`,
            icon: Timer,
          },
          {
            title: "Observability",
            href: "#",
            icon: Eye,
            items: [
              {
                title: "Overview",
                href: `${projectBaseUrl}/observability/overview`,
                icon: LayoutDashboard,
              },
              {
                title: "Query",
                href: `${projectBaseUrl}/observability/query`,
                icon: Activity,
              },
              {
                title: "Notebooks",
                href: `${projectBaseUrl}/observability/notebooks`,
                icon: Book,
              },
              {
                title: "Alerts",
                href: `${projectBaseUrl}/observability/alerts`,
                icon: AlertTriangle,
              },
              {
                title: "COMPUTE",
                href: "#",
                icon: Cpu,
                variant: "group",
                items: [
                  {
                    title: "Functions",
                    href: `${projectBaseUrl}/observability/functions`,
                    icon: SquareFunction,
                  },
                  {
                    title: "External APIs",
                    href: `${projectBaseUrl}/observability/external-apis`,
                    icon: Globe,
                  },
                  {
                    title: "Middleware",
                    href: `${projectBaseUrl}/observability/middleware`,
                    icon: Layers,
                  },
                  {
                    title: "Workflows",
                    href: `${projectBaseUrl}/observability/workflows`,
                    icon: GitBranch,
                  },
                ],
              },
              {
                title: "CDN",
                href: "#",
                icon: Cloud,
                variant: "group",
                items: [
                  {
                    title: "Edge Requests",
                    href: `${projectBaseUrl}/observability/edge-requests`,
                    icon: Globe,
                  },
                  {
                    title: "Fast Data Transfer",
                    href: `${projectBaseUrl}/observability/fast-data-transfer`,
                    icon: ArrowRightLeft,
                  },
                  {
                    title: "Image Optimization",
                    href: `${projectBaseUrl}/observability/image-optimization`,
                    icon: Image,
                  },
                  {
                    title: "ISR",
                    href: `${projectBaseUrl}/observability/isr`,
                    icon: RefreshCw,
                  },
                  {
                    title: "External Rewrites",
                    href: `${projectBaseUrl}/observability/external-rewrites`,
                    icon: Shuffle,
                  },
                  {
                    title: "Microfrontends",
                    href: `${projectBaseUrl}/observability/microfrontends`,
                    icon: Package2,
                  },
                ],
              },
            ],
          },
          {
            title: "Firewall",
            href: `${projectBaseUrl}/firewall`,
            icon: ShieldAlert,
          },
        ],
      },
      {
        title: "Project Settings",
        items: [
          {
            title: "Domains",
            href: `${projectBaseUrl}/domains`,
            icon: Globe,
          },
          {
            title: "Integrations",
            href: `${projectBaseUrl}/integrations`,
            icon: List,
          },
          {
            title: "Storage",
            href: `${projectBaseUrl}/storage`,
            icon: Database,
          },
          {
            title: "Flags",
            href: `${projectBaseUrl}/flags`,
            icon: ToggleLeft,
          },
          {
            title: "General",
            href: `${projectBaseUrl}/settings/general`,
            icon: Settings2,
          },
        ],
      },
    ];
  }

  // Navigation for Organization Context (Projects List, Org Settings)
  return [
    {
      title: "",
      items: [
        {
          title: "Projects",
          href: `/${orgSlug}/projects`,
          icon: LayoutGrid,
        },
        {
          title: "Deployments",
          href: `${orgBaseUrl}/deployments`,
          icon: Box,
        },
        {
          title: "Domains",
          href: `${orgBaseUrl}/domains`,
          icon: Globe,
        },
        {
          title: "Integrations",
          href: `${orgBaseUrl}/integrations`,
          icon: List,
        },
        {
          title: "Storage",
          href: `${orgBaseUrl}/storage`,
          icon: Database,
        },
        {
          title: "Flags",
          href: `${orgBaseUrl}/flags`,
          icon: ToggleLeft,
        },
        {
          title: "Usage",
          href: `${orgBaseUrl}/usage`,
          icon: PieChart,
        },
        {
          title: "Settings",
          href: "#",
          icon: Settings2,
          items: [
            {
              title: "General",
              href: `${orgBaseUrl}/settings`,
              icon: Settings2,
            },
            {
              title: "Members",
              href: `${orgBaseUrl}/settings/team`,
              icon: PieChart,
            },
            {
              title: "Billing",
              href: `${orgBaseUrl}/settings/billing`,
              icon: Settings2,
            },
          ],
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Help Center",
          href: "https://vercel.com/help",
          icon: LifeBuoy,
          external: true,
        },
      ],
    },
  ];
};
