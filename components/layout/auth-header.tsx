"use client";

import AppLogo from "../common/app-logo";
import {
	AnimatedButton,
	ReusableHeader
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { UserMenu } from "../common/user-menu";

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
	return (
		<div className="flex flex-col gap-4">
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
