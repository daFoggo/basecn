"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { type ComponentProps, type ComponentRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/tailwind";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export const CustomSidebarTrigger = forwardRef<
	ComponentRef<typeof Button>,
	ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar, state } = useSidebar();
	const isExpanded = state === "expanded";

	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
			className="h-fit leading-none"
		>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							ref={ref}
							data-sidebar="trigger"
							variant="ghost"
							size="icon"
							className={cn("relative size-7 overflow-hidden", className)}
							onClick={(event) => {
								onClick?.(event);
								toggleSidebar();
							}}
							{...props}
						>
							<div className="relative flex justify-center items-center w-full h-full">
								<AnimatePresence mode="wait" initial={false}>
									{isExpanded ? (
										<motion.div
											key="close"
											initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
											animate={{
												opacity: 1,
												scale: 1,
												rotate: 0,
												transition: {
													duration: 0.3,
													ease: [0.4, 0, 0.2, 1],
												},
											}}
											exit={{
												opacity: 0,
												scale: 0.8,
												rotate: 90,
												transition: {
													duration: 0.2,
													ease: [0.4, 0, 1, 1],
												},
											}}
											className="absolute"
										>
											<PanelLeftClose className="size-4" />
										</motion.div>
									) : (
										<motion.div
											key="open"
											initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
											animate={{
												opacity: 1,
												scale: 1,
												rotate: 0,
												transition: {
													duration: 0.3,
													ease: [0.4, 0, 0.2, 1],
												},
											}}
											exit={{
												opacity: 0,
												scale: 0.8,
												rotate: 90,
												transition: {
													duration: 0.2,
													ease: [0.4, 0, 1, 1],
												},
											}}
											className="absolute"
										>
											<PanelLeftOpen className="size-4" />
										</motion.div>
									)}
								</AnimatePresence>
							</div>
							<span className="sr-only">Toggle Sidebar</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent  align="start">
						{isExpanded ? "Close Sidebar (⌘ + b)" : "Open Sidebar (⌘ + b)"}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</motion.div>
	);
});

CustomSidebarTrigger.displayName = "CustomSidebarTrigger";
