import { Nextjs } from "@/components/icons/nextjs-icon";
import { shadcnui as Shadcnui } from "@/components/icons/shadcn-icon";
import { SWR as Swr } from "@/components/icons/swr-icon";
import { TailwindCSS as Tailwind } from "@/components/icons/tailwind-icon";
import { TanStack } from "@/components/icons/tanstack-icon";
import { TypeScript as Typescript } from "@/components/icons/typescript-icon";
import { cn } from "@/lib/utils";

type TileData = {
  row: number;
  col: number;
  icon?: React.ReactNode;
  label?: string;
};

// Coordinate mapping
const tiles: TileData[] = [
  // Row 0
  {
    row: 0,
    col: 1,
    icon: <Nextjs className="size-full p-2" />,
    label: "Next.js",
  },
  {
    row: 0,
    col: 3,
    icon: <TanStack className="size-full p-2" />,
    label: "TanStack",
  },

  // Row 1
  { row: 1, col: 0 }, // Empty
  {
    row: 1,
    col: 2,
    icon: <Shadcnui className="size-full p-2 dark:invert" />,
    label: "shadcn/ui",
  },
  {
    row: 1,
    col: 4,
    icon: <Typescript className="size-full p-3" />,
    label: "TypeScript",
  },

  // Row 2
  {
    row: 2,
    col: 1,
    icon: <Swr className="size-full p-2 dark:invert" />,
    label: "SWR",
  },
  {
    row: 2,
    col: 3,
  }, // Empty

  // Row 3

  { row: 3, col: 0 }, // Empty
  {
    row: 3,
    col: 2,
    icon: <Tailwind className="size-full p-2" />,
    label: "Tailwind CSS",
  },
  {
    row: 3,
    col: 4,
    icon: <Nextjs className="size-full p-2" />,
    label: "Next.js",
  },

  // Row 4
  {
    row: 4,
    col: 1,
    icon: <TanStack className="size-full p-2" />,
    label: "TanStack",
  },
  {
    row: 4,
    col: 3,
    icon: <Shadcnui className="size-full p-2 dark:invert" />,
    label: "shadcn/ui",
  },
];

export function Integrations() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-8 lg:py-16 md:grid-cols-2 md:items-center">
      {/* Left Content */}
      <div className="max-w-xl space-y-5">
        <h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
          Modern Stack
        </h2>
        <p className="text-lg text-muted-foreground leading-8">
          Built with the best-in-class technologies including Next.js, Tailwind
          CSS, and TypeScript for optimal performance and developer experience.
        </p>
      </div>

      {/* Right Content - Visual */}
      <div className="place-items-end">
        <div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-[360px]">
          {tiles.map((tile) => (
            <IntegrationCard key={`${tile.row}-${tile.col}`} {...tile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationCard({ row, col, icon }: TileData) {
  return (
    <div
      className={cn(
        "absolute flex size-[72px] items-center justify-center rounded-md border",
        icon
          ? "bg-card shadow-xs dark:bg-card/60"
          : "bg-secondary/30 dark:bg-background",
      )}
      style={{
        left: col * 72,
        top: row * 72,
      }}
    >
      {icon && <div className="size-10">{icon}</div>}
    </div>
  );
}
