import { Suspense } from "react";
import { PageLoading } from "@/components/common/page-loading";
import { RegisterForm } from "@/features/auth";

const RegisterPage = () => {
	return (
		<Suspense fallback={<PageLoading variant="dots" text="Loading page..." />}>
			<div className="flex flex-col justify-center items-center px-4 h-[calc(100dvh-4rem)]">
				<div className="w-full max-w-sm md:max-w-3xl">
					<RegisterForm />
				</div>
			</div>
		</Suspense>
	);
};

export default RegisterPage;
