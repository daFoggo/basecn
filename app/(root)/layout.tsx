import type { ReactNode } from "react";
import { RootHeader } from "@/components/layout/root-header";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background min-h-[100dvh] text-foreground">
			<RootHeader />
			<main className="flex-1 w-full">{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default RootLayout;
