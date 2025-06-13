"use client";

import { Button } from "@/components/ui/button";
import { formatCompactNumber } from "@/lib/format";
import { useGithubStars } from "@/lib/hooks/use-github-stars";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHubIcon } from "../common/icons";
import { ThemeSwitcher } from "../common/theme-switcher";
import { APP_CONFIG } from "@/config/app";

export const NoNavHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { stargazersCount } = useGithubStars("daFoggo", "basecn");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to render GitHub button and theme switcher
  const renderHeaderControls = () => {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <Button variant="ghost" asChild>
            <a
              href={APP_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              <GitHubIcon className="size-4" />
              {stargazersCount > 0 && formatCompactNumber(stargazersCount)}
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ThemeSwitcher />
        </motion.div>
      </>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg",
        isScrolled ? "bg-background/90 shadow-xs border-b" : "bg-transparent"
      )}
    >
      <div className="flex justify-between items-center h-16 container">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold">
            <PanelsTopLeft className="size-4" />
            <span>basecn</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          {renderHeaderControls()}
        </div>

        <div className="md:hidden flex items-center gap-4">
          {renderHeaderControls()}
        </div>
      </div>
    </header>
  );
};
