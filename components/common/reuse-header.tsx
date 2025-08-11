"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	type MouseEvent,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";

interface IReusableHeaderProps {
	leftSection?: ReactNode;
	centerSection?: ReactNode;
	rightSection?: ReactNode;
	mobileMenuContent?: ReactNode;
	className?: string;
	containerClassName?: string;
	height?: string;
	enableScrollEffect?: boolean;
	enableMobileMenu?: boolean;
	stickyHeader?: boolean;
	backdropBlur?: boolean;
	useContainer?: boolean;
	centerVisibleOnMobile?: boolean;
}

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
	centerVisibleOnMobile = false,
}: IReusableHeaderProps) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const barRef = useRef<HTMLDivElement | null>(null);
	const [barHeight, setBarHeight] = useState(0);

	useEffect(() => {
		if (!barRef.current) return;
		const el = barRef.current;
		const update = () => setBarHeight(el.getBoundingClientRect().height);
		update();
		let ro: ResizeObserver | null = null;
		if (typeof ResizeObserver !== "undefined") {
			ro = new ResizeObserver(update);
			ro.observe(el);
		}
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("resize", update);
			if (ro) ro.disconnect();
		};
	}, []);

	const headerClasses = cn(
		"z-50 w-full",
		stickyHeader && "sticky top-0",
		backdropBlur && "backdrop-blur-lg",
		enableScrollEffect
			? "bg-background/90 border-border/20 border-b shadow-sm"
			: "bg-transparent",
		className,
	);

	const containerClasses = cn(
		"mx-auto px-3 md:px-6",
		useContainer ? "container" : "",
		height,
		containerClassName,
	);

	return (
		<header className={headerClasses}>
			<div
				ref={barRef}
				className={cn(
					containerClasses,
					"grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 md:gap-4",
				)}
			>
				<div className="flex justify-start items-center min-w-0">
					{leftSection}
				</div>

				{!centerVisibleOnMobile ? (
					<div className={cn("flex justify-center items-center min-w-0")}>
						{centerSection}
					</div>
				) : (
					<div></div>
				)}

				<div className="flex justify-end items-center gap-2 md:gap-4 min-w-0">
					<div
						className={`${enableMobileMenu ? "hidden md:flex" : "flex"} items-center gap-2 md:gap-4`}
					>
						{rightSection}
					</div>
					{enableMobileMenu && (
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileMenuOpen((v) => !v)}
							aria-expanded={mobileMenuOpen}
							aria-controls="mobile-menu"
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

			{enableMobileMenu && mobileMenuOpen && mobileMenuContent && (
				<motion.div
					id="mobile-menu"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="md:hidden z-40 fixed inset-x-0 bg-background/95 backdrop-blur-lg border-t"
					style={{ top: barHeight }}
				>
					<div className="mx-auto px-3 py-3 container">{mobileMenuContent}</div>
				</motion.div>
			)}
		</header>
	);
};

// Mobile Menu Hook
export const useMobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);
	const open = () => setIsOpen(true);
	return { isOpen, toggle, close, open };
};

// Animated Navigation Item
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
		if (!url) return false;
		try {
			return pathName === url || pathName.startsWith(url);
		} catch {
			return false;
		}
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

// Animated Button
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
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.25, delay }}
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
