"use client";

import type { Column, Table } from "@tanstack/react-table";
import { RotateCcw } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { DataTableDateFilter } from "./data-table-date-filter";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableSliderFilter } from "./data-table-slider-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> extends ComponentProps<"div"> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Group columns by variant type for logical ordering,
  // but prevent visual clustering/borders as per user request.
  const { textColumns, selectColumns, advancedColumns } = useMemo(() => {
    const cols = table.getAllColumns().filter((col) => col.getCanFilter());
    const text: typeof cols = [];
    const select: typeof cols = [];
    const advanced: typeof cols = [];

    for (const col of cols) {
      const v = col.columnDef.meta?.variant;
      if (v === "text") {
        text.push(col);
      } else if (v === "select" || v === "multiSelect") {
        select.push(col);
      } else {
        advanced.push(col);
      }
    }

    return {
      textColumns: text,
      selectColumns: select,
      advancedColumns: advanced,
    };
  }, [table]);

  const onReset = useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Render filters in logical groups but continuously (flat layout) */}
        {textColumns.map((col) => (
          <DataTableToolbarFilter key={col.id} column={col} />
        ))}
        {selectColumns.map((col) => (
          <DataTableToolbarFilter key={col.id} column={col} />
        ))}
        {advancedColumns.map((col) => (
          <DataTableToolbarFilter key={col.id} column={col} />
        ))}

        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed px-2 lg:px-3"
            onClick={onReset}
          >
            <RotateCcw className="mr-2 size-3.5" />
            Reset filters
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} align="end" />
      </div>
    </div>
  );
}

// ─── Filter Renderer ──────────────────────────────────────────────────────────

interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  const columnMeta = column.columnDef.meta;
  // const filterValue = column.getFilterValue();

  if (!columnMeta?.variant) return null;

  switch (columnMeta.variant) {
    case "text":
      return (
        <DataTableToolbarInput
          column={column}
          className="h-8 w-40 lg:w-48"
          placeholder={columnMeta.placeholder ?? columnMeta.label}
        />
      );

    case "number":
      return (
        <DataTableToolbarInput
          column={column}
          type="number"
          className="h-8 w-32"
          placeholder={columnMeta.placeholder ?? columnMeta.label}
          unit={columnMeta.unit}
        />
      );

    case "range":
      return (
        <DataTableSliderFilter
          column={column}
          title={columnMeta.label ?? column.id}
        />
      );

    case "date":
    case "dateRange":
      return (
        <DataTableDateFilter
          column={column}
          title={columnMeta.label ?? column.id}
          multiple={columnMeta.variant === "dateRange"}
        />
      );

    case "select":
    case "multiSelect":
      return (
        <DataTableFacetedFilter
          column={column}
          title={columnMeta.label ?? column.id}
          options={columnMeta.options ?? []}
          multiple={columnMeta.variant === "multiSelect"}
        />
      );

    default:
      return null;
  }
}

// ─── Input Renderer (Debounced) ────────────────────────────────────────────────

interface DataTableToolbarInputProps<TData> extends Omit<
  ComponentProps<typeof InputGroupInput>,
  "value" | "onChange"
> {
  column: Column<TData>;
  unit?: string;
  debounceMs?: number;
}

function DataTableToolbarInput<TData>({
  column,
  unit,
  className,
  type = "text",
  debounceMs = 300,
  ...props
}: DataTableToolbarInputProps<TData>) {
  const filterValue = (column.getFilterValue() as string) ?? "";
  const [value, setValue] = useState(filterValue);

  // Sync local state with column filter value
  useEffect(() => {
    setValue(filterValue);
  }, [filterValue]); // React to external changes (e.g. Reset)

  const debouncedSetFilter = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (val: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        column.setFilterValue(val);
      }, debounceMs);
    };
  }, [column, debounceMs]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedSetFilter(newValue);
  };

  return (
    <InputGroup className={cn(className)}>
      <InputGroupInput
        type={type}
        inputMode={type === "number" ? "numeric" : undefined}
        value={value}
        onChange={onChange}
        className="text-sm"
        {...props}
      />
      {unit && (
        <InputGroupAddon align="inline-end">
          <InputGroupText>{unit}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
