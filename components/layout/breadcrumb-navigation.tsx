"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { IBreadcrumbItem } from "@/lib/types/navigation";

interface IBreadcrumbNavProps {
	items: IBreadcrumbItem[];
	className?: string;
	maxItems?: number;
}

export const BreadcrumbNav = ({
	items,
	className,
	maxItems = 5,
}: IBreadcrumbNavProps) => {
	if (!items.length) return null;

	// Truncate items if too many
	const displayItems =
		items.length > maxItems
			? [items[0], { title: "...", url: undefined }, ...items.slice(-2)]
			: items;

	return (
		<Breadcrumb className={className}>
			<BreadcrumbList>
				{displayItems.map((item, index) => (
					<Fragment key={`${item.title}-${index}`}>
						<BreadcrumbItem>
							{item.isCurrentPage || !item.url ? (
								<BreadcrumbPage className="flex items-center gap-2 font-semibold">
									<span>{item.title}</span>
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={item.url} className="flex items-center gap-2 font-semibold">
										<span>{item.title}</span>
									</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < displayItems.length - 1 && (
							<BreadcrumbSeparator>
								<ChevronRight className="size-4" />
							</BreadcrumbSeparator>
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
