"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";

interface IReusableHeaderProps {
	// components for different sections
	leftSection?: ReactNode;
	centerSection?: ReactNode;
	rightSection?: ReactNode;

	// content for mobile menu
	mobileMenuContent?: ReactNode;

	// additional styling and behavior
	className?: string;
	containerClassName?: string;
	height?: string;

	// options for header behavior
	enableScrollEffect?: boolean;
	enableMobileMenu?: boolean;
	stickyHeader?: boolean;
	backdropBlur?: boolean;
	useContainer?: boolean;
}

// #region Main Layout
export const ReusableHeader = ({
	leftSection,
	centerSection,
	rightSection,
	mobileMenuContent,
	className,
	containerClassName,
	height = "h-16",
	enableScrollEffect = true,
	enableMobileMenu = true,
	stickyHeader = true,
	backdropBlur = true,
	useContainer = true,
}: IReusableHeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (!enableScrollEffect) return;

		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [enableScrollEffect]);

	const headerClasses = cn(
		"z-50 w-full",
		stickyHeader && "sticky top-0",
		backdropBlur && "backdrop-blur-lg",
		enableScrollEffect && isScrolled
			? "bg-background/90 border-border/20 border-b shadow-xs"
			: "bg-transparent",
		className,
	);

	const containerClasses = cn(
		"flex justify-between items-center mx-auto px-3 md:px-6",
		useContainer ? "container" : "",
		height,
		containerClassName,
	);

	return (
		<header className={headerClasses}>
			<div className={containerClasses}>
				{/* Left Section */}
				<div className="flex items-center">{leftSection}</div>

				{/* Center Section - Hidden on mobile if mobile menu is enabled */}
				{centerSection && (
					<div
						className={cn(
							"flex items-center",
							enableMobileMenu && "hidden md:flex",
						)}
					>
						{centerSection}
					</div>
				)}

				{/* Right Section */}
				<div className="flex items-center gap-2 md:gap-4">
					<div
						className={cn(
							"flex items-center gap-2 md:gap-4",
							enableMobileMenu && "hidden md:flex",
						)}
					>
						{rightSection}
					</div>

					{/* Mobile menu toggle */}
					{enableMobileMenu && (
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? (
								<X className="size-5" />
							) : (
								<Menu className="size-5" />
							)}
							<span className="sr-only">Toggle menu</span>
						</Button>
					)}
				</div>
			</div>

			{/* Mobile Menu */}
			{enableMobileMenu && mobileMenuOpen && mobileMenuContent && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="md:hidden absolute inset-x-0 bg-background/95 backdrop-blur-lg border-b"
					style={{ top: height === "h-16" ? "4rem" : "auto" }}
				>
					<div className="mx-auto px-3 py-3 container">{mobileMenuContent}</div>
				</motion.div>
			)}
		</header>
	);
};
// #endregion

// #region Mobile Menu Hook
export const useMobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);
	const open = () => setIsOpen(true);

	return { isOpen, toggle, close, open };
};
// #endregion

// #region Animated Navigation Item
// ( using for center section and mobile menu )
interface INavItemProps {
	children: ReactNode;
	href?: string;
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
	className?: string;
	delay?: number;
}

export const AnimatedNavItem = ({
	children,
	href,
	onClick,
	className,
	delay = 0,
}: INavItemProps) => {
	const pathName = usePathname();

	const isCurrentPath = (url: string) => {
		return pathName.startsWith(url) || pathName === url;
	};

	return (
		<motion.a
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay }}
			href={href}
			onClick={onClick}
			className={cn(
				"group relative font-medium text-muted-foreground hover:text-primary text-xs lg:text-sm transition-colors",
				isCurrentPath(href || "") && "text-primary font-semibold",
				className,
			)}
		>
			{children}
			<span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
		</motion.a>
	);
};
// #endregion

// #region Animated Button Component
// (using for right section and mobile button menu)
interface IAnimatedButtonProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	onClick?: () => void;
	variant?: "default" | "ghost" | "outline";
	asChild?: boolean;
}

export const AnimatedButton = ({
	children,
	className,
	delay = 0,
	onClick,
	variant = "default",
	asChild = false,
}: IAnimatedButtonProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3, delay }}
		>
			<Button
				variant={variant}
				className={className}
				onClick={onClick}
				asChild={asChild}
			>
				{children}
			</Button>
		</motion.div>
	);
};
