"use client";

import { ArrowRight, SquareArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GitHubStar } from "@/components/common/github-star";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/configs/site";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { RootMobileNav } from "./root-mobile-nav";

export const RootHeader = () => {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-5xl border-transparent border-b bg-background/20 backdrop-blur-md md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border md:top-2 md:shadow": scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <Link href="/">
          <Button
            variant="ghost"
            className="rounded-md p-1 hover:bg-muted flex items-center gap-2"
          >
            <SquareArrowUpRight className="size-4" />
            <span className="text-lg font-medium">
              {SITE_CONFIG.metadata.title}
            </span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <GitHubStar />
          <ThemeSwitcher size="sm" />
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/acme-inc">
              <Button size="sm">
                Go to dashboard
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <RootMobileNav />
        </div>
      </nav>
    </header>
  );
};
