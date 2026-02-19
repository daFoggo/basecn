/** biome-ignore-all lint/a11y/useSemanticElements: <idk> */
"use client";

import type { Column, Table } from "@tanstack/react-table";
import {
  BadgeCheck,
  CalendarIcon,
  ListFilter,
  RotateCcw,
  Text,
  X,
} from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";

import { DataTableRangeFilter } from "@/components/common/data-table/data-table-range-filter";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { getDefaultFilterOperator, getFilterOperators } from "@/lib/data-table";
import { formatDate } from "@/lib/format";
import { generateId } from "@/lib/id";
import { getFiltersStateParser } from "@/lib/parsers";
import { cn } from "@/lib/utils";
import type { ExtendedColumnFilter, FilterOperator } from "@/types/data-table";

const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;
const FILTER_SHORTCUT_KEY = "f";
const REMOVE_FILTER_SHORTCUTS = ["backspace", "delete"];

interface DataTableFilterMenuProps<TData> extends React.ComponentProps<
  typeof PopoverContent
> {
  table: Table<TData>;
  debounceMs?: number;
  throttleMs?: number;
  shallow?: boolean;
  disabled?: boolean;
}

export function DataTableFilterMenu<TData>({
  table,
  debounceMs = DEBOUNCE_MS,
  throttleMs = THROTTLE_MS,
  shallow = true,
  disabled,
  ...props
}: DataTableFilterMenuProps<TData>) {
  const id = React.useId();

  const columns = React.useMemo(() => {
    return table
      .getAllColumns()
      .filter((column) => column.columnDef.enableColumnFilter);
  }, [table]);

  const [open, setOpen] = React.useState(false);
  const [selectedColumn, setSelectedColumn] =
    React.useState<Column<TData> | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);

    if (!open) {
      setTimeout(() => {
        setSelectedColumn(null);
        setInputValue("");
      }, 100);
    }
  }, []);

  const onInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase()) &&
        !inputValue &&
        selectedColumn
      ) {
        event.preventDefault();
        setSelectedColumn(null);
      }
    },
    [inputValue, selectedColumn],
  );

  const [filters, setFilters] = useQueryState(
    table.options.meta?.queryKeys?.filters ?? "filters",
    getFiltersStateParser<TData>(columns.map((field) => field.id))
      .withDefault([])
      .withOptions({
        clearOnDefault: true,
        shallow,
        throttleMs,
      }),
  );

  // Immediate update for Select/Date/Boolean
  // Using direct filters reference to ensure no stale state issues with functional updates
  const updateFilter = React.useCallback(
    (
      filterId: string,
      updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>,
    ) => {
      const updatedFilters = filters.map((filter) => {
        if (filter.filterId === filterId) {
          return { ...filter, ...updates } as ExtendedColumnFilter<TData>;
        }
        return filter;
      });
      setFilters(updatedFilters);
    },
    [filters, setFilters],
  );

  // Debounced update for Text/Number inputs
  const debouncedUpdateFilter = useDebouncedCallback(updateFilter, debounceMs);

  const onFilterAdd = React.useCallback(
    (column: Column<TData>, value: string) => {
      if (!value.trim() && column.columnDef.meta?.variant !== "boolean") {
        return;
      }

      const filterValue =
        column.columnDef.meta?.variant === "multiSelect" ? [value] : value;

      const newFilter: ExtendedColumnFilter<TData> = {
        id: column.id as Extract<keyof TData, string>,
        value: filterValue,
        variant: column.columnDef.meta?.variant ?? "text",
        operator: getDefaultFilterOperator(
          column.columnDef.meta?.variant ?? "text",
        ),
        filterId: generateId({ length: 8 }),
      };

      setFilters([...filters, newFilter]);
      setOpen(false);

      setTimeout(() => {
        setSelectedColumn(null);
        setInputValue("");
      }, 100);
    },
    [filters, setFilters],
  );

  const onFilterRemove = React.useCallback(
    (filterId: string) => {
      const updatedFilters = filters.filter(
        (filter) => filter.filterId !== filterId,
      );
      setFilters(updatedFilters);
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    },
    [filters, setFilters],
  );

  const onFiltersReset = React.useCallback(() => {
    setFilters([]);
  }, [setFilters]);

  // Sort filters based on definition order
  const sortedFilters = React.useMemo(() => {
    const columnOrder = columns.map((c) => c.id);
    return [...filters].sort(
      (a, b) => columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id),
    );
  }, [filters, columns]);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement &&
          event.target.contentEditable === "true")
      ) {
        return;
      }

      if (
        event.key.toLowerCase() === FILTER_SHORTCUT_KEY &&
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey
      ) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (
        REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase()) &&
        filters.length > 0
      ) {
        event.preventDefault();
        onFilterRemove(filters[filters.length - 1]?.filterId ?? "");
      }
    },
    [filters, onFilterRemove],
  );

  return (
    <div role="list" className="flex flex-wrap items-center gap-2">
      {sortedFilters.map((filter) => (
        <DataTableFilterItem
          key={filter.filterId}
          filter={filter}
          filterItemId={`${id}-filter-${filter.filterId}`}
          columns={columns}
          onFilterUpdate={updateFilter}
          onDebouncedFilterUpdate={debouncedUpdateFilter}
          onFilterRemove={onFilterRemove}
        />
      ))}
      {filters.length > 0 && (
        <Button
          aria-label="Reset all filters"
          variant="outline"
          size="sm"
          className="h-8 border-dashed px-2 lg:px-3"
          onClick={onFiltersReset}
        >
          <RotateCcw className="mr-2 size-3.5" />
          Reset filters
        </Button>
      )}
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            aria-label="Open filter command menu"
            variant="outline"
            size={filters.length > 0 ? "icon" : "sm"}
            // className={cn(filters.length > 0 && "size-8", "h-8 font-normal")}
            ref={triggerRef}
            onKeyDown={onTriggerKeyDown}
            disabled={disabled}
          >
            <ListFilter className="text-muted-foreground" />
            {filters.length > 0 ? null : "Filter"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start" {...props}>
          <Command loop className="[&_[cmdk-input-wrapper]_svg]:hidden">
            <CommandInput
              ref={inputRef}
              placeholder={
                selectedColumn
                  ? (selectedColumn.columnDef.meta?.label ?? selectedColumn.id)
                  : "Search fields..."
              }
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={onInputKeyDown}
            />
            <CommandList>
              {selectedColumn ? (
                <>
                  {selectedColumn.columnDef.meta?.options && (
                    <CommandEmpty>No options found.</CommandEmpty>
                  )}
                  <FilterValueSelector
                    column={selectedColumn}
                    value={inputValue}
                    onSelect={(value) => onFilterAdd(selectedColumn, value)}
                  />
                </>
              ) : (
                <>
                  <CommandEmpty>No fields found.</CommandEmpty>
                  <CommandGroup>
                    {columns.map((column) => (
                      <CommandItem
                        key={column.id}
                        value={column.id}
                        onSelect={() => {
                          setSelectedColumn(column);
                          setInputValue("");
                          requestAnimationFrame(() => {
                            inputRef.current?.focus();
                          });
                        }}
                      >
                        {column.columnDef.meta?.icon && (
                          <column.columnDef.meta.icon className="mr-2 size-4 text-muted-foreground" />
                        )}
                        <span className="truncate">
                          {column.columnDef.meta?.label ?? column.id}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DataTableFilterItemProps<TData> {
  filter: ExtendedColumnFilter<TData>;
  filterItemId: string;
  columns: Column<TData>[];
  onFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>,
  ) => void;
  onDebouncedFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>,
  ) => void;
  onFilterRemove: (filterId: string) => void;
}

function DataTableFilterItem<TData>({
  filter,
  filterItemId,
  columns,
  onFilterUpdate,
  onDebouncedFilterUpdate,
  onFilterRemove,
}: DataTableFilterItemProps<TData>) {
  {
    const [showFieldSelector, setShowFieldSelector] = React.useState(false);
    const [showOperatorSelector, setShowOperatorSelector] =
      React.useState(false);
    const [showValueSelector, setShowValueSelector] = React.useState(false);

    const column = columns.find((column) => column.id === filter.id);

    const operatorListboxId = `${filterItemId}-operator-listbox`;
    const inputId = `${filterItemId}-input`;

    const columnMeta = column?.columnDef.meta;
    const filterOperators = getFilterOperators(filter.variant);

    const onItemKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        ) {
          return;
        }

        if (showFieldSelector || showOperatorSelector || showValueSelector) {
          return;
        }

        if (REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase())) {
          event.preventDefault();
          onFilterRemove(filter.filterId);
        }
      },
      [
        filter.filterId,
        showFieldSelector,
        showOperatorSelector,
        showValueSelector,
        onFilterRemove,
      ],
    );

    if (!column) return null;

    return (
      <div
        key={filter.filterId}
        role="listitem"
        id={filterItemId}
        className="flex items-center"
        onKeyDown={onItemKeyDown}
      >
        <Popover open={showFieldSelector} onOpenChange={setShowFieldSelector}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="relative z-10 h-8 rounded-r-none px-2 font-normal focus:z-20"
            >
              {columnMeta?.icon && (
                <columnMeta.icon className="mr-2 size-3.5 text-muted-foreground" />
              )}
              {columnMeta?.label ?? column.id}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[200px] p-0">
            <Command loop>
              <CommandInput placeholder="Search fields..." />
              <CommandList>
                <CommandEmpty>No fields found.</CommandEmpty>
                <CommandGroup>
                  {columns.map((column) => (
                    <CommandItem
                      key={column.id}
                      value={column.id}
                      data-checked={column.id === filter.id}
                      onSelect={() => {
                        onFilterUpdate(filter.filterId, {
                          id: column.id as Extract<keyof TData, string>,
                          variant: column.columnDef.meta?.variant ?? "text",
                          operator: getDefaultFilterOperator(
                            column.columnDef.meta?.variant ?? "text",
                          ),
                          value: "",
                        });

                        setShowFieldSelector(false);
                      }}
                    >
                      {column.columnDef.meta?.icon && (
                        <column.columnDef.meta.icon className="mr-2 size-4 text-muted-foreground" />
                      )}
                      <span className="truncate">
                        {column.columnDef.meta?.label ?? column.id}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Select
          open={showOperatorSelector}
          onOpenChange={setShowOperatorSelector}
          value={filter.operator}
          onValueChange={(value: FilterOperator) =>
            onFilterUpdate(filter.filterId, {
              operator: value,
              value:
                value === "isEmpty" || value === "isNotEmpty"
                  ? ""
                  : filter.value,
            })
          }
        >
          <SelectTrigger
            aria-controls={operatorListboxId}
            className="relative -ml-px h-8 w-24 rounded-none px-2 font-normal focus:z-20 [&_svg]:hidden"
          >
            <SelectValue placeholder={filter.operator} />
          </SelectTrigger>
          <SelectContent
            id={operatorListboxId}
            position="popper"
            className="min-w-[100px]"
          >
            {filterOperators.map((operator) => (
              <SelectItem
                key={operator.value}
                className="text-xs lowercase"
                value={operator.value}
              >
                {operator.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {onFilterInputRender({
          filter,
          column,
          inputId,
          onFilterUpdate,
          onDebouncedFilterUpdate,
          showValueSelector,
          setShowValueSelector,
          className: "relative -ml-px h-8 rounded-none focus:z-20",
        })}
        <Button
          aria-controls={filterItemId}
          variant="outline"
          size="icon"
          className="relative -ml-px h-8 w-8 rounded-l-none px-2 font-normal focus:z-20"
          onClick={() => onFilterRemove(filter.filterId)}
        >
          <X className="size-3.5" />
        </Button>
      </div>
    );
  }
}

interface FilterValueSelectorProps<TData> {
  column: Column<TData>;
  value: string;
  onSelect: (value: string) => void;
}

function FilterValueSelector<TData>({
  column,
  value,
  onSelect,
}: FilterValueSelectorProps<TData>) {
  const variant = column.columnDef.meta?.variant ?? "text";

  switch (variant) {
    case "boolean":
      return (
        <CommandGroup>
          <CommandItem value="true" onSelect={() => onSelect("true")}>
            True
          </CommandItem>
          <CommandItem value="false" onSelect={() => onSelect("false")}>
            False
          </CommandItem>
        </CommandGroup>
      );

    case "select":
    case "multiSelect":
      return (
        <CommandGroup>
          {column.columnDef.meta?.options?.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={() => onSelect(option.value)}
            >
              {option.icon && (
                <option.icon className="mr-2 size-4 text-muted-foreground" />
              )}
              <span className="truncate">{option.label}</span>
              {option.count && (
                <CommandShortcut>{option.count}</CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      );

    case "date":
    case "dateRange":
      return (
        <Calendar
          autoFocus
          captionLayout="dropdown"
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => onSelect(date?.getTime().toString() ?? "")}
        />
      );

    default: {
      const isEmpty = !value.trim();

      return (
        <CommandGroup>
          <CommandItem
            value={value}
            onSelect={() => onSelect(value)}
            disabled={isEmpty}
          >
            {isEmpty ? (
              <>
                <Text className="mr-2 size-4 text-muted-foreground" />
                <span>Type to add filter...</span>
              </>
            ) : (
              <>
                <BadgeCheck className="mr-2 size-4 text-muted-foreground" />
                <span className="truncate">Filter by &quot;{value}&quot;</span>
              </>
            )}
          </CommandItem>
        </CommandGroup>
      );
    }
  }
}

function onFilterInputRender<TData>({
  filter,
  column,
  inputId,
  onFilterUpdate,
  onDebouncedFilterUpdate,
  showValueSelector,
  setShowValueSelector,
  className,
}: {
  filter: ExtendedColumnFilter<TData>;
  column: Column<TData>;
  inputId: string;
  onFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>,
  ) => void;
  onDebouncedFilterUpdate: (
    filterId: string,
    updates: Partial<Omit<ExtendedColumnFilter<TData>, "filterId">>,
  ) => void;
  showValueSelector: boolean;
  setShowValueSelector: (value: boolean) => void;
  className?: string;
}) {
  if (filter.operator === "isEmpty" || filter.operator === "isNotEmpty") {
    return (
      <div
        id={inputId}
        role="status"
        aria-label={`${column.columnDef.meta?.label} filter is ${
          filter.operator === "isEmpty" ? "empty" : "not empty"
        }`}
        aria-live="polite"
        className={cn(
          "h-8 w-24 rounded-none border border-input bg-transparent px-2 py-1 text-sm text-muted-foreground",
          className,
        )}
      >
        <span className="opacity-50">Empty</span>
      </div>
    );
  }

  switch (filter.variant) {
    case "text":
    case "number":
    case "range": {
      if (
        (filter.variant === "range" && filter.operator === "isBetween") ||
        filter.operator === "isBetween"
      ) {
        return (
          <DataTableRangeFilter
            filter={filter}
            column={column}
            inputId={inputId}
            onFilterUpdate={onDebouncedFilterUpdate} // Use debounced for range inputs
            className={cn("h-8 w-24 rounded-none", className)}
          />
        );
      }

      const isNumber =
        filter.variant === "number" || filter.variant === "range";

      const unit = column.columnDef.meta?.unit;

      return (
        <InputGroup className={cn("h-8 w-32 rounded-none", className)}>
          <InputGroupInput
            id={inputId}
            type={isNumber ? "number" : "text"}
            inputMode={isNumber ? "numeric" : undefined}
            placeholder={column.columnDef.meta?.placeholder ?? "Value..."}
            className="flex-1 px-2 text-sm"
            defaultValue={typeof filter.value === "string" ? filter.value : ""}
            onChange={(event) =>
              onDebouncedFilterUpdate(filter.filterId, {
                value: event.target.value,
              })
            }
          />
          {unit && (
            <InputGroupAddon align="inline-end">
              <InputGroupText>{unit}</InputGroupText>
            </InputGroupAddon>
          )}
        </InputGroup>
      );
    }

    case "boolean": {
      const inputListboxId = `${inputId}-listbox`;

      return (
        <Select
          open={showValueSelector}
          onOpenChange={setShowValueSelector}
          value={typeof filter.value === "string" ? filter.value : "true"}
          onValueChange={(value: "true" | "false") =>
            onFilterUpdate(filter.filterId, { value })
          }
        >
          <SelectTrigger
            id={inputId}
            aria-controls={inputListboxId}
            className={cn(
              "h-8 w-20 rounded-none border-input bg-transparent px-2 text-sm",
              className,
            )}
          >
            <SelectValue placeholder={filter.value ? "True" : "False"} />
          </SelectTrigger>
          <SelectContent
            id={inputListboxId}
            position="popper"
            className="min-w-[100px]"
          >
            <SelectItem value="true">True</SelectItem>
            <SelectItem value="false">False</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    case "select":
    case "multiSelect": {
      const inputListboxId = `${inputId}-listbox`;

      const options = column.columnDef.meta?.options ?? [];
      const selectedValues = Array.isArray(filter.value)
        ? filter.value
        : [filter.value];

      const selectedOptions = options.filter((option) =>
        selectedValues.includes(option.value),
      );

      return (
        <Popover open={showValueSelector} onOpenChange={setShowValueSelector}>
          <PopoverTrigger asChild>
            <Button
              id={inputId}
              aria-controls={inputListboxId}
              variant="outline"
              size="sm"
              className={cn(
                "h-8 min-w-20 justify-between rounded-none border-input px-2 font-normal",
                className,
              )}
            >
              <div className="flex items-center gap-2 truncate">
                {selectedOptions.length === 0 ? (
                  <span className="text-muted-foreground">Select...</span>
                ) : (
                  <>
                    <div className="flex items-center -space-x-1.5 hover:space-x-1 rtl:space-x-reverse transition-all">
                      {selectedOptions.slice(0, 2).map((selectedOption) =>
                        selectedOption.icon ? (
                          <div
                            key={selectedOption.value}
                            className="rounded-full border bg-background p-0.5"
                          >
                            <selectedOption.icon className="size-3" />
                          </div>
                        ) : null,
                      )}
                    </div>
                    {selectedOptions.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{selectedOptions.length - 2}
                      </span>
                    )}
                  </>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={inputListboxId}
            align="start"
            className="w-[200px] p-0"
          >
            <Command>
              <CommandInput placeholder="Search options..." />
              <CommandList>
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      data-checked={
                        filter.variant === "multiSelect"
                          ? selectedValues.includes(option.value)
                          : undefined
                      }
                      onSelect={() => {
                        const value =
                          filter.variant === "multiSelect"
                            ? selectedValues.includes(option.value)
                              ? selectedValues.filter((v) => v !== option.value)
                              : [...selectedValues, option.value]
                            : option.value;
                        onFilterUpdate(filter.filterId, { value });
                      }}
                    >
                      {option.icon && (
                        <option.icon className="mr-2 size-4 text-muted-foreground" />
                      )}
                      <span className="truncate">{option.label}</span>
                      {option.count && (
                        <CommandShortcut>{option.count}</CommandShortcut>
                      )}
                      {filter.variant === "multiSelect" &&
                        selectedValues.includes(option.value) && (
                          <BadgeCheck className="ml-auto size-4 text-primary" />
                        )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }

    case "date":
    case "dateRange": {
      const inputListboxId = `${inputId}-listbox`;

      const dateValue = Array.isArray(filter.value)
        ? filter.value.filter(Boolean)
        : [filter.value, filter.value].filter(Boolean);

      const startDate = dateValue[0]
        ? new Date(Number(dateValue[0]))
        : undefined;
      const endDate = dateValue[1] ? new Date(Number(dateValue[1])) : undefined;

      const displayValue =
        filter.operator === "isBetween" && dateValue.length === 2
          ? `${formatDate(startDate, { month: "short" })} - ${formatDate(endDate, { month: "short" })}`
          : startDate
            ? formatDate(startDate, { month: "short" })
            : "Pick date...";

      return (
        <Popover open={showValueSelector} onOpenChange={setShowValueSelector}>
          <PopoverTrigger asChild>
            <Button
              id={inputId}
              aria-controls={inputListboxId}
              variant="outline"
              size="sm"
              className={cn(
                "h-8 min-w-28 justify-start rounded-none border-input px-2 font-normal",
                !filter.value && "text-muted-foreground",
                className,
              )}
            >
              <CalendarIcon className="mr-2 size-3.5" />
              <span className="truncate">{displayValue}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={inputListboxId}
            align="start"
            className="w-auto p-0"
          >
            {filter.operator === "isBetween" ? (
              <Calendar
                autoFocus
                captionLayout="dropdown"
                mode="range"
                selected={
                  dateValue.length === 2
                    ? {
                        from: new Date(Number(dateValue[0])),
                        to: new Date(Number(dateValue[1])),
                      }
                    : {
                        from: new Date(),
                        to: new Date(),
                      }
                }
                onSelect={(date) => {
                  onFilterUpdate(filter.filterId, {
                    value: date
                      ? [
                          (date.from?.getTime() ?? "").toString(),
                          (date.to?.getTime() ?? "").toString(),
                        ]
                      : [],
                  });
                }}
              />
            ) : (
              <Calendar
                autoFocus
                captionLayout="dropdown"
                mode="single"
                selected={
                  dateValue[0] ? new Date(Number(dateValue[0])) : undefined
                }
                onSelect={(date) => {
                  onFilterUpdate(filter.filterId, {
                    value: (date?.getTime() ?? "").toString(),
                  });
                }}
              />
            )}
          </PopoverContent>
        </Popover>
      );
    }

    default:
      return null;
  }
}
