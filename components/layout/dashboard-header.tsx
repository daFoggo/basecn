"use client";

import { SIDEBAR_NAVIGATION } from "@/lib/configs/sidebar-navigation";
import { useBreadcrumb } from "@/lib/hooks/use-breadcrumb";
import { CustomSidebarTrigger } from "../common/custom-sidebar-trigger";
import {
    AnimatedButton,
    ReusableHeader
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { UserMenu } from "../common/user-menu";
import { Separator } from "../ui/separator";
import { BreadcrumbNav } from "./breadcrumb-navigation";

const HeaderLeftSection = () => {
    const breadcrumbItems = useBreadcrumb(SIDEBAR_NAVIGATION);

    return (
        <div className="flex items-center gap-4">
            <CustomSidebarTrigger />
            <Separator className="min-h-6" orientation="vertical" />
            <BreadcrumbNav
                items={breadcrumbItems}
                className="hidden md:flex"
                maxItems={4}
            />
        </div>
    );
};

const HeaderRightSection = () => {
    return (
        <>
            <AnimatedButton variant="ghost" delay={0.4} asChild>
                <ThemeSwitcher />
            </AnimatedButton>

            <AnimatedButton
                delay={0.5}
                className="rounded-full font-medium hover:scale-105 transition-transform cursor-pointer"
                asChild
            >
                <UserMenu />
            </AnimatedButton>
        </>
    );
};

const HeaderMobileMenuContent = () => {
    const breadcrumbItems = useBreadcrumb(SIDEBAR_NAVIGATION);

    return (
        <div className="flex flex-col gap-4">
            {/* Mobile breadcrumb */}
            <div className="px-1">
                <BreadcrumbNav
                    items={breadcrumbItems}
                    maxItems={3}
                />
            </div>

            <div className="mt-2 pt-2 border-t border-border/30">
                <UserMenu shouldShowGoToApp />
            </div>
        </div>
    );
};

export const DashboardHeader = () => {
    return (
        <ReusableHeader
            leftSection={<HeaderLeftSection />}
            rightSection={<HeaderRightSection />}
            mobileMenuContent={<HeaderMobileMenuContent />}
            enableScrollEffect={true}
            enableMobileMenu={true}
            stickyHeader={true}
            backdropBlur={true}
            useContainer={false}
            containerClassName="border-b bg-sidebar border-sidebar-border"
        />
    );
};