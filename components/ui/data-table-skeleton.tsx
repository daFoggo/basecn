import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
  columnCount: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
  withPagination?: boolean;
  shrinkZero?: boolean;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
  filterCount = 0,
  cellWidths = ["auto"],
  withViewOptions = true,
  withPagination = true,
  shrinkZero = false,
  className,
  ...props
}: DataTableSkeletonProps) {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? "auto",
  );

  return (
    <div
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
      {...props}
    >
      <div className="flex justify-between items-center gap-2 p-1 w-full overflow-auto">
        <div className="flex flex-1 items-center gap-2">
          {filterCount > 0
            ? Array.from({ length: filterCount }).map((_, i) => (
                <Skeleton key={i} className="border-dashed w-[4.5rem] h-7" />
              ))
            : null}
        </div>
        {withViewOptions ? (
          <Skeleton className="hidden lg:flex ml-auto w-[4.5rem] h-7" />
        ) : null}
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableHead
                    key={j}
                    style={{
                      width: cozyCellWidths[j],
                      minWidth: shrinkZero ? cozyCellWidths[j] : "auto",
                    }}
                  >
                    <Skeleton className="w-full h-6" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell
                    key={j}
                    style={{
                      width: cozyCellWidths[j],
                      minWidth: shrinkZero ? cozyCellWidths[j] : "auto",
                    }}
                  >
                    <Skeleton className="w-full h-6" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {withPagination ? (
        <div className="flex justify-between items-center gap-4 sm:gap-8 p-1 w-full overflow-auto">
          <Skeleton className="w-40 h-7 shrink-0" />
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
              <Skeleton className="w-24 h-7" />
              <Skeleton className="w-[4.5rem] h-7" />
            </div>
            <div className="flex justify-center items-center font-medium text-sm">
              <Skeleton className="w-20 h-7" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="hidden lg:block size-7" />
              <Skeleton className="size-7" />
              <Skeleton className="size-7" />
              <Skeleton className="hidden lg:block size-7" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
