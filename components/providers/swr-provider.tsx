"use client";

import { SWRConfig } from "swr";
import { SWR_CONFIG } from "@/lib/configs/swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	return <SWRConfig value={SWR_CONFIG}>{children}</SWRConfig>;
}
