import {
  DiceIcon,
  FramerIcon,
  NextIcon,
  ShadcnIcon,
  SWRIcon,
  TailwindIcon,
} from "@/components/common/icons";
import { ITechStack } from "./types";

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
    description: "Advanced shadcn/ui components",
    link: "https://dice-ui.com",
  }
];
