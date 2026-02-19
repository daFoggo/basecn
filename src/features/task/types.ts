import type {
  TASK_CATEGORY,
  TASK_PRIORITY,
  TASK_STATUS,
  TOOLBAR_MODE,
} from "./constants";

export type TTaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export type TTaskPriority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];
export type TTaskCategory = (typeof TASK_CATEGORY)[keyof typeof TASK_CATEGORY];
export type TToolbarMode = (typeof TOOLBAR_MODE)[keyof typeof TOOLBAR_MODE];

export interface ITask {
  id: string;
  title: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  category: TTaskCategory;
  assignees: string[];
  estimatedHours: number;
  budget: number;
  dueDate: number;
  isBlocked: boolean;
  completionRate: number;
}

export interface ITasksApiResponse {
  data: ITask[];
  pageCount: number;
  totalRows: number;
}
