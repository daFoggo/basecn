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

export interface ITaskCompletionData {
  date: string;
  completed: number;
  created: number;
}

export interface ITaskStatusData {
  status: string;
  tasks: number;
}

export interface ITopPerformerData {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  completedTasks: number;
  currentTasks: number;
  completionRate: number;
  workload: number;
  productivity: number;
  tasksPerDay: number;
}

export interface IMemberWorkloadData {
  member: string;
  workload: number; // percentage (0-100)
}

export interface IProjectProgressData {
  month: string;
  webApp: number; // percentage (0-100)
  mobileApp: number; // percentage (0-100)
  design: number; // percentage (0-100)
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

  generateTaskCompletionBarChart: async (): Promise<ITaskCompletionData[]> => {
    const chartData = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const tasksCompleted = Math.floor(Math.random() * 6) + 1;
      const tasksCreated = Math.floor(Math.random() * 8) + 2;

      chartData.push({
        date: dateStr,
        completed: tasksCompleted,
        created: tasksCreated,
      });
    }

    return chartData;
  },

  generateTopPerformersData: async (
    limit: number = 10
  ): Promise<ITopPerformerData[]> => {
    const activeMembers = SAMPLE_MEMBERS_DATA.filter(
      (member) => member.status === MEMBER_STATUS.ACTIVE
    );

    const topPerformersData = activeMembers.map((member) => {
      const joinDate = new Date(member.joinedAt);
      const currentDate = new Date();
      const workingDays = Math.max(
        1,
        Math.floor(
          (currentDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      );

      const totalTasks = member.completedTasksCount + member.currentTasksCount;
      const completionRate =
        totalTasks > 0
          ? Math.round((member.completedTasksCount / totalTasks) * 100)
          : 0;

      const tasksPerDay = Number(
        (member.completedTasksCount / workingDays).toFixed(2)
      );

      const maxTasksPerDay = Math.max(
        ...activeMembers.map(
          (m) =>
            m.completedTasksCount /
            Math.max(
              1,
              Math.floor(
                (currentDate.getTime() - new Date(m.joinedAt).getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            )
        )
      );
      const normalizedTasksPerDay =
        maxTasksPerDay > 0 ? (tasksPerDay / maxTasksPerDay) * 100 : 0;
      const workloadEfficiency =
        member.workload > 0
          ? Math.min(100, (member.completedTasksCount / member.workload) * 10)
          : 0;
      const experienceScore = Math.min(100, workingDays / 10);

      const productivity = Math.round(
        completionRate * 0.4 +
          normalizedTasksPerDay * 0.3 +
          workloadEfficiency * 0.2 +
          experienceScore * 0.1
      );

      return {
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        role: member.role,
        department: member.department,
        completedTasks: member.completedTasksCount,
        currentTasks: member.currentTasksCount,
        completionRate,
        workload: member.workload,
        productivity: Math.min(100, productivity),
        tasksPerDay,
      };
    });

    return topPerformersData
      .sort((a, b) => b.productivity - a.productivity)
      .slice(0, limit);
  },

  generateProjectProgressLineChart: async (): Promise<
    IProjectProgressData[]
  > => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const chartData = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = months[date.getMonth()];

      const webAppProgress = Math.min(
        100,
        Math.max(10, 20 + (5 - i) * 15 + Math.random() * 10)
      );
      const mobileAppProgress = Math.min(
        100,
        Math.max(5, 15 + (5 - i) * 12 + Math.random() * 8)
      );
      const designProgress = Math.min(
        100,
        Math.max(0, 10 + (5 - i) * 18 + Math.random() * 12)
      );

      chartData.push({
        month: monthName,
        webApp: Math.round(webAppProgress),
        mobileApp: Math.round(mobileAppProgress),
        design: Math.round(designProgress),
      });
    }

    return chartData;
  },

  generateMemberWorkloadRadialChart: async (): Promise<
    IMemberWorkloadData[]
  > => {
    return SAMPLE_MEMBERS_DATA.filter(
      (member) => member.status === MEMBER_STATUS.ACTIVE
    )
      .sort((a, b) => b.workload - a.workload)
      .slice(0, 3)
      .map((member) => ({
        member: member.name.split(" ").slice(-1)[0],
        workload: member.workload,
      }));
  },
};
