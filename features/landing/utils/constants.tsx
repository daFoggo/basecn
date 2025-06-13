import {
  DiceIcon,
  FramerIcon,
  NextIcon,
  ShadcnIcon,
  SWRIcon,
  TailwindIcon,
} from "@/components/common/icons";
import { Blocks, Layers, Palette, RefreshCw, Shield, Zap } from "lucide-react";
import { IFeature, ITechStack } from "./types";

export const TECH_STACK: ITechStack[] = [
  {
    icon: <NextIcon className="size-6" />,
    name: "Next.js",
    description: "React Framework",
    link: "https://nextjs.org",
  },
  {
    icon: <ShadcnIcon className="size-6" />,
    name: "shadcn/ui",
    description: "UI Components",
    link: "https://ui.shadcn.com",
  },
  {
    icon: <TailwindIcon className="size-6" />,
    name: "Tailwind",
    description: "CSS Framework",
    link: "https://tailwindcss.com",
  },
  {
    icon: <SWRIcon className="size-6" />,
    name: "SWR",
    description: "Data Fetching",
    link: "https://swr.vercel.app",
  },
  {
    icon: <FramerIcon className="size-6" />,
    name: "Framer Motion",
    description: "Animation Library",
    link: "https://www.framer.com/motion",
  },
  {
    icon: <DiceIcon className="size-6" />,
    name: "Dice UI",
    description: "Advanced components",
    link: "https://diceui.com",
  },
];

export const FEATURES: IFeature[] = [
  {
    icon: <Blocks className="size-6" />,
    name: "Component-Based Architecture",
    description:
      "Build your UI with reusable, modular components that are easy to maintain and scale.",
  },
  {
    icon: <Zap className="size-6" />,
    name: "Lightning Fast Performance",
    description:
      "Optimized rendering and data fetching strategies for exceptional user experience.",
  },
  {
    icon: <Palette className="size-6" />,
    name: "Beautiful Design System",
    description:
      "Consistent, accessible, and customizable design tokens powered by Shadcn and Tailwind CSS.",
  },
  {
    icon: <Layers className="size-6" />,
    name: "Advanced Animations",
    description:
      "Create fluid, interactive animations with Framer Motion's declarative API.",
  },
  {
    icon: <RefreshCw className="size-6" />,
    name: "Easy data fetching management and revalidation",
    description:
      "Leverage SWR for efficient data fetching, caching, and revalidation strategies.",
  },
  {
    icon: <Shield className="size-6" />,
    name: "Type-Safe Development",
    description:
      "Full TypeScript support for a robust development experience with fewer bugs.",
  },
];
