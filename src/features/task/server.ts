import sampleTasks from "@/features/task/mocks/sample-tasks.json";
import type { ITask, ITasksApiResponse } from "./types";
import {
  type ITaskQueryParams,
  parseTaskQueryString,
  queryTasks,
} from "./utils";

const TASKS = sampleTasks as ITask[];

export const taskServer = {
  getTasks: async (
    paramsOrQueryString: ITaskQueryParams | string,
  ): Promise<ITasksApiResponse> => {
    // Simulate DB delay
    // await new Promise((resolve) => setTimeout(resolve, 100));

    let params: ITaskQueryParams;
    if (typeof paramsOrQueryString === "string") {
      params = parseTaskQueryString(paramsOrQueryString);
    } else {
      params = paramsOrQueryString;
    }

    return queryTasks(TASKS, params);
  },
};
