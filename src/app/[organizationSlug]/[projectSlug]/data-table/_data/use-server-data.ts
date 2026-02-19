"use client";

/**
 * useServerData - fetches tasks from /api/tasks via SWR.
 *
 * Reads pagination/sort/filter state from URL (same keys as useDataTable)
 * and constructs the fetch URL.  On every URL change nuqs triggers a
 * re-render, the URL is recomputed, SWR de-dupes and re-fetches.
 */

import { useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import useSWR from "swr";
import type { TasksApiResponse } from "@/app/api/tasks/route";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import type { ITask } from "./tasks";

// ─── SWR fetcher ─────────────────────────────────────────────────────────────

const fetcher = (url: string): Promise<TasksApiResponse> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(r.statusText);
    return r.json() as Promise<TasksApiResponse>;
  });

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseServerDataOptions {
  enableAdvancedFilter?: boolean;
}

export interface UseServerDataResult {
  data: ITask[];
  pageCount: number;
  totalRows: number;
  isLoading: boolean;
}

const COL_IDS = [
  "id",
  "title",
  "status",
  "priority",
  "category",
  "assignee",
  "estimatedHours",
  "budget",
  "dueDate",
  "isBlocked",
  "completionRate",
];

/** Stable fallback to avoid flicker when re-fetching */
const EMPTY: UseServerDataResult = {
  data: [],
  pageCount: 1,
  totalRows: 0,
  isLoading: false,
};

export function useServerData({
  enableAdvancedFilter = false,
}: UseServerDataOptions = {}): UseServerDataResult {
  // ── nuqs state (same keys useDataTable uses) ──────────────────────────────
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [perPage] = useQueryState("perPage", parseAsInteger.withDefault(10));
  const [sorting] = useQueryState(
    "sort",
    getSortingStateParser(COL_IDS).withDefault([]),
  );
  const [advFilters] = useQueryState(
    "filters",
    getFiltersStateParser(COL_IDS).withDefault([]),
  );

  // ── Standard filter values from raw URLSearchParams ───────────────────────
  // useSearchParams() is the Next.js-idiomatic way; it re-renders on any URL
  // change without any history patching.
  const searchParams = useSearchParams();

  // ── Build request URL ─────────────────────────────────────────────────────
  const url = (() => {
    const p = new URLSearchParams();
    p.set("page", String(page));
    p.set("perPage", String(perPage));
    if (sorting.length > 0) p.set("sort", JSON.stringify(sorting));

    if (enableAdvancedFilter) {
      if (advFilters.length > 0) p.set("filters", JSON.stringify(advFilters));
    } else {
      // Forward individual column filter params to the API
      for (const id of COL_IDS) {
        const v = searchParams.get(id);
        if (v) p.set(id, v);
      }
    }

    return `/api/tasks?${p.toString()}`;
  })();

  // ── SWR fetch ─────────────────────────────────────────────────────────────
  const { data, isLoading } = useSWR<TasksApiResponse>(url, fetcher, {
    keepPreviousData: true, // no flicker on page/filter change
    revalidateOnFocus: false,
  });

  if (!data) return { ...EMPTY, isLoading };

  return {
    data: data.data,
    pageCount: data.pageCount,
    totalRows: data.totalRows,
    isLoading,
  };
}
