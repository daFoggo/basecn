"use client";

import {
	AlertTriangle,
	Bug,
	Check,
	Copy,
	Home,
	Lock,
	Mail,
	Server,
	Wifi,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_INFO } from "@/lib/configs/app-info";

interface IErrorPageProps {
	errorCode: number;
	title?: string;
	description?: string;
	errorDetails?: string;
	errorStack?: string;
	showHomeButton?: boolean;
	showContactButton?: boolean;
	contactEmail?: string;
	contactUrl?: string;
	className?: string;
}

const ERROR_CONFIG = {
	400: {
		icon: AlertTriangle,
		title: "Bad Request",
		description: "The request could not be understood by the server.",
		color: "text-orange-500",
		bgColor: "bg-orange-50 dark:bg-orange-950/20",
	},
	401: {
		icon: Lock,
		title: "Unauthorized",
		description: "You need to sign in to access this page.",
		color: "text-red-500",
		bgColor: "bg-red-50 dark:bg-red-950/20",
	},
	403: {
		icon: Lock,
		title: "Forbidden",
		description: "You don't have permission to access this resource.",
		color: "text-red-500",
		bgColor: "bg-red-50 dark:bg-red-950/20",
	},
	404: {
		icon: AlertTriangle,
		title: "Page Not Found",
		description: "The page you're looking for doesn't exist or has been moved.",
		color: "text-blue-500",
		bgColor: "bg-blue-50 dark:bg-blue-950/20",
	},
	500: {
		icon: Server,
		title: "Internal Server Error",
		description: "Something went wrong on our end. Please try again later.",
		color: "text-red-500",
		bgColor: "bg-red-50 dark:bg-red-950/20",
	},
	502: {
		icon: Server,
		title: "Bad Gateway",
		description:
			"The server received an invalid response from the upstream server.",
		color: "text-red-500",
		bgColor: "bg-red-50 dark:bg-red-950/20",
	},
	503: {
		icon: Server,
		title: "Service Unavailable",
		description:
			"The server is temporarily unavailable. Please try again later.",
		color: "text-yellow-500",
		bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
	},
	504: {
		icon: Wifi,
		title: "Gateway Timeout",
		description: "The server took too long to respond. Please try again.",
		color: "text-yellow-500",
		bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
	},
};

export function ErrorPage({
	errorCode,
	title,
	description,
	errorDetails,
	errorStack,
	showHomeButton = true,
	showContactButton = true,
	contactEmail = APP_INFO.contactEmail,
	contactUrl,
	className = "",
}: IErrorPageProps) {
	const [copied, setCopied] = useState(false);
	const config =
		ERROR_CONFIG[errorCode as keyof typeof ERROR_CONFIG] || ERROR_CONFIG[500];
	const IconComponent = config.icon;

	const copyErrorDetails = async () => {
		const errorInfo = `Error ${errorCode}: ${title || config.title}\n\nDetails: ${errorDetails || "No details available"}\n\nStack Trace:\n${errorStack || "No stack trace available"}`;
		try {
			await navigator.clipboard.writeText(errorInfo);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy error details:", err);
		}
	};

	const hasErrorInfo = errorDetails || errorStack;

	return (
		<div
			className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20 ${className}`}
		>
			<div className="space-y-6 w-full max-w-2xl">
				{/* Main Error Card */}
				<Card className="bg-card/95 supports-[backdrop-filter]:bg-card/60 shadow-lg backdrop-blur border-0">
					<CardContent className="pt-8 pb-6">
						<div className="flex flex-col items-center space-y-6 text-center">
			
							<div
								className={`p-6 rounded-full ${config.bgColor} ${config.color}`}
							>
								<IconComponent className="w-16 sm:w-20 h-16 sm:h-20" />
							</div>
					
							<div className="space-y-3">
								<h1 className="font-bold text-muted-foreground/80 text-7xl sm:text-8xl tracking-tight">
									{errorCode}
								</h1>
								<h2 className="font-semibold text-foreground text-2xl sm:text-3xl">
									{title || config.title}
								</h2>
							</div>
						
							<p className="max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
								{description || config.description}
							</p>
					
							<div className="flex sm:flex-row flex-col gap-4 pt-2 w-full max-w-sm">
								{showHomeButton && (
									<Button asChild className="flex-1 h-11 font-medium text-base">
										<Link href="/">
											<Home className="mr-2 size-4" />
											Go Home
										</Link>
									</Button>
								)}
								{showContactButton && (
									<Button
										variant="outline"
										asChild
										className="flex-1 bg-transparent hover:bg-muted h-11 font-medium text-base"
									>
										<Link href={contactUrl || `mailto:${contactEmail}`}>
											<Mail className="mr-2 size-4" />
											Contact Admin
										</Link>
									</Button>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
		
        
				{hasErrorInfo && (
					<Card className="bg-card/95 supports-[backdrop-filter]:bg-card/60 shadow-lg backdrop-blur border-0">
						<CardContent className="p-0">
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="error-details" className="border-none">
									<AccordionTrigger className="hover:bg-muted/50 px-6 py-4 rounded-t-lg hover:no-underline">
										<div className="flex items-center gap-2 text-left">
											<Bug className="size-4 text-muted-foreground" />
											<span className="font-medium">Technical Details</span>
											<span className="ml-2 text-muted-foreground text-xs">
												(for developers)
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="px-6 pb-6">
										<div className="space-y-4">
											<Alert className="bg-destructive/5 border-destructive/20">
												<AlertTriangle className="size-4 text-destructive" />
												<AlertDescription className="text-sm">
													<strong>Error Information:</strong> This section
													contains technical details that may help developers
													diagnose the issue.
												</AlertDescription>
											</Alert>
											{errorDetails && (
												<div className="space-y-2">
													<div className="flex justify-between items-center">
														<h4 className="font-medium text-foreground text-sm">
															Error Details:
														</h4>
														<Button
															variant="ghost"
															size="sm"
															onClick={copyErrorDetails}
															className="px-2 h-8"
														>
															{copied ? (
																<Check className="size-3 text-green-500" />
															) : (
																<Copy className="size-3" />
															)}
															<span className="ml-1 text-xs">
																{copied ? "Copied!" : "Copy"}
															</span>
														</Button>
													</div>
													<div className="bg-muted/50 p-3 rounded-md overflow-x-auto font-mono text-muted-foreground text-xs">
														{errorDetails}
													</div>
												</div>
											)}
											{errorStack && (
												<div className="space-y-2">
													<h4 className="font-medium text-foreground text-sm">
														Stack Trace:
													</h4>
													<div className="bg-muted/50 p-3 rounded-md max-h-40 overflow-x-auto overflow-y-auto font-mono text-muted-foreground text-xs">
														<pre className="break-words whitespace-pre-wrap">
															{errorStack}
														</pre>
													</div>
												</div>
											)}
											<div className="pt-2 border-t text-muted-foreground text-xs">
												<p>
													💡 <strong>Tip:</strong> You can copy this information
													and share it with the development team to help resolve
													the issue faster.
												</p>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
