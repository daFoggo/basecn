import {
  MEMBER_STATUS,
  SAMPLE_MEMBERS_DATA,
  SAMPLE_PROJECTS_DATA,
  SAMPLE_TASKS_DATA,
  TASK_STATUS,
} from "../utils/constants";
import { getOverdueTasks } from "../utils/functions";

export interface IOverviewStatsResponse {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  totalMembers: number;
  activeMembers: number;
  totalProjects: number;
  averageProgress: number;
}

export const overviewStatsServices = {
  getOverviewStats: async (): Promise<IOverviewStatsResponse> => {
    const totalTasks = SAMPLE_TASKS_DATA.length;
    const completedTasks = SAMPLE_TASKS_DATA.filter(
      (t) => t.status === TASK_STATUS.DONE
    ).length;
    const inProgressTasks = SAMPLE_TASKS_DATA.filter(
      (t) => t.status === TASK_STATUS.IN_PROGRESS
    ).length;
    const overdueTasks = getOverdueTasks().length;
    const totalMembers = SAMPLE_MEMBERS_DATA.length;
    const activeMembers = SAMPLE_MEMBERS_DATA.filter(
      (m) => m.status === MEMBER_STATUS.ACTIVE
    ).length;
    const totalProjects = SAMPLE_PROJECTS_DATA.length;
    const averageProgress = Math.round(
      SAMPLE_PROJECTS_DATA.reduce((sum, project) => sum + project.progress, 0) /
        SAMPLE_PROJECTS_DATA.length
    );

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      totalMembers,
      activeMembers,
      totalProjects,
      averageProgress,
    };
  },
};
