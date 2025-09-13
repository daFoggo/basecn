import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkThemeProvider } from "@/components/providers/clerk-theme-provider";
import { SWRProvider } from "@/components/providers/swr-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_INFO } from "@/lib/configs/app-info";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { ppEditorial } from "@/lib/utils/fonts";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: APP_INFO.name,
	description: APP_INFO.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${ppEditorial.variable} antialiased`}
			>
				<NextTopLoader showSpinner={false} />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NuqsAdapter>
						<SWRProvider>
							<ClerkThemeProvider>
								<ClerkProvider>
									<TooltipProvider delayDuration={0} skipDelayDuration={100}>
										{children}
									</TooltipProvider>
								</ClerkProvider>
							</ClerkThemeProvider>
						</SWRProvider>
					</NuqsAdapter>
				</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
