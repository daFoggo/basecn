"use client";

import { motion as m } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "../ui/button";

type Coords = { x: number; y: number };

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggleAnimation = (coords?: Coords) => {
    console.log("handleThemeToggleAnimation called", coords);
    const root = document.documentElement;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      toggleTheme();
      return;
    }

    if (coords) {
      root.style.setProperty("--x", `${coords.x}px`);
      root.style.setProperty("--y", `${coords.y}px`);
    }

    document.startViewTransition(() => {
      toggleTheme();
    });
  };

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const shineVariant = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: "20, 1000",
      strokeDashoffset: 0,
      filter: "blur(0px)",
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.75,
        ease: "linear",
      },
    },
  };

  const sunPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group/toggle size-8 extend-touch-target"
      onClick={(e) => {
        const coords = e.currentTarget.getBoundingClientRect();
        handleThemeToggleAnimation({
          x: coords.left + coords.width / 2,
          y: coords.top + coords.height / 2,
        });
      }}
      title="Toggle theme"
    >
      <m.svg
        strokeWidth="4"
        strokeLinecap="round"
        width={24}
        height={24}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative size-4.5"
      >
        <m.path
          variants={shineVariant}
          d={moonPath}
          className="top-0 left-0 absolute stroke-blue-100"
          initial="hidden"
          animate={resolvedTheme === "dark" ? "visible" : "hidden"}
        />

        <m.g
          variants={raysVariants}
          initial="hidden"
          animate={resolvedTheme === "light" ? "visible" : "hidden"}
          className="stroke-6 stroke-yellow-600"
          style={{ strokeLinecap: "round" }}
        >
          <m.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <m.path variants={rayVariant} d="M85 15L78 22" />
          <m.path variants={rayVariant} d="M98 50H89" />
          <m.path variants={rayVariant} d="M85 85L78 78" />
          <m.path variants={rayVariant} d="M50 98V89" />
          <m.path variants={rayVariant} d="M23 78L16 84" />
          <m.path variants={rayVariant} d="M11 50H2" />
          <m.path variants={rayVariant} d="M23 23L16 16" />
        </m.g>

        <m.path
          d={sunPath}
          fill="transparent"
          transition={{ duration: 1, type: "spring" }}
          initial={{ fillOpacity: 0, strokeOpacity: 0 }}
          animate={
            resolvedTheme === "dark"
              ? {
                  d: moonPath,
                  rotate: -360,
                  scale: 2,
                  stroke: "var(--color-blue-400)",
                  fill: "var(--color-blue-400)",
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                  transition: { delay: 0.1 },
                }
              : {
                  d: sunPath,
                  rotate: 0,
                  stroke: "var(--color-yellow-600)",
                  fill: "var(--color-yellow-600)",
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                }
          }
        />
      </m.svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
