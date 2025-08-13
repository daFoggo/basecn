"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Link from "next/dist/client/link";
import AppLogo from "../common/app-logo";
import GithubStat from "../common/github-stat";
import {
	AnimatedButton,
	AnimatedNavItem,
	ReusableHeader,
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";

const navbarItems = [
	{ label: "Features", href: "#features" },
	{ label: "Document", href: "/document" },
];

const HeaderLeftSection = () => {
	return <AppLogo />;
};

const HeaderCenterSection = () => {
	const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const targetId = e.currentTarget.getAttribute("href")?.slice(1);
		if (!targetId) return;

		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<nav className="flex items-center gap-4 lg:gap-6">
			{navbarItems.map((item, i) => (
				<AnimatedNavItem
					key={item.label}
					href={item.href}
					delay={0.1 + i * 0.05}
					onClick={
						item.href.startsWith("#") ? handleScrollToSection : undefined
					}
				>
					{item.label}
				</AnimatedNavItem>
			))}
		</nav>
	);
};

// Component cho Right Section
const HeaderRightSection = ({
	isSignedIn,
	userId,
	sessionId,
}: {
	isSignedIn: boolean | undefined;
	userId: string | null | undefined;
	sessionId: string | null | undefined;
}) => {
	return (
		<>
			<AnimatedButton variant="ghost" delay={0.45} asChild>
				<GithubStat />
			</AnimatedButton>

			<AnimatedButton variant="ghost" delay={0.4} asChild>
				<ThemeSwitcher />
			</AnimatedButton>

			<AnimatedButton
				delay={0.5}
				className="rounded-full font-medium hover:scale-105 transition-transform cursor-pointer"
				asChild
			>
				{!isSignedIn ? <SignInButton /> :
					(userId && sessionId ? (
						<Link href="/dashboard">
							Go to App
							<ChevronRight className="ml-2 size-4" />
						</Link>
					) : null)}
			</AnimatedButton>
		</>
	);
};

const HeaderMobileMenuContent = ({
	isSignedIn,
	userId,
	sessionId,
}: {
	isSignedIn: boolean | undefined;
	userId: string | null | undefined;
	sessionId: string | null | undefined;
}) => {
	const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const targetId = e.currentTarget.getAttribute("href")?.slice(1);
		if (!targetId) return;

		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{navbarItems.map((item, i) => (
				<AnimatedNavItem
					key={item.label}
					href={item.href}
					delay={i * 0.05}
					onClick={handleScrollToSection}
					className="py-2 text-sm"
				>
					{item.label}
				</AnimatedNavItem>
			))}

			<div className="mt-2 pt-2 border-t border-border/30">
				{!isSignedIn ? <SignInButton /> :
					(userId && sessionId ? (
						<Link href="/dashboard">
							Go to App
							<ChevronRight className="ml-2 size-4" />
						</Link>
					) : null)}
			</div>
		</div>
	);
};

export const RootHeader = () => {
	const { isSignedIn, userId, sessionId } = useAuth();
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			centerSection={<HeaderCenterSection />}
			rightSection={
				<HeaderRightSection
					isSignedIn={isSignedIn}
					userId={userId}
					sessionId={sessionId}
				/>
			}
			mobileMenuContent={
				<HeaderMobileMenuContent
					isSignedIn={isSignedIn}
					userId={userId}
					sessionId={sessionId}
				/>
			}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
		/>
	);
};
