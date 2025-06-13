"use client";

import { Button } from "@/components/ui/button";
import { formatCompactNumber } from "@/lib/format";
import { handleScrollToSection } from "@/lib/functions";
import { useGithubStars } from "@/lib/hooks/use-github-stars";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, PanelsTopLeft, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHubIcon } from "../common/icons";
import { ThemeSwitcher } from "../common/theme-switcher";
import { RootHeaderActionButton } from "./root-header-action-button";

export const RootHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const renderHeaderControls = (showActionButton = true) => {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <Button variant="ghost" asChild>
            <a
              href="https://github.com/daFoggo/basecn"
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

        {showActionButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <RootHeaderActionButton />
          </motion.div>
        )}
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
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {["Examples", "Features", "How It Works", "Roadmap", "FAQ"].map(
            (item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={handleScrollToSection}
                className="group relative font-medium text-muted-foreground hover:text-foreground text-xs lg:text-sm transition-colors"
              >
                {item}
                <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
              </motion.a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {renderHeaderControls(true)}
        </div>

        <div className="md:hidden flex items-center gap-4">
          {renderHeaderControls(false)}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden top-16 absolute inset-x-0 bg-background/95 backdrop-blur-lg border-b"
        >
          <div className="flex flex-col gap-4 mx-auto px-4 py-4 container">
            {["Examples", "Features", "How It Works", "Roadmap", "FAQ"].map(
              (item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={(e) => {
                    handleScrollToSection(e);
                    setMobileMenuOpen(false);
                  }}
                  className="group relative py-2 overflow-hidden font-medium text-sm"
                >
                  <span className="z-10 relative">{item}</span>
                  <span className="bottom-0 left-0 absolute bg-primary w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
                </motion.a>
              )
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-2 pt-2 border-t border-border/30"
            >
              <RootHeaderActionButton />
            </motion.div>
          </div>
        </motion.div>
      )}
    </header>
  );
};
