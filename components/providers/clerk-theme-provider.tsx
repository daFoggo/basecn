"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

interface ClerkThemeProviderProps {
	children: ReactNode;
}

export function ClerkThemeProvider({ children }: ClerkThemeProviderProps) {
	const { resolvedTheme } = useTheme();

	// FORCE CLERK TO USE NEXTJS THEME
	return (
		<ClerkProvider
			appearance={{
				baseTheme: resolvedTheme === "dark" ? dark : undefined,
			}}
		>
			{children}
		</ClerkProvider>
	);
}
