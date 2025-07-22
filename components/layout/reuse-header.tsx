"use client";

import { Button } from "@/components/ui/button";
import { IReuseHeaderProps } from "@/lib/types/header";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export const ReuseHeader = ({
  wrapByContainer = true,
  leftSection,
  centerSection,
  rightSection,
  rightNavigationSection,
  className,
  sticky = true,
  showScrollEffect = true,
  showMobileMenu = true,
  mobileMenuContent,
  containerClassName,
}: IReuseHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!showScrollEffect) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollEffect]);

  const headerClasses = cn(
    "backdrop-blur-lg w-full transition-all duration-300",
    sticky && "sticky top-0 z-50",
    showScrollEffect && isScrolled
      ? "bg-background/90 shadow-sm border-b"
      : "bg-transparent",
    className
  );

  const containerClasses = cn(
    "flex justify-between items-center h-(--header-height)", 
    wrapByContainer ? "container" : "px-6",
    containerClassName
  );

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        {/* Left Section */}
        <div className="flex items-center">{leftSection}</div>

        {/* Center Section - Hidden on mobile */}
        <nav className="hidden md:flex items-center">{centerSection}</nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {rightSection}
          </div>

          {/* Navigation Section */}
          <div className="hidden md:flex items-center">
            {rightNavigationSection}
          </div>

          {/* Mobile Action Buttons */}
          <div className="md:hidden flex items-center gap-2">
            {rightSection}
          </div>

          {/* Mobile Menu Toggle */}
          {showMobileMenu && (centerSection || mobileMenuContent) && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-4" />
                ) : (
                  <Menu className="size-4" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden top-full absolute inset-x-0 bg-background/95 shadow-lg backdrop-blur-lg border-b"
          >
            <div className="space-y-4 py-4 container">
              {/* Mobile Center Section */}
              {centerSection && (
                <div className="space-y-2">{centerSection}</div>
              )}

              {/* Custom Mobile Content */}
              {mobileMenuContent}

              {/* Mobile Navigation Section */}
              {rightNavigationSection && (
                <div className="pt-4 border-t border-border/30">
                  {rightNavigationSection}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
