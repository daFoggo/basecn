import { type NextRequest, NextResponse } from "next/server";
import {
  type ITask,
  SAMPLE_TASKS,
} from "@/app/[organizationSlug]/[projectSlug]/data-table/_data/tasks";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FilterItem {
  id: string;
  value: string | string[];
  variant: string;
  operator: string;
  filterId: string;
}

interface SortItem {
  id: string;
  desc: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFieldValue(row: ITask, id: string): unknown {
  return (row as unknown as Record<string, unknown>)[id];
}

function matchesFilter(row: ITask, filter: FilterItem): boolean {
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
}

// ─── Route handler ────────────────────────────────────────────────────────────

export interface TasksApiResponse {
  data: ITask[];
  pageCount: number;
  totalRows: number;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<TasksApiResponse>> {
  const sp = request.nextUrl.searchParams;

  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const perPage = Math.max(1, Number(sp.get("perPage") ?? 10));

  // Parse sorting
  let sorting: SortItem[] = [];
  try {
    const raw = sp.get("sort");
    if (raw) sorting = JSON.parse(raw) as SortItem[];
  } catch {
    /* ignore */
  }

  // Parse advanced filters
  let advancedFilters: FilterItem[] = [];
  try {
    const raw = sp.get("filters");
    if (raw) advancedFilters = JSON.parse(raw) as FilterItem[];
  } catch {
    /* ignore */
  }

  // Determine mode: if "filters" param exists → advanced mode
  const isAdvanced = sp.has("filters");

  let rows = [...SAMPLE_TASKS];

  // ── 1. Standard per-column filters (when not in advanced mode) ───────────────
  if (!isAdvanced) {
    const COLUMN_VARIANTS: Record<string, string> = {
      id: "text",
      title: "text",
      status: "multiSelect",
      priority: "select",
      category: "multiSelect",
      assignee: "text",
      estimatedHours: "range",
      budget: "number",
      dueDate: "dateRange",
      isBlocked: "boolean",
      completionRate: "range",
    };

    for (const [id, variant] of Object.entries(COLUMN_VARIANTS)) {
      const raw = sp.get(id);
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

  // ── 2. Advanced filters ──────────────────────────────────────────────────────
  if (isAdvanced) {
    for (const filter of advancedFilters) {
      rows = rows.filter((row) => matchesFilter(row, filter));
    }
  }

  // ── 3. Sorting ───────────────────────────────────────────────────────────────
  for (const sort of [...sorting].reverse()) {
    rows.sort((a, b) => {
      const av = getFieldValue(a, sort.id);
      const bv = getFieldValue(b, sort.id);
      if (av == null && bv == null) return 0;
      if (av == null) return sort.desc ? -1 : 1;
      if (bv == null) return sort.desc ? 1 : -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.desc ? -cmp : cmp;
    });
  }

  // ── 4. Pagination ────────────────────────────────────────────────────────────
  const totalRows = rows.length;
  const pageCount = Math.max(1, Math.ceil(totalRows / perPage));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const data = rows.slice((safePage - 1) * perPage, safePage * perPage);

  return NextResponse.json({ data, pageCount, totalRows });
}
