"use client";

import { cn } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderActionButtons from "./header-action-buttons";
import { APP_CONFIG } from "@/lib/config/app";

export const NoNavHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
            <span>{APP_CONFIG.name}</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <HeaderActionButtons showNavigationButton={false} />
        </div>
      </div>
    </header>
  );
};
