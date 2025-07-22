"use client";

import { LibraryBig } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "../ui/separator";
import { AppLogo } from "./app-logo";
import HeaderUtilityButtons from "./header-utility-buttons";
import { ReuseHeader } from "./reuse-header";
import UserMenu from "./user-menu";

interface ITab {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const AppHeader = () => {
  return (
    <ReuseHeader
      wrapByContainer={false}
      leftSection={<LeftSection />}
      rightSection={<RightSection />}
      containerClassName="border-b"
    />
  );
};

export default AppHeader;

const NavigationTab = () => {
  const pathname = usePathname();
  const TABS: ITab[] = [
    {
      label: "Danh sách bài tập",
      href: "/exercises",
      icon: <LibraryBig className="size-4" />,
    },
  ];

  const isCurrentTab = (tab: ITab) => {
    return pathname.startsWith(tab.href) || pathname === tab.href;
  };

  return (
    <>
      {TABS.map((tab, index) => (
        <Link
          href={tab.href}
          key={index}
          className={`font-medium text-sm ${
            isCurrentTab(tab)
              ? "text-primary"
              : "text-muted-foreground hover:text-primary/70"
          }`}
        >
          <div className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </div>
        </Link>
      ))}
    </>
  );
};

const LeftSection = () => {
  return (
    <div className="flex items-center gap-6">
      <AppLogo />
      <Separator
        orientation="vertical"
        className="bg-muted-foreground min-h-4"
      />
      <NavigationTab />
    </div>
  );
};

const RightSection = () => {
  return (
    <div className="flex items-center gap-3">
      <HeaderUtilityButtons showThemeSwitcher showGithubButton />
      <UserMenu />
    </div>
  );
};
