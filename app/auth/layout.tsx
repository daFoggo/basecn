import type { ReactNode } from "react";
import { AuthHeader } from "@/components/layout/auth-header";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background min-h-[100dvh] text-foreground">
			<AuthHeader />
			<main className="flex-1 w-full">{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default AuthLayout;
