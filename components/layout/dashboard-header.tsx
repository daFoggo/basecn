"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { memo } from "react";
import { SIDEBAR_NAVIGATION } from "@/lib/configs/sidebar-navigation";
import { useBreadcrumb } from "@/lib/hooks/use-breadcrumb";
import { CustomSidebarTrigger } from "../common/custom-sidebar-trigger";
import { ReusableHeader } from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { BreadcrumbNav } from "./breadcrumb-navigation";

const HeaderLeftSection = memo(() => {
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
});
HeaderLeftSection.displayName = "HeaderLeftSection";

const HeaderRightSection = memo(
	({
		isSignedIn,
		isLoaded,
		userId,
		sessionId,
	}: {
		isSignedIn: boolean | undefined;
		isLoaded: boolean | undefined;
		userId: string | null | undefined;
		sessionId: string | null | undefined;
	}) => {
		return (
			<div className="flex items-center gap-2 md:gap-4">
				<ThemeSwitcher />

				{!isLoaded ? null : !isSignedIn ? (
					<SignInButton />
				) : userId && sessionId ? (
					<UserButton />
				) : (
					<Skeleton className="rounded-full size-12" />
				)}
			</div>
		);
	},
);
HeaderRightSection.displayName = "HeaderRightSection";

const HeaderMobileMenuContent = memo(
	({
		isSignedIn,
		isLoaded,
		userId,
		sessionId,
	}: {
		isSignedIn: boolean | undefined;
		isLoaded: boolean | undefined;
		userId: string | null | undefined;
		sessionId: string | null | undefined;
	}) => {
		const breadcrumbItems = useBreadcrumb(SIDEBAR_NAVIGATION);

		return (
			<div className="flex flex-col gap-4">
				{/* Mobile breadcrumb */}
				<div className="px-1">
					<BreadcrumbNav items={breadcrumbItems} maxItems={3} />
				</div>

				<div className="mt-2 pt-2 border-t border-border/30">
					{!isLoaded ? null : !isSignedIn ? (
						<SignInButton />
					) : userId && sessionId ? (
						<UserButton />
					) : (
						<Skeleton className="rounded-full size-12" />
					)}
				</div>
			</div>
		);
	},
);
HeaderMobileMenuContent.displayName = "HeaderMobileMenuContent";

export const DashboardHeader = memo(() => {
	const { isSignedIn, userId, sessionId, isLoaded } = useAuth();
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			rightSection={
				<HeaderRightSection
					isSignedIn={isSignedIn}
					isLoaded={isLoaded}
					userId={userId}
					sessionId={sessionId}
				/>
			}
			mobileMenuContent={
				<HeaderMobileMenuContent
					isSignedIn={isSignedIn}
					isLoaded={isLoaded}
					userId={userId}
					sessionId={sessionId}
				/>
			}
			enableScrollEffect={false}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
			useContainer={false}
			containerClassName="border-b bg-sidebar border-sidebar-border"
		/>
	);
});
DashboardHeader.displayName = "DashboardHeader";
