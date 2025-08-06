import {
  type MEMBER_ROLE,
  SAMPLE_MEMBERS_DATA,
  SAMPLE_TASKS_DATA,
  type TASK_PRIORITY,
  TASK_STATUS,
} from "./constants";
import type { IMember, ITask } from "./types";

export const getTasksByStatus = (status: TASK_STATUS): ITask[] => {
  return SAMPLE_TASKS_DATA.filter((task) => task.status === status);
};

export const getTasksByMember = (memberId: string): ITask[] => {
  return SAMPLE_TASKS_DATA.filter((task) => task.assigneeId === memberId);
};

export const getMembersByRole = (role: MEMBER_ROLE): IMember[] => {
  return SAMPLE_MEMBERS_DATA.filter((member) => member.role === role);
};

export const getTasksByPriority = (priority: TASK_PRIORITY): ITask[] => {
  return SAMPLE_TASKS_DATA.filter((task) => task.priority === priority);
};

export const getOverdueTasks = (): ITask[] => {
  const now = new Date();
  return SAMPLE_TASKS_DATA.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      dueDate < now &&
      task.status !== TASK_STATUS.DONE &&
      task.status !== TASK_STATUS.CANCELLED
    );
  });
};
