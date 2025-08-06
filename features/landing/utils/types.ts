import type { ReactNode } from "react";

export interface ITechStack {
	id: string;
	icon: ReactNode;
	name: string;
	description: string;
	link: string;
}

export interface IFeature {
	icon: ReactNode;
	name: string;
	description: string;
}
