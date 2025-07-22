import HeroImg from "@/assets/imgs/hero.png";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Component } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { TECH_STACK } from "../utils/constants";
export function Hero() {
  return (
    <section className="isolate py-24 md:py-32 lg:py-40 w-full container">
      <div className="z-10 relative">
        <div className="items-center gap-12 grid lg:grid-cols-2">
          <div className="mx-auto lg:mx-0 max-w-2xl text-left">
            <div>
              <Badge
                className="mb-3 px-3 py-1 rounded-full font-semibold text-sm"
                variant="secondary"
              >
                <Component className="mr-2 size-4 text-primary" />
                Project base
              </Badge>
            </div>
            <p className="bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 mb-6 font-bold text-transparent text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Let's start{" "}
              <span className="font-serif text-primary italic">cooking</span>
              <br />
              your modern web application
            </p>
            <p className="mb-6 text-muted-foreground text-lg md:text-xl leading-relaxed">
              Essential components and features builts with shadcn/ui for
              kickstarting your Next.js projects.
            </p>

            <div className="mt-6">
              <p className="mb-3 font-semibold text-muted-foreground text-sm">
                Built with modern tech stack
              </p>
              <div className="gap-3 grid grid-cols-2 lg:grid-cols-3">
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

          <div className="hidden lg:block relative">
            <Card className="relative bg-gradient-to-b from-background to-background/95 shadow-xl backdrop-blur p-0 overflow-hidden">
              <Image src={HeroImg} alt="Hero Image" />
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
      <Card className="group hover:bg-primary/5 p-0 hover:border-primary/100 h-full transition-all">
        <CardContent className="flex items-center gap-3 p-3">
          <div className="flex-shrink-0 p-2 border group-hover:border-primary/70 rounded-md group-hover:text-primary transition-all">
            {icon}
          </div>
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default TechCard;
