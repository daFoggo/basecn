"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const HeroImageCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative z-20 size-full overflow-hidden rounded-lg border bg-background p-2 *:pointer-events-none *:select-none",
        className,
      )}
    >
      <Image
        alt="app screen"
        className="z-2 aspect-video rounded-lg border dark:hidden w-full h-auto"
        src="https://storage.efferd.com/screen/dashboard-light.webp"
        width={1920}
        height={1080}
      />
      <Image
        alt="app screen"
        className="hidden aspect-video rounded-lg bg-background dark:block w-full h-auto"
        src="https://storage.efferd.com/screen/dashboard-dark.webp"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export const HeroImage = () => {
  return (
    <div className="relative w-full pt-8 lg:pt-16">
      <div
        className={cn(
          "relative w-full px-2",
          "fade-in slide-in-from-bottom-5 animate-in fill-mode-backwards delay-100 duration-1000 ease-out",
        )}
      >
        <div className="relative mx-auto max-w-5xl">
          {/* Main (Center) Image */}
          <div className="relative z-20">
            <HeroImageCard className="shadow-xl ring-1 ring-foreground/5" />
          </div>

          {/* Left Image */}
          <div
            className="absolute top-0 left-0 -z-10 hidden w-full opacity-60 blur-[2px] md:block"
            style={{
              transform: "translateX(-25%) rotate(-8deg) scale(0.8)",
            }}
          >
            <HeroImageCard />
          </div>

          {/* Right Image */}
          <div
            className="absolute top-0 right-0 -z-10 hidden w-full opacity-60 blur-[2px] md:block"
            style={{ transform: "translateX(25%) rotate(8deg) scale(0.8)" }}
          >
            <HeroImageCard />
          </div>

          {/* <div className="absolute -bottom-4 left-0 z-20 h-40 w-full bg-linear-to-t from-background via-background/40 to-transparent" /> */}
        </div>
      </div>
    </div>
  );
};
