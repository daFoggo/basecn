"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { THEME_OPTIONS } from "@/constants/theme";
import { cn } from "@/lib/utils";

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8 w-20 rounded-full bg-background ring-1 ring-border animate-pulse",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border",
        className,
      )}
    >
      {THEME_OPTIONS.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;

        return (
          <button
            aria-label={label}
            className={cn(
              "group relative size-6 rounded-full transition-colors",
              !isActive && "hover:bg-muted/50",
            )}
            key={value}
            onClick={() => setTheme(value)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto size-4 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
