import { type NextRequest, NextResponse } from "next/server";
import sampleTasks from "@/features/task/mocks/sample-tasks.json";
import type { ITask, ITasksApiResponse } from "@/features/task/types";
import { parseTaskQueryString, queryTasks } from "@/features/task/utils";

const TASKS = sampleTasks as ITask[];

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<ITasksApiResponse>> => {
  const qs = request.nextUrl.search.slice(1);
  const params = parseTaskQueryString(qs);
  const result = queryTasks(TASKS, params);
  return NextResponse.json(result);
};
