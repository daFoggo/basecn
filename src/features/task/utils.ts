import type { ITask } from "./types";

interface IFilterItem {
  id: string;
  value: string | string[];
  variant: string;
  operator: string;
  filterId: string;
}

interface ISortItem {
  id: string;
  desc: boolean;
}

export interface ITaskQueryParams {
  page?: number;
  perPage?: number;
  sort?: ISortItem[];
  filters?: IFilterItem[];
  columnFilters?: Record<string, string>;
}

const getFieldValue = (row: ITask, id: string): unknown => {
  return (row as unknown as Record<string, unknown>)[id];
};

const matchesFilter = (row: ITask, filter: IFilterItem): boolean => {
  const raw = getFieldValue(row, filter.id);
  const { operator, value, variant } = filter;

  if (operator === "isEmpty")
    return (
      raw == null || raw === "" || (Array.isArray(raw) && raw.length === 0)
    );
  if (operator === "isNotEmpty")
    return (
      raw != null && raw !== "" && !(Array.isArray(raw) && raw.length === 0)
    );

  switch (variant) {
    case "text": {
      const cell = String(raw ?? "").toLowerCase();
      const val = String(value ?? "").toLowerCase();
      if (operator === "iLike") return cell.includes(val);
      if (operator === "notILike") return !cell.includes(val);
      if (operator === "eq") return cell === val;
      if (operator === "ne") return cell !== val;
      return true;
    }
    case "number":
    case "range": {
      const num = Number(raw);
      if (operator === "isBetween" && Array.isArray(value)) {
        const [lo, hi] = value.map(Number);
        return num >= lo && num <= hi;
      }
      const val = Number(value);
      if (operator === "eq") return num === val;
      if (operator === "ne") return num !== val;
      if (operator === "lt") return num < val;
      if (operator === "lte") return num <= val;
      if (operator === "gt") return num > val;
      if (operator === "gte") return num >= val;
      return true;
    }
    case "select": {
      if (operator === "eq") return String(raw) === String(value);
      if (operator === "ne") return String(raw) !== String(value);
      return true;
    }
    case "multiSelect": {
      const values = Array.isArray(value) ? value : [String(value)];
      const cell = String(raw);
      if (operator === "inArray") return values.includes(cell);
      if (operator === "notInArray") return !values.includes(cell);
      return true;
    }
    case "boolean": {
      const bool = raw === true || raw === "true";
      const target = value === "true";
      if (operator === "eq") return bool === target;
      if (operator === "ne") return bool !== target;
      return true;
    }
    case "date":
    case "dateRange": {
      const ts = Number(raw);
      if (operator === "isBetween" && Array.isArray(value)) {
        const [from, to] = value.map(Number);
        return ts >= from && ts <= to;
      }
      const val = Number(value);
      if (operator === "eq") return ts === val;
      if (operator === "ne") return ts !== val;
      if (operator === "lt") return ts < val;
      if (operator === "lte") return ts <= val;
      if (operator === "gt") return ts > val;
      if (operator === "gte") return ts >= val;
      return true;
    }
    default:
      return true;
  }
};

const COLUMN_VARIANTS: Record<string, string> = {
  id: "text",
  title: "text",
  status: "multiSelect",
  priority: "select",
  category: "multiSelect",
  assignees: "text",
  estimatedHours: "range",
  budget: "number",
  dueDate: "dateRange",
  isBlocked: "boolean",
  completionRate: "range",
};

export function queryTasks(
  tasks: ITask[],
  {
    page = 1,
    perPage = 10,
    sort = [],
    filters = [],
    columnFilters = {},
  }: ITaskQueryParams,
) {
  let rows = [...tasks];

  // Advanced filters
  if (filters.length > 0) {
    for (const filter of filters) {
      rows = rows.filter((row) => matchesFilter(row, filter));
    }
  } else {
    // Standard per-column filters
    for (const [id, variant] of Object.entries(COLUMN_VARIANTS)) {
      const raw = columnFilters[id];
      if (!raw) continue;
      const isMulti = variant === "multiSelect";
      const value: string | string[] = isMulti
        ? raw.split(",").filter(Boolean)
        : raw;
      if (Array.isArray(value) && value.length === 0) continue;
      rows = rows.filter((row) =>
        matchesFilter(row, {
          id,
          value,
          variant,
          operator: isMulti ? "inArray" : "iLike",
          filterId: id,
        }),
      );
    }
  }

  // Sorting
  for (const s of [...sort].reverse()) {
    rows.sort((a, b) => {
      const av = getFieldValue(a, s.id);
      const bv = getFieldValue(b, s.id);
      if (av == null && bv == null) return 0;
      if (av == null) return s.desc ? -1 : 1;
      if (bv == null) return s.desc ? 1 : -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return s.desc ? -cmp : cmp;
    });
  }

  // Pagination
  const totalRows = rows.length;
  const pageCount = Math.max(1, Math.ceil(totalRows / perPage));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const data = rows.slice((safePage - 1) * perPage, safePage * perPage);

  return { data, pageCount, totalRows };
}

/** Parse a query string (from URLSearchParams) into ITaskQueryParams */
export function parseTaskQueryString(qs: string): ITaskQueryParams {
  const p = new URLSearchParams(qs);
  const page = Math.max(1, Number(p.get("page") ?? 1));
  const perPage = Math.max(1, Number(p.get("perPage") ?? 10));

  let sort: ISortItem[] = [];
  try {
    const raw = p.get("sort");
    if (raw) sort = JSON.parse(raw) as ISortItem[];
  } catch {
    /* ignore */
  }

  let filters: IFilterItem[] = [];
  try {
    const raw = p.get("filters");
    if (raw) filters = JSON.parse(raw) as IFilterItem[];
  } catch {
    /* ignore */
  }

  const columnFilters: Record<string, string> = {};
  if (filters.length === 0) {
    for (const id of Object.keys(COLUMN_VARIANTS)) {
      const v = p.get(id);
      if (v) columnFilters[id] = v;
    }
  }

  return { page, perPage, sort, filters, columnFilters };
}
