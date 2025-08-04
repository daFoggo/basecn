"use client";

import AppLogo from "../common/app-logo";
import {
	AnimatedButton,
	AnimatedNavItem,
	ReusableHeader,
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { UserMenu } from "../common/user-menu";

const navbarItems = [
	{ label: "Features", href: "#features" },
	{ label: "Document", href: "/document" },
];

const HeaderLeftSection = () => {
	return <AppLogo />;
};

// Component cho Right Section
const HeaderRightSection = () => {
	return (
		<AnimatedButton variant="ghost" delay={0.4} asChild>
			<ThemeSwitcher />
		</AnimatedButton>
	);
};

const HeaderMobileMenuContent = () => {
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
				<UserMenu shouldShowGoToApp />
			</div>
		</div>
	);
};

export const AuthHeader = () => {
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			rightSection={<HeaderRightSection />}
			mobileMenuContent={<HeaderMobileMenuContent />}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
			containerClassName=""
		/>
	);
};
