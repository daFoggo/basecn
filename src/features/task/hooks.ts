"use client";

import { useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import useSWR from "swr";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import { taskApi } from "./api";
import type { ITasksApiResponse } from "./types";

export interface IUseTaskTableOptions {
  enableAdvancedFilter?: boolean;
  fallbackData?: ITasksApiResponse;
}

const COL_IDS = [
  "id",
  "title",
  "status",
  "priority",
  "category",
  "assignees",
  "estimatedHours",
  "budget",
  "dueDate",
  "isBlocked",
  "completionRate",
];

export function useTasks({
  enableAdvancedFilter = false,
  fallbackData,
}: IUseTaskTableOptions = {}) {
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

  const searchParams = useSearchParams();

  const queryString = (() => {
    const p = new URLSearchParams();
    p.set("page", String(page));
    p.set("perPage", String(perPage));
    if (sorting.length > 0) p.set("sort", JSON.stringify(sorting));

    if (enableAdvancedFilter) {
      if (advFilters.length > 0) p.set("filters", JSON.stringify(advFilters));
    } else {
      for (const id of COL_IDS) {
        const v = searchParams.get(id);
        if (v) p.set(id, v);
      }
    }
    return p.toString();
  })();

  const { data, ...swr } = useSWR<ITasksApiResponse>(
    ["tasks", queryString] as [string, string],
    ([_, qs]: [string, string]) => taskApi.getAllWithParams(qs),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      fallbackData,
    },
  );

  return {
    data: data?.data ?? [],
    pageCount: data?.pageCount ?? 1,
    totalRows: data?.totalRows ?? 0,
    ...swr,
  };
}
