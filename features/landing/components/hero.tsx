import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PanelsTopLeft } from "lucide-react";
import type React from "react";
import { TECH_STACK } from "../utils/constants";

export function Hero() {
  return (
    <section className="isolate py-20 md:py-32 lg:py-40 w-full container">
      <div className="z-10 relative">
        <div className="items-center gap-12 grid lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="mx-auto lg:mx-0 max-w-2xl text-left">
            <div>
              <Badge
                className="shadow-sm mb-4 px-4 py-1.5 rounded-full font-medium text-sm transition-none"
                variant="secondary"
              >
                <span className="mr-1 text-primary">
                  <PanelsTopLeft className="size-4" />
                </span>{" "}
                Project base
              </Badge>
            </div>
            <p className="bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 mb-6 font-bold text-transparent text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Let's start cooking your mordern web application
            </p>
            <p className="mb-8 text-muted-foreground text-lg md:text-xl leading-relaxed">
              Essential components and features builts with shadcn/ui for kickstarting your Next.js projects.
            </p>

            <div className="mt-8">
              <h3 className="mb-4 font-medium text-muted-foreground text-sm">
                Built with modern tech stack
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {TECH_STACK.map((tech, index) => (
                  <TechCard
                    key={index}
                    icon={tech.icon}
                    name={tech.name}
                    description={tech.description}
                    link={tech.link}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Preview Card */}
          <div className="hidden lg:block relative">
            <Card className="relative bg-gradient-to-b from-background to-background/95 shadow-xl backdrop-blur border-border/40 overflow-hidden">
              <CardContent className="p-6"></CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_30%,var(--muted),transparent_35%)] blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_70%,var(--muted),transparent_10%)] blur-3xl"></div>
    </section>
  );
}

const TechCard = ({
  icon,
  name,
  description,
  link,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  link?: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      <div className="group flex items-center gap-3 bg-background/50 hover:bg-primary/5 backdrop-blur-sm p-3 border hover:border-primary/100 border-border/70 h-full transition-all duration-300">
        <div className="flex-shrink-0 bg-background shadow-sm p-2 border group-hover:border-primary/70 border-border/40 group-hover:text-primary transition-colors">
          {icon}
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>
    </a>
  );
};
