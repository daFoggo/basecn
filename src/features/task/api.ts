import { createApiClient } from "@/lib/ky";
import type { ITask, ITasksApiResponse } from "./types";

const taskClient = createApiClient("/api/tasks");

export const taskApi = {
  getAll: async (): Promise<ITask[]> => {
    return await taskClient.get("").json<ITask[]>();
  },

  getAllWithParams: async (queryString: string): Promise<ITasksApiResponse> => {
    return await taskClient.get(`?${queryString}`).json<ITasksApiResponse>();
  },

  getById: async (id: string): Promise<ITask> => {
    return await taskClient.get(id).json<ITask>();
  },

  create: async (data: Omit<ITask, "id">): Promise<ITask> => {
    return await taskClient.post("", { json: data }).json<ITask>();
  },

  update: async (id: string, data: Partial<ITask>): Promise<ITask> => {
    return await taskClient.patch(id, { json: data }).json<ITask>();
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return await taskClient.delete(id).json<{ success: boolean }>();
  },
};
