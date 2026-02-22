"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { type HTMLAttributes, useEffect, useState } from "react";
import { THEME_OPTIONS } from "@/constants/theme";
import { cn } from "@/lib/utils";

const themeSwitcherVariants = cva(
  "relative isolate flex rounded-full bg-background p-1 ring-1 ring-border",
  {
    variants: {
      size: {
        default: "h-8",
        sm: "h-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface IThemeSwitcherProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof themeSwitcherVariants> {}

export const ThemeSwitcher = ({
  className,
  size = "default",
  ...props
}: IThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeConfig = {
    default: {
      button: "size-6",
      icon: "size-4",
      skeleton: "h-8 w-20",
    },
    sm: {
      button: "size-5",
      icon: "size-3.5",
      skeleton: "h-7 w-[4.25rem]",
    },
  };

  const config = sizeConfig[size || "default"];

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-full bg-background ring-1 ring-border animate-pulse",
          config.skeleton,
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <div className={cn(themeSwitcherVariants({ size, className }))} {...props}>
      {THEME_OPTIONS.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;

        return (
          <button
            aria-label={label}
            className={cn(
              "group relative rounded-full transition-colors",
              config.button,
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
                "relative z-10 m-auto transition-colors",
                config.icon,
                isActive
                  ? "text-secondary-foreground"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
