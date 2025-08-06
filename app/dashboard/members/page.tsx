"use client";
import { Suspense } from "react";
import { PageLoading } from "@/components/common/page-loading";
import { Members } from "@/features/members";

const MembersPage = () => {
	return (
		<Suspense
			fallback={<PageLoading variant="dots" text="Loading members page..." />}
		>
			<Members />
		</Suspense>
	);
};

export default MembersPage;
