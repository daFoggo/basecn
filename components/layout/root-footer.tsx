"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { APP_INFO } from "@/lib/configs/app-info";
import AppLogo from "../common/app-logo";

export const RootFooter = () => {
	return (
		<footer className="relative flex flex-col justify-center items-center bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16 border-t w-full">
			<div className="top-0 right-1/2 left-1/2 absolute bg-foreground/20 rounded-full w-1/3 h-px -translate-x-1/2 -translate-y-1/2 blur" />

			<div className="gap-8 xl:gap-8 grid xl:grid-cols-3 w-full">
				<AnimatedContainer className="space-y-4">
					<AppLogo />
					<p className="mt-8 md:mt-2 text-muted-foreground text-sm">
						© {new Date().getFullYear()} {APP_INFO.name}. Developed by
						<a
							href={APP_INFO.authorWebsite || APP_INFO.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline underline-offset-2 transition-all duration-300"
						>
							{" "}
							{APP_INFO.githubAuthor}.
						</a>
					</p>
					{APP_INFO.appVersion && (
						<p className="text-muted-foreground/70 text-xs">
							Version {APP_INFO.appVersion}
						</p>
					)}
				</AnimatedContainer>
			</div>
		</footer>
	);
};

type IViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>["className"];
	children: ReactNode;
};

const AnimatedContainer = ({
	className,
	delay = 0.1,
	children,
}: IViewAnimationProps) => {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
			whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
