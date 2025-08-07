import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCommonPinningStyles } from "@/lib/utils/data-table";
import { cn } from "@/lib/utils/tailwind";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  onRowClick,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex flex-col gap-2.5 w-full overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...getCommonPinningStyles({ column: header.column }),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    "group transition-colors",
                    onRowClick && "cursor-pointer",
                    row.getIsSelected() && "bg-muted",
                    onRowClick && "hover:bg-muted/50"
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const pinningStyles = getCommonPinningStyles({
                      column: cell.column,
                    });

                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...pinningStyles,
                          background: "transparent",
                        }}
                        className={cn(
                          // Apply background cho cell thay vì dùng inline style
                          pinningStyles.background &&
                          "[--cell-bg:var(--background)]",
                          "relative",
                          // Background layers
                          "before:absolute before:inset-0 before:bg-[var(--cell-bg,transparent)] before:z-[-1]",
                          // Hover state
                          onRowClick && "group-hover:before:!bg-muted/50",
                          // Selected state
                          row.getIsSelected() && "before:!bg-muted"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
