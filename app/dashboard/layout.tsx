"use client";

import type { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background min-h-[100dvh] text-foreground">
			<main className="flex-1 w-full">{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

// export default withAuth(DashboardLayout); // update when auth is implemented
export default DashboardLayout;
