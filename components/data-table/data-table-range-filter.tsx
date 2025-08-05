"use client";

import type { Column } from "@tanstack/react-table";
import * as React from "react";

import { Input } from "@/components/ui/input";
import type { ExtendedColumnFilter } from "@/lib/types/data-table";
import { cn } from "@/lib/utils/tailwind";

interface DataTableRangeFilterProps<TData> extends React.ComponentProps<"div"> {
	filter: ExtendedColumnFilter<TData>;
	column: Column<TData>;
	inputId: string;
	onFilterUpdate: (
		filterId: string,
		updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>,
	) => void;
}

export function DataTableRangeFilter<TData>({
	filter,
	column,
	inputId,
	onFilterUpdate,
	className,
	...props
}: DataTableRangeFilterProps<TData>) {
	const meta = column.columnDef.meta;

	const [min, max] = React.useMemo(() => {
		const range = column.columnDef.meta?.range;
		if (range) return range;

		const values = column.getFacetedMinMaxValues();
		if (!values) return [0, 100];

		return [values[0], values[1]];
	}, [column]);

	const formatValue = React.useCallback(
		(value: string | number | undefined) => {
			if (value === undefined || value === "") return "";
			const numValue = Number(value);
			return Number.isNaN(numValue)
				? ""
				: numValue.toLocaleString(undefined, {
						maximumFractionDigits: 0,
					});
		},
		[],
	);

	const value = React.useMemo(() => {
		if (Array.isArray(filter.value)) return filter.value.map(formatValue);
		return [formatValue(filter.value), ""];
	}, [filter.value, formatValue]);

	const onRangeValueChange = React.useCallback(
		(value: string, isMin?: boolean) => {
			const numValue = Number(value);
			const currentValues = Array.isArray(filter.value)
				? filter.value
				: ["", ""];
			const otherValue = isMin
				? (currentValues[1] ?? "")
				: (currentValues[0] ?? "");

			if (
				value === "" ||
				(!Number.isNaN(numValue) &&
					(isMin
						? numValue >= min && numValue <= (Number(otherValue) || max)
						: numValue <= max && numValue >= (Number(otherValue) || min)))
			) {
				onFilterUpdate(filter.filterId, {
					value: isMin ? [value, otherValue] : [otherValue, value],
				});
			}
		},
		[filter.filterId, filter.value, min, max, onFilterUpdate],
	);

	return (
		<div
			data-slot="range"
			className={cn("flex items-center gap-2 w-full", className)}
			{...props}
		>
			<Input
				id={`${inputId}-min`}
				type="number"
				aria-label={`${meta?.label} minimum value`}
				aria-valuemin={min}
				aria-valuemax={max}
				data-slot="range-min"
				inputMode="numeric"
				placeholder={min.toString()}
				min={min}
				max={max}
				className="rounded w-full h-8"
				defaultValue={value[0]}
				onChange={(event) => onRangeValueChange(event.target.value, true)}
			/>
			<span className="sr-only text-muted-foreground shrink-0">to</span>
			<Input
				id={`${inputId}-max`}
				type="number"
				aria-label={`${meta?.label} maximum value`}
				aria-valuemin={min}
				aria-valuemax={max}
				data-slot="range-max"
				inputMode="numeric"
				placeholder={max.toString()}
				min={min}
				max={max}
				className="rounded w-full h-8"
				defaultValue={value[1]}
				onChange={(event) => onRangeValueChange(event.target.value)}
			/>
		</div>
	);
}
