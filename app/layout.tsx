import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SWRProvider } from "@/components/providers/swr-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/features/auth";
import { APP_INFO } from "@/lib/configs/app-info";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const sourceSerif4 = Source_Serif_4({
	variable: "--font-source-serif-4",
	subsets: ["latin"],
});

// const inter = Inter({
// 	variable: "--font-inter",
// 	subsets: ["latin"],
// });

// const lora = Lora({
// 	variable: "--font-lora",
// 	subsets: ["latin"],
// });

// const jetbrainsMono = JetBrains_Mono({
// 	variable: "--font-jetbrains-mono",
// 	subsets: ["latin"],
// });

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
				className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif4.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NuqsAdapter>
						<SWRProvider>
							<AuthProvider>
								<TooltipProvider delayDuration={0} skipDelayDuration={100}>
									{children}
								</TooltipProvider>
							</AuthProvider>
						</SWRProvider>
					</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
}
