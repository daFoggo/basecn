import type { ReactNode } from "react";

// sử dụng khi cần chuyển đổi từ các enum ra giao diện
export interface IDataMappingConfig {
	label: string;
	icon?: ReactNode;
	color?: string;
	bgColor?: string;
	borderColor?: string;
}
